from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from firecrawl import Firecrawl
from listings.models import Job
from datetime import datetime
from django.utils import timezone
from dotenv import load_dotenv
import os

load_dotenv()


@api_view(['POST']) 
@permission_classes([AllowAny]) 
def scrapeSite(request):


   
    firecrawl = Firecrawl(api_key=os.getenv("FIRECRAWL_API_KEY"))
    websites = request.data.get("websites")

    schema = {
        "type": "object",
        "properties": {
            "jobs": {
                "type": "array",
                "items": {
                    "type": "object",
                    "properties": {
                        "title": {"type": "string"},
                        "location": {"type": "string"},
                        "department": {"type": "string"},
                        "date": {"type": "string"},
                        "description": {"type": "string"},
                        "jobLink": {"type": "string"},
                        "seniority": {"type": "string"},
                        "type": {"type": "string"},
                        "company": {"type": "string"},
                    },
                    "required": ["title"],
                },
            }
        },
        "required": ["jobs"],
    }

    prompt = """
    Extract all job openings listed.
    For each job, include:
    - title
    - location (if available , remote or on location etc. if provided the actual location)
    - department (if shown, else deduce it from the title)
    - date (the date the listing was posted)
    - description (if available)
    - job link or apply URL
    - seniority
    - type (full-time, part-time, intern, or contract)
    - company (the company which the role is for)
    """

    print("Crawling...")

    all_jobs = []
    print(websites)
  
    for website in websites:
        res = firecrawl.extract(
            urls=[f"{website}/*"],
            prompt=prompt,
            schema=schema,
        )
        jobs = res.data.get("jobs", [])
        all_jobs.extend(jobs)



    for listing in all_jobs:
        # Parse the date safely
        raw_date = listing.get("date")
        parsed_date = None

        if raw_date:
            try:
                parsed_date = datetime.strptime(raw_date, "%Y-%m-%d")
                parsed_date = timezone.make_aware(parsed_date)
            except Exception:
                parsed_date = None

   
        Job.objects.get_or_create(
            title=listing.get("title"),
            company=listing.get("company"),
            link=listing.get("jobLink"),

            defaults={
                "location": listing.get("location"),
                "department": listing.get("department"),
                "date": parsed_date,
                "description": listing.get("description"),
                "seniority": listing.get("seniority"),
                "length": listing.get("type"),
            }
        )

    

    print(res.data)

    return Response({"data": len(all_jobs)}, status=status.HTTP_200_OK)
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from firecrawl import Firecrawl
from listings.models import Job
from datetime import datetime
from django.utils import timezone


@api_view(['GET']) 
@permission_classes([AllowAny]) 
def scrapeSite(request):
    firecrawl = Firecrawl(api_key="fc-60ea6045cd414cdea959e15da3407e81")

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
    - location (if available)
    - department (if shown, else deduce it from the title)
    - date (the date the listing was posted)
    - description (if available)
    - job link or apply URL
    - seniority
    - type (full-time, part-time, intern, or contract)
    - company (the company which the role is for)
    """

    res = firecrawl.extract(
        urls=["https://mavenmachines.com/*"],
        prompt=prompt,
        schema=schema,
    )

    jobs = res.data.get("jobs", [])

    for listing in jobs:
        # Parse the date safely
        raw_date = listing.get("date")
        parsed_date = None

        if raw_date:
            try:
                parsed_date = datetime.strptime(raw_date, "%Y-%m-%d")
                parsed_date = timezone.make_aware(parsed_date)
            except Exception:
                parsed_date = None

        Job.objects.create(
            title=listing.get("title"),
            location=listing.get("location"),
            department=listing.get("department"),
            date=parsed_date,
            description=listing.get("description"),
            link=listing.get("jobLink"),
            seniority=listing.get("seniority"),
            length=listing.get("type"),
            company=listing.get("company"),
        )

    

    print(res.data)

    return Response({"data": res.data}, status=status.HTTP_200_OK)
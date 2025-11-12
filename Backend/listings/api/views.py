from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status
from .serializers import JobSerializer
from listings.models import Job


@api_view(["GET"])
@permission_classes([AllowAny])
def getListings(request):
    jobs = Job.objects.all()
    listings = JobSerializer(jobs, many=True)
    return Response(listings.data, status=status.HTTP_200_OK)
    
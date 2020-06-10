from rest_framework.decorators import api_view
from rest_framework.response import Response
import os
from django.conf import settings

@api_view(['GET'])
def ScrapKompass(request):
    filepath=os.path.join(settings.BASE_DIR,'career\Scrapers\scrapKompass.py')
    os.system('python '+filepath)
    return Response('Done')

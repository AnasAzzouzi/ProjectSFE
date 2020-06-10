from django.urls import path
from . import views

from rest_framework.authtoken.views import obtain_auth_token



app_name='career'

urlpatterns = [
    #Field
    path('AllFields',views.AllFields,name='AllFields'),
    path('FieldById',views.FieldById,name='FieldById'),
    path('CreateField',views.CreateField,name="CreateField"),
    path('UpdateField',views.UpdateField,name="UpdateField"),
    path('DeleteField',views.DeleteField,name="DeleteField"),
    #Location
    path('AllLocations',views.AllLocations,name='AllLocations'),
    path('CreateLocation',views.CreateLocation,name='CreateLocation'),
    path('UpdateLocation',views.UpdateLocation,name='UpdateLocation'),
    path('DeleteLocation',views.DeleteLocation,name='DeleteLocation'),

    #Intern
    path('AllInterns',views.AllInterns,name='AllInterns'),
    path('InternById',views.InternById,name='InternById'),
    path('InternByField',views.InternByField,name='InternByField'),
    path('InternByLocation',views.InternByLocation,name='InternByLocation'),
    path('CreateIntern',views.CreateIntern,name='CreateIntern'),
    path('UpdateIntern',views.UpdateIntern,name='UpdateIntern'),
    path('DeleteIntern',views.DeleteIntern,name='DeleteIntern'),
    path('FilteredInterns',views.FilteredInterns,name='FilteredInterns'),
    path('GetProfilePicture',views.GetProfilePicture,name='GetProfilePicture'),


    #Recruiter
    path('AllRecruiters',views.AllRecruiters,name='AllRecruiters'),
    path('CreateRecruiter',views.CreateRecruiter,name='CreateRecruiter'),
    path('RecruiterById',views.RecruiterById,name='RecruiterById'),
    path('UpdateRecruiter',views.UpdateRecruiter,name="UpdateRecruiter"),

    #Authentication
    path('authenticateUser',views.authenticateUser.as_view(),name='authenticateUser'),

    #InternSkills
    path('AllInternSkills',views.AllInternSkills,name="AllInternSkills"),
    path('CreateInternSkill',views.CreateInternSkill,name="CreateInternSkill"),
    path('UpdateInternSkill',views.UpdateInternSkill,name="UpdateInternSkill"),
    path('DeleteInternSkill',views.DeleteInternSkill,name="DeleteInternSkill"),

    #Company

    path('CompanyByField',views.CompanyByField,name="CompanyByField"),
    path('CompanyById',views.CompanyById,name="CompanyById"),
    path('CreateCompany',views.CreateCompany,name="CreateCompany"),
    path('UpdateCompany',views.UpdateCompany,name="UpdateCompany"),
    path('GetCompanyLogo',views.GetCompanyLogo,name='GetCompanyLogo'),
    path('AllCompanies',views.AllCompanies,name='AllCompanies'),


    #OfferType
    path('AllOfferTypes',views.AllOfferTypes,name="AllOfferTypes"),
    path('CreateOfferType',views.CreateOfferType,name="CreateOfferType"),
    path('UpdateOfferType',views.UpdateOfferType,name="UpdateOfferType"),
    path('DeleteOfferType',views.DeleteOfferType,name="DeleteOfferType"),

    #InternShipOffer
    path('AllInternShipOffers',views.AllInternShipOffers,name="AllInternShipOffers"),
    path('CreateInternShipOffer',views.CreateInternShipOffer,name="CreateInternShipOffer"),
    path('UpdateInternShipOffer',views.UpdateInternShipOffer,name="UpdateInternShipOffer"),
    path('InternShipOffersFiltered',views.InternShipOffersFiltered,name="InternShipOffersFiltered"),
    path('InternShipOffersByCompany',views.InternShipOffersByCompany,name="InternShipOffersByCompany"),
    path('InternShipOfferById',views.InternShipOfferById,name="InternShipOfferById"),
    path('getDetailedOffer',views.getDetailedOffer,name="getDetailedOffer"),

    #OfferApplications
    path('CreateApplication',views.CreateApplication,name="CreateApplication"),
    path('UpdateApplication',views.UpdateApplication,name="UpdateApplication"),
    path('ApplicationById',views.ApplicationById,name="ApplicationById"),
    path('DownloadCv',views.DownloadCv,name="DownloadCv"),
    path('ApplicationsByInternShipOffer',views.ApplicationsByInternShipOffer,name="ApplicationsByInternShipOffer"),
    path('ApplicationsByIntern',views.ApplicationsByIntern,name="ApplicationsByIntern"),




    #CompanySkills
    path('CompanySkills',views.CompanySkills,name="CompanySkills"),
    path('CreateCompanySkill',views.CreateCompanySkill,name="CreateCompanySkill"),
    path('UpdateCompanySkill',views.UpdateCompanySkill,name="UpdateCompanySkill"),
    path('DeleteCompanySkill',views.DeleteCompanySkill,name="DeleteCompanySkill"),

    #Scrapers
    path('ScrapKompass',views.ScrapKompass,name="ScrapKompass"),
    
    #Admin
    path('UpdateAdmin',views.UpdateAdmin,name="UpdateAdmin"),
    path('GetAdmin',views.GetAdmin,name="GetAdmin"),









]
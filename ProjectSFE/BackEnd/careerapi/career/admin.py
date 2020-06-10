from django.contrib import admin
from .models import *
from django.contrib.auth.admin import UserAdmin
# Register your models here.

class InternSkillInline(admin.TabularInline):
    model=InternSkill
    extra=1

class InternAdmin(admin.ModelAdmin):
    fieldssets=[('Intern',{'fields':['FirstName','LastName'],'classes':['collapse']}),]
    inlines=[InternSkillInline]
admin.site.register(Intern,InternAdmin)


class CompanyInline(admin.TabularInline):
    model=Company
    extra=1

class FieldAdmin(admin.ModelAdmin):
    fieldssets=[('Field',{'fields':['Name','WebSite'],'classes':['collapse']}),]
    inlines=[CompanyInline]

admin.site.register(Field,FieldAdmin)

class RecruiterInline(admin.TabularInline):
    model=Recruiter
class CompanySkillInline(admin.TabularInline):
    model=CompanySkill


class CompanyAdmin(admin.ModelAdmin):
    inlines=[RecruiterInline,CompanySkillInline]

admin.site.register(Company,CompanyAdmin)
admin.site.register(Location)
admin.site.register(OfferType)

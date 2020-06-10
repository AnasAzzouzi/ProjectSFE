from bs4 import BeautifulSoup
from selenium import webdriver
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.support.ui import Select 
from selenium.common.exceptions import NoSuchElementException        
import time
from model import Company
import json 
import mysql.connector
from mysql.connector import Error
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as ec
from selenium.webdriver.common.action_chains import ActionChains



driver=webdriver.Chrome(ChromeDriverManager().install())
field='web'
#Getting Locations from database :

def GetLocationsData(array):
    connection = mysql.connector.connect(host='localhost',
                                         database='career_db',
                                         user='root',
                                         password='')
    try:
        cursor=connection.cursor()
        cursor.execute('select * from career_location')
        records=cursor.fetchall()
        for row in records:
            location={
                "id":row[0],
                "LocationName":row[1]
            }
            print(location)
            array.append(location)
    except Error as e:
        print(e)
    finally:
        if (connection.is_connected()):
            connection.close()
            cursor.close
def GetFieldsData(array):
    connection = mysql.connector.connect(host='localhost',
                                         database='career_db',
                                         user='root',
                                         password='')
    try:
        cursor=connection.cursor()
        cursor.execute('select * from career_field')
        records=cursor.fetchall()
        for row in records:
            field={
                "id":row[0],
                "Name":row[1]
            }
            print(field)
            array.append(field)
    except Error as e:
        print(e)
    finally:
        if (connection.is_connected()):
            connection.close()
            cursor.close

def GetCompaniesTelData(array):
    connection = mysql.connector.connect(host='localhost',
                                         database='career_db',
                                         user='root',
                                         password='')
    try:
        cursor=connection.cursor()
        cursor.execute('select Tel from career_company')
        records=cursor.fetchall()
        for row in records:
            number=row[0]
            if number!="":
                print(number)
                array.append(number)
    except Error as e:
        print(e)
    finally:
        if (connection.is_connected()):
            connection.close()
            cursor.close
def AddCompanyToDB(company):
    if company not in companiesPhoneNumbers:
        connection = mysql.connector.connect(host='localhost',
                                            database='career_db',
                                            user='root',
                                            password='')
        try:
            sql="insert into career_company(Name,WebSite,field_id,location_id,Description,Tel,Email) values(%s,%s,%s,%s,%s,%s,%s) "
            val=(company.Name,company.WebSite,company.Field,company.Location,company.Description,company.Tel,company.Email)
            cursor=connection.cursor()
            cursor.execute(sql,val)
            connection.commit()
        except Error as e:
            print(e)
        finally:
            if (connection.is_connected()):
                connection.close()
                cursor.close 
def get_links(links):
    content=BeautifulSoup(driver.page_source,'html.parser')
    companyContainers=content.findAll('div',attrs={"class":"company-container"})
    for l in companyContainers:
        link=l.find("a").attrs['href']
        links.append('https://ma.kompass.com'+link)
def getCompanyData(link,field,location,companies):
    company=Company()
    company.Field=field
    company.Location=location
    driver.get(link)
    #getName
    try:
        name=driver.find_element_by_class_name('blockNameCompany').text
        company.Name=name
    except NoSuchElementException:
        pass
    #getDescription
    try:
        description=driver.find_element_by_xpath('/html/body/main/div/div/div/div[3]/div[1]/div[1]/div/div/div').text
        company.Description=description
    except: 
        pass
    companies.append(company)
    try:
        driver.find_element_by_class_name('contactButton').click()
        time.sleep(2)
        tel=driver.find_element_by_class_name('freePhoneNumber-hiconnect').text
        company.Tel=tel
    except NoSuchElementException:
        pass
locations=[]
fields=[]
links=[]
companies=[]
companiesPhoneNumbers=[]
GetLocationsData(locations)
GetFieldsData(fields)
GetCompaniesTelData(companiesPhoneNumbers)

#Getting Company information from Kompass
for location in locations:
    for field in fields:
        driver.get('https://ma.kompass.com/searchCompanies?acClassif=&localizationCode='+location['LocationName']+'&localizationLabel='+location['LocationName']+'&localizationType=townName&text='+field['Name']+'&searchType=SUPPLIER')
        time.sleep(3)
        reps=0
        while True:
            try:
                time.sleep(7)
                get_links(links)
                time.sleep(3)
                driver.execute_script("window.scrollTo(0, 1000)") 
                time.sleep(3)
                if reps==0:
                    button = driver.find_element_by_xpath('/html/body/main/div/div[2]/div/div/div[1]/button')
                    button.click()
                time.sleep(3)
                if reps==0:
                    nxt=driver.find_element_by_class_name('paginatorDivId').find_element_by_class_name('flaticon')
                else:
                    nxt=driver.find_element_by_class_name('paginatorDivId').find_elements_by_class_name('flaticon')[1]
                nxt.click()
                reps=reps+1
            except NoSuchElementException:
                break
            except:
                break

        for link in links:
            getCompanyData(link,field['id'],location['id'],companies)

#storing Data in Data Base
for company in companies:
    AddCompanyToDB(company)











class Company :
    def __init__(self,Name="",Email="",WebSite="",Field=None,Location=None,Description="",Tel=""):
        self.Name=Name
        self.WebSite=WebSite
        self.Field=Field
        self.Location=Location
        self.Description=Description
        self.Tel=Tel
        self.Email=Email
    def __str__(self):
        return self.name+" field : "+self.field+"link :"+self.link+"location :"+self.location
    def __cmp_(self,other):
        if self.link==other.link:
            return 0
        else:
            return 1

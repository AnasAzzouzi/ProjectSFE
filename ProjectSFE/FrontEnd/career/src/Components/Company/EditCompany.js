import React,{Component} from 'react'
import { Form, FormGroup, FormControl ,Button, Row,Col} from 'react-bootstrap'
import axios from 'axios'
import DisplayProfilePic from '../Intern/DisplayProfilePic'
class EditCompany extends Component{
    state={
        idCompany:null,
        company:{},
        fields:[],
        locations:[]
    }
    async componentDidMount(){

        axios.get("http://127.0.0.1:8000/career/AllFields").then((res)=>this.setState({fields:res.data}))
        axios.get("http://127.0.0.1:8000/career/AllLocations").then((res)=>this.setState({locations:res.data}))
        if(new URLSearchParams(this.props.location.search).get('id')!==undefined){
        var id = new URLSearchParams(this.props.location.search).get('id')

        await axios.get('http://127.0.0.1:8000/career/CompanyById?id='+id).then(res=>this.setState({company:res.data}))
           document.getElementById('Name').value=this.state.company.Name
           document.getElementById('WebSite').value=this.state.company.WebSite
           document.getElementById('Email').value=this.state.company.Email
           document.getElementById('field').value=this.state.company.field
           document.getElementById('location').value=this.state.company.location

           document.getElementById('Tel').value=this.state.company.Tel
           document.getElementById('Description').value=this.state.company.Description
           document.getElementById('SaveButton').innerHTML="Save Changes"
        }

    }
    async componentWillReceiveProps({idCompany}){
        await this.setState({idCompany:idCompany})

        console.log(this.state.idCompany)

        if(this.state.idCompany!==null  ){
           await axios.get('http://127.0.0.1:8000/career/CompanyById?id='+idCompany).then(res=>this.setState({company:res.data}))
           document.getElementById('Name').value=this.state.company.Name
           document.getElementById('WebSite').value=this.state.company.WebSite
           document.getElementById('Email').value=this.state.company.Email
           document.getElementById('field').value=this.state.company.field
           document.getElementById('location').value=this.state.company.location

           document.getElementById('Tel').value=this.state.company.Tel
           document.getElementById('Description').value=this.state.company.Description
           document.getElementById('SaveButton').innerHTML="Save Changes"
            
        }
        else{
            document.getElementById('SaveButton').innerHTML="Save"
        }

    }
    async onFormSubmit(e){
        var formData=new FormData();
        formData.append('id',this.state.company.id)
        formData.append('Name',this.state.company.Name)
        formData.append('WebSite',this.state.company.WebSite)
        formData.append('Email',this.state.company.Email)
        formData.append('Tel',this.state.company.Tel)
        formData.append('Description',this.state.company.Description)
        formData.append('localion',this.state.company.location)
        formData.append('field',this.state.company.field)
        
        if(e.target.name=='saveImage'){
            formData.append('CompanyLogo',this.state.company.CompanyLogo) 
            }

        e.preventDefault()
        if(this.state.idCompany!==null){
            axios.post("http://127.0.0.1:8000/career/UpdateCompany",formData,{
            headers:{
                'Content-Type':'multipart/form-data',
                'Authorization':'token '+localStorage.getItem('token')
            }

            }).then(res=>this.setState({idComapny:res.data}))
        }
        else{
           await  axios.post("http://127.0.0.1:8000/career/CreateCompany",formData,{
            headers:{
                'Content-Type':'multipart/form-data',
                'Authorization':'token '+localStorage.getItem('token')
            }

            }).then((res)=>{
                
                if(this.props.associateCompanyToRecruiter!==undefined){
                this.props.associateCompanyToRecruiter(res.data)}
                
                   document.location.reload()
                
            }
            
                
                )
            
        }
        

    }
    onTexteChange(e){
        e.preventDefault()
        const company={...this.state.company,[e.target.name]:e.target.value}
        if(e.target.name==="CompanyLogo"){
            
            company.CompanyLogo=e.target.files[0] 
        }
        this.setState(()=>({company}))
    }
    render(){

        return (

            <div style={{padding:"20%",paddingTop:"2%"}}>
                <DisplayProfilePic company={this.state.company}/>
            <Form name='saveImage' onSubmit={(e)=>this.onFormSubmit(e)}>
                    <FormGroup>
                        <Form.Control type="file" id="Image" name="Image"  required onChange ={(e)=>this.onTextChange(e)}/>        
                    </FormGroup>
                    <FormGroup >
                        <Button type="submit" size="lg" block  variant="info" id="saveImage">Save Image</Button>
                    </FormGroup>
            </Form>
                <Form onSubmit={(e)=>{this.onFormSubmit(e)}}>

                    <h3>Edit Your Company</h3>
                    
                    
                    <FormGroup>
                        <FormControl type="text" id="Name" name ="Name" onChange={(e)=>this.onTexteChange(e)}placeholder="Name"/>
                    </FormGroup>
                    <FormGroup>
                        <FormControl type="text" id="WebSite" name="WebSite" onChange={(e)=>this.onTexteChange(e)}  placeholder="WebSite"/>
                    </FormGroup>
                    <FormGroup>
                        <FormControl as="select" id="field" name="field" onChange={(e)=>this.onTexteChange(e)}>

                            <option value={null}>...</option>
                            {this.state.fields.map((field)=>
                            <option value={field.id}>{field.Name}</option>
                            )}

                        </FormControl>
                    </FormGroup>
                    <FormGroup>
                        <FormControl as="select" id="location" name="location" onChange={(e)=>this.onTexteChange(e)}>

                            <option value={null}>...</option>
                            {this.state.locations.map((location)=>
                            <option value={location.id}>{location.LocationName}</option>
                            )}

                        </FormControl>
                    </FormGroup>
                    <FormGroup>
                        <FormControl type="email" id="Email" name="Email" onChange={(e)=>this.onTexteChange(e)} placeholder="Email"/>
                    </FormGroup>
                    <FormGroup>
                        <FormControl type="text" id="Tel" name="Tel" onChange={(e)=>this.onTexteChange(e)} placeholder="Tel"/>
                    </FormGroup>
                    <FormGroup>
                        <Form.Control as="textarea" id="Description" name="Description" onChange={(e)=>this.onTexteChange(e)} placeholder="Description"/>
                    </FormGroup>
                    <FormGroup controlId="RegisterButton">
                            <Button type="submit" size="lg" block  variant="info" id="SaveButton">SaveButton</Button>
                    </FormGroup>

                </Form>
            </div>
        );
    }

}
export default EditCompany
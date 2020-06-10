import React,{Component} from 'react'

import {Button, Form, FormGroup,FormControl} from 'react-bootstrap'
import axios from 'axios'

class EditIntern extends Component{
    state={
        intern:{},
        fields:[],
        locations:[]
    }
    async componentWillReceiveProps({intern}){
           await this.setState({intern:intern})
           await axios.get('http://127.0.0.1:8000/career/AllFields').then((res)=>this.setState({fields:res.data}))
            await axios.get('http://127.0.0.1:8000/career/AllLocations').then((res)=>this.setState({locations:res.data}))
            document.getElementById('FirstName').value=this.state.intern.FirstName
            document.getElementById('LastName').value=this.state.intern.LastName
            document.getElementById('Email').value=this.state.intern.Email
            document.getElementById('Tel').value=this.state.intern.Tel
            document.getElementById('field').value=this.state.intern.field
            document.getElementById('location').value=this.state.intern.location
           
        
    }
    async onTextChange(e){

        
        const intern = { ...this.state.intern, [e.target.name]: e.target.value }
        intern.Password=this.state.intern.Password
        if(e.target.name==="Image"){
            
            intern.Image=e.target.files[0] 
        }
        await this.setState(() => ({ intern }))
    }
    onFormSubmit(e,src){
        e.preventDefault()
        console.log(this.state.intern)
        var formData=new FormData();
        
       
        formData.append('id',this.state.intern.id)
        formData.append('FirstName',this.state.intern.FirstName)
        formData.append('LastName',this.state.intern.LastName)
        formData.append('Email',this.state.intern.Email)
        formData.append('Password',this.state.intern.Password)
        formData.append('Gender',this.state.intern.Gender)
        formData.append('BirthDate',this.state.intern.BirthDate)
        formData.append('Tel',this.state.intern.Tel)
        formData.append('location',this.state.intern.location)
        formData.append('field',this.state.intern.field)
        if(e.target.name=='saveImage'){
            formData.append('Image',this.state.intern.Image) 
            }
            
                axios.post('http://127.0.0.1:8000/career/UpdateIntern',formData,
                {
                    headers: {
                        'Content-Type':'multipart/form-data',
                        'Authorization':'token '+localStorage.getItem('token')
                    }
                }
                ).then(res=>console.log(res.data)).then(()=>window.location.reload(false))
    
            
    }
    render(){
        
        return(
            <div>
            <Form name='saveImage' onSubmit={(e)=>this.onFormSubmit(e)}>
                    <FormGroup>
                        <Form.Control type="file" id="Image" name="Image"  required onChange ={(e)=>this.onTextChange(e)}/>        
                    </FormGroup>
                    <FormGroup >
                        <Button type="submit" size="lg" block  variant="info" id="saveImage">Save Image</Button>
                    </FormGroup>
            </Form>

            <Form onSubmit={(e)=>this.onFormSubmit(e)}>
                            <div >
                                
                                <FormGroup>
                                    <Form.Control type="text" id="FirstName" name="FirstName" onChange ={(e)=>this.onTextChange(e)}placeholder="Enter Your First Name"/>
                                </FormGroup>
                                
                                <FormGroup >                        
                                    <Form.Control type="text" id="LastName" name="LastName" placeholder="Enter Your Last Name" onChange ={(e)=>this.onTextChange(e)}/>
                                </FormGroup>
                                <FormGroup>
                                    <Form.Control type="date" id="BirthDate" name="BirthDate" onChange ={(e)=>this.onTextChange(e)}placeholder="Enter Your First Name"/>
                                </FormGroup>
                                <FormGroup >
                                    <FormControl as="select"  id="field" name="field" onChange ={(e)=>this.onTextChange(e)}>
                                        <option value={0}>...</option>
                                    {this.state.fields.map((field)=>

                                            <option value={field.id}>{field.Name}</option>

                                        )}
                                    </FormControl>
                                </FormGroup>
                                <FormGroup>
                                    <FormControl as="select" id="location" name="location" onChange={(e)=>this.onTextChange(e)}>

                                        <option value={null}>...</option>
                                        {this.state.locations.map((location)=>
                                        <option value={location.id}>{location.LocationName}</option>
                                        )}

                                    </FormControl>
                                </FormGroup>
                                <FormGroup >
                                    <Form.Control type="Email" id="Email" name="Email" onChange ={(e)=>this.onTextChange(e)} placeholder="Enter Your Email" />
                                </FormGroup>
                                <FormGroup >
                                    <Form.Control type="text" id="Tel" name="Tel" onChange ={(e)=>this.onTextChange(e)} placeholder="Enter Your Phone Number" />
                                </FormGroup>
                                <FormGroup >
                                    <Button type="submit" size="lg" block  variant="info">Save Changes</Button>
                                </FormGroup>
                            </div>
                            </Form>
        </div>);

    }
}
export default EditIntern
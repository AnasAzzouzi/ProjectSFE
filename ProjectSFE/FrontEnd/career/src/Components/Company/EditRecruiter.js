import React,{Component} from 'react'
import axios from 'axios'
import {Button, Form, FormGroup,Row,Col,FormControl,Tabs,Tab,ListGroup,ListGroupItem} from 'react-bootstrap'


class EditRecruiter extends Component{

    state={

        recruiter:{}
    }
    async componentWillReceiveProps({recruiter}){
        await this.setState({recruiter:{...recruiter}})
        document.getElementById('FirstName').value=this.state.recruiter.FirstName
        document.getElementById('LastName').value=this.state.recruiter.LastName
        document.getElementById('Email').value=this.state.recruiter.Email
     
 }
    async onTextChange(e){
        const recruiter={...this.state.recruiter,[e.target.name]:e.target.value}
        recruiter.Password=this.state.recruiter.Password
        await this.setState(()=>({recruiter}))
    }
    onFormSubmit(e){
        e.preventDefault()
        axios.post('http://127.0.0.1:8000/career/UpdateRecruiter',
        {
        headers:{
            'Authorization':'token '+localStorage.getItem('token')
        }
    },this.state.recruiter).then(res=>console.log(res.data)).then(()=>window.location.reload(false))
    }

    render(){

        return(
            <div>            
                <Form onSubmit={(e)=>this.onFormSubmit(e)}>
            <div >
    
                <FormGroup>
                    <Form.Control type="text" id="FirstName" name="FirstName" onChange ={(e)=>this.onTextChange(e)}placeholder="Enter Your First Name"/>
                </FormGroup>
                <FormGroup >                        
                    <Form.Control type="text" id="LastName" name="LastName" placeholder="Enter Your Last Name" onChange ={(e)=>this.onTextChange(e)}/>
                </FormGroup>
                
                <FormGroup >
                    <Form.Control type="Email" id="Email" name="Email" onChange ={(e)=>this.onTextChange(e)} placeholder="Enter Your Email" />
                </FormGroup>
                <FormGroup >
                    <Button type="submit" size="lg" block  variant="info">Save Changes</Button>
                </FormGroup>
            </div>
            </Form> 
            </div>
        );

    }
}
export default EditRecruiter
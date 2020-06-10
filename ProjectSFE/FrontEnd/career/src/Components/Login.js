import React,{Component} from 'react'
import {Button, Form, FormGroup,Row,FormControl, Col} from 'react-bootstrap'
import axios from 'axios'
class Login extends Component{
    state={
        email:"",
        password:""
    }
    onTextChange(e){
        this.setState({[e.target.name]:e.target.value})
    }
    onFormSubmit(e){
        e.preventDefault()
        var formData= new FormData()
        formData.append('username',this.state.email)
        formData.append('password',this.state.password)
        axios.post("http://127.0.0.1:8000/career/authenticateUser",formData).then(res=>{
        localStorage.setItem("userid",res.data.id);
        window.localStorage.setItem('token',res.data.token)
            if(res.data.is_intern==true){
               
                window.location.replace('./Intern')

                console.log(res)
            }
            if(res.data.is_recruiter==true){
                window.location.replace('./Recruiter')
            }
            if(res.data.is_admin==true){
                window.location.replace('./Admin')

            }
        })

    }
    render(){

        return(
            <div>{/*
            <div  >
                
            </div>*/}
            
                    

                            <Form onSubmit={(e)=>this.onFormSubmit(e)}>
                                <div style={{ width: '20rem'},{align:'center',margin:'2%'}}>
                                    <Row>
                                <Col>
                                    <FormGroup controlId="Email">
                                        <Form.Control type="Email" name="email" required onChange={(e)=>{this.onTextChange(e)}} placeholder="Enter Your Email"/>
                                    </FormGroup>
                                </Col>
                                <Col>
                                    <FormGroup >
                                        <Form.Control type="Password" id="pw1"  name="password" placeholder="Enter Your Password" required onChange={(e)=>{this.onTextChange(e)}}/>
                                    </FormGroup>
                                </Col>
                                <Col>   
                                    <FormGroup controlId="LoginButton">
                                        <Button type="submit" size="md" block  variant="info">Login</Button>
                                    </FormGroup>
                                </Col>
                                </Row>
                                </div>
                            </Form>
                    
            
    </div>  
        );

    }

}
export default Login
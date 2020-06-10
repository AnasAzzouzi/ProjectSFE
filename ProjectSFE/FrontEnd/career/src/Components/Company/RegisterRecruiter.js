import React,{Component} from 'react'
import {Button, Form, FormGroup,Row,FormControl} from 'react-bootstrap'
import axios from 'axios'
class RegisterRecruiter extends Component{
    state={}
    onTextChange(e){
        this.setState({[e.target.name]:e.target.value})
    }
    onFormSubmit(e){
        e.preventDefault()
        var pw1=document.getElementById('pw1RR').value
        var pw2=document.getElementById('pw2RR').value
        if (pw1!==pw2){
            alert('Un Identical passwords')
            return
        }
        else{
            var recruiter={
                FirstName:this.state.FirstName,
                LastName:this.state.LastName,
                Gender:this.state.Gender,
                Email:this.state.Email,
                Password:this.state.Password,
                company:this.state.field
            }
            axios.post('http://127.0.0.1:8000/career/CreateRecruiter',recruiter).then(res=>{console.log(res.data)
            localStorage.setItem("userid",res.data.id);
            window.localStorage.setItem('token',res.data.token)
            window.location.replace('./Recruiter')
        })
        }
    }
    render(){
        return(
            <div>

         
                <div class="col-md-8 mx-auto" style={{border:'solid 2px #27496d',borderRadius:'20px',padding:'1%',margin:'1%'}}>
                        <h1 class="wv-heading--title" style={{color:'#27496d'}}>
                                 Recruiter Registration
                        </h1>
                </div>
         
         <Row>
             
        <div class="col-md-8 mx-auto">
            
            <Form onSubmit={(e)=>this.onFormSubmit(e)}>
                <div style={{ width: '20rem'},{align:'center'}}>
                    
                        <FormGroup controlId="FirstName">
                            <Form.Control type="text" name="FirstName" placeholder="Enter Your First Name" onChange ={(e)=>this.onTextChange(e)}/>
                        </FormGroup>
                        <FormGroup controlId="LastName">                        
                            <Form.Control type="text" name="LastName" placeholder="Enter Your Last Name" onChange ={(e)=>this.onTextChange(e)} />
                        </FormGroup>
                        <FormGroup controlId="Email">
                            <Form.Control type="Email" name="Email" onChange ={(e)=>this.onTextChange(e)} placeholder="Enter Your Email" required/>
                        </FormGroup>
                        <FormGroup controlId="Password">
                            <Form.Control type="Password" id="pw1RR" name="Password" onChange ={(e)=>this.onTextChange(e)} name="Password" placeholder="Enter Your Password" required/>
                        </FormGroup>
                        <FormGroup controlId="ConfirmPassword">
                            <Form.Control type="password" id="pw2RR" placeholder="Confirm Your Password" required/>
                        </FormGroup>
                        <FormGroup controlId="RegisterButton">
                            <Button type="submit" size="lg" block  variant="info">Resgister</Button>
                         </FormGroup>
                    
                </div>
            </Form>
        </div>
    </Row>
      </div>  
        );
    }
}
export default RegisterRecruiter
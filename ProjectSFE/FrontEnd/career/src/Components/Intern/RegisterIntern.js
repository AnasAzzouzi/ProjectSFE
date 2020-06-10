import React,{Component} from 'react'
import {Button, Form, FormGroup,Row,FormControl} from 'react-bootstrap'
import axios from 'axios'
class RegisterIntern extends Component{
    state={
        fields:[]
    }
    onTextChange(e){
        this.setState({[e.target.name]:e.target.value})
    }
    onFormSubmit(e){
        e.preventDefault()
        var pw1=document.getElementById('pw1RI').value
        var pw2=document.getElementById('pw2RI').value
        if (pw1!==pw2){
            alert('UnIdentical passwords')
            return
        }
        else{
            var intern={
                FirstName:this.state.FirstName,
                LastName:this.state.LastName,
                Gender:this.state.Gender,
                Email:this.state.Email,
                Password:this.state.Password,
                field:this.state.field
            }
            axios.post('http://127.0.0.1:8000/career/CreateIntern',intern).then(res=>{console.log(res.data)
            localStorage.setItem("userid",res.data.id);
            window.localStorage.setItem('token',res.data.token)
            window.location.replace('./Intern')
        })
        }
    }
    componentDidMount(){
        axios.get('http://127.0.0.1:8000/career/AllFields').then(res=>this.setState({fields:res.data}))
    }
    render(){
        return(
            <div>
                <div class="col-md-8 mx-auto" style={{border:'solid 2px #00909e',borderRadius:'20px',padding:'1%',margin:'1%'}}>
                        <h1 class="wv-heading--title" style={{color:'#00909e'}}>
                                 Intern Registration
                        </h1>
                </div>
         
         <Row>
             
        <div class="col-md-8 mx-auto">
            
            <Form onSubmit={(e)=>this.onFormSubmit(e)}>
                <div style={{align:'center'}}>
                    
                        <FormGroup controlId="FirstName">
                            <Form.Control type="text" name="FirstName" onChange ={(e)=>this.onTextChange(e)}placeholder="Enter Your First Name"/>
                        </FormGroup>
                        <FormGroup controlId="LastName">                        
                            <Form.Control type="text" name="LastName" placeholder="Enter Your Last Name" onChange ={(e)=>this.onTextChange(e)}/>
                        </FormGroup>
                        <FormGroup controlId="Gender">
                            <Form.Check type="radio" name="Gender" value="Female" onChange ={(e)=>this.onTextChange(e)} /> Female 
                            <Form.Check type="radio" name="Gender" value="Male" onChange ={(e)=>this.onTextChange(e)}/> Male

                        </FormGroup>
                        <FormGroup controleId="Field">
                            <FormControl as="select"  name="field" onChange ={(e)=>this.onTextChange(e)} required>
                               
                            {this.state.fields.map((field)=>

                                <option value={field.id}>{field.Name}</option>

                            )}
                            </FormControl>

                        </FormGroup>
                        <FormGroup controlId="Email">
                            <Form.Control type="Email" name="Email" onChange ={(e)=>this.onTextChange(e)} placeholder="Enter Your Email" required/>
                        </FormGroup>
                        <FormGroup controlId="Password">
                            <Form.Control type="Password" id="pw1RI" name="Password" onChange ={(e)=>this.onTextChange(e)} name="Password" placeholder="Enter Your Password" required/>
                        </FormGroup>
                        <FormGroup controlId="ConfirmPassword">
                            <Form.Control type="password" id="pw2RI" placeholder="Confirm Your Password" required/>
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
export default RegisterIntern
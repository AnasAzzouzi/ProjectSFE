import React,{Component} from 'react'

import {Button, Form, FormGroup,Row,Col,FormControl,Tabs,Tab,ListGroup,ListGroupItem} from 'react-bootstrap'
import axios from 'axios'

class PasswordChange extends Component{

state={

    intern:{}
}
    async componentWillReceiveProps({intern}){
        await this.setState({intern:intern})
        console.log(this.state)
    }
    async onFormSubmit(e){
        
        e.preventDefault()
        
        var NewPass=document.getElementById('Npw').value
        var ConfNpw=document.getElementById('ConfNpw').value
        if(NewPass!==ConfNpw){
            document.getElementById('Error').innerHTML="The Two Passwords aren't identical"
        }
        else{
            const intern = { ...this.state.intern }
            intern.Password=NewPass
            await this.setState(() => ({ intern }))
            console.log(this.state.intern)
            axios.post('http://127.0.0.1:8000/career/UpdateIntern',
            {
            headers:{
                'Authorization':'token '+localStorage.getItem('token')
            }
        },this.state.intern).then(res=>console.log(res.data)).then(()=>window.location.reload(false))

        }
    }
    render(){


        return(
            <div onSubmit={(e)=>this.onFormSubmit(e)}>
                <Form>  <FormGroup >
                            <Form.Control type="Password" id="Opw" name="OldPassword" name="OldPassword" placeholder="Old Password" required/>
                        </FormGroup>
                        
                        <FormGroup >
                            <Form.Control type="password" id="Npw" name="NewPassword" placeholder="New Your Password" required/>
                        </FormGroup>
                        <FormGroup >
                            <Form.Control type="password" id="ConfNpw" placeholder="Confirm New Your Password" required/>
                        </FormGroup>
                        <p id="Error"> </p>
                        <Button type="submit">Change</Button>
                </Form>
                      
            </div>
        );
    }

}
export default PasswordChange
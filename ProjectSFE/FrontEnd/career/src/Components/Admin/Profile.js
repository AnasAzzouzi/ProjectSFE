import React,{Component} from 'react'
import axios from 'axios'
import {Row, Col,Form, FormGroup, Button,FormControl} from 'react-bootstrap'

class Profile extends Component{
state={
    admin:{}
}
async onTextChange(e){

        
    var admin = { ...this.state.admin, [e.target.name]: e.target.value }
    await this.setState(() => ({ admin }))
}
async componentDidMount(){
    await axios.get("http://127.0.0.1:8000/career/GetAdmin?id="+localStorage.getItem('userid'),
    {
    headers:{
        'Authorization':'token '+localStorage.getItem('token')
    }
}).then((res)=>this.setState({admin:res.data}))
    document.getElementById('first_name').value=this.state.admin.first_name
    document.getElementById('last_name').value=this.state.admin.last_name
    document.getElementById('email').value=this.state.admin.email


}
async onEditPasswordFormSubmit(e){
    if(document.getElementById('password').value===document.getElementById('pw2').value){
        var admin = { ...this.state.admin, password: document.getElementById('password').value }
        await this.setState(() => ({ admin }))
        axios.post("http://127.0.0.1:8000/career/UpdateAdminPassword",
        {
        headers:{
            'Authorization':'token '+localStorage.getItem('token')
        }
    },this.state.admin).then(()=>window.location.reload(false))

    }
    else{
        alert(' Un-Identical passwords')
            return
        }
}
async onEditFormSubmit(e){
    e.preventDefault()    
    axios.post("http://127.0.0.1:8000/career/UpdateAdmin",
    {
    headers:{
        'Authorization':'token '+localStorage.getItem('token')
    }
},this.state.admin).then(()=>window.location.reload(false))
}
onEditClick(){
    document.getElementById('editForm').classList.toggle('collapse')
}
onPWClick(){
    document.getElementById('PWForm').classList.toggle('collapse')
}
render(){
    return(


        <div style={{padding:"7%"}}>
                                        <Row>
                                            <div class="col-md-12">
                                                <div class="profile-head" style={{padding:"auto"}}>
                                                    
                                                    <div style={{border:'solid 2px #00909e',borderRadius:'20px',padding:'20px',margin:'30px'}}>
                                                       
                                                        <h2>{this.state.admin.first_name} {this.state.admin.last_name}</h2>
                                                        <h3>{this.state.admin.email}</h3>                                                                   
                                                    </div>
                                                    
                                                </div>
                                            </div>
                                        </Row>
                                        <Row style={{margin:"7%"}}>
                                            <Col>
                                                <Button variant="info" onClick={()=>this.onEditClick()}>
                                                    Edit  Profile
                                                </Button>
                                            </Col>
                                        </Row>
                                        <div id="editForm" class="collapse">
                                        <Form onSubmit={(e)=>this.onEditFormSubmit(e)}>
                                            <FormGroup>
                                                <FormControl type="text" id="first_name" name="first_name" onChange ={(e)=>this.onTextChange(e)} />  
                                            </FormGroup>
                                            <FormGroup>
                                                <FormControl type="text" id="last_name" name="last_name" onChange ={(e)=>this.onTextChange(e)}/>  
                                            </FormGroup>
                                            <FormGroup>
                                                <FormControl type="text" id="email" name="email" onChange ={(e)=>this.onTextChange(e)}/>  
                                            </FormGroup>    
                                            <FormGroup >
                                                <Button type="submit" size="lg" block  variant="info">Save Changes</Button>
                                            </FormGroup>
                                         </Form>  
                                         </div> 
                                         <Row style={{margin:"7%"}}>
                                            <Col>
                                                <Button variant="info" onClick={()=>this.onPWClick()}>
                                                    Edit  PassWord
                                                </Button>
                                            </Col>
                                        </Row>  
                                        <div id="PWForm" class="collapse">
                                        <Form name="editPassword" onSubmit={(e)=>this.onEditPasswordFormSubmit(e)}>
                                            <FormGroup>
                                                <FormControl type="password" id="password" name="password"  />  
                                            </FormGroup>
                                            <FormGroup>
                                                <FormControl type="password" id="pw2" name="pw2" />  
                                            </FormGroup>  
                                            <FormGroup >
                                                <Button type="submit" size="lg" block  variant="info">Save Changes</Button>
                                            </FormGroup>
                                         </Form>  
                                         </div>                                                                     
        </div>
    );

}

}
export default Profile



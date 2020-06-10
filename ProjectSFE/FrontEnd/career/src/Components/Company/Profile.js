import React,{Component} from 'react'
import axios from 'axios'
import {Row} from 'react-bootstrap'
import RecruiterProfile from './RecruiterProfile'
import EditRecruiter from './EditRecruiter'
import PasswordChange from './PasswordChange'

class Profile extends Component{
    state={

        recruiter:{}
    }

componentWillReceiveProps({recruiter}){
    this.setState({recruiter:recruiter})
    console.log(this.state)
}

onEditPersonalDataClick(e){
    e.preventDefault()
    document.getElementById('EditPersonalData').classList.toggle('collapse')
}
onEditSkillsClick(e){
    e.preventDefault()
    document.getElementById('EditSkills').classList.toggle('collapse')
}
onPasswordChangeClick(e){
    e.preventDefault()
    document.getElementById('PasswordChange').classList.toggle('collapse')
}
    render(){


        
        return (


            
                <div class='back'>
                <div class="container emp-profile" style={{margin:"100px"}}>
            
                <Row>
                    <div class="col-md-12">
                        <div class="profile-head" style={{padding:"auto"}}>
                            <div style={{border:'solid 2px #00909e',borderRadius:'20px',padding:'20px',margin:'30px'}}>
                                <h1>{this.state.recruiter.FirstName} {this.state.recruiter.LastName}</h1>
                            </div>
                            
                        </div>
                    </div>
                   
                    </Row>
                    <Row>
                        <div class="col-md-12">
                        <a href="">Profile</a>
                        <div id="ProfileData">
                        <RecruiterProfile recruiter={this.state.recruiter}/>
                        </div>
                        </div>
                    </Row>
                    <Row >
                        <div class="col-md-12" style={{margin:"30px"}}>
                        <a href="" onClick={(e)=>this.onEditPersonalDataClick(e)}>Edit Profile</a>
                        <div id="EditPersonalData"  class="collapse" >
                        <EditRecruiter recruiter={this.state.recruiter}/>
                        </div>    
                        </div>
                     </Row>
                    
                     <Row > 
                     <div class="col-md-12" style={{margin:"30px"}}>         
                        <a href=""  onClick={(e)=>this.onPasswordChangeClick(e)}>Change Your Password</a>
                        <div id="PasswordChange" class="collapse">
                        <PasswordChange recruiter={this.state.recruiter} />
                        </div>
                     </div>
                    </Row> 
                    

                     
                                   
        </div>

            </div>
        );
    }
}
export default Profile


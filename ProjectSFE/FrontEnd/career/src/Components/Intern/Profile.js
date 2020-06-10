import React,{Component} from 'react'
import {Row} from 'react-bootstrap'
import axios from 'axios'
import EditIntern from './EditIntern'
import EditSkills from './EditSkills'
import PasswordChange from './PasswordChange'
import InternProfile from './InternProfile'
class Profile extends Component{
    state={
        fields:[],
        intern:{},
        internSkills:[],
        img:null
    }
    async componentWillReceiveProps({intern}){
       await this.setState({intern:intern,internSkills:intern.internSkills})
       
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
        return(
            <div class='back'>
                
                <div class="container emp-profile" style={{margin:"5%"}}>
                
                    <Row>
                        <div class="col-md-12">
                        <div id="ProfileData">
                        <InternProfile intern={this.state.intern}/>                                       
                        </div>
                        </div>
                    </Row>
                    
                    <Row >
                        <div class="col-md-12" style={{margin:"30px"}}>
                        <a href="" onClick={(e)=>this.onEditPersonalDataClick(e)}>Edit Profile</a>
                        <div id="EditPersonalData"  class="collapse" >
                        <EditIntern  intern={this.state.intern}/>
                        </div>    
                        </div>
                     </Row>
                    
                     <Row > 
                     <div class="col-md-12" style={{margin:"30px"}}>         
                        <a href=""  onClick={(e)=>this.onPasswordChangeClick(e)}>Change Your Password</a>
                        <div id="PasswordChange" class="collapse">
                        <PasswordChange  intern={this.state.intern} />
                        </div>
                     </div>
                    </Row> 
                    
                     <Row > 
                     <div class="col-md-12" style={{margin:"30px"}}>         
                        <a href=""  onClick={(e)=>this.onEditSkillsClick(e)}>Edit Skills</a>
                        <div id="EditSkills" class="collapse">
                        <EditSkills intern={this.state.intern} internId={this.state.intern.id} internSkills={this.state.internSkills}/>
                        </div>
                     </div>
                    </Row> 

                     
                                   
        </div>
                
            </div>  
      );
    }
}
export default Profile
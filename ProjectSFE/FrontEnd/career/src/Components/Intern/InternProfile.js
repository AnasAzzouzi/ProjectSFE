import React,{Component} from 'react'
import {Row} from 'react-bootstrap'
import DisplayProfilePic from './DisplayProfilePic'
import axios from 'axios'
class InternProfile extends Component{
state={
    intern:{},
    internSkills:[
    ]
}
    async componentWillReceiveProps({intern}){ 
        //console.log(intern)
    await  this.setState({intern:intern})
    await axios.get('http://127.0.0.1:8000/career/AllInternSkills?id='+intern.id,{
        headers:{
            'Authorization':'token '+localStorage.getItem('token')
        }
        }).then(res=>this.setState({internSkills:res.data}))

    }
    render(){
       
        return(
            <div style={{margin:"2%"}}>
                                        <Row>
                                            <div class="col-md-12">
                                                <div class="profile-head" style={{padding:"auto"}}>
                                                    
                                                    <div style={{border:'solid 2px #00909e',borderRadius:'20px',padding:'20px',margin:'30px'}}>
                                                       {
                                                        <DisplayProfilePic intern={this.state.intern}/>}
                                                        <h2>{this.state.intern.FirstName} {this.state.intern.LastName}</h2>
                                                        <h3>{this.state.intern.Email}</h3>
                                                        <h4>{this.state.intern.Tel}</h4>
                                                           {
                                                            this.state.internSkills.map((obj)=><span style={{margin:'5px' ,padding:'4px', borderRadius:'5px' ,backgroundColor:"#aacfcf"}}>{obj.SkillTitle}</span>)
                                                           }
                                                           
                                                           
                                                            
                                                    </div>
                                                    
                                                </div>
                                            </div>
                                                    </Row>                                                                         
            </div>
        );
    }

}
export default InternProfile
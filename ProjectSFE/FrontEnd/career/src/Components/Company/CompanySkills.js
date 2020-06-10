import React,{Component} from 'react'
import {Button, Form, FormGroup,Row,Col} from 'react-bootstrap'
import axios from 'axios';


class CompanySkills extends Component{
        state={
            companyId:0,
            skills:[],
            skill:''
        }
        async componentWillReceiveProps({companyId}){
            await this.setState({companyId:companyId})
            axios.get("http://127.0.0.1:8000/career/CompanySkills?CompanyId="+companyId).then((res)=>this.setState({skills:res.data}))
        }
        onTextChange(e){
            this.setState({skill:e.target.value})
            
        }
        onAddClick(){
            if(document.getElementById('addButton').innerHTML=="Add"){
                var skill={
                    SkillTitle:this.state.skill,
                    company:this.state.companyId
                }
                axios.post("http://127.0.0.1:8000/career/CreateCompanySkill",
                {
                headers:{
                    'Authorization':'token '+localStorage.getItem('token')
                }
            },skill).then((res)=>console.log(res.data)).then(()=>window.location.reload(false))

            }
            else{
                var skill={
                    id:this.state.skillId,
                    SkillTitle:this.state.skill,
                    company:this.state.companyId

                }
                axios.post("http://127.0.0.1:8000/career/UpdateCompanySkill",
                {
                headers:{
                    'Authorization':'token '+localStorage.getItem('token')
                }
            },skill).then((res)=>console.log(res.data)).then(()=>window.location.reload(false))
                document.getElementById('Skill').value=""
                document.getElementById('addButton').innerHTML="Add"

            }
            console.log(skill)
        }
        onEditClick(e,skill){
            e.preventDefault()
            console.log(skill.id)
            this.setState({skillId:skill.id})
            document.getElementById('Skill').value=skill.SkillTitle
            document.getElementById('addButton').innerHTML="Save Change"

        }
        onDeleteClick(e,skill){
            e.preventDefault()
            
            var id=skill.id
            axios.delete("http://127.0.0.1:8000/career/DeleteCompanySkill?id="+id,
            {
            headers:{
                'Authorization':'token '+localStorage.getItem('token')
            }
        }).then((res)=>console.log(res.data)).then(()=>window.location.reload(false))
        
        }
        render(){

        return(
            <div style={{padding:"10%"}}>

<Form  onSubmit={(e)=>this.onFormSubmit(e)}>
                                            <div>
                                    
                                                <FormGroup >
                                                    <Form.Control type="text"id="Skill" name="Skill" onChange ={(e)=>this.onTextChange(e)} placeholder="Add A New Skill"/>
                                                </FormGroup>
                                                <FormGroup >
                                                <Button id="addButton"  size="lg" block  variant="info" onClick={()=>this.onAddClick()} >Add</Button>
                                                </FormGroup>
                                                 
                                                {this.state.skills.map((skill)=>
                                                <Row style={{margin:"20px"}}>
                                                    
                                                    <Col>
                                                    {skill.SkillTitle}
                                                    </Col>
                                                    
                                                    <Col>
                                                    <a href="" onClick={(e)=>{this.onEditClick(e,skill)}}>Edit</a>
                                                    </Col>
                                                    <Col>
                                                    <a href=""onClick={(e)=>{this.onDeleteClick(e,skill)}}>Delete</a>
                                                    </Col>
                                                    
                                                </Row>
                                                
                                                )}
                                            </div>

                                        </Form>
       

            </div>
        );

        }



}
export default CompanySkills
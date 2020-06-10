import React,{Component} from 'react'
import { Form ,FormGroup ,Col,Row,Button} from "react-bootstrap"
import axios from 'axios'


class Fields extends Component{
    state={
        fields:[],
        fieldId:0,
        Name:""
    }

    componentDidMount(){
        axios.get("http://127.0.0.1:8000/career/AllFields").then((res)=>{this.setState({fields:res.data})})   
    }
    onEditClick(e,field){
        e.preventDefault()
        document.getElementById('Name').value=field.Name
        document.getElementById('addButton').innerHTML="Save Change"
        this.setState({fieldId:field.id})

    }
    onDeleteClick(e,field){
        e.preventDefault()
        axios.delete('http://127.0.0.1:8000/career/DeleteField?id='+field.id,
        {
        headers:{
            'Authorization':'token '+localStorage.getItem('token')
        }
    }).then((res=>alert(res.data))).then(document.location.reload(false))
    }
    onFormSubmit(e){
        e.preventDefault()

    }
    onTextChange(e){
        e.preventDefault()
        this.setState({[e.target.name]:e.target.value})
    }
    onAddClick(){

        if(document.getElementById('addButton').innerHTML=="Add"){
            var field={
                Name:this.state.Name
            }
            axios.post('http://127.0.0.1:8000/career/CreateField',
            {
            headers:{
                'Authorization':'token '+localStorage.getItem('token')
            }
        },field).then((res=>alert(res.data))).then(document.location.reload(false))
        }
        else{
            var field={
                id:this.state.fieldId,
                Name:this.state.Name
            }
            axios.post('http://127.0.0.1:8000/career/UpdateField',
            {
            headers:{
                'Authorization':'token '+localStorage.getItem('token')
            }
        },field).then((res=>alert(res.data))).then(document.location.reload(false))

        }
    }
    render(){

    return(
    <div style={{padding:"10%"}} >
           <Form>
                                            <div>
                                    
                                                <FormGroup >
                                                    <Form.Control type="text"id="Name" name="Name" onChange ={(e)=>this.onTextChange(e)}placeholder="Add A New Field"/>
                                                </FormGroup>
                                                <FormGroup >
                                                <Button id="addButton"  size="lg" block  variant="info" onClick={()=>this.onAddClick()} >Add</Button>
                                                </FormGroup>
                                                {
                                                this.state.fields.map((field)=>
                                                
                                                <Row style={{margin:"20px"}}>
                                                    
                                                    <Col>
                                                    {field.Name}
                                                    </Col>
                                                    <Col>
                                                    <a href="" onClick={(e)=>{this.onEditClick(e,field)}}>Edit</a>
                                                    </Col>
                                                    <Col>
                                                    <a href=""onClick={(e)=>{this.onDeleteClick(e,field)}}>Delete</a>
                                                    </Col>
                                                    
                                                </Row>
                                                
                                                )}
                                            </div>
                                        </Form>
    </div>);

}



}
export default Fields
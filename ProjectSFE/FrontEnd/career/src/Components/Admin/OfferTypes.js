import React,{Component} from 'react'
import { Form ,FormGroup ,Col,Row,Button} from "react-bootstrap"
import axios from 'axios'


class OfferTypes extends Component{
    state={
        offerTypes:[],
        offerTypeId:0,
        TypeName:""
    }

    componentDidMount(){
        axios.get("http://127.0.0.1:8000/career/AllOfferTypes").then((res)=>{this.setState({offerTypes:res.data})})   
    }
    onEditClick(e,offerType){
        e.preventDefault()
        document.getElementById('TypeName').value=offerType.TypeName
        document.getElementById('addButton').innerHTML="Save Change"
        this.setState({offerTypeId:offerType.id})

    }
    onDeleteClick(e,offerType){
        e.preventDefault()
        axios.delete('http://127.0.0.1:8000/career/DeleteOfferType?id='+offerType.id,
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
            var offerType={
                TypeName:this.state.TypeName
            }
            axios.post('http://127.0.0.1:8000/career/CreateOfferType',
            {
            headers:{
                'Authorization':'token '+localStorage.getItem('token')
            }
        },offerType).then((res=>alert(res.data))).then(document.location.reload(false))
        }
        else{
            var offerType={
                id:this.state.offerTypeId,
                TypeName:this.state.TypeName
            }
            axios.post('http://127.0.0.1:8000/career/UpdateOfferType',
            {
            headers:{
                'Authorization':'token '+localStorage.getItem('token')
            }
        },offerType).then((res=>alert(res.data))).then(document.location.reload(false))

        }
    }
    render(){

    return(
    <div style={{padding:"10%"}} >
           <Form>
                                            <div>
                                    
                                                <FormGroup >
                                                    <Form.Control type="text"id="TypeName" name="TypeName" onChange ={(e)=>this.onTextChange(e)}placeholder="Add A New OfferType"/>
                                                </FormGroup>
                                                <FormGroup >
                                                <Button id="addButton"  size="lg" block  variant="info" onClick={()=>this.onAddClick()} >Add</Button>
                                                </FormGroup>
                                                {
                                                this.state.offerTypes.map((offerType)=>
                                                
                                                <Row style={{margin:"20px"}}>
                                                    
                                                    <Col>
                                                    {offerType.TypeName}
                                                    </Col>
                                                    <Col>
                                                    <a href="" onClick={(e)=>{this.onEditClick(e,offerType)}}>Edit</a>
                                                    </Col>
                                                    <Col>
                                                    <a href=""onClick={(e)=>{this.onDeleteClick(e,offerType)}}>Delete</a>
                                                    </Col>
                                                    
                                                </Row>
                                                
                                                )}
                                            </div>
                                        </Form>
    </div>);

}



}
export default OfferTypes
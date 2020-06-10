import React,{Component} from 'react'
import { Form ,FormGroup ,Col,Row,Button} from "react-bootstrap"
import axios from 'axios'


class Locations extends Component{
    state={
        locations:[],
        locationId:0,
        LocationName:""
    }

    componentDidMount(){
        axios.get("http://127.0.0.1:8000/career/AllLocations").then((res)=>{this.setState({locations:res.data})})   
    }
    onEditClick(e,location){
        e.preventDefault()
        document.getElementById('LocationName').value=location.LocationName
        document.getElementById('addButton').innerHTML="Save Change"
        this.setState({locationId:location.id})

    }
    onDeleteClick(e,location){
        e.preventDefault()
        axios.delete('http://127.0.0.1:8000/career/DeleteLocation?id='+location.id,
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
            var location={
                LocationName:this.state.LocationName
            }
            axios.post('http://127.0.0.1:8000/career/CreateLocation',
            {
            headers:{
                'Authorization':'token '+localStorage.getItem('token')
            }
        },location).then((res=>alert(res.data))).then(document.location.reload(false))
        }
        else{
            var location={
                id:this.state.locationId,
                LocationName:this.state.LocationName
            }
            axios.post('http://127.0.0.1:8000/career/UpdateLocation',
            {
            headers:{
                'Authorization':'token '+localStorage.getItem('token')
            }
        },location).then((res=>alert(res.data))).then(document.location.reload(false))

        }
    }
    render(){

    return(
    <div style={{padding:"10%"}} >
           <Form>
                                            <div>
                                    
                                                <FormGroup >
                                                    <Form.Control type="text"id="LocationName" name="LocationName" onChange ={(e)=>this.onTextChange(e)}placeholder="Add A New Location"/>
                                                </FormGroup>
                                                <FormGroup >
                                                <Button id="addButton"  size="lg" block  variant="info" onClick={()=>this.onAddClick()} >Add</Button>
                                                </FormGroup>
                                                {
                                                this.state.locations.map((location)=>
                                                
                                                <Row style={{margin:"20px"}}>
                                                    
                                                    <Col>
                                                    {location.LocationName}
                                                    </Col>
                                                    <Col>
                                                    <a href="" onClick={(e)=>{this.onEditClick(e,location)}}>Edit</a>
                                                    </Col>
                                                    <Col>
                                                    <a href=""onClick={(e)=>{this.onDeleteClick(e,location)}}>Delete</a>
                                                    </Col>
                                                    
                                                </Row>
                                                
                                                )}
                                            </div>
                                        </Form>
    </div>);

}



}
export default Locations
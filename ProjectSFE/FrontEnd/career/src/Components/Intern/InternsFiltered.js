import React,{Component} from 'react'
import axios from 'axios';
import {Button, Form, FormGroup,Row,Col,FormControl,Tabs,Tab,ListGroup,ListGroupItem} from 'react-bootstrap'
import Interns from './Interns';

class InternsFiltered extends Component{

    state={
        fields:[],
        locations:[],
        interns:[],
        field:0,
        location:0
    }
    componentDidMount(){
        axios.get("http://127.0.0.1:8000/career/AllFields").then((res)=>this.setState({fields:res.data}))
        axios.get("http://127.0.0.1:8000/career/AllLocations").then((res)=>this.setState({locations:res.data}))



    }
    onValueSelect(e){
        e.preventDefault()
        this.setState({[e.target.name]:e.target.value})
    }
    async onFormSubmit(e){
        e.preventDefault()
       await  axios.get("http://127.0.0.1:8000/career/FilteredInterns?field="+this.state.field+"&location="+this.state.location).then((res)=>this.setState({interns:res.data}))
        
    }
    render(){

        return(
        <div style={{margin:"9%"}}>
            <Form onSubmit={(e)=>this.onFormSubmit(e)}>
            <Row>
                <Col>
                    <FormGroup >
                        <FormControl as="select"  id="field" name="field" onChange ={(e)=>this.onValueSelect(e)}>
                            <option value={0}>Field??</option>
                            {this.state.fields.map((field)=>

                            <option value={field.id}>{field.Name}</option>

                            )}
                        </FormControl>
                    </FormGroup>
                </Col>
                <Col>
                    <FormGroup>
                        <FormControl as="select" id="location" name="location" onChange={(e)=>this.onValueSelect(e)}>

                            <option value={0}>Location??</option>
                            {this.state.locations.map((location)=>
                            <option value={location.id}>{location.LocationName}</option>
                            )}

                        </FormControl>
                    </FormGroup>
                </Col>
                <Col>
                <Button type="submit">Search</Button>
                </Col>
            </Row>  
            
            </Form>
            <Interns interns={this.state.interns}/>
        </div>);
    }
}

export default InternsFiltered
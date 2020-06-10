import React, { Component } from "react"
import axios from 'axios'
import {Button, Form, FormGroup,FormControl} from 'react-bootstrap'

class EditOffer extends Component{
    state={
        offer:{},
        offerTypes:[]
    }
    async componentDidMount(){
        const id = new URLSearchParams(this.props.location.search).get('id')
        await axios.get('http://127.0.0.1:8000/career/InternShipOfferById?id='+id).then((res)=>this.setState({offer:res.data}))
        await axios.get("http://127.0.0.1:8000/career/AllOfferTypes").then((res)=>this.setState({offerTypes:res.data}))   


        document.getElementById('offerType').value=this.state.offer.offerType
        document.getElementById('Description').value=this.state.offer.Description

    }
    async onTextChange(e){
        const offer={...this.state.offer,[e.target.name]:e.target.value}
        offer.company=this.state.companyId
        await this.setState(()=>({offer}))
    }
    onFormSubmit(e){
        e.preventDefault()
        console.log(this.state.offer)
        axios.post("http://127.0.0.1:8000/career/UpdateInternShipOffer",
        {
        headers:{
            'Authorization':'token '+localStorage.getItem('token')
        }
    },this.state.offer).then((res)=>console.log(res.data))
    }


render(){

    return(

        <div>
               <div style={{padding:"15%"}}>
                <h1>Edit Your Offer </h1>
                <Form onSubmit={(e)=>this.onFormSubmit(e)}>
                    <FormGroup>
                    <FormControl as="select" id ="offerType"name="offerType" onChange={(e)=>this.onTextChange(e)} >
                        <option value={null}>...</option>
                        {this.state.offerTypes.map(offerType=>
                          <option value={offerType.id}>{offerType.TypeName}</option>  
                            )}
                    </FormControl>
                    </FormGroup>
                    <FormGroup>
                        <FormControl as="textarea" id="Description" name="Description" onChange={(e)=>this.onTextChange(e)} placeholder="Description"/>
                   </FormGroup>
                   <Button type="submit" >Save</Button>
                </Form>
                


            </div>
        </div>

    );
}
}
export default EditOffer
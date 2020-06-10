import React ,{Component} from 'react'
import {Button, Form, FormGroup,FormControl} from 'react-bootstrap'
import axios from 'axios'
class MakeOffer extends Component{
    state={
        companyId:0,
        offerTypes:[],
        offer:{},
        Description:""
    }
    async componentWillReceiveProps({companyId}){
       await this.setState({companyId:companyId})
       console.log(this.state.companyId)
    }
    componentDidMount(){
     axios.get("http://127.0.0.1:8000/career/AllOfferTypes").then((res)=>this.setState({offerTypes:res.data}))   

    }

    async onTextChange(e){
        const offer={...this.state.offer,[e.target.name]:e.target.value}
        offer.company=this.state.companyId
        await this.setState(()=>({offer}))
    }
    onFormSubmit(e){
        e.preventDefault()
        console.log(this.state.offer)
        axios.post("http://127.0.0.1:8000/career/CreateInternShipOffer",
        {
        headers:{
            'Authorization':'token '+localStorage.getItem('token')
        }
    },this.state.offer).then((res)=>console.log(res.data))
    }
    render(){
        return(
            <div style={{padding:"15%"}}>
                <h1>Edit Your Offer </h1>
                <Form onSubmit={(e)=>this.onFormSubmit(e)}>
                    <FormGroup>
                    <FormControl as="select" name="offerType" onChange={(e)=>this.onTextChange(e)} >
                        <option value={null}>...</option>
                        {this.state.offerTypes.map(offerType=>
                          <option value={offerType.id}>{offerType.TypeName}</option>  
                            )}
                    </FormControl>
                    </FormGroup>
                    <FormGroup>
                        <FormControl as="textarea" name="Description" onChange={(e)=>this.onTextChange(e)} placeholder="Description"/>
                   </FormGroup>
                   <Button type="submit" >Save</Button>
                </Form>
                


            </div>
        );
    }


}
export default MakeOffer
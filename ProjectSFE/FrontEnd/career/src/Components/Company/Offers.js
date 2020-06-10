import React, {Component} from 'react'
import axios from 'axios'
import { FormControl,Row,Col,FormGroup, Button, FormLabel} from 'react-bootstrap'


class Offers extends Component{
    state={
        field:0,
        offerTypes:[],
        offers:[],
        OfferType:0,
        fields:[]
    }

    componentWillReceiveProps({field}){
        if(field!==undefined){
            this.setState({field:field})
            document.getElementById('field').value=field
        }
    }
    componentDidMount(){  
        axios.get('http://127.0.0.1:8000/career/AllOfferTypes').then((res)=>this.setState({offerTypes:res.data}))
        axios.get('http://127.0.0.1:8000/career/AllFields').then((res)=>this.setState({fields:res.data}))


        
    }
    async onSearchClick(){
        
        await axios.get('http://127.0.0.1:8000/career/InternShipOffersFiltered?offerType='+this.state.OfferType+'&field='+this.state.field).then((res)=>this.setState({offers:res.data}))
        if(this.props.location.pathname=='/Visitor'){
            this.state.offers.map(offer=>
                document.getElementById('linkToDetails'+offer.id).href='/Visitor/OfferDetails?id='+offer.id
                )
            
        }
    }
    onSelectChange(e){
        e.preventDefault()
        this.setState({[e.target.name]:e.target.value})
    }
    render(){
        return(
            <div style={{margin:"5%"}}>
                <Row>
                    <Col>
                            <div class="col-md-8 mx-auto" style={{border:'solid 2px #27496d',borderRadius:'20px',padding:'1%',margin:'5%'}}>
                                <h1 class="wv-heading--title" style={{color:'#27496d'}}>
                                        Check Offers
                                </h1>
                            </div>
                    </Col>
                </Row>
                <Row>
                    
                        <Col>
                        
                                    <FormControl as="select" name="field" id="field" onChange={(e)=>this.onSelectChange(e)}>
                                        <option value={0}>All fields </option>
                                        {this.state.fields.map((field)=>
                                        <option value={field.id}>{field.Name}</option>  
                                        )}
                                    </FormControl>   
                        
                            
                        </Col>
                        <Col>
                            <FormControl as="select" name="OfferType" id="OfferType" onChange={(e)=>this.onSelectChange(e)}>
                                <option value={0}>All Types </option>
                                {this.state.offerTypes.map((offerType)=>
                                <option value={offerType.id}>{offerType.TypeName}</option>  
                                )}
                            </FormControl>   
                        </Col>

                        
                    <Col>
                    <Button size="lg" onClick={()=>this.onSearchClick()}>Search</Button>
                    </Col>
                </Row>
                <hr/>
                {this.state.offers.map((offer)=>
                <Row>
                    <Col>
                    {offer.company.Name}
                    </Col>
                    <Col>
                    {offer.OfferDate}
                    </Col>
                    <Col>
                    {offer.Description.substr(0,30)+"..."}
                    </Col>
                    <Col>
                    <a id={"linkToDetails"+offer.id} href={"/Intern/Offers/OfferDetails?id="+offer.id}>Details ... </a>
                    </Col>
                </Row>
                
                )}
            </div>
        );
    }
}
export default Offers

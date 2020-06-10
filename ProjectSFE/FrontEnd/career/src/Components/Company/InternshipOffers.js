import React,{Component} from 'react'
import axios from 'axios'
import { Row,Col } from 'react-bootstrap'
import { BrowserRouter as Router,Route,Switch} from 'react-router-dom'
import EditOffer from './EditOffer'


class InternShipOffers extends Component{
    state={
        companyId:0,
        offers:[],
        offer:0
    }
    async onClickHandler({offer}){
        await this.props.offerSetter(offer)
    }

    async componentWillReceiveProps({companyId}){
        await this.setState({companyId:companyId})
        axios.get('http://127.0.0.1:8000/career/InternShipOffersByCompany?companyId='+this.state.companyId).then((res)=>this.setState({offers:res.data}))
     }
     
    render(){

        return(
            <div>

                <h2>Offers : </h2>
                <Row>
                    <Col>Date</Col>
                    <Col>Description</Col>
                    <Col>Edit</Col>
                    <Col>Show More</Col>
                    <Col>Candidates</Col>
                </Row>
                <hr/>
                {this.state.offers.map((offer)=>
                <Row>
                    <Col>
                    { offer.OfferDate}
                    </Col>
                    <Col>
                    {offer.Description.substr(0,30)+"..."}
                    </Col>
                    <Col>
                    <a href={"/Recruiter/EditOffer?id="+offer.id} onClick={()=>this.onClickHandler(offer)}>Edit</a>
                    </Col>
                    <Col>
                    <a href={"/Recruiter/OfferDetails?id="+offer.id} onClick={()=>this.onClickHandler(offer)}>More...</a>
                    </Col>
                    <Col>
                    <a href={"/Recruiter/Candidancies?id="+offer.id}>Show Candidancies</a>
                    </Col>
                </Row>
                
                
                )}
               
            </div>
        );
    }
}
export default InternShipOffers
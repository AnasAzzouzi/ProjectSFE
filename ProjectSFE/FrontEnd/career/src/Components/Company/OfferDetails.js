import React,{Component} from 'react'
import axios from 'axios'
import { Row,Col } from 'react-bootstrap'
import CompanyDetails from './CompanyDetails'


class OfferDetails extends Component{
    state={
        offer:{},
        company:{}
    }
    async componentDidMount(){
        const id = new URLSearchParams(this.props.location.search).get('id')
        if(this.props.location.pathname=="/Intern/Offers/OfferDetails"){
            
            document.getElementById('apply').innerHTML= '<a href="/Intern/Offers/OfferDetails/Apply?id='+id+'">Apply<a>'
        }
        await axios.get('http://127.0.0.1:8000/career/getDetailedOffer?id='+id).then((res)=>this.setState({offer:res.data,company:res.data.company})).then(()=>console.log(this.state.offer))   
    console.log(this.state.offer)
    }

render(){

    return(
        <div style={{padding:"5%"}}>
            <Row>
                <Col>
                <CompanyDetails  id={this.state.company.id}/>
                </Col>
            </Row>
            <Row>
                <Col>
                <h3>Offer Description: </h3>
                {this.state.offer.Description}
                </Col>
            </Row>
            <Row>
                <Col>
                <span id="apply"></span>
                
                </Col>
            </Row>
        </div>
    );
}

}
export default OfferDetails
import React ,{Component} from 'react' 
import axios from 'axios'
import { Row, Col } from 'react-bootstrap';

class InternCandidancies extends Component{

    state={
        applications:[]
    }
    async componentDidMount(){
        await axios.get('http://127.0.0.1:8000/career/ApplicationsByIntern?intern='+this.props.id,
        {
        headers:{
            'Authorization':'token '+localStorage.getItem('token')
        }
    }).then((res)=>this.setState({applications:res.data}))
        
    }
    render(){

        return(

            <div>
                
                <Row>
                    <Col><b> Candidacy id</b> </Col>
                    <Col> <b>Offer id</b> </Col>
                    <Col><b>Application Text</b></Col>

                </Row>
                {this.state.applications.map((app)=>

                <Row>
                <Col>{app.id}</Col>
                <Col><a href={"/Intern/Offers/OfferDetails?id="+app.internShipOffer.id}>Check Offer Details</a></Col>
                <Col>{app.ApplicationText}</Col>
                </Row>
                )}
            </div>
        );
    }

}
export default InternCandidancies
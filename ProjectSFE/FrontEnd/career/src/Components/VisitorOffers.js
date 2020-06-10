import React,{Component} from 'react'
import axios from 'axios'
import { FormControl,Row,Col,FormGroup, Button, FormLabel} from 'react-bootstrap'

import Offers from './Company/Offers'

class VisitorOffers extends Component{
    render(){


        return(

            <div>
                <Row>
                    <Col >
                    <Offers {...this.props}/>
                    </Col>
                </Row>
            </div>
        );
    }
}
export default VisitorOffers
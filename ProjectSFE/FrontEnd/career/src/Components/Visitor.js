import React,{Component} from 'react'
import {Route,BrowserRouter as Router,Switch } from 'react-router-dom';
import VisitorOffers from './VisitorOffers'
import OfferDetails from './Company/OfferDetails'
import Login from './Login'
import { FormControl,Row,Col,FormGroup, Button, FormLabel} from 'react-bootstrap'

class Visitor extends Component{




    render(){
        return(
            <div>
                <Row style={{backgroundColor:'#142850'}}>
                <Col></Col>
                        <Col>
                        <Login/>
                        </Col>
                </Row>
                    <Router>    
                            <Switch>
                                <Route  exact path="/Visitor" render={(props)=><VisitorOffers {...props}/>}/>
                                <Route  exact path="/Visitor/OfferDetails" render={(props)=><OfferDetails {...props}/>}/>

                            </Switch>
                    </Router>
        </div>
        );
    }
}
export default Visitor
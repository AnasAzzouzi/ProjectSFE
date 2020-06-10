import React ,{Component} from 'react'
import Offers from './Company/Offers'
import axios from 'axios'
import { FormControl,Row,Col,FormGroup, Button, FormLabel} from 'react-bootstrap'
import BackGround8 from '../BackGround8.jpg'
import RegisterIntern from './Intern/RegisterIntern'
import RegisterRecruiter from './Company/RegisterRecruiter'
import Login from './Login'
class Home extends Component{
    
    render(){
        return(
            
            <div >
                <div id="contenu" style={{backgroundImage:`url(${BackGround8})`,backgroundSize:'100% 100%'}}>
                    <Row>
                        <Col></Col>
                        <Col>
                        <Login/>
                        </Col>
                    </Row>
                <Row >
                    
                    <Col>
                    <RegisterIntern/>
                    </Col>
                    <Col>
                    <RegisterRecruiter/>
                    </Col>
                    
                </Row>
                <Row>
                    
                    <Col md={{ span: 3, offset:4 }}>
                    <Button href="/Visitor" size="lg" block  variant="info" style={{margin:'5%'}}>Check Offers</Button>
                    </Col>
                </Row>
                </div>
                
            </div>
        );
    }
}
export default Home
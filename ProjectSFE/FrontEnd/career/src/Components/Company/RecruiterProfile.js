import React,{Component} from 'react'

import {Row,Col} from 'react-bootstrap'

class RecruiterProfile extends Component{

    state={

        recruiter:{}
    }
    async componentWillReceiveProps({recruiter}){
        
        await  this.setState({recruiter:{...recruiter}})
    }

    render(){

        return(
            


                <div  style={{margin:"30px"}}>
    
                <Row>
                    <Col>
                        <label>
                            First Name :
                        </label>
                    </Col>
                    <Col>
                            {this.state.recruiter.FirstName} 
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <label>
                            Last Name :
                        </label>
                    </Col>
                    <Col>
                    {this.state.recruiter.LastName}
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <label>
                            Email
                        </label>
                    </Col>
                    <Col>
                    {this.state.recruiter.Email} 
                    </Col>
                </Row>
                </div>
        );


    }
}
export default RecruiterProfile
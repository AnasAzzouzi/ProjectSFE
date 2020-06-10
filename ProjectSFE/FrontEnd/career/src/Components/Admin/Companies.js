import React,{Component} from 'react'
import axios from 'axios'
import { Row,Col } from 'react-bootstrap'
class Companies extends Component{

    state={
        companies:[]
    }
    componentDidMount(){
        axios.get("http://127.0.0.1:8000/career/AllCompanies",
        {
        headers:{
            'Authorization':'token '+localStorage.getItem('token')
        }
    }).then(res=>this.setState({companies:res.data}))
    }
    render(){
        return(
        <div style={{padding:"10%"}}>
            
                <Row>
                    <Col>
                        <h3>
                            Name
                        </h3>
                    </Col>

                    <Col>
                        <h3>
                                WebSite
                        </h3>
                    </Col>
                    <Col>
                        <h3>
                                Email
                        </h3>
                    </Col>
                    <Col>
                        <h3>
                                Tel
                        </h3>
                    </Col>
                    <Col>
                        <h3>
                                Edit
                        </h3>
                    </Col>
                </Row>
                {this.state.companies.map((company)=>
                <div>
                    <Row>
                        <Col>
                            {company.Name}
                        </Col>
                        <Col>
                            {
                                company.WebSite
                            }
                        </Col>
                        <Col>
                            {
                                company.Email
                            }
                        </Col>
                        <Col>
                            {
                                company.Tel
                            }
                        </Col>
                        <Col>
                            <a href={"/Admin/EditCompany?id="+company.id}>
                                Edit
                            </a>
                        </Col>
                    </Row>
                        <hr/>
                </div>
                )}
        </div>
        );
    }
}
export default Companies
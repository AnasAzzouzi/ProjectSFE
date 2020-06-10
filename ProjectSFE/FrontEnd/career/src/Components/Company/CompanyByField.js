import React,{Component} from 'react'
import axios from 'axios'
import {Button, Form, FormGroup,Row,Col,FormControl,Tabs,Tab,ListGroup,ListGroupItem} from 'react-bootstrap'
import CompanyDetails from './CompanyDetails'



class CompanyByField extends Component{
    state={
        FieldId:1,
        companies:[]
    }

    componentDidMount(){
        axios.get('http://127.0.0.1:8000/career/CompanyByField?FieldId='+this.state.FieldId).then((res)=>this.setState({companies:res.data}))

    }
    render(){

        return(

            <div style={{padding:'100px'}}>
               <h2>These are some companies you might be interested with </h2> 
               {this.state.companies.map((company)=>
                   <div style={{margin:'100px'}}>
                   <CompanyDetails  id={company.id}/>
                    <a href={"./CompanyDetails?id="+company.id}>Details</a>
                   
                   <hr/>
                   </div>
               )}
            </div>
        );
    }


}

export default CompanyByField
import React,{Component} from 'react';
import {Route,BrowserRouter as Router,Link,Switch } from 'react-router-dom';

import '../../Navbar.css'
import Profile from './Profile'
import CompanyByField from '../Company/CompanyByField';
import CompanyDetails from '../Company/CompanyDetails';
import Offers from '../Company/Offers';
import Apply from './Apply'
import axios from 'axios'
import OfferDetails from '../Company/OfferDetails';
import InternCandidancies from './InternCandidancies';
import { Button ,Col} from 'react-bootstrap';
class Intern extends Component{

    state={
        id:0, 
        intern:{}
    }
    onToggleClick(e){
        var divMen=document.getElementById("sidebar-wrapper")
        divMen.classList.toggle('collapse')    
    }
    async componentDidMount(){
        this.setState({id:localStorage.getItem('userid')})

        await axios.get('http://127.0.0.1:8000/career/InternById?id='+localStorage.getItem('userid'),
        {
        headers:{
            'Authorization':'token '+localStorage.getItem('token')
        }
        }
        ).then(res=>this.setState({intern:res.data}))

    }
    Logout(){
        localStorage.removeItem('userid')
        localStorage.removeItem('token')
    }
    render(){
        return(


    <div class="d-flex" id="wrapper">

        <div class="bg-light border-right" id="sidebar-wrapper">
            <div class="sidebar-heading">
                Operation 
            </div>
            <div class="list-group list-group-flush">
                <a href='../Intern' class=" list-group-item list-group-item-action bg-light ">Profile</a>
                <a href="../Intern/Companies" class="list-group-item list-group-item-action bg-light">Check Companies</a>
                <a href="../Intern/Offers" class="list-group-item list-group-item-action bg-light">InternShip Offers </a>
                <a href="/Intern/Candidancies" class="list-group-item list-group-item-action bg-light">My Candidancies</a>

            </div>
        </div>
        
        <div id="page-content-wrapper">
             
            <nav class="navbar navbar-expand-lg navbar-light bg-light border-bottom">

                <button class="btn btn-light" id="menu-toggle"  onClick={()=>this.onToggleClick()}>
                    <span class="navbar-toggler-icon"></span>
                    </button>
                <Col md={{ span: 3, offset:8}}>
                <Button variant="info" onClick={()=>this.Logout()}>Logout</Button>
                </Col>
            </nav>
        
            <Router>
                <Switch>    
                    <Route exact path="/Intern" render={(props)=><Profile {...props} intern={this.state.intern}/>}/>
                    <Route  exact path="/Intern/Companies" render={(props)=> <CompanyByField {...props}/>}/>
                    <Route exact path="/Intern/CompanyDetails" render={(props)=> <CompanyDetails {...props}/>}/>
                    <Route exact path="/Intern/Offers" render={(props)=> <Offers {...props} field={this.state.intern.field}/>}/>
                    <Route exact path="/Intern/Offers/OfferDetails" render={(props)=><OfferDetails {...props} />}/>
                    <Route exact path="/Intern/Offers/OfferDetails/Apply" render={(props)=><Apply {...props} internId={localStorage.getItem('userid')}/>}/>
                    <Route exact path="/Intern/Candidancies" render={(props)=><InternCandidancies {...props} id={localStorage.getItem('userid')} />}/>                    
                </Switch>
            </Router>
        </div>
    </div>      


        );
}


}
export default Intern
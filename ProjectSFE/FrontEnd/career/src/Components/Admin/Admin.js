import React,{Component} from 'react'
import ExecuteScraping from './ExecuteScraping'
import {Route,BrowserRouter as Router,Switch } from 'react-router-dom';
import { Button ,Col} from 'react-bootstrap';
import EditCompany from '../Company/EditCompany';
import OfferTypes from './OfferTypes';
import Fields from './Fields';
import Locations from './Locations';
import Profile from './Profile';
import Companies from './Companies';


class Admin extends Component{
    Logout(){
        localStorage.removeItem('userid')
        localStorage.removeItem('token')
    }
    onToggleClick(e){
        var divMen=document.getElementById("sidebar-wrapper")
        divMen.classList.toggle('collapse')
        
    }
    render(){
        return(
            <div>
                <div class="d-flex" id="wrapper">

                <div class="bg-light border-right" id="sidebar-wrapper">
    <div class="sidebar-heading">
        Operation 
    </div>
    <div class="list-group list-group-flush">

        <a href='/Admin/Profile' class=" list-group-item list-group-item-action bg-light ">Profile</a>
        <a href='/Admin/ExecuteScraping' class=" list-group-item list-group-item-action bg-light ">ExecuteScraping</a>
        <a href='/Admin/EditCompany' class=" list-group-item list-group-item-action bg-light ">Add a Company</a>
        <a href='/Admin/OfferTypes' class=" list-group-item list-group-item-action bg-light ">OfferTypes</a>
        <a href='/Admin/Fields' class=" list-group-item list-group-item-action bg-light ">Fields</a>
        <a href='/Admin/Locations' class=" list-group-item list-group-item-action bg-light ">Locations</a>
        <a href='/Admin/Companies' class=" list-group-item list-group-item-action bg-light ">Companies</a>




            </div>
</div>
                <div id="page-content-wrapper">

                    <nav class="navbar navbar-expand-lg navbar-light bg-light border-bottom">

                        <button class="btn btn-light" id="menu-toggle"  onClick={()=>this.onToggleClick()}>
                            <span class="navbar-toggler-icon"></span>
                        </button>
                            <Col md={{ span: 3, offset:8}}>
                            <Button  variant="info" onClick={()=>this.Logout()}>Logout</Button>
                            </Col>
                            </nav>
               <Router>
                <Switch>    
                    <Route path="/Admin/ExecuteScraping" render={(props)=><ExecuteScraping {...props} />}/>
                    <Route path="/Admin/EditCompany" render={(props)=><EditCompany {...props}/>}/>
                    <Route path="/Admin/OfferTypes" render={(props)=><OfferTypes {...props}/>}/>
                    <Route path="/Admin/Fields" render={(props)=><Fields {...props}/>}/>
                    <Route path="/Admin/Locations" render={(props)=><Locations {...props}/>}/>
                    <Route path="/Admin/Profile" render={(props)=><Profile {...props}/>}/>
                    <Route path="/Admin/Companies" render={(props)=><Companies {...props}/>}/>
                    <Route path="/Admin/EditCompany" render={(props)=><EditCompany {...props}/>}/>





                </Switch>
            </Router>
            </div>
                </div>
            </div>
        );
    }
}
export default Admin
import React,{Component} from 'react';
import {Route,BrowserRouter as Router,Link,Switch } from 'react-router-dom';
import '../../Navbar.css'
import Profile from './Profile';
import CompanyDetails from './CompanyDetails';
import EditCompany from './EditCompany';
import axios from 'axios'
import MakeOffer from './MakeOffer';
import InternShipOffers from './InternshipOffers'
import EditOffer from './EditOffer';
import OfferDetails from './OfferDetails'
import CompanySkills from './CompanySkills'
import Candidancies from './Candidancies'
import InternsFiltered from '../Intern/InternsFiltered'
import { Button ,Col} from 'react-bootstrap';
class Recruiter extends Component{

    state={
        id:8,
       recruiter:{},
       offer:0
    }
    componentDidMount(){

    axios.get('http://127.0.0.1:8000/career/RecruiterById?id='+localStorage.getItem('userid')).then(res=>this.setState({recruiter:res.data}))

    }
    Logout(){
        localStorage.removeItem('userid')
        localStorage.removeItem('token')
    }
    onToggleClick(e){
        var divMen=document.getElementById("sidebar-wrapper")
        divMen.classList.toggle('collapse')
        
    }
    
    associateCompanyToRecruiter(id){
        console.log(id)
        const recruiter={...this.state.recruiter,company:id}
        this.setState(()=>({recruiter}))
        axios.post('http://127.0.0.1:8000/career/UpdateRecruiter',
        {
        headers:{
            'Authorization':'token '+localStorage.getItem('token')
        }
    },this.state.recruiter).then(res=>console.log(this.state.recruiter)).then(()=>window.location.reload(false))
    }
    async offerSetter(offer){
        await this.setState({offer})
    }
    render(){
        return(


    <div class="d-flex" id="wrapper">

        <div class="bg-light border-right" id="sidebar-wrapper">
            <div class="sidebar-heading">
                Operation 
            </div>
            <div class="list-group list-group-flush">
                <a href='../Recruiter' class=" list-group-item list-group-item-action bg-light ">Profile</a>
                <a href='../Recruiter/EditCompany' class=" list-group-item list-group-item-action bg-light ">Company Profile</a>
                <a href='../Recruiter/CompanySkills' class=" list-group-item list-group-item-action bg-light ">Skills Wanted/Needed</a>
                <a href="../Recruiter/PotentialCandidates" class="list-group-item list-group-item-action bg-light">Potential Candidates</a>
                <a href="../Recruiter/MakeOffer" class="list-group-item list-group-item-action bg-light">Make An Offer </a>
                <a href="../Recruiter/OurOffers" class="list-group-item list-group-item-action bg-light">Our Offers </a>


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
                    <Route exact path="/Recruiter/Company" render={(props)=><CompanyDetails {...props} />}/>
                    
                    <Route exact path="/Recruiter" render={(props)=><Profile {...props} recruiter={this.state.recruiter}/>}/>

                    <Route exact path="/Recruiter/EditCompany" render={(props)=><EditCompany {...props} associateCompanyToRecruiter={(id)=>this.associateCompanyToRecruiter(id)} idCompany={this.state.recruiter.company} />}/>

                    <Route exact path="/Recruiter/MakeOffer" render={(props)=> <MakeOffer {...props} companyId={this.state.recruiter.company} /> }/>

                    <Route  path="/Recruiter/OurOffers" render={(props)=> <InternShipOffers  {...props} companyId={this.state.recruiter.company} offerSetter={(offer)=>this.offerSetter(offer)} /> }/>

                    <Route exact path="/Recruiter/EditOffer" render={(props)=><EditOffer {...props} offer={this.state.offer}/>}/>

                    <Route exact path="/Recruiter/OfferDetails" render ={(props)=><OfferDetails {...props}/>}/>

                    <Route exact path="/Recruiter/CompanySkills" render ={(props)=><CompanySkills {...props} companyId={this.state.recruiter.company}/>}/>
                    
                    <Route exact path="/Recruiter/PotentialCandidates" render ={(props)=><InternsFiltered {...props}/>}/>

                    <Route exact path="/Recruiter/Candidancies" render ={(props)=><Candidancies {...props}/>}/>

                    
                </Switch>
            </Router>
        </div>
    </div>      


        );
}


}
export default Recruiter
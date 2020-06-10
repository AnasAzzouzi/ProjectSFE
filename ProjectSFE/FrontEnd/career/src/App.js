import React ,{Component} from 'react';
import {Route,BrowserRouter as Router,Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';
import RegisterIntern from './Components/Intern/RegisterIntern';
import RegisterRecruiter from './Components/Company/RegisterRecruiter';
import Intern from './Components/Intern/Intern'
import Home from './Components/Home';
import Recruiter from './Components/Company/Recruiter'

import Visitor from './Components/Visitor';
import Admin from './Components/Admin/Admin';
class App extends Component {
  render(){
  return (
    <div className="App">
      
      <Router>
        <Switch>
        <Route  path='/Intern' render={(props)=><Intern {...props}/>}/>
        <Route  path='/Recruiter' render={(props)=><Recruiter {...props}/>}/>
        <Route path='/Visitor' render={(props)=><Visitor {...props}/>}/>
        <Route path='/Admin' render ={(props)=><Admin {...props}/>}/>
        <Route exact path='/' render={(props)=><Home {...props}/>}/>
        <Route exact path="/RegisterRecruiter" render={(props)=><RegisterRecruiter {...props}/>}/>
        <Route exact path="/RegisterIntern" render={(props)=><RegisterIntern {...props}/>}/>
        
        </Switch>
      </Router>
      

    </div>
  );
}
}
export default App;

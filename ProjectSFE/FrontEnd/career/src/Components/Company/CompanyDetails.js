import React,{Component} from 'react'
import axios from 'axios' 
import DisplayProfilePic from '../Intern/DisplayProfilePic'
class CompanyDetails extends Component{
state={
    company:{},
    id:0
}
async componentWillReceiveProps({id}){
    console.log(id)
    await this.setState({id:id})
    if(this.props.location!==undefined){
        var idc = new URLSearchParams(this.props.location.search).get('id');
        await this.setState({id:idc})
        
       }
       await axios.get('http://127.0.0.1:8000/career/CompanyById?id='+this.state.id).then((res)=>this.setState({company:res.data}))



}
async componentDidMount(){
    var id=this.state.id
    if(this.props.id!==undefined){
        id=this.props.id
    }
    if(this.props.location!==undefined){
     id = new URLSearchParams(this.props.location.search).get('id');
    }
    if(id!==0){
    await axios.get('http://127.0.0.1:8000/career/CompanyById?id='+this.state.id).then((res)=>this.setState({company:res.data}))
    }

}
render(){

    return(

        <div style={{border:'solid 2px #27496a',borderRadius:'20px',padding:'1%',margin:'2%'}}>
            <DisplayProfilePic company={this.state.company}/>
            <h3>{this.state.company.Name}</h3>
            <a href={'http://'+this.state.company.WebSite}><h4>{this.state.company.WebSite}</h4></a>
            <h4>{this.state.company.Email}</h4>
            <p>{this.state.company.Description}</p>
        </div>
    );
}

}
export default CompanyDetails
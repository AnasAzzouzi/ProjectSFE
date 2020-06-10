import React,{Component} from 'react'
import axios from 'axios'



class DisplayProfilePic extends Component{

    state={
        id:0,
        intern:{},
        company:{}
    }
    
    async componentWillReceiveProps({intern,company}){
        if(intern!=undefined){
            await this.setState({intern:intern})
            await this.setState({id:intern.id})
            var ProfileImage=intern.Image
            if(ProfileImage!=null){ 
                await axios.get('http://127.0.0.1:8000/career/GetProfilePicture?filePath='+ProfileImage,{
                responseType:'arraybuffer',
                headers:{
                    'Authorization':'token '+localStorage.getItem('token')
                }
                    }).then(res=>{
                
                const url = window.URL.createObjectURL(new Blob([res.data]),{type: 'image/jpeg'});
                document.getElementById('Image'+intern.id).src=url
                        })
            }
        
        }
        if(company!=undefined){
            await this.setState({company:company})
            await this.setState({id:company.id})
            var ProfileImage=company.CompanyLogo
            if(ProfileImage!=null){ 
                await axios.get('http://127.0.0.1:8000/career/GetCompanyLogo?filePath='+ProfileImage,{
                responseType:'arraybuffer',
                headers:{
                    'Authorization':'token'+localStorage.getItem('token')
                }
                    }).then(res=>{
                
                const url = window.URL.createObjectURL(new Blob([res.data]),{type: 'image/jpeg'});
                document.getElementById('Image'+company.id).src=url
                        })
            }
        }
}
    
    render(){
        return(
            
            <img id={"Image"+this.state.id} name="Image" style={{width:"150px",height:"150px",borderRadius:"80px"}}></img>

        );
    }

}
export default DisplayProfilePic

 
 
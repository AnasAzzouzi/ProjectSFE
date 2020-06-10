import React,{Component} from 'react'
import { Form, FormGroup, FormControl, Button, FormLabel } from 'react-bootstrap'
import axios from 'axios'


class Apply extends Component{
    state=
    {
        intern:null,
        internShipOffer:null,
        ApplicationText:'',
        cv:null
    }
    
    async componentDidMount(){
        const id = new URLSearchParams(this.props.location.search).get('id')
       await this.setState({intern:this.props.internId,internShipOffer:id}) 
       console.log(this.state)

    }
    onChangeHandler(e){
        e.preventDefault()
        if(e.target.name=="cv"){
            
            this.setState({cv:e.target.files[0]}) 
        }
    else{
        this.setState({[e.target.name]:e.target.value}) 
        }  
    }

    onFormSubmit(e){
        e.preventDefault()
        var formData = new FormData();
        formData.append('intern',this.state.intern)
        formData.append('internShipOffer',this.state.internShipOffer)
        formData.append('ApplicationText',this.state.ApplicationText)
        formData.append('cv',this.state.cv)

        //formData.append('cv',this.state.cv)
        

       axios.post("http://127.0.0.1:8000/career/CreateApplication",formData,
       {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization':'token '+localStorage.getItem('token')
        }
    }).then((res)=>console.log(res.data))
    }

    
    render(){
        return(
            <div style={{margin:'10%'}}>
                    <Form onSubmit={(e)=>this.onFormSubmit(e)}>
                        <h2> Apply To Offer  </h2>
                        <FormGroup>
                            <FormControl as="textarea" name="ApplicationText" id="ApplicationText" onChange={(e)=>this.onChangeHandler(e)}  maxlength="300" placeholder="Write SomeThing to the Recruiter " required/>
                        </FormGroup>
                        <FormGroup>
                            <FormLabel><b>Upload Your CV in PDF format</b></FormLabel>
                            <FormControl type="file" name="cv" accept='.pdf' onChange={(e)=>this.onChangeHandler(e)}/>
                        </FormGroup>
                        <Button type="submit">Apply</Button>
                    
                    </Form>
                    
            </div>
        );
    }
}
export default Apply
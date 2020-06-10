import React ,{Component} from 'react'
import axios from 'axios'
import { Row, Col } from 'react-bootstrap'
import { Document ,Page} from 'react-pdf'
import InternProfile from '../Intern/InternProfile'
class Candidancies extends Component{

    state={

        idApplication:0,
        applications:[] ,
        file:null
               
    }
    async componentDidMount(){
        
       const id = new URLSearchParams(this.props.location.search).get('id')
       await axios.get("http://127.0.0.1:8000/career/ApplicationsByInternShipOffer?internShipOffer="+id,
       {
       headers:{
           'Authorization':'token '+localStorage.getItem('token')
       }
   }).then(res=>this.setState({applications:res.data}))
        
    }
    async OnDownloadClick(e,app){
        e.preventDefault()
        
        await axios.get("http://127.0.0.1:8000/career/DownloadCv?filePath="+app.cv,{
            responseType: 'arraybuffer'   ,
            headers:{
                'Authorization':'token '+localStorage.getItem('token')
            }        
        }).then(response => {         
            // 2. Create blob link to download
            const url = window.URL.createObjectURL(new Blob([response.data]),{type: 'application/pdf'});
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download','cv.pdf');
            // 3. Append to html page
            document.body.appendChild(link);
            // 4. Force download
            link.click();
            // 5. Clean up and remove the link
            link.parentNode.removeChild(link);
            
          })
        }

    
       
    render(){
        
        return(
            <div>
                <Row>
                    <Col>
                        <h4> Candidates </h4>
                    </Col>
                                      
                </Row>
                {this.state.applications.map((app)=>
                <div>
                <Row>
                    <Col >
                    <InternProfile intern={app.intern}/>
                    </Col>
                    <Col style={{paddingTop:"10%"}}>
                    {app.ApplicationText}
                    </Col>
                    <Col  style={{paddingTop:"10%"}}>
                    <a href="" onClick={(e)=>this.OnDownloadClick(e,app)}>Download CV</a>
                    </Col>
                    
                </Row>
                <Row>
                </Row>
                </div>
                )}

            </div>
        );
    }
}
export default Candidancies
import React,{Component} from 'react'
import { Button } from 'react-bootstrap'
import axios from 'axios';




class ExecuteScraping extends Component{
    onKompassClick(){
        axios.get("http://127.0.0.1:8000/career/ScrapKompass",
        {
        headers:{
            'Authorization':'token '+localStorage.getItem('token')
        }
    }).then((res)=>alert(res.data))

    }
    render(){
        return(
            <div style={{padding:'10%'}}>
                <Button onClick={()=>this.onKompassClick()}>
                    Launch Kompass Scraper
                </Button>
            </div>
        );
    }
}
export default ExecuteScraping
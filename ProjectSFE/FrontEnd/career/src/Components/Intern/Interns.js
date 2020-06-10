import React ,{Component} from'react'
import {Button, Form, FormGroup,Row,Col,FormControl,Tabs,Tab,ListGroup,ListGroupItem} from 'react-bootstrap'
import InternProfile from './InternProfile'




class Interns extends Component{
    state={
        interns:[]
    }
    async componentWillReceiveProps({interns}){
      await  this.setState({interns:interns})
      await this.setState(this.state)
      
    
    }
    renderContent(){
        
    }
    componentDidMount(){
       
    }
    
    render(){

        return(
            <div>
                interns:

                 {this.state.interns.map((intern)=>
                 <div key={intern.id}>
                        <Row >
                            <Col>
                            <div  id={"internProfile"+intern.id} >
                            <InternProfile intern={intern}/>
                            </div>
                            </Col>
                        </Row>

            </div>
                 
            )} 
               
               
            </div>
        );
    }
}
export default Interns
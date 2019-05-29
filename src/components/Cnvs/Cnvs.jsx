import React, { Component } from 'react';
import {Col, ControlLabel, ListGroup, Form,
   FormGroup, FormControl, ListGroupItem} from 'react-bootstrap';
import { CnvsRow, ConfDialog } from '../index'
import './Cnvs.css';

class Cnvs extends Component {
   constructor(props) {
      super(props);


       // bind 'this' to the correct context
      this.handleChange = this.handleChange.bind(this);
      this.Cnvs = this.Cnvs.bind(this);
      this.showEdit = this.showEdit.bind(this);
      this.hideEdit = this.hideEdit.bind(this);
      this.showNew = this.showNew.bind(this);
      this.hideNew = this.hideNew.bind(this);
      this.showDelete = this.showDelete.bind(this);
      this.hideDelete = this.hideDelete.bind(this);

      this.ButtonCluster = this.ButtonCluster.bind(this);

      this.state = {
         displayEdit: false,
         displayDelete: false,
         displayNew: false
      }
      
      console.log("PATH" , this.props);
      this.props.getCnvs();
   }

   // Call redux actionCreator signin via props.
   Cnvs(event) {
      console.log("Do we have components? " + this.props.Cnvs);

      this.props.signIn(this.state, () => this.props.history.push("/"));
      event.preventDefault()
   }


   // Continually update state as letters typed. Rerenders, but no DOM change!
   handleChange(event) {
      const newState = {}
      newState[event.target.name] = event.target.value;
      this.setState(newState);
   }

   //Checks to see if the cnvs promise has returned
   haveCnvs() {
      return Object.keys(this.props.Cnvs).length !== 0; // Nonempty Prss obj
   }
   
   signedIn() {
      return Object.keys(this.props.Prss).length !== 0; // Nonempty Prss obj
   }

   showEdit() {
      this.setState({ displayEdit: true});
   }

   hideEdit() {
      this.setState({ displayEdit: false });
   }

   showDelete() {
      this.setState({ displayDelete: true });
   }

   hideDelete() {
      this.setState({ displayDelete: false });
   }
   
   showNew() {
      this.setState({ displayNew: true });
   }

   hideNew() {
      this.setState({ displayNew: false });
   }

   ButtonCluster(classData) {

      if(classData.admin || classData.usrID === classData.cnvID)
      {   
         return (
            <div className="btn-group-vertical move-right">
               <button type="button" className="btn btn-info" 
                onClick={this.showEdit}>Edit</button>
               <button type="button" className="btn btn-danger" 
                onClick={this.showDelete}>Delete</button>
            </div>
         );
      }
      return (<div> </div>); 
   }

   getHeader() {
      if (this.props.location.pathname === "/cnvs-my") {
         return (<Col smOffset={2}>
            <h1>My Conversations</h1>
         </Col>);
      }
      return (<Col smOffset={2}>
         <h1>All Conversations</h1>
      </Col>);
   }  

   newCnv() {
      if (!Array.isArray(this.props.Cnvs)) {
         console.log("HERE", this.props.Cnvs, this.props.Cnvs.title)
         if(this.props.Cnvs.title === undefined) {
            return true;
         }
      }

      if (!Array.isArray(this.props.Cnvs) && this.props.Cnvs.title) {
         console.log("HERE2", this.props.Cnvs, this.props.Cnvs.title, this.state.cnvs)
         if (this.props.Cnvs.title !== this.state.cnvs) {
            return true;
         }
      }
      
      if (Array.isArray(this.props.Cnvs)) {
         var temp = this.props.Cnvs.filter(cnv => cnv.title === this.state.cnvs)

         if(temp.length===0){
            return true;
         }
      }
      return false;
   }
   
   
   render() {
      console.log("RENDER", this.props)
      if(!( this.signedIn())) {
         return (<div> {this.getHeader()} </div>);
      }

      var options = {
         year: 'numeric', month: 'numeric', day: 'numeric',
         hour: 'numeric', minute: 'numeric', second: 'numeric',
         hour12: false,
         timeZone: 'America/Los_Angeles'
      };
      
      let list = this.props.Cnvs;

      if (!Array.isArray(this.props.Cnvs) && !this.props.Cnvs.id) {
         list = null;
      }
      else if (!Array.isArray(this.props.Cnvs) && this.props.Cnvs.id) {
         list = <CnvsRow
            id={this.props.Cnvs.id}
            lastMessage={this.props.Cnvs.lastMessage}
            ownerId={this.props.Cnvs.ownerId}
            title={this.props.Cnvs.title}
            key={this.props.Cnvs.id}
            {...this.props}
         >
         </CnvsRow> 
      }
      else {
         this.props.Cnvs.sort((a, b) => {return a.lastMessage < b.lastMessage })
         
         if(this.props.location.pathname === "/cnvs-my"){
            list = this.props.Cnvs.filter(cnv => 
             cnv.ownerId == this.props.Prss.id)
         }

         list = list.map((item) =>
            <CnvsRow
               id={item.id}
               lastMessage={item.lastMessage}
               ownerId={item.ownerId}
               title={item.title}
               key={item.id}
               {...this.props}
            > 
            </CnvsRow>  
         );
      }  

    
      console.log()

      return (
         <section className="container">
            {this.getHeader()}

            <ListGroup> {list} </ListGroup>
           
            <span>
               <button type="button" className="btn btn-info" 
                onClick={this.showNew}>New Conversation</button>
            </span>

            <ConfDialog
               show={this.state.displayNew}
               title="New Conversation"
               body={
                  <div>
                     <Form horizontal>
                        <FormGroup controlId="formNewCnv">
                           <Col componentClass={ControlLabel} sm={2}>
                              Conversation Name
                           </Col>
                           <Col sm={8}>
                              <FormControl
                                 type="cnvs"
                                 name="cnvs"
                                 placeholder="Conversation"
                                 value={this.state.newTitle}
                                 onChange={this.handleChange}
                              />
                           </Col>
                        </FormGroup>
                     </Form>
                  </div>
               }
               buttons={['Confirm', 'Cancel']}
               onClose={(buttonName) => {
                  if (buttonName === 'Confirm' && this.newCnv()) {
                     this.props.postCnv(
                        {title: this.state.cnvs},
                        this.props.getCnvs
                     );
                  }
                  this.hideNew()
               }}
            />
            <ConfDialog
               show={this.props.Errs.length > 0}
               title="Error Notice"
               body={<ListGroup> {
                  this.props.Errs.map(
                     (err, i) => <ListGroupItem key={i} bsStyle="danger">
                        {err}
                     </ListGroupItem>
                  )}
               </ListGroup>}
               buttons={['OK']}
               onClose={() => { this.props.clearErrors() }}
            />
         </section>
      ) 
   }
}

export default Cnvs;

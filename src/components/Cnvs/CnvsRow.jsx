
import React, { Component, createElement } from 'react';
import { Modal, Col, Button, ControlLabel, ListGroup, ListGroupItem, Form,
    FormGroup,  FormControl,} from 'react-bootstrap';
import { Route, Switch, Link } from 'react-router-dom';
import { EditCnvs, ConfDialog, CnvDetail } from '../index'
import './Cnvs.css';







class CnvsRow extends Component {
   constructor(props) {
      super(props);


      //this.CnvsRow = this.CnvsRow.bind(this);
      this.renderLastMessage = this.renderLastMessage.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.showEdit = this.showEdit.bind(this);
      this.hideEdit = this.hideEdit.bind(this);
      this.showDelete = this.showDelete.bind(this);
      this.hideDelete = this.hideDelete.bind(this);
      this.ButtonCluster = this.ButtonCluster.bind(this);
      this.state = {
         displayEdit: false,
         displayDelete: false
      }
   }
   
   // Call redux actionCreator signin via props.
   Cnvs(event) {
      console.log("Do we have components? " + this.props.CnvsRow);

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
      this.setState({ displayEdit: true });
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

   renderLastMessage() {

      var options = {
         year: 'numeric', month: 'numeric', day: 'numeric',
         hour: 'numeric', minute: 'numeric', second: 'numeric',
         hour12: false,
         timeZone: 'America/Los_Angeles'
      };

      if(this.props.lastMessage) {
         return (
            <div>
               {JSON.stringify(new Intl.DateTimeFormat('en-US', options)
                  .format(new Date(this.props.lastMessage)))}
             </div>
         );
         
      }
      return( <div className="empty-space">  </div>);
   }

   ButtonCluster(classData) {

      if (classData.admin || classData.usrID === classData.cnvID) {
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


   render() {
      var msgs = "/CnvDetail/"


      return (
         <span className="list-group-item clearfix" key={this.props.id}>
            <span className="label-width">
               <Link className="cnvs-heading" to={msgs.concat(this.props.id)}>
                  {this.props.title}
               </Link>
               <this.renderLastMessage> </this.renderLastMessage>
            </span>
      
            <this.ButtonCluster
            admin={this.props.Prss.role} 
            cnvID={this.props.ownerId} 
            usrID={this.props.Prss.id}> 
            </this.ButtonCluster>   

          





            <ConfDialog
               show={this.state.displayEdit}
               title="Edit Conversation"
               body={
                  <div>
                     <Form horizontal>
                        <FormGroup controlId="formTitleChange">
                           <Col componentClass={ControlLabel} sm={2}>
                              New Conversation Name
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
                  if (buttonName === 'Confirm') {
                     var body = {title: this.state.cnvs}
                    
                     this.props.putCnv(this.props.id, body);
                     this.state.cnvs = this.props.cnvs;
                  }
                  this.hideEdit() 
               }}
            />

            <ConfDialog
               show={this.state.displayDelete}
               title="Delete Conversation"
               body={
                  <div>
                     Are you sure you want to delete this conversation?
                  </div>
               }
               buttons={['Confirm', 'Cancel']}
               onClose={(buttonName) => {
                  if (buttonName === 'Confirm') {
                     this.props.delCnv(this.props.id);
                  }

                  this.hideDelete()
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
         </span>
      );
   }
}


export default CnvsRow;


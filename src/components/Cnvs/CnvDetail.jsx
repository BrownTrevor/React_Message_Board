
import React, { Component } from 'react';
import { ListGroup, ListGroupItem, Col, Form, ControlLabel,
   FormGroup, FormControl,} from 'react-bootstrap';
import { ConfDialog, MsgItem } from '../index'
import './Cnvs.css';

class CnvDetail extends Component {

   constructor(props) {
      super(props);

      this.CnvDetail = this.CnvDetail.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.showNew = this.showNew.bind(this);
      this.hideNew = this.hideNew.bind(this);

      this.state = {
         displayNew: false,
      }

      var id = this.props.location.pathname.substring(11);
      this.props.getMsgs(id);
      
   
   }


   CnvDetail(event) {
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

   haveCnvDetail() {
      return Object.keys(this.props.CnvDetail).length !== 0; 
   }

   signedIn() {
      return Object.keys(this.props.Prss).length !== 0; 
   }

   showNew() {
      this.setState({ displayNew: true });
   }

   hideNew() {
      this.setState({ displayNew: false });
   }

   signedIn() {
      return Object.keys(this.props.Prss).length !== 0; 
   }

   render() {
      console.log("CnvDetail PROPS", this.props)
      var cnvId, cnv, cnvTitle, list;
      var prefixLength = 11;

      if (!this.signedIn()) {
         return (<div> </div>);
      }

      cnvId = this.props.location.pathname.substring(prefixLength);


      if (!(this.haveCnvDetail())) {
         return (
            <section className="container">
               <Col smOffset={2}>
                  <h1>{cnvTitle}</h1>
               </Col>
               <div> NO MESSAGES </div>
               <span>
                  <button type="button" className="btn btn-info"
                     onClick={this.showNew}>New Message</button>
               </span>

               <ConfDialog
                  show={this.state.displayNew}
                  title="New Message"
                  body={
                     <div>
                        <Form horizontal>
                           <FormGroup controlId="formNewCnv">
                              <Col componentClass={ControlLabel} sm={2}>
                                 New Message
                           </Col>
                              <Col sm={8}>
                                 <FormControl
                                    type="msgs"
                                    name="msgs"
                                    placeholder="Message"
                                    value={this.state.newMessage}
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
                        this.props.postMsg(cnvId, this.props.Prss.email,
                         {content: this.state.msgs });
                     }
                     this.hideNew()
                  }}
               />

            </section>
         );
      }


      cnv = this.props.Cnvs.filter(cnv => cnv.id == cnvId)
      cnvTitle = cnv[0].title;


      list = this.props.CnvDetail.map((item) => <MsgItem
         id={item.id}
         cnvId={cnvId}
         prsId={item.prsId}
         whenMade={item.whenMade}
         content={item.content}
         key={item.id}
         {...this.props}
         >
      </MsgItem>);

      return (
         <section className="container">
            <Col smOffset={2}>
               <h1>{cnvTitle}</h1>
            </Col>
      
            <ListGroup> {list} </ListGroup>
            
            <span>
               <button type="button" className="btn btn-info" 
               onClick={this.showNew}>New Message</button>
            </span>

            <ConfDialog
               show={this.state.displayNew}
               title="New Message"
               body={
                  <div>
                     <Form horizontal>
                        <FormGroup controlId="formNewCnv">
                           <Col componentClass={ControlLabel} sm={2}>
                              New Message
                           </Col>
                           <Col sm={8}>
                              <FormControl
                                 type="msgs"
                                 name="msgs"
                                 placeholder="Message"
                                 value={this.state.newMessage}
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
                     console.log("posting message 1");
                     this.props.postMsg(cnvId, this.props.Prss.email,
                        {content: this.state.msgs });
                  } 
                  this.hideNew()
               }}
            />
   
         </section>
   )






   }


















}

export default CnvDetail;

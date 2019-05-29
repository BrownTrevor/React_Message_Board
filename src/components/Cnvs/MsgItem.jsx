
import React, { Component } from 'react';
import './Cnvs.css';







class MsgItem extends Component {
   constructor(props) {
      super(props);

      this.MsgItem = this.MsgItem.bind(this);
      this.toggleState = this.toggleState.bind(this);
      this.getContent = this.getContent.bind(this);

      this.state = {
         display: true,
      }
      

      //EMAIL
      //this.props.getEmail(id);

   }
   
   // Call redux actionCreator signin via props.
   MsgItem(event) {
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

 
   renderWhenMade() {

      var options = {
         year: 'numeric', month: 'numeric', day: 'numeric',
         hour: 'numeric', minute: 'numeric', second: 'numeric',
         hour12: false,
         timeZone: 'America/Los_Angeles'
      };
      var str = JSON.stringify(new Intl.DateTimeFormat('en-US', options)
         .format(new Date(this.props.whenMade)))
      str.substring(1, str.length - 1);

      return (
         <span >
           {str}
         </span>
      );
   }

   toggleState() {
      this.state.display = this.state.display ? false : true;
   }

   getContent() {
      if (this.state.display) {
         return (<div> {"> " + this.props.content} </div>);
      }
      return (<div> </div>);
   }

   render() {
      //console.log("Detail ROW PROPS", this)

      var msgId = this.props.id;
      var emailList = this.props.CnvDetail.filter(cnv => cnv.id == msgId)
      console.log("EMAIL LIST", emailList)
      var email = emailList[0].email + " ";
      var date =  this.renderWhenMade();
      var content = "> " + this.props.content;

      return (
         <span className="list-group-item clearfix" key={this.props.id} >
            <span className='text-color' onClick={this.toggleState} >
               <span>
                  {email}
               </span>
               <span>
                  {date}
               </span>
            </span>
            
            {this.getContent()}
         </span>
      );
   }
}


export default MsgItem;


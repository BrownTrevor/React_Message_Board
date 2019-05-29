import React, { Component } from 'react';
import { Register, SignIn, ConfDialog, Cnvs, CnvsRow, CnvDetail } from '../index'
import { Route, Switch } from 'react-router-dom';
import { Navbar, Nav, NavItem, ListGroup, ListGroupItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import './Main.css';

const Home = (<h1>Home!</h1>); // TODO make real home component

class Main extends Component {
   signedIn() {
      return Object.keys(this.props.Prss).length !== 0; // Nonempty Prss obj
   }

   render() {
      console.log("Rendering main " + JSON.stringify(this.props));
      return (
         <div>
            <div>
               <Navbar>
                  <Navbar.Toggle />
                  {this.signedIn() ?
                     <Navbar.Text key={1}>
                        {`Logged in as: ${this.props.Prss.firstName}
                         ${this.props.Prss.lastName}`}
                     </Navbar.Text>
                   :
                     ''
                   }
                   <Navbar.Collapse>
                      <Nav>
                         {this.signedIn() ?
                           [
                              <LinkContainer key={0} to="/cnvs-my">
                                 <NavItem>My Conversations</NavItem>
                              </LinkContainer>,
                              <LinkContainer key={1} to="/cnvs-all">
                                 <NavItem>All Conversations </NavItem>
                              </LinkContainer>,
                              <LinkContainer key={2} to="/register">
                                 <NavItem>  Register </NavItem>
                              </LinkContainer>,
                           ]
                         :
                            [
                            <LinkContainer key={0} to="/signin">
                               <NavItem>Sign In</NavItem>
                            </LinkContainer>,
                            <LinkContainer key={2} to="/register">
                               <NavItem>  Register </NavItem>
                             </LinkContainer>,
                             ]
                         }
                      </Nav>
                    
                      {this.signedIn() ?
                      <Nav pullRight>
                         <NavItem eventKey={1}
                          onClick={() => this.props.signOut()}>
                          Sign out
                        </NavItem>  
                      </Nav>
                      :
                         ''
                    }
                   </Navbar.Collapse>
              </Navbar>
           </div>

           {/*Alternate pages beneath navbar, based on current route*/}
           <Switch>
               <Route exact path='/' render={() => this.signedIn() ? 
                <Cnvs {...this.props} /> : <SignIn {...this.props} />} />
               <Route path='/signin' render={() => <SignIn {...this.props} />}/>
               <Route path='/register'
                render={() => <Register {...this.props} />} />
               <Route path='/cnvs-all' render={() => <Cnvs {...this.props} />}/>
               <Route path='/cnvs-my' render={() => <Cnvs {...this.props} />} />
               <Route path='/CnvDetail/:id' render={() => 
                <CnvDetail {...this.props} />} />

           </Switch>

           {/*Error popup dialog*/}
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
               onClose={() => {this.props.clearErrors()}} 
           />
        </div>
     )
  }
}

export default Main

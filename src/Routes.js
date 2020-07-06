import React from 'react';
import App from "./App";

//Routing
import { connect } from "react-redux";
import { BrowserRouter as Switch, Route, Redirect } from 'react-router-dom';
import GameScore from './components/gamescore';
  
function Routes(props) {
	const { isAuthenticated, isVerifying}= props;
	return (
			<div className='App'>
				
				<Switch>
					<Route exact path="/"  component={App} />
					<Route exact path="/room"  component={GameScore} />
				</Switch>
			</div>
	);
}

function mapStateToProps(state) {
    return {
      
    };
  }
  
export default connect(mapStateToProps)(Routes);
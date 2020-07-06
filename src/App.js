import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import {useHistory} from 'react-router-dom';
import { useDispatch ,useSelector} from 'react-redux';
import {setName, toggleReady} from "./actions/session"
import { connect, sendMsg } from "./api";
import {setNumPlayers} from "./actions/session"

function App() {

  const [playerID, setPlayerID] = useState();
	const history = useHistory();
  const dispatch = useDispatch();
  const session = useSelector(state => state.sessionReducer);


  useEffect(() => {
    connect((msg)=> {

      var msgJSON = JSON.parse(msg.data)
      var body = msgJSON.body

      switch (msgJSON.type) {
          case 1:
          // score update
              console.log(body)
              break

          case 2:
          // pool update
              dispatch(setNumPlayers(body));            
              break        
      } 
  })

})
  

  function startGame(name) {
    dispatch(setName(playerID))
    dispatch(toggleReady())
    history.push('/room')
  }

  return (
    <div className="App">
      <header className="App-header">


        <h1> Lobby </h1>
        <h2> Players in room: {session.numPlayers}  </h2>       
        <button 
          onClick={() => {
            setPlayerID('player1')
          }}
        >
          Player 1
        </button>

        <button 
          onClick={() => {
            setPlayerID('player2')
          }}
        >
          Player 2
        </button>

        
        <button 
          disabled={!playerID}
          onClick={startGame}
        >
          Enter Room: 
        </button>

      
      </header>
    </div>
  );
}

export default App;

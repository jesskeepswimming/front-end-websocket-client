import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import { useDispatch ,useSelector} from 'react-redux';
import {setName, toggleReady} from "./actions/session"
import { connect, sendMsg, openSocket } from "./api";
import {setNumPlayers} from "./actions/session"

function App() {

  const [playerID, setPlayerID] = useState();
  const dispatch = useDispatch();
  const session = useSelector(state => state.sessionReducer);

  const [score, setScore] = useState([0]);

  const [quesNum, setQuesNum] = useState(0);
  const [player1, setPlayer1] = useState(0);
  const [player2, setPlayer2] = useState(0);
        
  useEffect(()=> {
      // socket connections

      if(session.ready) {
        connect((msg)=> {

          var msgJSON = JSON.parse(msg.data)
          var body = msgJSON.body


          switch (msgJSON.type) {
              case 1:
              // score update
                  console.log(body.slice(0,5));
                  if (body.slice(0,5)=="score") {
                      var scoreJSON = JSON.parse(body.slice(6,));
                      console.log(scoreJSON)
                      if (scoreJSON.id!=session.name) setPlayer2(scoreJSON.value)
                      setScore([...score, body])
                  }
          
                  break
              case 2:
              // pool update
                  dispatch(setNumPlayers(body));            
                  break        
          } 
        });

      }
      
      return () => {
        // unmount statement
        // close socket connection

      }
    }, [score])

    function send(type) {

      let payload = "";
      var roomAuth= `{"roomID": "1234", "userID": "${session.name}"}`

      switch (type) {
        case 'gameUpdate':
          setPlayer1(player1+1)
          var tempscore= `{"score":${player1+1}}`
          payload=`{"type": "gameUpdate", "body": {"update": ${tempscore}, "userID": "${session.name}"}}`

          break;
        case 'matchReq':
          payload=`{"type": "matchReq", "body": {"matchType": "random", "users": {"p1": "${session.name}"}}}`
          break;

        case 'enterRoom':
          payload=`{"type": "enterRoom", "body": ${roomAuth}}`  
          break;

      }

      sendMsg(payload);
    }
  

  function startGame() {

    dispatch(setName(playerID))
    dispatch(toggleReady())
    openSocket(playerID);
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

            <p>UserID: {session.name}</p>


            <button disabled={!session.name} onClick={()=>send('gameUpdate')}> 1 points </button>
            <button disabled={!session.name} onClick={()=>send('matchReq')}> matchRequest </button>
            <button disabled={!session.name} onClick={()=>send('enterRoom')}> enterRoom </button>



            <p>Players in room: {session.numPlayers}</p>

            <h2>Your Score: {player1}</h2>
            <h2>Opponent Score: {player2}</h2>

            {score.map((msg, index) => (
                <p key={index}> {msg}</p>
            ))}
      
      
      </header>

      
    </div>
  );
}

export default App;

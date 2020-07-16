import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import { useDispatch ,useSelector} from 'react-redux';
import {setName, toggleReady} from "./actions/session"
import { connect, sendMsg, openSocket, closeSocket } from "./api";
import {setNumPlayers} from "./actions/session"

function App() {

  const [playerID, setPlayerID] = useState();
  const [url, setURL] = useState();
  const [room, setRoom] = useState();
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();
  const session = useSelector(state => state.sessionReducer);

  const [history, setHistory] = useState([""]);

  const [player1, setPlayer1] = useState(0);
  const [player2, setPlayer2] = useState(0);
        
  useEffect(()=> {
      // socket connections

        connect((msg) => {

          //var msgJSON = JSON.parse(msg.data)
          setHistory([...history, msg.data]);


        }, session.ready);

      
      return () => {
        // unmount statement
        // close socket connection


      }
    }, [history, session.ready])



    function send(payload) {

      sendMsg(payload);
    }
  

  function startGame() {
    dispatch(toggleReady())
    dispatch(setName(playerID))
    openSocket(url);
  }
  const handleChange=(event) =>{
    setURL(event.target.value)
  }
  const handleUsername=(event) =>{
    setPlayerID(event.target.value)
  }

  const handleRoom=(event) =>{
    setRoom(event.target.value)
  }

  const handleMessage=(event) =>{
    setMessage(event.target.value)
  }



  return (
    <div className="App">
      <header className="App-header">


        <h1> Lobby </h1>
        <h2> Players in room: {session.numPlayers}  </h2>  

      

        <label>
          username:
          <input type="text" value={playerID} onChange={handleUsername} />
        </label>

        <label>
          roomID:
          <input type="text" value={room} onChange={handleRoom} />
        </label>
    
        <label>
          URL:
          <input type="text" value={url} onChange={handleChange} />
        </label>
       
        <button 
          disabled={!url}
          onClick={startGame}
        >
          Enter Room: 
        </button>

        <p>UserID: {session.name}</p>

        <label>
          Message:
          <input type="text" value={message} onChange={handleMessage} />
        </label>
       
        <button 
          disabled={!message}
          onClick={()=>send(message)}
        >
          Send Message
          </button>


            <p>Players in room: {session.numPlayers}</p>


            <button 
          disabled={!session.ready}
          onClick={()=>closeSocket()}
        >
          Close Connection: 
        </button>

            {history.map(items => <li>{items}</li>)}


            
        
      
      
      </header>

      
    </div>
  );
}

export default App;

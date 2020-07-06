import React, { Component, useEffect, useState } from "react";
import { connect, sendMsg } from "../api";
import { useDispatch ,useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {setNumPlayers} from "../actions/session"


const GameScore = (props)=> {

    const session = useSelector(state => state.sessionReducer);
    let history = useHistory();
    let dispatch = useDispatch();

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

    function send(num) {
        setPlayer1(player1+num)
        setQuesNum(quesNum+1)

        var payload= `score:{"id":"${session.name}","value":${player1+num}}`


        sendMsg(payload);
    }
    
    return (
        
        <div>
            <button onClick={() => {
            history.push('/')
          }}> exitGame </button>

            <p>You are: {session.name}</p>


            <button onClick={()=>send(1)}> 1 points </button>
            <button onClick={()=>send(2)}> 2 points </button>
            <button onClick={()=>send(3)}> 3 points </button>


            <p>Players in room: {session.numPlayers}</p>

            <h2>Your Score: {player1}</h2>
            <h2>Opponent Score: {player2}</h2>

            {score.map((msg, index) => (
                <p key={index}> {msg}</p>
            ))}
            
        </div>
    )

}

export default GameScore;
var socket =null
var name = ""
const openSocket = (websocketURL, userID) => {
//  socket = new WebSocket(`ws://localhost:8080/ws/?id=${userid}/?room=${roomid}`);
  console.log("url", websocketURL)
  socket = new WebSocket(websocketURL);
  name = userID;

}


const closeSocket = () => {
  console.log("socket closed")     
  socket.close(); 
  }

const connect = (cb, ready) => {

  if (ready) {
    console.log("Attempting Connection...");

    socket.onopen = () => {
      console.log("Successfully Connected");
      socket.send(`{"Type":"connect", "Body":"${name} connected"}`)
    };

    socket.onmessage = msg => {
      console.log(msg);
      cb(msg);
    };

    socket.onclose = event => {
      console.log("Socket Closed Connection: ", event);
    };

    socket.onerror = error => {
      console.log("Socket Error: ", error);
    };

  }
};

// sends message from frontend to backend
const sendMsg = msg => {
  console.log("sending msg: ", msg);
  socket.send(msg);
};

export { connect, sendMsg, openSocket, closeSocket };
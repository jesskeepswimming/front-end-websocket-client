var socket =null

const openSocket = (websocketURL) => {
//  socket = new WebSocket(`ws://localhost:8080/ws/?id=${userid}/?room=${roomid}`);
  console.log("url", websocketURL)
  socket = new WebSocket(websocketURL);

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
      socket.send('{"Type":"connect", "Body":"client connected"}')
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
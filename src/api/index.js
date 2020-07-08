var socket =null

const openSocket = (userid) => {
  socket = new WebSocket(`ws://localhost:8080/ws/?id=${userid}`);
}

const connect = (cb) => {
  console.log("Attempting Connection...");

  socket.onopen = () => {
    console.log("Successfully Connected");
    socket.send("Hi from the client")

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
};

// sends message from frontend to backend
const sendMsg = msg => {
  console.log("sending msg: ", msg);
  socket.send(msg);
};

export { connect, sendMsg, openSocket };
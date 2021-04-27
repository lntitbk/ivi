const app = require('express')();
var fs = require('fs');
var privateKey  = fs.readFileSync("C:\\Users\\TRINHLN\\Desktop\\ssl\\localhost.key");
var certificate = fs.readFileSync("C:\\Users\\TRINHLN\\Desktop\\ssl\\localhost.crt");
const credentials  = {
  key : privateKey,
  cert : certificate
};

const http = require('https').createServer(credentials,app);
const io = require('socket.io')(http,{
    cors: {
      origins: ["http://127.0.0.1:4200", "*"],
      methods: ["GET", "POST"],
      allowedHeaders: ["my-custom-header"],
      credentials: true
    }
  });

var activeSockets = [];
const port = process.env.PORT || 3000;
// app.get("/", function(req, res) {res.json({msg : "xin chao"})});
http.listen(port, () => {
    console.log(`started on port : ${port}`);
});
io.on('connection', (socket) => {
    console.log('------socket connection---------');
    // console.log(socket);
    // const existSocket = activeSockets.find()
    // socket.on("sms", (data) => {
    //   console.log(data);
    //   socket.emit("send-sms", data);
    // });
    const existingSocket = activeSockets.find( x => x == socket.id);

    if (!existingSocket) {
      activeSockets.push(socket.id);
      // socket.
      socket.emit('addnews', activeSockets);
    }

    //socket on Call;
    socket.join('trinh');
    socket.on("Call", (data)=> {
      // console.log('---Call----');
      socket.to('trinh').emit('anwser', data);
    });
    // socket offer
    socket.on("offer", (data) => {
      console.log('-----------offer-----------');
      socket.to('trinh').emit('offer', data);
    });
    //socket on 
    socket.on("answer", (data) => {
      console.log('---answer------');
      // console.log(data);
      socket.to('trinh').emit('answer', data);
    });
    //socket ice candidate
    socket.on('candidate', (data) => {
      console.log('-------------canđiate--------');
      socket.to('trinh').emit('candidate', data);
    });

    socket.on("disconnect", () => {
    });
});


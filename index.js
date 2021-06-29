// Node server

const io = require('socket.io')(8000);    // port number    socket.io(server) is an instance of http and i have initialized it

const users = {};  // users array

// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "YOUR-DOMAIN.TLD"); // update to match the domain you will make the request from
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
//   });

io.on('connection', (socket) =>{
    //console.log("new connection");
    socket.on('new-user-joined', name =>{    // io.on is an instance of socket.io or a specific connection b/t a single client and a server
        //console.log('new used joined with name : ' + name);
        users[socket.id] = name;  // name is added in array
        socket.broadcast.emit('user-joined', name);    // it performs a function to all client except who is just joined
        //console.log("finished")
    });


    socket.on('send-message', message =>{

        socket.broadcast.emit('receive-message', {message: message, name: users[socket.id]});
    })

    socket.on('disconnect', message =>{

        socket.broadcast.emit('left-user', users[socket.id]);
        delete users[socket.id];
    })
});

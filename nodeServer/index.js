//Node server which will handle socket io connections
const io=require('socket.io')(8000)

const users={};

io.on('connection',socket=>{
    //if any user joins,let other connected users to server know about that event!!!
    socket.on('new-user-joined',name =>{
        users[socket.id]=name;
        socket.broadcast.emit('user-joined',name);
    });
    // if someone sends a message ,broadcast it to other people
    socket.on('send',message=>{
        if(message) {
        socket.broadcast.emit('receive',{message: message, name: users[socket.id]}) }
        else{
            alert
        }
    });

     // if someone leaves the chat ,let all connected users know
     //inbuilt function
    socket.on('disconnect',message =>{
    socket.broadcast.emit('left',users[socket.id]);
    delete users[socket.id];
    })

})
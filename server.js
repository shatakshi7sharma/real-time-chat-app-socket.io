const io = require('socket.io')(3000)

users = {}

io.on('connection', socket => {
 // console.log(socket.id,"i am socket obj",socket.name)
  //console.log(socket)
  socket.on('new-user', name => {
    //  userconnected ='true'
    // console.log(userconnected,"***")
  
    users[socket.id] = name
    socket.broadcast.emit('user-connected', {name,users})
  })
  //console.log(userconnected,"===")

  socket.on('send-chat-message', data=> {
    socket.to(data.selectedSocketId).emit('chat-message', { message: data.message, name: users[socket.id]});
    //socket.emit('chat-message', { message: message, name: users[socket.id],id:socket.id})
  })

  socket.on('disconnect', () => {
    socket.broadcast.emit('user-disconnected', users[socket.id])
    delete users[socket.id]
  })

})
//console.log(users,"______________________________")


   //console.log(users)
    // console.log(users,"*********")
    // console.log(message,users[socket.id], socket.id,"))))")
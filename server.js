const io = require('socket.io')(3000)

users = {}

io.on('connection', socket => {
  socket.on('new-user', name => {

    users[socket.id] = name
    socket.emit('new-user-connected', {id: socket.id, name, users})
    socket.broadcast.emit('user-connected', {id: socket.id,name,users})
  })
  

  socket.on('send-chat-message', data=> {

    io.to(data.selectedSocketId).emit('chat-message', { message: data.message, name: users[socket.id]});
  })

  socket.on('disconnect', () => {
    socket.broadcast.emit('user-disconnected', users[socket.id])
    delete users[socket.id]
  })


})

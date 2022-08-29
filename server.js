const express = require('express')
const path = require('path')
const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server);
const users={}
const port = 3000

app.use(express.static(__dirname + '/'));

app.get('/', (req, res) => {
 res.sendFile(
    path.join(__dirname ,"index.html")
    )
  })
  io.on('connection', socket => {
    socket.on('new-user-joined' , (name) =>{
       console.log('new user :' , name);
        users[socket.id] = name ;
        socket.broadcast.emit('user-joined' , name);
      });

  socket.on('send', msg => {
  socket.broadcast.emit('recieve' , {msg:msg ,name: users[socket.id]})
    })

  socket.on('disconnect', msg => {
  socket.broadcast.emit( 'i' , users[socket.id])
  delete users[socket.id]
    })
  });


server.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
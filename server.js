const app = require('express')()
const server = require('http').createServer(app)
const io = require('socket.io')(server)
const port = process.env.PORT || 3000
const cors = require('cors')

app.use(cors())
  
io.on('connection', socket => {
    socket.on('message', data => {
        socket.broadcast.emit('received', { data })
        console.log(data)
    })
})

server.listen(port, () => {
    console.log(`server started on port ${server.address().port}`)
})

const app = require('express')()
const server = require('http').createServer(app)
const WebSocket = require('ws')
const port = process.env.PORT || 3000
const cors = require('cors')

app.use(cors())

const wss = new WebSocket.Server({ port: port })

wss.on('connection', function connection(ws) {
    ws.on('message', function incoming(data) {
        wss.clients.forEach(function each(client) {
            if (client !== ws && client.readyState == WebSocket.OPEN) {
                client.send(data)
                console.log(data)
            }
        })
    })
})

server.listen(port, () => {
    console.log(`server started on port ${server.address().port}`)
})

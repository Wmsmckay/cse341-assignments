const http = require('http')

const server = http.createServer((req, res) => {
    res.end('Gabe Itches')
})

server.listen(3030, '127.0.0.1',() => {
    console.log('Server is listening on port 3030')
})


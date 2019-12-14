const os = require('os')
const express = require('express')
const app = express()
const port = 8720

function getIp() {
    let networkInterfaces = os.networkInterfaces()
    let ipList = []
    for(let key in networkInterfaces) {
        if (key.indexOf('Loopback') === -1) {
            let ip = networkInterfaces[key].filter(networkInterface => networkInterface.family === 'IPv4')[0].address
            ipList.push(ip)
        }
    }
    return ipList.sort()
}

function processCROS(res) {
    return res.header("Access-Control-Allow-Origin", "*")
}

app.get('/getIp', (req, res) => {
    processCROS(res).send(getIp())
})

let snippet = ''

app.get('/getSnippet', (req, res) => {
    processCROS(res).send(snippet)
})

app.get('/setSnippet', (req, res) => {
    snippet = req.query.snippet
    processCROS(res).send({success: 'true'})
})

app.get('/snippet', (req, res) => {
    res.sendFile(__dirname + '/static/html/snippet.html')
})

app.get('/js/jquery.min.js', (req, res) => {
    res.sendFile(__dirname + '/static/js/jquery.min.js')
})

app.listen(port, () => console.log('program is running in ' + port))
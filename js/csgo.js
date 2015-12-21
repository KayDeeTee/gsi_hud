http = require('http');
fs = require('fs');
 
port = 3000;
host = '127.0.0.1';

var io = require('socket.io-client');
var socket = io.connect('http://localhost:3001', {reconnect: true});

socket.on('connect', function(socket) {
    console.log('Connected!');
});


server = http.createServer( function(req, res) {
 
    if (req.method == 'POST') {
        console.log("Handling POST request...");
        res.writeHead(200, {'Content-Type': 'text/html'});
 
        var body = '';
        req.on('data', function (data) {
            body += data;
        });
        req.on('end', function () {
            console.log("POST payload: " + body);  
            console.log("test")

            socket.emit('message', body);          
            res.end( '' );
        });
    }
    else
    {
        console.log("Not expecting other request types...");
        res.writeHead(200, {'Content-Type': 'text/html'});
        var html = '<html><body>HTTP Server at http://' + host + ':' + port + '</body></html>';
        res.end(html);
    }
 
});
 
server.listen(port, host);
console.log('Listening at http://' + host + ':' + port);
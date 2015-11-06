var http = require('http')

var fs = require('fs');

//var ent = require('ent')
//var encode = require('ent/encode')

//var express = require('express')
//var app = express()


var server = http.createServer(function(req, res) { 
    fs.readFile('./index.html', 'utf-8', function(error, content){
        res.writeHead(200, {"Content-Type": "text/html"})
        res.end(content)
    })
})

//app.get("/", function(req, res){  
    // Chargement de socket.io
    var io = require('socket.io').listen(server);
    
    io.sockets.on('connection', function (socket) {
        console.log('connection')
        
        socket.on('ValetEmail', function(email) 
        {
            socket.email = email;
            console.log(email);
        });
        
        
        socket.on('DemandPickup', function(userEmail, valetEmail){
            console.log('demandPikcup' + userEmail + "  " + valetEmail);
            socket.broadcast.emit('arrive' + valetEmail, userEmail);
        });
        
        socket.on('LogButton', function(text){
            console.log(text);
        });
//        socket.on('tchat', function(tchat) 
//        {
//            socket.broadcast.emit('tchatMessage', { pseudo: socket.pseudo, text: tchat });
//            console.log(tchat);
//        });
//        
//        socket.on('message', function(message){
//            console.log(message)
//        })
    })                        
//})

server.listen(8080)    
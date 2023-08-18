const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on('connection', (socket) => {
  console.log('Cliente conectado.');

  socket.on('message', (data) => {
    const message = JSON.parse(data);
    console.log('Mensagem recebida:', message.text);
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify({ user: message.user, text: message.text }));
      }
    });
  });
});
app.use(express.static(__dirname + '/public'));

server.listen(3000, () => {
  console.log('Servidor iniciado na porta 3000.');
});

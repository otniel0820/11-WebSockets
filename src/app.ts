import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 3000 });

wss.on('connection', function connection(ws) {

  console.log(ws);
  
  console.log('Client connected');
  
  ws.on('error', console.error);

  ws.on('message', function message(data) {
    console.log('Desde el cliente', data);
    const payload = {
      type: 'custom-message',
      payload: data.toString()
    }
    ws.send(JSON.stringify(payload));
  });

  // ws.send('Hola desde el servidor');

  ws.on('close', function close() {
    console.log('Client disconnected');
  })
});

console.log('Server running on port http://localhost:3000');

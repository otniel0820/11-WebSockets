# Websockets

## Esta aplicacion nos permite  comunicarnos de manera asincrona con el servidor a traves del protocolo websocket, por ejemplo podemos hacer que el cliente reciba respuesta sin hacer una peticion http.

1. Correr el proyecto
```
npm run dev
```
2. Aqui estamos trabajando con un front basico creado en un documento html lo copiare aqui para que tengan una referencia y no hacerle push a ese archivo

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <h1>Websockets-status</h1>

    <form action="">
        <input type="text" placeholder="Enviar Mensaje">
        <button>Enviar</button>
    </form>

    <ul id="messages">

    </ul>

    <script>
        const socket = new WebSocket('ws://localhost:3000');

        const form = document.querySelector("form");
        const input = document.querySelector("input");
        const messageElement =  document.querySelector("#messages");

        function sendMessage(message) {
            socket.send(message);
        }

        function renderMessage(message) {
            const li = document.createElement('li')
            li.innerHTML = message
            messageElement.prepend(li)
        }

        form.addEventListener('submit', (e) => {
            e.preventDefault()
            const message = input.value
            sendMessage(message);
        })
        socket.onopen = (event) => {
            
            console.log('Client connected');
        }
        socket.onclose = (event) => {
            
            console.log('Client disconnected');
        }
        socket.onmessage = (e) => {
            const {payload} = JSON.parse(e.data);
            renderMessage(payload);
        }
    </script>
</body>
</html>
```


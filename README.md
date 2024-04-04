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
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <h1>Websockets-<small>Status</small></h1>

    <form action="">
      <input type="text" placeholder="Enviar Mensaje" />
      <button>Enviar</button>
    </form>

    <ul id="messages"></ul>

    <script>
        let socket = null
      const form = document.querySelector("form");
      const input = document.querySelector("input");
      const messageElement = document.querySelector("#messages");
      const statusElem = document.querySelector("small");
      
      function sendMessage(message) {
        socket?.send(message);
      }
      function renderMessage(message) {
        const li = document.createElement("li");
        li.innerHTML = message;
        messageElement.prepend(li);
      }

      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const message = input.value;
        sendMessage(message);
        input.value = "";
      });
      
      function connectToServer(params) {
        socket = new WebSocket("ws://localhost:3000");


        socket.onopen = (event) => {
          statusElem.innerHTML = "Online";
        };
        socket.onclose = (event) => {
          statusElem.innerHTML = "Offline";
          setTimeout(()=>{
            connectToServer()
          }, 1500)
        };
        socket.onmessage = (e) => {
          const { payload } = JSON.parse(e.data);
          renderMessage(payload);
        };
      }

      connectToServer();
    </script>
  </body>
</html>

```

3. Para Ejecutar el archivo html deben ejecutarlo por medio de la terminal con el siguiente comando 
```
npx http-server -o
```



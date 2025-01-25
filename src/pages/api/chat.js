const { Server } = require('ws');
const { BACKEND_CHAT_URL } = require('@config/globalVariable');

module.exports = (req, res) => {
  if (!req.headers.upgrade || req.headers.upgrade.toLowerCase() !== 'websocket') {
    res.status(400).json({ message: 'Invalid request. Expected a WebSocket request.' });
    return;
  }

  const wsTarget = `ws://${BACKEND_CHAT_URL}/chat`;

  // Establish a connection to the target WebSocket server
  const targetWs = new Server({ server: wsTarget });

  targetWs.on('connection', (socket) => {
    // Upgrade the client's request and establish a WebSocket connection
    const clientWs = new Server({ server: res.socket });

    clientWs.on('connection', (clientSocket) => {
      // Forward messages between the client and target WebSocket server
      clientSocket.on('message', (message) => {
        socket.send(message);
      });

      socket.on('message', (message) => {
        clientSocket.send(message);
      });

      // Close the connections when either side disconnects
      clientSocket.on('close', () => {
        socket.close();
      });

      socket.on('close', () => {
        clientSocket.close();
      });
    });
  });

  res.on('close', () => {
    targetWs.close();
  });
};

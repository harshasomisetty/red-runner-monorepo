const socketio = require('socket.io');
const qr = require('qrcode'); // Make sure you've installed this package
const clients = new Map();
const qrSessions = new Map();
let io;
let qrNamespace;

exports.Init = (ourServer) => {
  io = socketio(ourServer, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
      credentials: false,
    },
    allowUpgrades:true,
    httpCompression:false,
    transports: ["polling", "websocket", "webtransport"]
  });

  console.log('Socket.IO server initialized');

  io.on('connection', (socket) => {
    console.log('A regular client connected:', socket.id);
    handleMainConnection(socket);
  });

  qrNamespace = io.of('/qr-signup');
  console.log('QR signup namespace created');

  qrNamespace.on('connection', (socket) => {
    console.log('A client connected to QR signup namespace:', socket.id);
    console.log('CONNECTED');
    handleQRSignupConnection(socket);
  });

  qrNamespace.on('connect_error', (error) => {
    console.error('QR namespace connection error:', error);
  });

  io.engine.on('connection_error', (err) => {
    console.log('Connection error:');
    console.log('Request:', err.req.url);
    console.log('Code:', err.code);
    console.log('Message:', err.message);
    console.log('Context:', err.context);
  });

  return io;
};

function handleMainConnection(socket) {
  if (socket.handshake.query.userId) {
    console.log('HandshakeUserID:' + socket.handshake.query.userId);
    clients.set(socket.handshake.query.userId, socket.id);
  }

  socket.on('userId', (message) => {
    console.log(`Message received:${socket.id}, USERID`, message);
    clients.set(message, socket.id);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
      clients.forEach((value, key) => {
        if (value === socket.id) {
          clients.delete(key);
        }
      });
  });
}

function handleQRSignupConnection(socket) {
  console.log('about to handle', socket.id);

  // socket.onAny((eventName, ...args) => {
  //   console.log('Event received:', eventName);
  //   console.log('Data:', args);
  // });

  socket.on('loginInitiated', async (sessionId) => {
    console.log(`QR signup initiated for session: ${sessionId}`);
    qrSessions.set(sessionId, socket.id);

    console.log('before', sessionId);
    const qrData = await generateQRCode(sessionId);
    socket.emit('qrGenerated', qrData);
  });

  socket.on('completeSignup', (sessionId, userData) => {
    console.log(`Signup completed for session: ${sessionId}`);

    const result = processSignup(userData);
    qrNamespace.to(socket.id).emit('qrLoginCompleted', result);
    // socket.emit('qrLoginCompleted', result);
    qrSessions.delete(sessionId);
  });

  socket.on('disconnect', () => {
    console.log('QR signup client disconnected:', socket.id);

    for (let [sessionId, socketId] of qrSessions.entries()) {
      if (socketId === socket.id) {
        qrSessions.delete(sessionId);
      }
    }
  });
}

async function generateQRCode(sessionId) {
  // Implement QR code generation logic
  console.log('inside generateQrcode', sessionId);
  const loginUrl = `${process.env.QR_BACKEND_URL}/connect/${sessionId}`;
  console.log('Login URL:' + loginUrl);
  const qrCodeDataUrl = await qr.toDataURL(loginUrl);
  console.log('QR code generated:', qrCodeDataUrl);

  return { loginUrl, qrCodeDataUrl };
}

function processSignup(userData) {
  // Implement signup processing logic
  return { success: true, message: 'Signup successful' };
}

exports.SendUserMessageOnSocket = (userId, event, payload) => {
  if (clients.has(userId)) {
    console.log('Sending message to user:' + userId + ' Event:' + event + ' Payload:' + payload);
    io.to(clients.get(userId)).emit(event, { payload });
  }
};

exports.SendQRSignupMessage = (sessionId, event, payload) => {
  if (qrSessions.has(sessionId)) {
    console.log('Sending QR signup message for session:' + sessionId + ' Event:' + event + ' Payload:' + payload);
    io.of('/qr-signup').to(qrSessions.get(sessionId)).emit(event, { payload });
  }
};

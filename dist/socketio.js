"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setupSocket = exports.sendWarning = exports.sendMessageGroup = exports.sendMessage = exports.sendAlert = void 0;
var _socket = _interopRequireDefault(require("socket.io"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
let io;
const connetcions = [];
const setupSocket = server => {
  io = (0, _socket.default)(server, {
    cors: {
      origin: "http://localhost:3000"
    }
  });
  const painels = ["ADMINISTRADOR", "ADMINISTRADOR GERAL"];
  io.on("connection", socket => {
    console.log('Novo cliente conectado', socket.id);
    // Associa o socket ao user?.id e ao perfil
    // Associa o socket ao userId e ao perfil
    socket.on('register', user => {
      console.log("REGISTRO", user);
      socket.join(user?.id);
      const userProfile = painels[user?.painel?.nome];
      if (userProfile) {
        socket.join(userProfile);
      }
    });
    socket.on('disconnect', () => {
      console.log('Cliente desconectado');
    });
  });
};
exports.setupSocket = setupSocket;
const sendMessageGroup = (msg, data = {
  groups: ["admin", "admin_geral", "secretaria", "gvisto"],
  user: {
    id,
    prtfilF
  }
}) => {
  io.emit(msg, data);
};
exports.sendMessageGroup = sendMessageGroup;
const notifications = [];
const sendAlert = ({}) => {
  notifications.push({
    id: crypto.randomUUID() || Math.random(),
    heading: "Alerta",
    icon: {
      name: "notifications",
      color: "error"
    },
    path,
    user,
    timestamp: 1570702802573,
    title,
    subtitle
  });
};
exports.sendAlert = sendAlert;
const sendWarning = ({
  path,
  title,
  subtitle,
  event
}) => {
  notifications.push({
    id: crypto.randomUUID() || Math.random(),
    heading: "Aviso",
    icon: {
      name: "notifications",
      color: "warning"
    },
    path,
    timestamp: 1570702802573,
    title,
    subtitle
  });
  console.log("SOCKET CREATED EVENT", "TO", "EVENT", event);
  io.emit(event, notifications);
};
exports.sendWarning = sendWarning;
const sendMessage = ({
  receptor,
  event,
  data
}) => {
  console.log("SOCKET CREATED EVENT", data, "TO", receptor, "EVENT", event);
  io.emit(event, data);
};
exports.sendMessage = sendMessage;
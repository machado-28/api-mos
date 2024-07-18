
import socketIO from 'socket.io'
let io
const connetcions = []
export const setupSocket = (server) => {
    io = socketIO(server, { cors: { origin: "http://localhost:3000" } })

    io.on("connection", socket => {
        console.log(socket.id)
        console.log(socket.handshake.query);
        const { nome, email, perfil } = socket.handshake.query

        connetcions.push({
            id: socket.id,
            usuario: {
                nome, email, perfil
            }
        })

    })
}

export const sendMessage = (msg, data = connetcions) => {

    io.emit(msg, data)

}
import express from 'express'
import http from 'http'
import { Server } from 'socket.io'
import { router } from './routes';
import { RedisClient } from './redis.config';
import { getDate } from './util/getDate';


const app = express()
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('views'))
app.use(router)

const serverHttp = http.createServer(app)
const io = new Server(serverHttp)

io.on('connection', async (socket) => {
    io.emit('allRegister', await getAlldata())
    socket.on('chat message', async (msg) => {
        const date = new Date()
        msg.data = getDate()
        await RedisClient.set(msg.name, `{ "date": "${msg.data}", "message": "${msg.mensagem}"}`)
        io.emit('update', msg)
    });
    socket.on('disconnect', () => {
        io.emit('disc', {status:'desconectado'})
    });
});
async function getAlldata(){
    let allKeys = await RedisClient.keys("*")
    if(allKeys.length > 0){
        let result = await RedisClient.mget(allKeys)
        let formated = []
        for(let k = 0; k<allKeys.length;k++){
            formated.push(
                {
                    name:allKeys[k],
                    data:JSON.parse(result[k])
                }
            )
        }  
        return formated
    }
    return "nothing";
}



export {serverHttp, io}
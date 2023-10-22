import express from 'express'
import http from 'http'
import { Server } from 'socket.io'
import { router } from './routes';
import { RedisClient } from './redis.config';


const app = express()
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('views'))
app.use(router)

const serverHttp = http.createServer(app)
const io = new Server(serverHttp)

io.on('connection', async (socket) => {

    let res = await RedisClient.keys("*")
    let allRegister =  res.map(async key => {
        let register = await RedisClient.get(key)
        return register;
    })
    let c = await allRegister
    console.log(c)
    io.emit('allRegister', allRegister)
    socket.on('chat message', async (msg) => {
        const date = new Date()
        msg.data = "["+dataAtualFormatada()+"]"+" - "+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds()+" ";
        await RedisClient.set(msg.name, msg.mensagem)
        io.emit('update', msg)
    });
});

function dataAtualFormatada(){
    var data = new Date(),
        dia  = data.getDate().toString(),
        diaF = (dia.length == 1) ? '0'+dia : dia,
        mes  = (data.getMonth()+1).toString(), //+1 pois no getMonth Janeiro começa com zero.
        mesF = (mes.length == 1) ? '0'+mes : mes,
        anoF = data.getFullYear();
    return diaF+"/"+mesF+"/"+anoF;
}

export {serverHttp, io}
import express from 'express'
import cors from 'cors'
import http from 'http'
import { Server } from 'socket.io'

const app=express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
const server =http.createServer(app)
const io=new Server(server)

app.get('/home',(req,res)=>{
    res.send("it is working")
})

io.on('connection',(socket)=>{
    console.log("a new user has connected",socket.io)
})


app.listen(2222,()=>{
    console.log("server ia running")
})
server.listen(3333,()=>{
    console.log("hi")
})


//()
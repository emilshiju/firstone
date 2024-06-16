import 'reflect-metadata';


import express , { Express, Request, Response } from "express"
import dotenv from "dotenv"
import connectToMongo from "./frameWorks/mongodb/dbConnection"
import useRoute from "./routes/userRoute"
import profileRoute from "./routes/profileRoute"
import adminRoute from "./routes/adminRoute"
import conversationRoute from "./routes/conversation"
import 'reflect-metadata';
import cors from "cors"
import http from "http"
import socketIo from 'socket.io';
import { Server } from "socket.io";
import socketConfig from './frameWorks/webSocket/location';
import { urlencoded } from 'body-parser';
import cookieParser from 'cookie-parser'
connectToMongo()
dotenv.config();


const app=express()
const port = process.env.PORT||8000

app.use(cookieParser());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});
socketConfig(io)

// app.use(cors({
//     origin: 'http://localhost:5173',
//     origin: 'http://localhost:5174' // Allow this origin
//   }));

const allowedOrigins = ['http://localhost:5173', 'http://localhost:5174'];

const corsOptions: cors.CorsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.indexOf(origin!) !== -1 || !origin) {
      callback(null, true); // Allow the request
    } else {
      callback(new Error('Not allowed by CORS')); // Block the request
    }
  },
  credentials: true, 
};

app.use(cors(corsOptions));
  
  
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.get('/sample',(req,res)=>{
    return res.json("messaegte")
})

app.use(useRoute)
app.use(profileRoute)
app.use(adminRoute)
app.use(conversationRoute)
// app.listen(port)


server.listen(port)
export default app
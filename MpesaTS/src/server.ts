//index.ts

import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import http from 'http';
import router from "./routes/lipaRoute";
import { Server } from 'socket.io';

dotenv.config();
const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 5000;

// Enable CORS for socket.io
const io = new Server(server, {
  cors: {
    origin: ["https://ariders.web.app","http://localhost:4200"], 
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true
  }
});

// Setup socket.io
io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('clientMessage', (data) => {
    console.log('Received from client:', data);
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

//middlewares
app.use(express.json());
app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.send("Daraja API payment gateway");
});
app.use("/lipa", router);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
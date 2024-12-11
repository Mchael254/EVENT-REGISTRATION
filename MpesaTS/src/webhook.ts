import express, { Request, Response } from 'express';
import http from 'http';
import { Server } from 'socket.io';
import dotenv from "dotenv";
import cors from "cors";
import router from "./routes/lipaRoute";

dotenv.config();
const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 5000;

// Enable CORS for socket.io
export const io = new Server(server, {
    cors: {
        origin: "http://localhost:4200", // The Angular client URL
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

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});


import express, { Application, Request, Response } from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose'

import fs from 'fs';
import { createServer } from "https";
import { Server } from 'socket.io';


dotenv.config();

const dbConnect = async () => {
    if (!process.env.MONGODB_URL) {
        throw new Error('MONGODB_URL is not defined in the environment variables.')
    } else {
        return await mongoose.connect(process.env.MONGODB_URL, {
            authSource: 'admin'
        })
    }
}

dotenv.config();

dbConnect().then(() => {
    //const app: Application = express();
    const PORT = process.env.PORT || 3000;

    const privateKey = fs.readFileSync(process.env.KEY_PEM  || 'hola', 'utf8');
    const certificate = fs.readFileSync(process.env.CERT_PEM || 'hola', 'utf8');
    const credentials = { key: privateKey, cert: certificate };
    console.log(credentials);
    const httpsServer = createServer(credentials);
    //const httpsServer = createServer();

    const io = new Server(httpsServer, {
        cors: {
            origin: '*',
            methods: ['GET', 'POST'],
        },
        transports: ['websocket']
    });

    io.on('connection', (socket) => {
        console.log('Un cliente se ha conectado:', socket.id);
        socket.on('mensaje', (data) => {
            console.log('Mensaje recibido:', data);
            socket.emit('respuesta', { mensaje: 'Mensaje recibido con éxito.' });
        });
        socket.on('disconnect', () => {
            console.log('Un cliente se ha desconectado:', socket.id);
        });
    });


    
    httpsServer.listen(PORT, (): void => {
        console.log(`Connected successfully on port ${PORT}`);
    });
    
})

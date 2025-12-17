import express from 'express';
import { appConfig } from './src/frameworks/express/index.js';
import { initDb } from './src/frameworks/sequelize/db/db.js';
import http from 'http';
import { Server } from 'socket.io';

const app = express();
const server = http.createServer(app);
const io = new Server(server);


appConfig(app, io);
await initDb();

// Inicio servidor
const port = 3000
server.listen(port,()=>{
    console.log(`Servidor corriendo en el puerto ${port}`);
});
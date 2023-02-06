const express = require('express');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const cors = require('cors');
const http = require('http');
const WebSocket = require('ws');

const connectDB = require('./config/connectDB');
const initWebRouter = require('./routes');
const webSocketServices = require('./webSocketServices');

dotenv.config();
let app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

initWebRouter(app);

connectDB();

const server = http.createServer(app);

const wss = new WebSocket.Server({ server: server });

webSocketServices(wss);

let PORT = process.env.PORT || 8080;

server.listen(PORT, () => {
    console.log('running on port: ' + PORT);
});

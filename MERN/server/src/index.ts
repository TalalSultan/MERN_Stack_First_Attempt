import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import mongoose from 'mongoose'
import router from './router/index';//use ./router incase of error
import path from 'path';
const app = express();

app.use(cors({
    credentials:true,
}));
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.set('views',path.join(__dirname,'views'))
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
const server = http.createServer(app);

server.listen(5000,()=>{
    console.log("server is running on http://localhost:5000/");
});

const MONGO_URL ="mongodb+srv://talal:123@testing.imdpaly.mongodb.net/?retryWrites=true&w=majority";
mongoose.Promise = Promise;
mongoose.connect(MONGO_URL);
mongoose.connection.on('error',(error:Error)=> console.log(error));

app.use('/',router);

const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

import { Request, Response } from "express";
import { deleteTodo } from "./api/delete/delete";
import { get } from "./api/get/get";
import { add } from "./api/post/add";
import { lagout } from "./api/post/lagout";
import { login } from "./api/post/login";
import { refresh } from "./api/post/refresh";
import { regist } from "./api/post/regist";
import { update } from "./api/put/update";

import session from 'express-session';

const express = require('express');
const app = express();

app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({origin: process.env.ORIGIN, credentials: true, optionSuccessStatus: 204, headers: "Access-Control-Allow-Headers, Origin, X-Requested-With, Content-Type, Accept, Authorization"}));

app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}));

app.post('/login', (req:Request, res:Response) => login(req, res));
app.post('/regist', (req:Request, res:Response) => regist(req, res));
app.post('/lagout', (req:Request, res:Response) => lagout(req, res));
app.post('/refresh', (req:Request, res:Response) => refresh(req, res));

app.get('/api/get', (req:Request, res:Response) => get(req, res));
app.post('/api/add', (req:Request, res:Response) => add(req, res));
app.put('/api/update', (req:Request, res:Response) => update(req, res));
app.delete('/api/delete', (req:Request, res:Response) => deleteTodo(req, res));

const port = process.env.PORT || 3001;

app.listen(port);
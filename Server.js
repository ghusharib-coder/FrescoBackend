import express from 'express';
import cors from 'cors';
import dbConnect from './dbConnection.js';
import UserRoutes from './Router.js';
const PORT=3000;
const app=express();
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
app.use(cors());
app.use("/api/users", UserRoutes);
dbConnect();
module.exports = app;


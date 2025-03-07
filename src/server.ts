
import "reflect-metadata";
import "dotenv/config";
import express from "express";
import http, { Server } from "http";
import cors from "cors";
import { Action, useContainer, useExpressServer } from "routing-controllers";
import Container from "typedi";
import { AppDataSource } from "./typeorm";
import path from "path";

console.log("enter");

export var admin = require("firebase-admin")
var serviceAccount = require('C:/fitnessApp/fitness_master_be/fitness-master-3f03d-firebase-adminsdk-fbsvc-2e781e7b12.json')
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    // projectId: 'potion-for-creators',
});
async function start() {
const app = express();
const port = process.env.PORT
app.use(cors())
app.use(express.json())
const httpServer = http.createServer(app)
useContainer(Container)

// export GOOGLE_APPLICATION_CREDENTIALS = ''

await AppDataSource.initialize()
.then(() => {
  console.log("database connected successfully");
})
.catch((error) =>
  console.log({
    level: "error",
    module: "typeorm",
    submodule: "AppDataSource",
    message: error.message,
    error: error,
  })
);
const routingControllerOption = {
    controllers : [path.join(__dirname + "/controllers/*")]
    // authorizationChecker: async (action: Action) => {
    //   return true;
    // },
    // defaultErrorHandler: false,
}

useExpressServer(app,routingControllerOption);
 await httpServer.listen(9000,()=>{
    console.log(`server is running on this port : 9000`);
    
})
}
start();


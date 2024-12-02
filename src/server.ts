import express from 'express'
import dotenv from 'dotenv'
import router from './routes/databaseRoutes'
import cors from 'cors'
import { corsConfig } from "./config/cors.config";
//import route from './routes/authRouter'


dotenv.config()
const app=express()
app.use(cors(corsConfig))
app.use(express.json())
app.use('/updatedata',router)
//app.use('/api/auth',route)


export default app
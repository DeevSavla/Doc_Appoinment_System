import express from 'express';
import {config} from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';

config()

const app = express()

app.use(express.json())
app.use(morgan('dev'))
app.use(cors())

app.get('/',(req,res)=>{
    res.status(200).send({
        message:'Server Running'
    })
})

const port = process.env.PORT || 8080

app.listen(port,()=>{
    console.log(`Server running in ${process.env.PORT}`)
})
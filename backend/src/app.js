import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()

// app.use(cors({
//     origin:process.env.CORS_ORIGIN,
//     credentials:true
// }))

app.use(cors({
    // origin: "http://localhost:3000",
    origin: "https://tshirt-customization-backend-1.onrender.com",
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
    exposedHeaders: ['set-cookie']
}));

app.use(express.json({limit:"20kb"}))
app.use(express.urlencoded({extended: true, limit:"20kb"}))
app.use(express.static("public"))
app.use(cookieParser())

//routes import
import userRouter from './routes/user.routes.js'
import designRouter from './routes/design.route.js'
import likeRouter from './routes/like.route.js'
import cartRouter from './routes/cart.route.js'

//routes declaration
app.use("/api/v1/users", userRouter)

app.use("/api/v1/designs", designRouter)

app.use("/api/v1/likes", likeRouter);

app.use("/api/v1/carts", cartRouter);



export {app}
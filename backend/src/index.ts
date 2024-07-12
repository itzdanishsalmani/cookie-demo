import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import jwt, { JwtPayload } from "jsonwebtoken";

const app = express()

app.use(cookieParser())
app.use(express.json());
app.use(cors({
    origin:"http://localhost:5173",
    credentials: true,
}))

const JWT_SECRET = "danish"

app.post("/signin",(req,res)=>{
    const email = req.body.email;
    const password = req.body.password;

    const access_token = jwt.sign({
        id:1
    },JWT_SECRET);

    res.cookie("access_token",access_token)

    res.json({
        message:"You Logged in"
    })
})

app.get("/user", (req,res)=>{
    const access_token = req.cookies.access_token;
    const decoded = jwt.verify(access_token,JWT_SECRET) as JwtPayload;

    res.send({
        userId:decoded.id
    })
})

app.post("/logout", (req,res)=>{
    res.cookie("access_token", "", { expires: new Date(0), 
        domain: 'localhost',
        path: '/'

        });
    res.json({
        message:"You logout"
    })
})

app.listen(3000,()=>{
    console.log("Server is running at 3000")
})
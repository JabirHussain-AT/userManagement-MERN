const express = require('express')
const app = express();
const cors = require('cors');
const path = require('path')
const session = require('express-session')
const bodyParser = require('body-parser')
const cookieParser = require("cookie-parser");
const users = require('./models/userSchema')
const userRouter = require('./router/userRouter')
const adminRouter = require('./router/adminRouter')
require('./mongoose/config')
require("dotenv").config();

app.use(cors({
  origin: 'http://localhost:5173',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
}));

const maxAge = 30 * 240 * 600 * 1000
const SECRET = process.env.SECRET || "HIII"

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(session({
  secret: SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {maxAge: maxAge}
  }))
  
  app.use((req, res, next) => {
    res.setHeader('Cache-Control', 'no-store');
    next();
  });
  app.use('/uploads',express.static(path.join(__dirname,"public","uploads")));
  app.use('/', userRouter)
  app.use('/admin', adminRouter)



const PORT = 3002

app.listen(PORT, () => {
    console.log(`Backend is running on the port ${PORT}`);
  });
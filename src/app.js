const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const userRouter = require('./routes/user.routes');
const authRouter = require('./routes/auth.routers');

const { errorHandler } = require('./middlewares/error.middleware');

const app = express();
const PORT = process.env.PORT || 5000

require('dotenv').config();

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/user', userRouter);
app.use('/auth',authRouter);
app.use(errorHandler)


app.listen(PORT, function () {
    console.log(`Server is running on port ${PORT}` );
})


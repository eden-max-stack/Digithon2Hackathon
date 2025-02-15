const express = require("express");
const { logger } = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const cookieParser = require('cookie-parser');
const credentials = require('./middleware/credentials');
const path = require('path');


const app = express();
const PORT = process.env.PORT || 8087;

// custom middleware logger
app.use(logger);

// handle options credentals check before CORS
// and fetch cookies credentials requirement
app.use(credentials);

// cors
app.use(cors(corsOptions));

// middleware for json objects
app.use(express.json());

// middleware for cookies
app.use(cookieParser());

// routes
app.use('/', require('./routes/api/events'));

// error handler
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`server started on PORT ${PORT}...`);
});

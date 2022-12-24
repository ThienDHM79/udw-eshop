'use strict';

const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

//cau hinh public static folder
app.use( express.static(__dirname+ '/public'));

//khoi dong web server
app.listen( port, () =>{
    console.log(`server is running on port ${port}`);
})
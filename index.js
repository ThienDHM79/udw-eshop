'use strict';

const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const expressHandlebars = require('express-handlebars');
const {createStarList} = require('./controllers/handlebarsHelper');
//cau hinh public static folder
app.use( express.static(__dirname+ '/public'));

//cau hinh su dung express-handlebars
app.engine('hbs', expressHandlebars.engine({
    layoutsDir: __dirname + '/views/layouts',
    partialsDir:__dirname + '/views/partials',
    extname: 'hbs',
    defaultLayout: 'layout',
    runtimeOptions: {
        allowProtoPropertiesByDefault: true
    },
    helpers: {
        createStarList
    }
}));
app.set('view engine', 'hbs');

//routes
app.use('/', require('./routes/indexRouter'));
app.use('/products', require('./routes/productsRouter'));

app.use( (req, res, next) => {
    res.status(404).render('error', {message: 'File not Found!'});
});
app.use( (error, req, res, next) => {
    console.error(error);
    res.status(500).render('error', {message: 'Internal Server Error!'});
})
//khoi dong web server
app.listen( port, () =>{
    console.log(`server is running on port ${port}`);
})

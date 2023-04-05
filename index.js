const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const logger = require('./middleware/logger');
const { request } = require('http');
const members = require('./members');

const app = express();

//Handlebars middleware
app.engine('handlebars', exphbs.engine({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//Body Parser middleware NOTE: If posted at the end the app will not return anything
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//homepage route
app.get('/' , (req, res) => {
    res.render('index', {
        title:'Member App',
        members
    } );
});


//members API Routes
app.use('/api/members', require('./routes/api/members'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));




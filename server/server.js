const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const port = 3000;
const app = express();
const db = require('./config/db.config');
db.connect();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());

const userRoutes = require('./routes/user.route');
const categoryRoutes = require('./routes/category.route');
const authorRoutes = require('./routes/author.route');

app.use('/api',userRoutes);
app.use('/api',categoryRoutes);
app.use('/api',authorRoutes);


app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
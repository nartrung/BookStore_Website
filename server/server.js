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

const authorRoutes = require('./routes/author.route');
const categoryRoutes = require('./routes/category.route');
const productRoutes = require('./routes/product.route');
const reviewRoutes = require('./routes/review.route');
const userRoutes = require('./routes/user.route');

app.use('/api',authorRoutes);
app.use('/api',categoryRoutes);
app.use('/api',productRoutes);
app.use('/api',reviewRoutes);
app.use('/api',userRoutes);

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
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
const searchRoutes = require('./routes/search.route');
const paymentRoutes = require('./routes/payment.route');
const orderRoutes = require('./routes/order.route');
const adminRoutes = require('./routes/admin.route');

app.use('/api',authorRoutes);
app.use('/api',categoryRoutes);
app.use('/api',productRoutes);
app.use('/api',reviewRoutes);
app.use('/api',userRoutes);
app.use('/api',searchRoutes);
app.use('/api',paymentRoutes);
app.use('/api',orderRoutes);
app.use('/admin',adminRoutes);

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
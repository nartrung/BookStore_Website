const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const port = 3000;
const app = express();
const db = require('./config/dbConfig');
db.connect();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());

const userRoutes = require('./routes/user.route');
app.use('/api',userRoutes);

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
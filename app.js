const express = require('express');
const mongoose = require('mongoose');
const app = express();
const router = require('./src/routes/index')

require('dotenv').config();
// connect to mongo
const mongoString = process.env.MONGODB_URL
mongoose.connect(mongoString, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const db = mongoose.connection;
db.on('error', (error) => {
    console.log(error)
})
db.once('connected', () => {
    console.log('Database Connected');
})

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server Started at ${PORT}`)
})
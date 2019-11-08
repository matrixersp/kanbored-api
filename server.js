require('express-async-errors');
const express = require('express');

const app = express();
const mongoose = require('mongoose');
const morgan = require('morgan');
const error = require('./middleware/error');
const boards = require('./routes/boards');

require('dotenv').config();

const dbURI = process.env.KANBORED_DB_URI;
mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(() => console.log(`MongoDB connected on ${dbURI}`))
  .catch(err => console.log('Could not connect to MongoDB', err));

app.use(express.json());
app.use(morgan('tiny'));

app.use('/api/boards', boards);
app.use(error);

const port = process.env.PORT || 5000;
const server = app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

module.exports = server;

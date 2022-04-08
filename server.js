const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
// process.on('uncaughtException', (err) => {
//   console.log(err.name, err.message);
//   console.log('Unhandled exception Shutting down');
//   process.exit(1);
// });

dotenv.config({ path: './config.env' });
const DB = process.env.DATABASE;
mongoose
  .connect(DB, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log('Connection successful'));
// .catch(function () {
//   console.log('Promise Rejected');
// });
const app = require('./app');

const port = 6000;

const server = app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
process.on('unhandledRejection', (err) => {
  console.log(err.name, err.message);
  console.log('Unhandled rejection Shutting down');
  server.close(() => {
    process.exit(1);
  });
});
module.exports = server;
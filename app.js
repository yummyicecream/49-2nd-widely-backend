const express = require('express');
const dotenv = require('dotenv');

const cors = require('cors');
const morgan = require('morgan');

dotenv.config();

const { AppDataSource } = require('./src/models/data-source');

// const { routes } = require("./src/routes");

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// app.use(routes);

app.get('/', async (req, res) => {
  try {
    return res.status(200).json({ message: 'Welcome' });
  } catch (err) {
    console.log(err);
  }
});

app.get('/ping', async (req, res) => {
  return res.status(200).json({ message: 'pong' });
});

app.use((err, _, res, next) => {
  const status = err.status || 500;
  const errorMessage = err.message || 'Internal Server Error';

  return res.status(status).json({
    error: `${status} ${errorMessage}`,
  });
});

const start = async () => {
  // 서버를 시작하는 함수입니다.
  try {
    await AppDataSource.initialize().then(() =>
      console.log('Datasource initialized.'),
    );
    const port = process.env.SERVER_PORT;
    app.listen(port, () => console.log(`Server is listening on '${port}'`));
  } catch (err) {
    console.error(err);
  }
};

start();

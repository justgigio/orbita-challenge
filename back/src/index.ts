import express from 'express';
import router from '../config/router';

const PORT = 8080;

const app = express();

app.use(express.json());

app.use('/', router);

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
  });
}

export default app;

import keys from '@/config/keys';
import morgan from 'morgan';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';

import routes from '@/routes/'

function registerMorgan(app: express.Application) {
  if (keys.appEnv !== "production") return app.use(morgan('dev'))

  return app.use(morgan('combined'));
}

const createServer = (): express.Application => {
  const app = express();

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  registerMorgan(app);

  app.use(helmet());
  app.use(cors());

  app.disable('x-powered-by');

  app.get('/health', (_req, res) => {
    res.send('UP');
  });

  routes(app);

  return app;
};

export { createServer };
import 'reflect-metadata';
import express, { NextFunction, Response, Request } from 'express';
import 'express-async-errors';
import { errors } from 'celebrate';
import cors from 'cors';
import routes from './routes';
import AppError from '@shared/errors/AppError';
import '@shared/typeorm';
import uploadConfig from '@config/upload';

const port = 1234;

const app = express();

app.use(cors());
app.use(express.json());
app.use('/files', express.static(uploadConfig.directory));
app.use(routes);

app.use(errors());

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      status: 'error',
      message: error.message,
    });
  }
  console.log(error);

  return res.status(500).json({
    status: 'error',
    message: 'internal server error',
  });
});

app.get('/', (request, response) => {
  return response.json({
    BArBOSA: 'BArBOSA',
  });
});

app.listen(port, () => {
  console.log(`servidor iniciado na ${port}`);
});

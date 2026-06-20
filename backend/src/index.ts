import express from 'express';
import http from 'http';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { Server } from 'socket.io';
import { sequelize } from './models';
import routes from './routes';
import setupSockets from './sockets';

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

app.use('/api', routes);

setupSockets(io);

const PORT = process.env.PORT || 5000;

sequelize.sync({ alter: true }).then(() => {
  console.log('Database connected & synced');
  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}).catch(err => {
  console.error('DB Connection Error:', err);
});

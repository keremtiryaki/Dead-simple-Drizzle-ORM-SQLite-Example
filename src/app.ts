// src/app.ts

import express from 'express';
import todoRoutes from './routes/todoRoutes';
import { connect, disconnect } from './db/db';

const app = express();
const PORT = process.env.PORT || 3090;

app.use(express.json());
app.use('/api', todoRoutes);

connect();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

process.on('SIGINT', () => {
  disconnect();
  process.exit();
});

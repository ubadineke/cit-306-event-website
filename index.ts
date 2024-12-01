import express from 'express';
import { config } from 'dotenv';
import cors from 'cors';
import eventRouter from './routes';
config();

const PORT = process.env.PORT || 8080;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', eventRouter);

app.listen(PORT, async () => {
  console.log(`Serving at http://localhost:${PORT}`);
});

export default app;

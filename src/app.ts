import express, { Application } from 'express';
import './database/connect';
import router from './routes/router';
import rateLimit from 'express-rate-limit';

const app: Application = express();

const port = process.env.PORT || 3001;

const limiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 50,
  message: 'Too many accounts created from this IP, please try again after an hour',
  legacyHeaders: false,
})

app.use(express.json());
app.use(limiter);
app.use('/api/', router);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

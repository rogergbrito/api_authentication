import express, { Application } from 'express';
import cors from 'cors';
import './database/connect';
import router from './routes/router';
import rateLimit from 'express-rate-limit';

const app: Application = express();
const port = process.env.PORT || 3001;

const allowedUrls = ['http://localhost:5000', 'http://localhost:5500'];

const limiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 50,
  message: 'Too many accounts created from this IP, please try again after an hour',
  legacyHeaders: false,
})

app.use(cors({
  origin: (origin, callback) => {
    if(!origin || allowedUrls.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    };
  },
  methods: 'GET, POST, PUT, DELETE',
  allowedHeaders: 'Content-Type, Authorization',
}));

app.use(express.json());
app.use(limiter);
app.use('/api/', router);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

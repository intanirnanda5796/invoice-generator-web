import express from 'express';
import cors from 'cors';
import config from './config/config';
import routes from './routes/api';

const app = express();

app.use(cors({ origin: '*' }));
app.use(express.json());

app.use('/api', routes);

app.listen(config.portApp, () => { console.log(`server running at ${config.portApp}`); });

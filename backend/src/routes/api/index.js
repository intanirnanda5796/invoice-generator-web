import express from 'express';
import AuthRouter from './auth';
import UserRouter from './user';
import InvoiceRouter from './invoice';

const router = express.Router();

router.get('/', (req, res) => {
  res.json('welcome to api v1');
});

router.use(AuthRouter);
router.use(UserRouter);
router.use(InvoiceRouter);

export default router;

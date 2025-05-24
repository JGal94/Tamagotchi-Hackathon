import express from 'express';
import dotenv from 'dotenv';
import tamagotchiRoutes from './routes/tamagotchiRoutes';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use('/tamagotchi', tamagotchiRoutes);

app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});

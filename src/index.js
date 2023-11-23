import 'dotenv/config'

// In src/index.js
import express from 'express'; 
import cors from 'cors';
import v1Router from './v1/routes/index.js';
import { dbConnect } from './config/mongo.js';

const app = express();
const PORT = process.env.PORT || 3000;


app.use(cors());
app.use(express.json())
app.use("/api/v1", v1Router);

app.listen(PORT, () => {
	console.log(`API is listening on port http://localhost:${PORT}/api/v1/routines/ `);
});

dbConnect()
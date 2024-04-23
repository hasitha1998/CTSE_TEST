const express = require('express');
const cors = require('cors'); // Import the cors module
const dotenv = require('dotenv');
dotenv.config();
const cookieParser = require('cookie-parser');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');
const port = process.env.PORT || 3000;
const userRoutes = require('./routes/userRoutes');

connectDB();

const app = express();

app.use(express.json());
//app.use(express.urlencoded({extended: true}));

app.use(cookieParser());

app.use(
	cors({
		origin: "http://localhost:5173",
		credentials: true, // enable credentials if necessary
	})
);

app.use('/api/users',cors(), userRoutes);
  
  
app.get('/', (req, res) => res.send('Server is ready'));

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));

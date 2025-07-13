// setup express server, middleware, and connection to routes

const express = require('express');
const cors = require('cors');
const jobsRouter = require('./routes/jobs');
const app = express();

app.use(cors());
app.use(express.json());
app.use('/jobs', jobsRouter);

app.listen(5000, () => console.log('Server running on http://localhost:5000'));

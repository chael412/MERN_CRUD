require('dotenv').config();
const cors = require('cors');
const express = require('express');
const connectDB = require('./connectDB');
const Notes = require('./models/Notes');

const app = express();
const PORT = process.env.PORT || 3001;

connectDB();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/api/notes', async (req, res) => {
	try {
		const data = await Notes.find();
		if (!data) {
			return res.status(404).json({ message: 'No notes found' });
		}
		res.status(201).json(data);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

app.get('*', (req, res) => {
	res.send(404);
});

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});

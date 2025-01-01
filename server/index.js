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

// GET ALL NOTES
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

// GET NOTE BY ID
app.get('/api/notes/:id', async (req, res) => {
	try {
		const data = await Notes.findById(req.params.id);
		if (!data) {
			return res.status(404).json({ message: 'No note found' });
		}
		res.status(201).json(data);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

// CREATE NOTE
app.post('/api/notes', async (req, res) => {
	try {
		const data = await Notes.create(req.body);
		res.status(201).json(data);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

// UPDATE NOTE
app.put('/api/notes/:id', async (req, res) => {
	try {
		const data = await Notes.findByIdAndUpdate(req.params.id, req.body, { new: true });
		if (!data) {
			return res.status(404).json({ message: 'No note found' });
		}
		res.status(201).json(data);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

// DELETE NOTE
app.delete('/api/notes/:id', async (req, res) => {
	try {
		const data = await Notes.findByIdAndDelete(req.params.id);
		if (!data) {
			return res.status(404).json({ message: 'No note found' });
		}
		res.status(201).json({ message: 'Note deleted successfully' });
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

import React, { useEffect, useState } from 'react';
import { use } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Notes = () => {
	const baseUrl = `${import.meta.env.VITE_SERVER_URL}/api/notes`;
	const [notes, setNotes] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	//fetch all notes
	useEffect(() => {
		const fetchNotes = async () => {
			try {
				const response = await axios.get(baseUrl);
				setNotes(response.data);
				setLoading(false);
			} catch (err) {
				setError(err.message);
				setLoading(false);
			}
		};

		fetchNotes();
	}, [baseUrl]);

	return (
		<div>
			<h1>Notes</h1>
			{loading ? (
				<p>Loading...</p>
			) : error ? (
				<p>{error}</p>
			) : (
				<ul className='notes'>
					<li className='add-note-button'>
						<Link to={`/add_note`}>+</Link>
					</li>

					{notes.map((note) => (
						<Link
							to={`/edit_note/${note._id}`}
							key={note._id}>
							<li>
								<h3>{note.title}</h3>
								<p>{note.description.length > 50 ? `${note.description.substring(0, 50)}...` : note.description}</p>
							</li>
						</Link>
					))}
				</ul>
			)}
		</div>
	);
};

export default Notes;

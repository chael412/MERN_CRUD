import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

const EditNote = () => {
	const baseUrl = `${import.meta.env.VITE_SERVER_URL}/api/notes`;
	const { id } = useParams(); // Retrieve id from URL params for editing
	const navigate = useNavigate();

	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [submitting, setSubmitting] = useState(false);
	const [message, setMessage] = useState('');

	// Fetch existing note data
	useEffect(() => {
		const fetchNote = async () => {
			try {
				const response = await axios.get(`${baseUrl}/${id}`);
				const data = response.data; // Axios provides the response data here
				setTitle(data.title);
				setDescription(data.description);
			} catch (error) {
				console.error('Error fetching note:', error);
				setMessage('An error occurred while fetching note details.');
			}
		};
		fetchNote();
	}, [id, baseUrl]);

	// Handle form submission
	const handleSubmit = async (e) => {
		e.preventDefault();
		setSubmitting(true);
		setMessage(''); // Clear any previous messages

		const note = { title, description };

		try {
			const response = await axios.put(`${baseUrl}/${id}`, note, {
				headers: { 'Content-Type': 'application/json' },
			});

			setMessage('Note has been updated!');
		} catch (error) {
			console.error('Error updating note:', error);
			setMessage('An error occurred. Please try again.');
		} finally {
			setSubmitting(false);
		}
	};

	const handleDelete = async (id) => {
		const confirmDelete = window.confirm('Are you sure you want to delete this note?');
		if (!confirmDelete) return;

		try {
			const response = await axios.delete(`${baseUrl}/${id}`);
			if (response.status === 200 || response.status === 201) {
				// Success response
				alert('Note deleted successfully.');
				navigate('/');
			}
		} catch (error) {
			console.error('Error deleting note:', error);
			alert('An error occurred. Please try again.');
		}
	};

	return (
		<div>
			<div className='breadcrump-nav'>
				<Link
					to={'/'}
					className='back-button'>
					Back
				</Link>
				<button
					onClick={() => handleDelete(id)}
					className='delete'>
					Delete
				</button>
			</div>

			<h1>Edit Note</h1>

			<form onSubmit={handleSubmit}>
				<div className='single-note'>
					<div>
						<input
							type='text'
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							placeholder='Title'
							className='title'
						/>
					</div>
					<div>
						<textarea
							value={description}
							onChange={(e) => setDescription(e.target.value)}
							placeholder='Description'
							rows='4'
							cols='50'
							className='description'></textarea>
					</div>
					<input
						type='submit'
						value={submitting ? 'Updating...' : 'Update'}
						disabled={submitting}
					/>
					{message && <p className='text-center'>{message}</p>}
				</div>
			</form>
		</div>
	);
};

export default EditNote;

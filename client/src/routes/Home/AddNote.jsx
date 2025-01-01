import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const AddNote = () => {
	const baseUrl = `${import.meta.env.VITE_SERVER_URL}/api/notes`;

	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [submitting, setSubmitting] = useState(false);
	const [message, setMessage] = useState('');

	//storeNote function
	const storeNote = async (e) => {
		e.preventDefault();
		setSubmitting(true);

		const note = {
			title,
			description,
		};

		try {
			const response = await axios.post(baseUrl, JSON.stringify(note), {
				headers: {
					'Content-Type': 'application/json',
				},
			});
			setTitle('');
			setDescription('');

			if (response.status === 201) {
				// Successful response
				setMessage('Note has been saved!');
				setTitle('');
				setDescription('');
			} else {
				setMessage('Failed to save note. Please try again.');
			}
		} catch (error) {
			console.error(error);
			setMessage('An error occurred. Please try again.');
		} finally {
			setTimeout(() => {
				setSubmitting(false);
				setMessage('Note has been saved!');
			}, 2000);
		}
	};

	return (
		<div>
			<Link
				to={'/'}
				className='back-button'>
				Back
			</Link>
			<form onSubmit={storeNote}>
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
							placeholder='description'
							rows='4'
							cols='50'
							className='description'></textarea>
					</div>
					<input
						type='submit'
						value={submitting ? 'Saving...' : 'Save'}
						disabled={submitting}
					/>
					{!submitting && message && <p className='text-center'>{message}</p>}
				</div>
			</form>
		</div>
	);
};

export default AddNote;

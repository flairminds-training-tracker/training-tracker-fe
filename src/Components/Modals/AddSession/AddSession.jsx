import React, { useState } from 'react';
import { TagsInput } from "react-tag-input-component";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addSession } from '../../../Services/Api';
import styles from './AddSession.module.css';

export default function AddSession({ isOpen, onClose, getSessions }) {
	const [formData, setFormData] = useState({
		sessionName: '',
		speaker: '',
		sessionLink: '',
		tagsJson: '',
		date: ''
	});
	const [selected, setSelected] = useState([]);
	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value
		}));
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		console.info("Form submitted");

		const addData = {
			sessionUrl: formData.sessionLink,
			name: formData.sessionName,
			speaker: formData.speaker,
			date: formData.date,
			tagsJson: selected

		};
		console.info("add Data:", addData);

		try {
			const res = await addSession(addData);
			console.info("Response from postCourse API:", res);
			toast.success("Session added successfully!");
		} catch (err) {
			console.error("Error while posting course data:", err);
			toast.error("Error adding course.");
		}
		getSessions();
		setFormData({
			sessionName: '',
			date: ' ',
			speaker: '',
			sessionLink: '',
			tagsJson: ''
		});
		onClose();
	};

	return (
		<>
			{isOpen && (
				<div className={styles.modal}>
					<div className={styles.modalContent}>
						<div className={styles.modalHeader}>
							<h5 className={styles.modalTitle}>Add New Session</h5>
							<button type="button" className={styles.closeButton} onClick={onClose}>&times;</button>
						</div>
						<div className={styles.modalBody}>
							<form onSubmit={handleSubmit}>
								<div className={styles.formGroup}>
									<label>Session Name<span className={styles.stare}>*</span></label>
									<input type="text" className={styles.formControl} name="sessionName" value={formData.sessionName} onChange={handleChange} required />
								</div>
								<div className={styles.formGroup}>
									<label>Session Link<span className={styles.stare}>*</span></label>
									<input type="url" className={styles.formControl} name="sessionLink" value={formData.sessionLink} onChange={handleChange} />
								</div>
								<div className={styles.formGroup}>
									<label>Speaker<span className={styles.stare}>*</span></label>
									<input type="text" className={styles.formControl} name="speaker" value={formData.speaker} onChange={handleChange} required />
								</div>
								<div className={styles.formGroup}>
									<label>Date</label>
									<input type="date" className={styles.formControl} name="date" value={formData.date} onChange={handleChange} required />
								</div>
								<div className={styles.formGroup}>
									<label>Description</label>
									<textarea className={styles.formControl} name="description" value={formData.description} onChange={handleChange} required />
								</div>
								<div className={styles.formGroup}>
									<label>Tag</label>
									{/* <pre>{JSON.stringify(selected)}</pre> */}
									<TagsInput
										value={selected}
										onChange={setSelected}
										name="fruits"
										placeHolder="enter tag"
									/>
									<em>press enter or comma to add new tag</em>
									{/* <textarea className={styles.formControl}
									name="tag" value={formData.tag} onChange={handleChange} required /> */}
								</div>
								<button type="submit" className={styles.submitButton}>Save changes</button>
							</form>
						</div>
					</div>
				</div>
			)}
			<ToastContainer />
		</>
	);
}

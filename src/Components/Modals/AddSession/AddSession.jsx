import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './AddSession.module.css';

export default function AddSession({ isOpen, onClose }) {
	const [formData, setFormData] = useState({
		sessionName: '',
		location: '',
		description: '',
		author: ''
	});
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

		// const postData = {
		// 	technology: formData.moduleName,
		// 	description: formData.description,
		// 	image: renderLogo

		// };
		// console.info("Post Data:", postData);

		try {
			// const res = await postCourse(postData);
			// console.info("Response from postCourse API:", res);
			toast.success("Session added successfully!");
		} catch (err) {
			console.error("Error while posting course data:", err);
			toast.error("Error adding course.");
		}
		// displayCourse();
		setFormData({
			sessionName: '',
			location: ' ',
			description: '',
			author: ''
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
									<label>Author<span className={styles.stare}>*</span></label>
									<input type="text" className={styles.formControl} name="Author" value={formData.author} onChange={handleChange} required />
								</div>
								<div className={styles.formGroup}>
									<label>Location</label>
									<input type="text" className={styles.formControl} name="location" value={formData.location} onChange={handleChange} required />
								</div>
								<div className={styles.formGroup}>
									<label>Description</label>
									<textarea className={styles.formControl} name="description" value={formData.description} onChange={handleChange} required />
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

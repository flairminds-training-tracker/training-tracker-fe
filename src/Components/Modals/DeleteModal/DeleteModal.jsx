import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { deleteData } from '../../../Services/Api';
import styles from './DeleteModal.module.css';

export default function DeleteModal({ Open, Close, id, getTopics }) {
	const handleDeleteClick = async() => {
		try {

			console.info(id, "id for delete");
			const res = await deleteData(id);
			console.info(res, "for delete");
			toast.success("Topic deleted successfully!");
			getTopics();

		} catch (err) {
			toast.error("Failed to delete topic!");
		}
		Close();
	};
	return (
		<>
			{Open && (
				<div className={styles.modal}>
					<div className={styles.modalContent}>
						<div className={styles.modalHeader}>
							<h5 className={styles.modalTitle}>Confirm Delete</h5>
							<button type="button" className={styles.closeButton} onClick={Close}>&times;</button>
						</div>
						<div className={styles.modalBody}>
							<p>Are you sure you want to delete this Topic?</p>
							<button onClick={ () => handleDeleteClick()} type="button" className={`btn btn-success ${styles.yesBtn}`}>Yes</button>
							<button onClick={Close}type="button" className={`btn btn-danger ${styles.noBtn}`}>No</button>
						</div>
					</div>
				</div>
			)}
			<ToastContainer />
		</>
	);
}

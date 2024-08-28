import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { Tooltip } from 'react-tooltip';
import EditModal from '../../Components/Modals/EditModal/EditModal';
import { updateStatusForTopic, uploadDoc } from '../../Services/Api';
import styles from './CourseTable.module.css';

const CourseTable = ({ tableHead, tableData, openVideoModal, setYoutubeSrc, setEditData, editData, getTopics, id}) => {
	const isAdmin = localStorage.getItem('adminToken');
	const [isEditModalOpen, setIsEditModalOpen] = useState(false);
	const [currentIndex, setCurrentIndex] = useState(null);
	const [selectedFile, setSelectedFile] = useState(null);
	// const [loading, setLoading] = useState(true);

	const handleEditClick = (rowData, rowIndex) => {
		setEditData(rowData);
		setCurrentIndex(rowIndex);
		setIsEditModalOpen(true);
	};

	const handleEditSubmit = (updatedData) => {
		console.info(updatedData, 'Updated Data');
		getTopics();
	};

	const handleStatusChange = async(rowIndex, event) => {
		const newStatus = event.target.value;
		try {
			const statusData = {
				id: tableData[rowIndex].topic_id,
				status: newStatus
			};
			// setLoading(true);
			const res = await updateStatusForTopic(statusData);
			console.info(res);
			getTopics();
		} catch (err) {
			console.info(err);
			// setLoading(false);
		}
	};

	const handleFileChange = async(event, rowIndex) => {
		setSelectedFile(event.target.files[0]);
		console.info(event.target.files[0], 'Selected File');
		const formData = new FormData();
		formData.append('assignments', event.target.files[0]);
		formData.append('tech_topic_id', tableData[rowIndex].topic_id);

		try {
			const response = await uploadDoc(formData);
			if (response.status === 200) {
				console.info('File uploaded successfully');
				toast.success("Topic added successfully!");
				getTopics();
			} else {
				console.error('Failed to upload file');
			}
		} catch (err) {
			console.error('Error uploading file:', err);
		}
	};

	const handleFileUpload = async (rowIndex) => {
		if (selectedFile) {
			const formData = new FormData();
			formData.append('assignments', event.target.files[0]);
			formData.append('tech_topic_id', tableData[rowIndex].topic_id);

			try {
				const response = await uploadDoc(formData);
				if (response.status === 200) {
					console.info('File uploaded successfully');
					toast.success("Assignment added successfully!");
					getTopics();
				} else {
					console.error('Failed to upload file');
				}
			} catch (err) {
				console.error('Error uploading file:', err);
			}
		} else {
			console.warn('No file selected for upload');
		}
	};

	return (
		<>
			<table className={styles.table}>
				<thead>
					<tr>
						{tableHead.map((header, index) => (
							<th key={index} className={styles.tableHeader}>{header.lable}</th>
						))}
					</tr>
				</thead>
				<tbody>
					{tableData.map((row, rowIndex) => (
						<tr key={rowIndex} className={styles.tableRow}>
							{tableHead.map((header, cellIndex) => (
								<td key={cellIndex} className={styles.tableCell}>
									{header.key === 'srNo' ? (
										rowIndex + 1
									) : header.type === "videoLink" ? (
										<>
											<img
												src={header.imgsrc}
												alt=""
												className={`${styles.image} ${(row[header.key] === "" || row[header.key] === null) ? styles.fadedImage : ""}`}
												onClick={() => {
													if (row[header.key]) {
														setYoutubeSrc(row[header.key]);
														openVideoModal();
													}
												}}
												style={{ cursor: row[header.key] ? 'pointer' : 'not-allowed' }}
											/>
											<Tooltip id="video-tooltip" place="top" effect="solid">
												Watch Video
											</Tooltip>
										</>
									) : header.type === "imageLink" ? (
										<>
											<Link to={row && row[header.key]} target='_blank' style={{ pointerEvents: row[header.key] ? 'auto' : 'none' }}>
												<img
													src={header.imgsrc}
													alt=""
													className={`${styles.image} ${(row[header.key] === "" || row[header.key] === null) ? styles.fadedImage : ""}`}
												/>
											</Link>
											<Tooltip id="image-tooltip" place="top" effect="solid">
												View Article
											</Tooltip>
										</>
									) : header.type === "practiceLink" ? (
										<>
											{console.info(row && row.practice, "link")}
											{/* <Link to={row && row[header.key]} target='_blank'
											style={{ pointerEvents: row[header.key] ? 'auto' : 'none' }}> */}
											<a href={row.practice} download>
												<img
													src={header.imgsrc}
													alt="Practice Doc"
													className={`${styles.image} ${(row[header.key] === "" || row[header.key] === null) ? styles.fadedImage : ""}`}
												/>
											</a>
											{/* </Link> */}
											<Tooltip id="practice-doc-tooltip" place="top" effect="solid">
												Practice Doc
											</Tooltip>
										</>
									) : header.type === "uploadAssignments" ? (
										<>
											<div>
												<label htmlFor={`file-upload-${rowIndex}`}>
													<img
														onClick={() => handleFileUpload(rowIndex)}
														src={header.imgsrc}
														alt="uploadAssignments"
														className={`${styles.image} ${(row[header.key] === "" || row[header.key] === null) ? styles.fadedImage : ""}`}
													/>
												</label>
												<button
													className={styles.uploadButton}
												>
													<input
														type="file"
														id={`file-upload-${rowIndex}`}
														onChange={(event) => handleFileChange(event, rowIndex)}
														className={styles.fileInput}
													/>
												</button>
												<Tooltip id="practice-doc-tooltip" place="top" effect="solid">
												Upload Assignment
												</Tooltip>
												<ToastContainer/>
											</div>
										</>
									) : header.key === 'status' ? (
										<select
											value={tableData ? tableData[rowIndex].status : ""}
											onChange={(e) => handleStatusChange(rowIndex, e)}
											className={styles.dropdown}
										>
											<option value="" disabled>Select Status</option>
											<option value="Not Started">Not Started</option>
											<option value="In Progress">In Progress</option>
											<option value="Complete">Complete</option>
										</select>
									) : header.key === 'Edit' && isAdmin == 1 ? (
										<>
											<img
												src={header.imgsrc}
												alt="Edit"
												className={styles.image}
												onClick={() => handleEditClick(row, rowIndex)}
												style={{ cursor: 'pointer' }}
												title="Edit"
											/>
											<Tooltip id="edit-tooltip" place="top" effect="solid">
												Edit
											</Tooltip>
										</>
									) : (
										row[header.key]
									)}
								</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
			<EditModal
				isOpen={isEditModalOpen}
				onClose={() => setIsEditModalOpen(false)}
				editData={editData}
				handleEditSubmit={handleEditSubmit}
				getTopics={getTopics}
				currentIndex={currentIndex}
				id={id}
			/>
			<ToastContainer />
		</>
	);
};

export default CourseTable;

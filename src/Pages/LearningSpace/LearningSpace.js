import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import EditPen from '../../../src/Assets/edit-pen.svg';
import Trash from '../../../src/Assets/trash.svg';
import Button from '../../Components/Button/CustomButton';
import DisplayCard from '../../Components/DishplayCard/DisplayCard';
import DisplayBox from '../../Components/DisplayBox/DisplayBox';
import AddTopic from '../../Components/Modals/AddTopic';
import { getCourse } from '../../Services/Api';
import styles from './LearningSpace.module.css';

export default function LearningSpace() {
	const [isAddTopicModalOpen, setIsAddTopicModalOpen] = useState(false);
	const [getCourses, setGetCourses] = useState([]);
	const [loading, setLoading] = useState(true);
	const [activeTab, setActiveTab] = useState('course');
	const [selectedVideoIndex, setSelectedVideoIndex] = useState(null);
	const isAdmin = localStorage.getItem('adminToken');
	const [note, setNote] = useState('');
	const [notes, setNotes] = useState([]);
	const [editIndex, setEditIndex] = useState(-1);
	const [editText, setEditText] = useState('');
	const [showFullText, setShowFullText] = useState({});

	const handleInputChange = (e) => {
		setNote(e.target.value);
	};

	const openAddTopic = () => {
		setIsAddTopicModalOpen(true);
	};

	const closeAddTopicModal = () => {
		setIsAddTopicModalOpen(false);
	};

	const displayCourse = async () => {
		try {
			setLoading(true);
			const res = await getCourse();
			setGetCourses(res.data.result);
		} catch (err) {
			console.error(err);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		displayCourse();
		setSelectedVideoIndex(null);
		setNotes([]);
	}, []);

	const handleDescriptionClick = (index) => {
		setSelectedVideoIndex(index);
	};

	const handleAddNote = () => {
		if (note) {
			setNotes([note, ...notes]);
			setNote('');
		}
	};

	const handleRemoveNote = (index) => {
		const newNotes = notes.filter((_, i) => i !== index);
		setNotes(newNotes);
	};

	const handleEdit = (index) => {
		setEditIndex(index);
		setEditText(notes[index]);
	};

	const handleEditChange = (e) => {
		setEditText(e.target.value);
	};

	const handleSaveEdit = (index) => {
		const updatedNotes = notes.map((item, i) => {
			if (i === index) {
				return editText;
			}
			return item;
		});
		setNotes(updatedNotes);
		setEditIndex(-1);
		setEditText('');
	};

	const formatDate = (dateString) => {
		return dateString.substring(0, 10);
	};
	//date, author, session name, description, notes[], notes-->id,note
	const links = [
		{
			id: "1",
			description: "Test Driven development in ReactJS and NodeJS",
			author: "Ajinkya Jagadale",
			date: "02 Aug 2024",
			location: 'Flairminds Software Pvt Ltd',
			topicsCovered: ['React.js', 'Vitest', 'Jest', 'Nodejs'],
			link: "https://stlearningspacesfm001.blob.core.windows.net/uploads/Session on Test Driven Development in React and Node JS-20240802_112510-Meeting Recording.mp4"
		},
		{
			id: "2",
			description: "Google Cloud",
			author: "Narayan Pisharoty",
			date: "02 July 2024",
			location: 'Flairminds Software Pvt Ltd',
			topicsCovered: ['Cloud', 'Google Cloud', 'Python'],
			link: "https://stlearningspacesfm001.blob.core.windows.net/uploads/Session on Google Cloud-20240702_072208-Meeting Recording.mp4"
		},
		{
			id: "3",
			description: "Introduction to AI",
			author: "Shriman Tiwari",
			date: "12 June 2024",
			location: 'Flairminds Software Pvt Ltd',
			topicsCovered: ['Python', 'AI/ML', 'SQL', 'Clustering'],
			link: "https://stlearningspacesfm001.blob.core.windows.net/uploads/Introduction to AI-20240612_124352-Enregistrement de la réunion.mp4"
		}
	];

	const handleToggleFullText = (index) => {
		setShowFullText((prevState) => ({
			...prevState,
			[index]: !prevState[index]
		}));
	};

	useEffect(() => {
		setSelectedVideoIndex(null);
	}, [activeTab === 'session']);

	return (
		<>
			<div className={styles.buttonGroup}>
				<button
					className={`${styles.tabButton} ${activeTab === 'course' ? styles.activeButton : ''}`}
					onClick={() => setActiveTab('course')}
				>
					<h6>Course</h6>
				</button>
				<button
					className={`${styles.tabButton} ${activeTab === 'session' ? styles.activeButton : ''}`}
					onClick={() => setActiveTab('session')}
				>
					<h6>Session</h6>
				</button>
			</div>

			{activeTab === 'course' && (
				<div>
					{isAdmin == 1 ? (
						<div className={styles.btnDiv}>
							<Button type="button" className="btn btn-primary" onClick={openAddTopic}>+ Add Course</Button>
						</div>
					) : null}
					<div>
						<h4 className={styles.allCourses}>All Courses</h4>
					</div>

					{loading ? (
						<div className="d-flex justify-content-center">
							<div className="spinner-border text-info" role="status">
								<span className="visually-hidden">Loading...</span>
							</div>
						</div>
					) : (
						<div className={styles.mainContainer}>
							<div className={styles.container1}>
								{getCourses.map((item, index) => (
									<DisplayBox
										key={index}
										id={item.course_id}
										logo={item.image}
										name={item.course}
										description={item.description}
										lastUpdate={formatDate(item.created_at)}
									/>
								))}
							</div>
						</div>
					)}

					<AddTopic isOpen={isAddTopicModalOpen} onClose={closeAddTopicModal} displayCourse={displayCourse} />
				</div>
			)}

			{/* {activeTab === 'session' && (
				<div>
					<div>
						<h4 className={styles.allCourses}>All Sessions</h4>
					</div>
					<div className={styles.displayCard}>
						<DisplayCard links={links}></DisplayCard>
					</div>
				</div>
			)} */}
			{activeTab === 'session' && (
				<div className={styles.sessionContainer}>
					{selectedVideoIndex === null ? (
						<>
							{isAdmin == 1 && (
								<div className={styles.btnDiv}>
									<Button type="button" className="btn btn-primary" onClick={openAddTopic}>+ Add Session</Button>
								</div>
							)}
							<div>
								<h4 className={styles.allCourses}>All Sessions</h4>
							</div>
							<div>
								<DisplayCard links={links} onDescriptionClick={handleDescriptionClick} />
							</div>
						</>
					) : (
						<>
							<div className={styles.cardContainer}>
								<div className={styles.videoContent}>
									<ReactPlayer
										url={links[selectedVideoIndex].link}
										width="100%"
										height="100%"
										controls={true}
									/>
									<div className={styles.cardDescription}>
										{links[selectedVideoIndex].description}
									</div>
								</div>
								<div className={styles.notes}>
									<div>
										<input className={styles.noteInput} type="text" value={note} onChange={handleInputChange}/>
										<button className={styles.addTask}
											onClick={handleAddNote}
										>Add</button>
									</div>
									<ul className={styles.addedNotes}>
										{notes.map((note, index) => (
											<li key={index} className={styles.listItem}>
												{editIndex === index ? (
													<>
														<input className={styles.noteInput} type="text" value={editText} onChange={handleEditChange} />
														<button
															onClick={() => handleSaveEdit(index)}
															className={styles.addTask}
														>Save</button>
													</>
												) : (
													<>
														<span
															className={`${styles.textContent} ${showFullText[index] ? styles.expand : ''}`}
															onClick={() => handleToggleFullText(index)}
														>
															{showFullText[index] ?
																note : note.length > 30 ?
																	`${note.substring(0, 30)}...`
																	: note}
														</span>
														<div className={styles.actionIcons}>
															<button
																onClick={() => handleEdit(index)}
																className={styles.icons}
															>
																<img src={EditPen} alt="Edit" />
															</button>
															<button
																onClick={() => handleRemoveNote(index)}
																className={styles.icons}
															>
																<img src={Trash} alt="Delete" />
															</button>
														</div>
													</>
												)}
											</li>
										))}
									</ul>

								</div>
							</div>
						</>
					)
					}
				</div>
			)}
		</>
	);
}

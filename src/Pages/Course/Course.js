import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
// import { useNavigate, Link } from 'react-router-dom';
import Article from '../../Assets/article.png';
import Back from '../../Assets/back1.png';
import Delete from '../../Assets/delete.png';
import EditImg from '../../Assets/edit.png';
import Practice from '../../Assets/practice.png';
import Status from '../../Assets/status.png';
import Upload from '../../Assets/upload.png';
import YouTube from '../../Assets/youtube.svg';
// import Back from '../../Assets/back.png';
import Button from '../../Components/Button/CustomButton';
import AddParticularTopic from '../../Components/Modals/AddParticularTopic';
import AddTopic from '../../Components/Modals/AddTopic';
import VideoModal from '../../Components/Modals/VideoModal/VideoModal';
import CourseTable from '../../Components/Table/CourseTable';
import { getTopic } from '../../Services/Api';
import styles from './Course.module.css';

export default function Course() {
	const location = useLocation();
	// const { id, logo, name } = location.state || {};
	const { logo, name, description, id } = location.state || {};
	// const [isModalOpen, setIsModalOpen] = useState(false);
	// const [assignments, setAssignments] = useState({});
	const [youtubeSrc, setYoutubeSrc] = useState(null);
	const [displayTopic, setDisplayTopic] = useState([]);
	const [loading, setLoading] = useState(true);
	const [editData, setEditData] = useState({
		moduleName: '',
		description: '',
		visitDate: '',
		topic: '',
		article: '',
		youtube: '',
		practice: '',
		assignments: ''
	});
	const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
	const isAdmin = localStorage.getItem('adminToken');
	useEffect(() => {
		console.info(editData, 'editdatas');
	}, [editData]);
	const navigate = useNavigate();

	console.info(id, "course page id");
	const handelBack = () => {
		navigate(`/LearningSpace`);
	};
	const getTopics = async () => {
		try {
			setLoading(true);
			const res = await getTopic(id);
			console.info("API response:", res.data.result);
			setDisplayTopic(res.data.result);
		} catch {
			console.info("error");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		getTopics();
	}, [id]);

	const openVideoModal = () => {
		// setYoutubeSrc(src);
		// setYoutubeSrc;
		setIsVideoModalOpen(true);
	};

	const closeVideoModal = () => {
		setIsVideoModalOpen(false);
		// setYoutubeSrc('');
	};
	// const link = 'https://www.youtube.com/embed/CKSdHsQyPYk?si=T6KU4ILrk5cE-xgM';
	// const articleLink = 'https://www.w3schools.com/js/js_functions.asp';
	// const practiceDocLink = '/30-days-of-react-ebook-fullstackio.pdf';
	// const tableHead = ["Id", "Topic", "Article", "YouTube", "Practice", "Assignments", "Edit"];
	const tableHead = [
		{lable: "Sr No.", key: "srNo"},
		{lable: "Topic Name", key: "topic"},
		{lable: "Article", key: "article", type: "imageLink", imgsrc: Article},
		{lable: "Video Tutorial", key: "youtube", type: "videoLink", imgsrc: YouTube},
		{lable: "Practice Doc.", key: "Practice", type: "practiceLink", imgsrc: Practice },
		{lable: "Upload Assignment", key: "Assignments", type: "uploadAssignments", imgsrc: Upload},
		{lable: "Status", key: "status", type: "dropDown", imgsrc: Status},
		...(isAdmin == 1 ? [{ lable: "Edit", key: "Edit", imgsrc: EditImg }, { lable: "Delete", key: "Delete", imgsrc: Delete } ] : [])
	];
	const [isAddTopicModalOpen, setIsAddTopicModalOpen] = useState(false);

	const openAddTopic = () => {
		setIsAddTopicModalOpen(true);
	};

	const closeAddTopicModal = () => {
		setIsAddTopicModalOpen(false);
	};
	const handleFileUpload = (e, index) => {
		const file = e.target.files[0];
		if (file) {
			console.info(`File uploaded for row ${index}:`, file);
		}
	};

	return (
		<div>
			<div className={styles.header}>
				<div>
					<img src={Back} alt="Back" className={styles.backBtn} onClick={handelBack} width={"30px"} />
					{/* <Button onClick={handelBack} >Back</Button> */}
				</div>
				{isAdmin == 1 ? (
					<Button type="button" className={`${styles.addTopic}btn btn-primary`} data-toggle="modal" data-target="#addTopic" onClick={openAddTopic}>+ Add Topic</Button>
				) : null}
			</div>
			<div className={styles.courseName}>
				<img src={logo} alt="Logo" className={styles.logo} width={"50px"} />
				<div className={styles.name}>{name}</div>
			</div>

			<AddTopic />
			<div className={styles.describtionContainer}>
				<p>{description}</p>
			</div>
			{loading ? (
				<div className="d-flex justify-content-center m-3">
					<div className="spinner-border text-info" role="status">
						<span className="visually-hidden">Loading...</span>
					</div>
				</div>
			) :
				(

					<div className={styles.table}>
						{console.info(displayTopic, "topic")}
						<CourseTable
							tableHead={tableHead}
							tableData={displayTopic}
							setYoutubeSrc={setYoutubeSrc}
							handleFileUpload={handleFileUpload}
							setEditData={setEditData}
							editData={editData}
							openVideoModal={openVideoModal}
							getTopics={getTopics}
							id={id}
						/>
						{/* <Edit getTopics={getTopics} editData={editData} setEditData={setEditData} id={id}/> */}
					</div>
				)}
			<div className={styles.footer}>

			</div>
			{console.info(youtubeSrc && youtubeSrc, "videosrc")}
			<VideoModal
				isOpen={isVideoModalOpen}
				onClose={closeVideoModal}
				videoSrc={youtubeSrc}
				getTopics={getTopics}
				id={id}
			/>
			{console.info(displayTopic.tech_id, 'displayTopic.tech_topic_id')}
			<AddParticularTopic isOpen={isAddTopicModalOpen} onClose={closeAddTopicModal}
				id={id} getTopics={getTopics}/>
		</div>
	);
}

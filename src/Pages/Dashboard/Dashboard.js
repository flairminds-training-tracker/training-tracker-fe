import React, { useEffect, useState } from "react";
import { fetchDashboard } from "../../Services/Api";
import stylesDash from "./Dashboard.module.css";

const Dashboard = () => {
	const [trainees, setTrainees] = useState([]);
	const [selectedTechnology, setSelectedTechnology] = useState("All");

	const fetchDashboardAPI = async () => {
		const data = await fetchDashboard();
		setTrainees(data);
	};

	useEffect(() => {
		fetchDashboardAPI();
	}, []);

	const handleTechnologyClick = (technology) => {
		setSelectedTechnology(technology);
	};

	const getPercentageColor = (percentage) => {
		if (percentage <= 30) {
			return stylesDash.redColorClass;
		} else if (percentage > 30 && percentage <= 70) {
			return stylesDash.yellowColorClass;
		} else {
			return stylesDash.greenColorClass;
		}
	};

	return (
		<div className={stylesDash.main}>
			<div className={stylesDash.div1}>
				<h2>My Trainig</h2>
			</div>
			<div className={stylesDash.div2}>
				<div className={stylesDash.oneDiv}>
					{trainees.map((trainee, index) => (
						<button
							className={stylesDash.btn}
							key={index}
							onClick={() => handleTechnologyClick(trainee.technology)}
						>
							<div className={stylesDash.btn_div}>
								<div className={stylesDash.tech}>{trainee.technology}</div>
								<div className={`${stylesDash.percentage}
										${getPercentageColor(trainee.percentage_of_activities)}`}
								>
							{Math.round(trainee.percentage_of_activities)}%
						</div>
						</div>
					</button>
					))}
				</div>
			{selectedTechnology && (
				<div className={stylesDash.twoDiv}>
                {trainees
					.filter((trainee) => trainee.technology === selectedTechnology)
					.map((selectedTrainee, index) => (
					<div className={stylesDash.act} key={index}>
						<div className={stylesDash.display}>
						<div className={stylesDash.innerDiv1}>
							<p>Completed:</p>
						</div>
						<div className={stylesDash.innerDiv2}>
							<p>{selectedTrainee.completed}</p>
						</div>
						</div>

						<div className={stylesDash.display}>
						<div className={stylesDash.innerDiv1}>
							<p>Progress:</p>
						</div>
						<div className={stylesDash.innerDiv2}>
							<p>{selectedTrainee.in_progress}</p>
						</div>
						</div>

						<div className={stylesDash.display}>
						<div className={stylesDash.innerDiv1}>
							<p>Not Started:</p>
						</div>
						<div className={stylesDash.innerDiv2}>
							<p>{selectedTrainee.not_started}</p>
						</div>
						</div>

						<div className={stylesDash.display}>
						<div className={stylesDash.innerDiv1}>
							<p>Delayed:</p>
						</div>
						<div className={stylesDash.innerDiv2}>
							<p>{selectedTrainee.delayed_}</p>
						</div>
						</div>

						<div className={stylesDash.display}>
						<div className={stylesDash.innerDiv1}>
							<p>Not Reviewed:</p>
						</div>
						<div className={stylesDash.innerDiv2}>
							<p>{selectedTrainee.not_reviewed}</p>
						</div>
						</div>
					</div>
					))}
				</div>
			)}
			</div>
		</div>
	);
};

export default Dashboard;

import React, { useEffect, useState } from "react";
import { fetchTraineeData } from "../../Services/Api";
import stylesActiveT from "./ActiveSearch.module.css";

const ActiveTrainee = ({ searchQuery }) => {
	const [trainees, setTrainees] = useState([]);
	const fetchDataFromAPI = async () => {
		const data = await fetchTraineeData();
		setTrainees(data);
	};

	useEffect(() => {
		fetchDataFromAPI();
	}, []);

	const filteredTrainees = trainees.filter((trainee) =>
		trainee.trainee_name.toLowerCase().includes(searchQuery.toLowerCase())
	);
	return (
		<div className={stylesActiveT.main1}>
			{filteredTrainees.length > 0 && filteredTrainees.map((trainee, i) => (
				<div className={stylesActiveT.card} key={i}>
					<div className={stylesActiveT.left}>
						<div className={stylesActiveT.upper}>
							<h4>Name: {trainee.trainee_name}</h4>
							<p>Trained By: {trainee.trained_by}</p>
						</div>
						<div className={stylesActiveT.lower}>
							<div className={stylesActiveT.comments}>
								<div className={stylesActiveT.innerComments}>
									<p className={stylesActiveT.p}>{trainee.unresolved_comments}</p>
									<p className={stylesActiveT.p}>Unresolved comments</p>
								</div>
								<div className={stylesActiveT.innerComments}>
									<p className={stylesActiveT.p}>{trainee.delayed_activities}</p>
									<p className={stylesActiveT.p}>Unreviwed comments</p>
								</div>

								<div className={stylesActiveT.innerComments}>
									<p className={stylesActiveT.p}>
										{trainee.activities_not_started}</p>
									<p className={stylesActiveT.p}>Activites not Started</p>
								</div>

								<div className={stylesActiveT.innerComments}>
									<p className={stylesActiveT.p}>
										{trainee.ununreviewed_statusresolved_comments}</p>
									<p className={stylesActiveT.p}>Activites Delay</p>
								</div>

							</div>
						</div>
					</div>
					<div className={stylesActiveT.right}>
						<p className={stylesActiveT.p}>
							{trainee.Completed_Activities_Percentage}%Completed
						</p>
						<p className={stylesActiveT.p}>Start Date:{trainee.last_due_Date}</p>
						<p className={stylesActiveT.p}>End Date:{trainee.last_due_Date}</p>
						<p className={stylesActiveT.p}>Technology:{trainee.technology}</p>

					</div>
				</div>

			))}
		</div>
	);
};

export default ActiveTrainee;

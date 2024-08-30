import React from 'react';
import ReactPlayer from 'react-player';
import LocationIcon from '../../Assets/location-2955.svg';
import styles from './DisplayCard.module.css';

export default function DisplayCard({ links, onDescriptionClick }) {

	return (
		<div className={styles.cardContainer}>
			{links.map((link, index) => (
				<div key={index} className={styles.card}>
					<ReactPlayer
						url={link.sessionUrl}
						width='400'
						height='300'
						controls={true}
					/>
					<div className={styles.cardDescription}>
						<h6 className={styles.name} onClick={() => onDescriptionClick(index)}>
							{link.name.length > 38
								? `${link.name.substring(0, 35)}...`
								: link.name}
						</h6>
						<div className={styles.otherDetails}>
							<p className={styles.description}>By&nbsp;{link.speaker}</p>
							<p className={styles.description}>On&nbsp;{link.date.substring(0, 10)}</p>
						</div>
						<div className={styles.locationDetails}>
							<img className={styles.locationIcon} src={LocationIcon} alt="location"/>
							<p className={styles.place}>Flairminds Software Pvt Ltd</p>
						</div>
						<div className={styles.topics}>
							{
								link.tags?.map((topic, index) => {
									return <p className={styles.topic} key={index}>{topic}</p>;
								})
							}
						</div>
					</div>
				</div>
			))}
		</div>
	);
}

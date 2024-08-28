import React from 'react';
import ReactPlayer from 'react-player';
import styles from './Card.module.css';

const Card = ({ link, key, onDescriptionClick }) => {
	return (
		<div key={key} className={styles.card}>
			<ReactPlayer
				url={link.link}
				width="100%"
				height="100%"
				controls={true}
			/>
			<div className={styles.cardDescription} onClick={onDescriptionClick}>
				{link.description.length > 100
					? `${link.description.substring(0, 100)}...`
					: link.description}
			</div>
		</div>
	);
};

export default Card;

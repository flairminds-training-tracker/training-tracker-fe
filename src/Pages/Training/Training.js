// import React, { useState, useEffect } from "react";
// import {
//   fetchTraineeDataTrainingCards,
//   fetchTraineeDataTrainingDropDown
// } from "../../Services/Api";
// import TrainingStyles from "./Training.module.css";
// import Trainingcards from "./Trainingcards";

// function Dropdown() {
//   const [trainees, setTrainees] = useState([]);
//   const [selectedValue, setSelectedValue] = useState(-1);
//   const [showAllTrainees, setShowAllTrainees] = useState([]);
//   const [allTraineeKeys, setAlltraineeKeys] = useState([]);

//   const fetchDataFromAPI = async () => {
//     try {
//       const data = await fetchTraineeDataTrainingDropDown();
//       setTrainees(data);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };

//   useEffect(() => {
//     fetchDataFromAPI();
//   }, []);

//   useEffect(() => {
//     const fetchDataFromAPIDisplay = async () => {
//       try {
//         const data = await fetchTraineeDataTrainingCards(selectedValue);
//         setShowAllTrainees(data);
//         setAlltraineeKeys(Object.keys(data));
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };
//     fetchDataFromAPIDisplay();
//   }, [selectedValue]);

//   const handleSelectChange = (event) => {
//     const newValue = event.target.value;
//     setSelectedValue(newValue);
//   };

//   return (
//     <div className={TrainingStyles.main}>
//       <div className={TrainingStyles.firstDiv}>
//         <div className={TrainingStyles.input}>
//           <input placeholder="Seach Activity Name"></input>
//         </div>
//         <div className={TrainingStyles.select}></div>
//         <select value={selectedValue} onChange={handleSelectChange}>
//           <option value={-1}>All</option>
//           {trainees.map((trainee) => (
//             <option key={trainee.status_id} value={trainee.status_id}>
//               {trainee.status_display}
//             </option>
//           ))}
//         </select>
//       </div>

//       <div className={TrainingStyles.DivFather}>
//         <div className={TrainingStyles.SecondDiv}>
//           {allTraineeKeys.map((el, i) => (
//             <Trainingcards activities={showAllTrainees[el]} language={el} key={i}/>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Dropdown;

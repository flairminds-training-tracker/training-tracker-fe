import React, { useState } from 'react'
import style from "./Admin.module.css"
import AllocateTraining from '../../Components/AllocateTraining/AllocateTraining';
import AddUser from '../../Components/AddUser/AddUser';
export default function Admin() {
  const [activeTab, setActiveTab] = useState("allocateTraining");
	const handleTabClick = (tabName) => {
		setActiveTab(tabName);
	};
  return (
    <div className='container'>
      <div className='row'>
        <div className='col mt-3'>
          <div className={style.btnDiv}>
            <button onClick={() => handleTabClick('allocateTraining')} className={style.AtBtn}>Allocate training </button>
            <button onClick={() => handleTabClick('addUser')} className={style.AtBtn} >Add User</button>
          </div>
        <div>
        <div className={style.tabContent}>
				{activeTab === 'allocateTraining' && (
					<AllocateTraining />
				)}
				{activeTab === 'addUser' && (
					<AddUser />
				)}
			</div>
      </div>
    </div>
    </div>
    </div>
  )
}

import React, { useState } from 'react';
import ActiveTrainee from '../../Components/ActiveTrainee/ActiveTrainee';
import Button from '../../Components/Button/Button';
import OldTrainee from '../../Components/OldTrainee/OldTrainee';
import stylesT from "./Trainees.module.css";

const Trainees = () => {
  const [activeTab, setActiveTab] = useState("active");
  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };
  const [searchQuery, setSearchQuery] = useState("");
return (
    <div className={stylesT.parentTrainee}>
      <div className={stylesT.tabNavigation}>
        <div className={stylesT.buttons}>
         <Button widthParameter='100px' colorParameter='white' backgroundColorParameter=' #141544' onClick={() => handleTabClick('active')}> Active </Button>
         <Button widthParameter='100px' colorParameter='white' backgroundColorParameter='#141544' onClick={() => handleTabClick('old')} > Old </Button>
        </div>
        <input className={stylesT.input}
        type="text"
        placeholder="Search"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      </div>
        {activeTab === 'active' && (
          <ActiveTrainee searchQuery={searchQuery} />
        )}
        {activeTab === 'old' && (
          <OldTrainee searchQuery={searchQuery}/>
        )}
    </div>
  );
};

export default Trainees;

import React from "react";
export default function Button(props) {

  const { children, widthParameter, heightParameter, colorParameter,
     backgroundColorParameter, onClick, type } = props;

const customStyle = {
  width: widthParameter,
  height: heightParameter,
  color: colorParameter,
  backgroundColor: backgroundColorParameter
};

return (

<button style={customStyle} onClick={onClick} type={type}> {children} </button>
);

}


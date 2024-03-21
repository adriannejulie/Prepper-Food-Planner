import React from 'react';


import "./TextWithLineBreaks.css";
function TextWithLineBreaks(props) {
  const textWithBreaks = props.text.split('\n').map((text, index) => (
    <React.Fragment key={index}>
      {text}
      <br />
    </React.Fragment>
  ));

  return <div className="overflow">{textWithBreaks}</div>;
}

export default TextWithLineBreaks;
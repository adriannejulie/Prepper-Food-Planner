import React from 'react';


import "./TextWithLineBreaks.css";
function TextWithLineBreaks(props) {


    if (props.text){

        const textWithBreaks = props.text.split('\n').map((text, index) => (
            (props.text === undefined ? <br/> : <React.Fragment key={index}>
            {text}
            <br />
            </React.Fragment>
            )
        ));
    
        return <div className="overflow">{textWithBreaks}</div>;

        
    } else {
        return <br></br>
    
    }
}

export default TextWithLineBreaks;
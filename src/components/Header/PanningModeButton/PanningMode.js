import React from 'react';
import "./PanningMode.scss"

const PanningModeButton = ({handlePanningMode, panningMode}) => {
    return (
            <button className="panningButton"
                onClick={handlePanningMode} >
                Panning Mode
            </button>
    );
};

export default PanningModeButton;

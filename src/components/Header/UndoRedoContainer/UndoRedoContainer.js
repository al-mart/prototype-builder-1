import React from 'react';
import "./UndoRedoContainer.scss";

const UndoRedoContainer = ({handleUndoAndRedo}) => {
    return (
        <React.Fragment >
            <button className="undoredoButton" onClick={ () => handleUndoAndRedo('undo') } >&#8634;</button>
            <button className="undoredoButton" onClick={() => handleUndoAndRedo('redo')} >&#8635;</button>
        </React.Fragment>
    );
};

export default UndoRedoContainer;

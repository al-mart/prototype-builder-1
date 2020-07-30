import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'

import UndoAndRedo from "./UndoRedoContainer/UndoRedoContainer";
import PanningModeButton from "./PanningModeButton/PanningMode";
import "./HeaderContainer.scss"

const HeaderContainer = ({
    currentElement,
    handleRemove,
    handleUndoAndRedo,
    panningMode,
    handlePanningMode,
}) => {
    return (
        <div className="header-container">
            <header className="header-container__headings">
                <h1 className="header-container__headings-item">Team Add Objects</h1>
                <h2 className="header-container__headings-item">Prototype Builder</h2>
            </header>
            <div className="header-container__actionButtons">
                <UndoAndRedo handleUndoAndRedo={handleUndoAndRedo} />
                <PanningModeButton
                    panningMode={panningMode}
                    handlePanningMode={handlePanningMode} />
                <button
                    disabled={!Object.keys(currentElement).length > 0}
                    className="btn btn-danger fontAwesome__override"
                    onClick={() => handleRemove(currentElement)}
                ><FontAwesomeIcon icon={faTrashAlt} /></button>
            </div>
        </div>
    );
};

export default HeaderContainer;

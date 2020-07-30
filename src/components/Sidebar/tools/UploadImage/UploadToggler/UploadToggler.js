import React, {useState} from "react";
import "./UploadToggler.scss";

const UploadToggler = (props) => {

    const [state, setState] = useState({ pcSelected: props.uploadFromPc});

    const toggleHandler = (value) => {
        const newState = {};
        newState.pcSelected = value === "pc";
        setState(newState);
        props.toggleChange(newState.pcSelected);
    };

    const webTogglerClasses = [
        "buttons-wrapper__item"
    ];
    const pcTogglerClasses = [
        "buttons-wrapper__item"
    ];

    state.pcSelected ? pcTogglerClasses.push("buttons-wrapper__item-selected") : webTogglerClasses.push("buttons-wrapper__item-selected");

    return (
      <div className="buttons-wrapper">
          <button onClick={() =>toggleHandler("web")} className={webTogglerClasses.join(" ")} >Url</button>
          <button onClick={() =>toggleHandler("pc")} className={pcTogglerClasses.join(" ")}>PC</button>
      </div>
    );
};

export default UploadToggler;
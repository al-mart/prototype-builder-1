import React, {useState} from "react";
import UploadImageByUrl from "./UploadImageByUrl/UploadImageByUrl";
import UploadImageFromPC from "./UploadImageFromPC/UploadImageFromPC";
import UploadToggler from "./UploadToggler/UploadToggler";


const UploadImage = (props) => {

    const [state, setState] = useState({
        uploadFromPc: true
    });

    const toggleChangeHandler = () => {
        let newState = {
            uploadFromPc: !state.uploadFromPc
        };
        setState(newState);
    };

    const {handleAdd} = props;

    return (
        <div>
            <UploadToggler uploadFromPc={state.uploadFromPc} toggleChange={toggleChangeHandler}/>
            {state.uploadFromPc ? <UploadImageFromPC handleAdd={handleAdd}/>: <UploadImageByUrl handleAdd={handleAdd}/>}
        </div>
    );
};


export default UploadImage;
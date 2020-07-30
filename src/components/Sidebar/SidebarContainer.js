import React from 'react';


import Rect from "./tools/Rect";
import TextBox from "./tools/TextBox";
import Divider from "./tools/Divider";
import UploadImage from "./tools/UploadImage/UploadImage";
import Button from "./tools/Button";
import Circle from './tools/Circle';

import './SidebarContainer.scss';

class SidebarContainer extends React.Component {
    render() {
        const { handleAdd } = this.props;
        return (
            <div className="sidebarWrapper">
                <UploadImage handleAdd={handleAdd} />
                <Rect handleAdd={handleAdd} />
                {/* <Triangle handleAdd={handleAdd} /> */}
                <Circle handleAdd={handleAdd} />
                <TextBox handleAdd={handleAdd} fontSize="32" name="Header"/>
                <TextBox handleAdd={handleAdd} fontSize="24" name="Subheader"/>
                <TextBox handleAdd={handleAdd} fontSize="16" name="Text"/>
                <Divider handleAdd={handleAdd} />
                <Button handleAdd={handleAdd} />
            </div>
        );
    }
}

export default SidebarContainer;

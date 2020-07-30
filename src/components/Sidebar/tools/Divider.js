import React from 'react';
import { fabric } from 'fabric';
import { v4 as uuid } from 'uuid';

import {SidebarItem} from "../../../assets/styles/SidebarItem.style";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const Divider = ({ handleAdd }) => {
    const handleClick = () => {
        const divider = new fabric.Line([0,0, 200,0], {
            id: uuid(),
            top: 30,
            left: 100,
            width: 500,
            stroke: "#000000",
            strokeWidth: 4,
            strokeDashArray: [0, 0],
            // lockScalingY: true,
            strokeUniform: true
        });
        return handleAdd(divider);
    };

    return (
        <SidebarItem onClick={handleClick}>
            <span>Divider</span>
        </SidebarItem>
    );
};


export default Divider;

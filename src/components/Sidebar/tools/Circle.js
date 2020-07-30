import React from 'react';
import {fabric} from 'fabric';
import { v4 as uuid } from 'uuid';

import {SidebarItem} from "../../../assets/styles/SidebarItem.style";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const Circle = ({handleAdd}) => {
    const handleClick = () => {
        const circle = new fabric.Circle({
            id: uuid(),
            top: 100,
            left: 100,
            radius: 30,
            fill: '#FFFFFF',
            stroke: '#000000',
            strokeWidth: 2,
            strokeUniform: true,
        });
        return handleAdd(circle);
    };

    return (
        <SidebarItem onClick={handleClick}>
            <span>Circle</span>
        </SidebarItem>
    );
};


export default Circle;

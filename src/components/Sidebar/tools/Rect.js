import React from 'react';
import { fabric } from 'fabric';
import { reduce } from 'lodash';
import { v4 as uuid } from 'uuid';

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {SidebarItem} from "../../../assets/styles/SidebarItem.style";

const Rect = ({ handleAdd }) => {
    const handleClick = () => {
        const rect = new fabric.Rect({
            id: uuid(),
            top: 50,
            left: 75,
            width: 450,
            height: 50,
            fill: '#FFFFFF',
            stroke: '#000000',
            strokeWidth: 3,
            rx: 0,
            ry: 0,
            strokeUniform: true,
        });
        return handleAdd(rect);
    };
    return (
        <SidebarItem onClick={handleClick}>
            <span>Rectangle</span>
        </SidebarItem>
    );
};


export default Rect;

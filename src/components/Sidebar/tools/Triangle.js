import React from 'react';
import { fabric } from 'fabric';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {SidebarItem} from "../../../assets/styles/SidebarItem.style";

const Triangle = ({ handleAdd }) => {
    const handleClick = () => {
        const triangle = new fabric.Triangle({
            top: 200,
            left: 100,
            width: 50,
            height: 50,
            fill: 'transparent',
            stroke: '#000000',
            strokeWidth: 2,
            strokeUniform: true
        });
        return handleAdd(triangle);
    };

    return (
        <SidebarItem onClick={handleClick}>
            <span>Triangle</span>
        </SidebarItem>
    );
};


export default Triangle;

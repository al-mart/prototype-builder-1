import React from 'react';
import { fabric } from 'fabric';

const Rect = ({ handleAdd }) => {
    const handleClick = () => {
        const rect = new fabric.Rect({
            top: 200,
            left: 100,
            width: 50,
            height: 50,
            fill: '#000000',
            stroke: '#000000',
            strokeWidth: 0
        });
        return handleAdd(rect);
    };
    return (
        <button className="btn btn-light" onClick={handleClick} >
            Rectangle
        </button>
    );
};


export default Rect;

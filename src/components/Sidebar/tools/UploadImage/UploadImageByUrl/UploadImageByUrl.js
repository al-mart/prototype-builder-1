import React, {useRef} from 'react';
import {fabric} from 'fabric';

import "./UploadImageByUrl.scss";

const UploadImageByUrl = ({handleAdd}) => {
    const ref = useRef();
    const handleSubmit = (e) => {
        e.preventDefault();
        let value = ref.current.value;
        value = value.replace(/\s+/g, '');
        if (value){
            fabric.Image.fromURL(value, function (img) {
                ref.current.value = '';
                return handleAdd(img);
            });
        }
    };
    return (
        <form className='formWrapper' onSubmit={handleSubmit} >
            <input className='formWrapper__input'
                ref={ref}
                placeholder='URL...'
                type="text"/>
                <button className='formWrapper__button' type='submit' >
                    ADD
                </button>
        </form>
    );
};

export default UploadImageByUrl;

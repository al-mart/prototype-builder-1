import React from 'react';
import {fabric} from 'fabric';
import './UploadImageFromPC.scss';
import {faUpload} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

class UploadImageFromPC extends React.Component {
    state = {
        labelName: "Choose a file...",
        chooseFiles: [],
    };
    handleChange = (e) => {
        const fileName = e.nativeEvent.target.files[0].name;
        e.persist();
        const files = [...e.target.files];
        this.setState({
            labelName: fileName,
            chooseFiles: files
        });
    };
    handleClick = () => {
        const handleAdd = (input) => {
            this.props.handleAdd(input);
        };
        this.state.chooseFiles.forEach((file) => {
            const fileType = file.type;
            const url = URL.createObjectURL(file);
            if (fileType === 'image/png' || 'image/jpeg') { //check if png
                fabric.Image.fromURL(url, function (img) {
                    handleAdd(img);
                }, {
                    // width: '180',
                    // height: '180',
                    stroke: '#000000',
                    strokeWidth: 3,
                });
            } else if (fileType === 'image/svg+xml') { //check if svg
                fabric.loadSVGFromURL(url, function (objects, options) {
                    const svg = fabric.util.groupSVGElements(objects, options);
                    // svg.scaleToWidth(180);
                    // svg.scaleToHeight(180);
                    handleAdd(svg);
                });
            }
        });
    };

    render() {
        return (
            <div>

                <input onChange={this.handleChange} type="file" name="file" id="file" className="inputfile"/>
                <div className="labelContainer">
                    <FontAwesomeIcon icon={faUpload} />
                    <label htmlFor="file">{this.state.labelName}</label>
                </div>

                <button className='inputButton' onClick={this.handleClick}>ADD</button>
            </div>
        );
    }
}

export default UploadImageFromPC;

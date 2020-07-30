import React from 'react';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAlignCenter, faAlignJustify, faAlignLeft, faAlignRight } from '@fortawesome/free-solid-svg-icons'

import './TextSettings.scss';

class TextSettings extends React.Component {

    state = {
        inputs: {
            fill: this.props.currentElement.fill,
            fontSize: this.props.currentElement.fontSize,
            fontFamily: this.props.currentElement.fontFamily,
            fontWeight: this.props.currentElement.fontWeight,
            fontStyle: this.props.currentElement.fontStyle,
            textAlign: this.props.currentElement.textAlign,
            textDecoration: '',
            strokeWidth: this.props.currentElement.strokeWidth,
            stroke: this.props.currentElement.stroke,
            lineHeight: this.props.currentElement.lineHeight,
        }
    };

    componentDidUpdate = (prevProps) => {

        let textDecoration = '';
        if (this.props.currentElement.underline) {
            textDecoration = 'underline'
        } else if (this.props.currentElement.linethrough) {
            textDecoration = 'linethrough'
        } else if (this.props.currentElement.overline) {
            textDecoration = 'overline'
        };

        if (prevProps.currentElement !== this.props.currentElement) {
            const newAtts = {
                fill: this.props.currentElement.fill,
                fontSize: this.props.currentElement.fontSize,
                fontFamily: this.props.currentElement.fontFamily,
                fontWeight: this.props.currentElement.fontWeight,
                fontStyle: this.props.currentElement.fontStyle,
                textAlign: this.props.currentElement.textAlign,
                textDecoration: textDecoration,
                strokeWidth: this.props.currentElement.strokeWidth,
                stroke: this.props.currentElement.stroke,
                lineHeight: this.props.currentElement.lineHeight,
            }
            this.setState({ inputs: newAtts })
        };
    };

    handleChange = (event, type) => {
        let value = event.target.value;
        let newInputs = { ...this.state.inputs };
        newInputs[type] = value;
        this.setState({ inputs: newInputs });

        if (type === 'fontSize' || type === 'strokeWidth' || type === 'fontWeight' || type === 'lineHeight') {
            value = +value
        }

        if (type === 'textDecoration') {
            this.props.elementChange({ 'underline': false, 'linethrough': false, 'overline': false });
            type = value;
            value = true;
        }
        this.props.elementChange({ [type]: value })

    };

    render() {
        return (
            <div className="textSettings itemSettings">
                <div className="flexInput">
                    <label>Text Color</label>
                    <input
                        type="color"
                        onChange={(_) => this.handleChange(_, 'fill')}
                        value={this.state.inputs.fill} />
                </div>
                <div className="flexInput">
                    <label>Font Size (px)</label>
                    <input type="number" value={this.state.inputs.fontSize} onChange={(_) => this.handleChange(_, 'fontSize')} />
                </div>
                <div className="flexInput">
                    <label>Line height (em)</label>
                    <input type="number" step="0.1" value={this.state.inputs.lineHeight} onChange={(_) => this.handleChange(_, 'lineHeight')} />
                </div>
                <div className="flexInput">
                    <label>Font Family</label>
                    <select onChange={(_) => this.handleChange(_, 'fontFamily')} value={this.state.inputs.fontFamily}>
                        <option value="Arial">Arial</option>
                        <option value="Times New Roman">Times New Roman</option>
                    </select>
                </div>
                <div className="flexInput">
                    <label>Font Weight</label>
                    <select onChange={(_) => this.handleChange(_, 'fontWeight')} value={this.state.inputs.fontWeight}>
                        <option value="0"></option>
                        <option value="300">300</option>
                        <option value="400">400</option>
                        <option value="500">500</option>
                        <option value="600">600</option>
                        <option value="700">700</option>
                        <option value="900">900</option>
                    </select>
                </div>
                <div>
                    <div className="textAlignSettings">
                        <div>
                            <input
                                type="radio"
                                name="textAlign"
                                value="left"
                                id="left"
                                onChange={(_) => this.handleChange(_, 'textAlign')}
                                checked={this.state.inputs.textAlign === 'left'} />
                            <label htmlFor="left"><FontAwesomeIcon icon={faAlignLeft} /></label>
                        </div>
                        <div>
                            <input
                                type="radio"
                                name="textAlign"
                                value="center"
                                id="center"
                                onChange={(_) => this.handleChange(_, 'textAlign')}
                                checked={this.state.inputs.textAlign === 'center'} />
                            <label htmlFor="center"><FontAwesomeIcon icon={faAlignCenter} /></label>
                        </div>
                        <div>
                            <input
                                type="radio"
                                name="textAlign"
                                value="right"
                                id="right"
                                onChange={(_) => this.handleChange(_, 'textAlign')}
                                checked={this.state.inputs.textAlign === 'right'} />
                            <label htmlFor="right"><FontAwesomeIcon icon={faAlignRight} /></label>
                        </div>
                        <div>
                            <input
                                type="radio"
                                name="textAlign"
                                value="justify"
                                id="justify"
                                onChange={(_) => this.handleChange(_, 'textAlign')}
                                checked={this.state.inputs.textAlign === 'justify'} />
                            <label htmlFor="justify"><FontAwesomeIcon icon={faAlignJustify} /></label>
                        </div>
                    </div>
                </div>
                <div className="flexInput">
                    <label>Text Decoration</label>
                    <select onChange={(_) => this.handleChange(_, 'textDecoration')} value={this.state.inputs.textDecoration}>
                        <option value="">None</option>
                        <option value="underline">Underline</option>
                        <option value="linethrough">Linethrough</option>
                        <option value="overline">Overline</option>
                    </select>
                </div>
                <div className="flexInput">
                    <label>Font Style</label>
                    <select onChange={(_) => this.handleChange(_, 'fontStyle')} value={this.state.inputs.fontStyle}>
                        <option value="normal">Normal</option>
                        <option value="italic">Italic</option>
                    </select>
                </div>
                <div className="flexInput">
                    <label>Stroke Width (px)</label>
                    <input type="number" step="0.1" value={this.state.inputs.strokeWidth} onChange={(_) => this.handleChange(_, 'strokeWidth')} />
                </div>
                <div className="flexInput">
                    <label>Stroke Color</label>
                    <input
                        type="color"
                        onChange={(_) => this.handleChange(_, 'stroke')}
                        value={this.state.inputs.stroke}
                    />
                </div>
            </div>
        );
    }
}

export default TextSettings;

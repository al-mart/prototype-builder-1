import React, { Component } from 'react';

class ButtonSettings extends Component {
    state = {
        rect: {
            ...this.props.currentElement.item(0)
        },
        text: {
            ...this.props.currentElement.item(1)
        }
    };

    handleTextChange = (event, type) => {
        let newInputs = { ...this.state.text };
        let value = event.target.value;
        newInputs[type] = value;

        if (type === 'fontSize' || type === 'strokeWidth' || type === 'fontWeight' || type === 'lineHeight') {
            value = +value;
        }

        if (type === 'textDecoration') {
            this.props.elementChange({ 'underline': false, 'linethrough': false, 'overline': false });
            type = value;
            value = true;
        }
        this.props.elementChange({ [type]: value }, this.props.currentElement.item(1));
        this.setState({ text: newInputs });
    };

    handleRectChange = (event, type) => {
        let newInputs = { ...this.state.rect };
        let value = event.target.value;
        newInputs[type] = value;

        if (type === 'fill') {
            this.setState({ text : {...this.state.text, fill: value }});
            this.props.elementChange({ textBackgroundColor: value }, this.props.currentElement.item(1));
        }

        if (type === 'fontSize' || type === 'strokeWidth' || type === 'fontWeight' || type === 'lineHeight') {
            value = +value;
        }

        if (type === 'textDecoration') {
            this.props.elementChange({ 'underline': false, 'linethrough': false, 'overline': false });
            type = value;
            value = true;
        }
        this.props.elementChange({ [type]: value }, this.props.currentElement.item(0));
        this.setState({ rect: newInputs });
    };

    render() {
        return (
            <div>
                <p>button styles</p>
                <div>
                    <label>Fill</label>
                    <input
                        type="color"
                        onChange={(_) => this.handleRectChange(_, 'fill')}
                        value={this.state.rect.fill} />
                </div>
                <div>
                    <label>Stroke Width (px)</label>
                    <input type="number" step="1" value={this.state.rect.strokeWidth} onChange={(_) => this.handleRectChange(_, 'strokeWidth')} />
                </div>
                {this.props.currentElement.type !== 'rect' ? null : <div>
                    <label>Border radius (px)</label>
                    <input type="number" value={this.state.rect.ry} onChange={(_) => this.handleRectChange(_, 'ry')} />
                </div>}

                <div>
                    <label>Stroke Color</label>
                    <input
                        type="color"
                        onChange={(_) => this.handleRectChange(_, 'stroke')}
                        value={this.state.rect.stroke}
                    />
                </div>
                <div>
                    <label>Opacity:</label>
                    <input
                        type="range"
                        name="opacity"
                        min="0"
                        max="1"
                        step="0.05"
                        value={this.state.rect.opacity}
                        onChange={(_) => this.handleRectChange(_, 'opacity')}
                    />
                </div>
                <p>Text styles</p>
                <div>
                    <label>Text Color</label>
                    <input
                        type="color"
                        onChange={(_) => this.handleTextChange(_, 'fill')}
                        value={this.state.text.fill} />
                </div>
                <div>
                    <label>Font Size (px)</label>
                    <input type="number" value={this.state.text.fontSize} onChange={(_) => this.handleTextChange(_, 'fontSize')} />
                </div>
                <div>
                    <label>Line height (em)</label>
                    <input type="number" step="0.1" value={this.state.text.lineHeight} onChange={(_) => this.handleTextChange(_, 'lineHeight')} />
                </div>
                <div>
                    <label>Font Family</label>
                    <select onChange={(_) => this.handleTextChange(_, 'fontFamily')} value={this.state.text.fontFamily}>
                        <option value="">Choose font family</option>
                        <option value="Arial">Arial</option>
                        <option value="Times New Roman">Times New Roman</option>
                    </select>
                </div>
                <div>
                    <label>Font Weight</label>
                    <select onChange={(_) => this.handleTextChange(_, 'fontWeight')} value={this.state.text.fontWeight}>
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
                    <p>Text Align</p>
                    <div>
                        <div>
                            <input
                                type="radio"
                                name="textAlign"
                                value="left"
                                id="left"
                                onChange={(_) => this.handleTextChange(_, 'textAlign')}
                                checked={this.state.text.textAlign === 'left'} />
                            <label htmlFor="left">Left</label>
                        </div>
                        <div>
                            <input
                                type="radio"
                                name="textAlign"
                                value="center"
                                id="center"
                                onChange={(_) => this.handleTextChange(_, 'textAlign')}
                                checked={this.state.text.textAlign === 'center'} />
                            <label htmlFor="center">Center</label>
                        </div>
                        <div>
                            <input
                                type="radio"
                                name="textAlign"
                                value="right"
                                id="right"
                                onChange={(_) => this.handleTextChange(_, 'textAlign')}
                                checked={this.state.text.textAlign === 'right'} />
                            <label htmlFor="right">Right</label>
                        </div>
                        <div>
                            <input
                                type="radio"
                                name="textAlign"
                                value="justify"
                                id="justify"
                                onChange={(_) => this.handleTextChange(_, 'textAlign')}
                                checked={this.state.text.textAlign === 'justify'} />
                            <label htmlFor="justify">Justify</label>
                        </div>
                    </div>
                </div>
                <div>
                    <label>Text Decoration</label>
                    <select onChange={(_) => this.handleTextChange(_, 'textDecoration')} value={this.state.text.textDecoration}>
                        <option value="">None</option>
                        <option value="underline">Underline</option>
                        <option value="linethrough">Linethrough</option>
                        <option value="overline">Overline</option>
                    </select>
                </div>
                <div>
                    <label>Font Style</label>
                    <select onChange={(_) => this.handleTextChange(_, 'fontStyle')} value={this.state.text.fontStyle}>
                        <option value="normal">Normal</option>
                        <option value="italic">Italic</option>
                    </select>
                </div>
                <div>
                    <label>Stroke Width (px)</label>
                    <input type="number" step="0.1" value={this.state.text.strokeWidth} onChange={(_) => this.handleTextChange(_, 'strokeWidth')} />
                </div>
                <div>
                    <label>Stroke Color</label>
                    <input
                        type="color"
                        onChange={(_) => this.handleTextChange(_, 'stroke')}
                        value={this.state.text.stroke}
                    />
                </div>
            </div>
        );
    }
}

export default ButtonSettings;

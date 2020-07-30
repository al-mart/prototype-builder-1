import React from 'react';

class ShapeSettings extends React.Component {

    state = {
        inputs: {
            fill: this.props.currentElement.fill,
            strokeWidth: this.props.currentElement.strokeWidth,
            stroke: this.props.currentElement.stroke,
            opacity: this.props.currentElement.opacity,
            ry: this.props.currentElement.ry,
        }
    };

    componentDidUpdate = (prevProps) => {
        if (prevProps.currentElement !== this.props.currentElement) {
            const newAtts = {
                fill: this.props.currentElement.fill,
                strokeWidth: this.props.currentElement.strokeWidth,
                stroke: this.props.currentElement.stroke,
                opacity: this.props.currentElement.opacity,
                ry: this.props.currentElement.ry,
            }
            this.setState({ inputs: newAtts })
        };
    };

    handleChange = (event, type) => {
        let value = event.target.value;
        let newInputs = { ...this.state.inputs };
        newInputs[type] = value;
        this.setState({ inputs: newInputs });

        if (type === 'opacity' || type === 'strokeWidth') {
            value = +value
        }
        if (type === 'ry') {
            this.props.elementChange({ rx: value, ry: value })
        } else {
            this.props.elementChange({ [type]:value })
        }
    };

    render() {
        return (
            <div>
                <div>
                    <label>Fill</label>
                    <input
                        type="color"
                        onChange={(_) => this.handleChange(_, 'fill')}
                        value={this.state.inputs.fill} />
                </div>
                <div>
                    <label>Stroke Width (px)</label>
                    <input type="number" step="1" value={this.state.inputs.strokeWidth} onChange={(_) => this.handleChange(_, 'strokeWidth')} />
                </div>
                {this.props.currentElement.type !== 'rect' ? null : <div>
                    <label>Border radius (px)</label>
                    <input type="number" value={this.state.inputs.ry} onChange={(_) => this.handleChange(_, 'ry')} />
                </div>}

                <div>
                    <label>Stroke Color</label>
                    <input
                        type="color"
                        onChange={(_) => this.handleChange(_, 'stroke')}
                        value={this.state.inputs.stroke}
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
                        value={this.state.inputs.opacity}
                        onChange={(_) => this.handleChange(_, 'opacity')}
                    />
                </div>
            </div>
        );
    }
}

export default ShapeSettings;

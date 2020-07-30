import React from 'react';

class LineSettings extends React.Component {

    state = {
        inputs: {
            strokeWidth: this.props.currentElement.strokeWidth,
            stroke: this.props.currentElement.stroke,
            opacity: this.props.currentElement.opacity
        }
    };

    componentDidUpdate = (prevProps) => {
        if (prevProps.currentElement !== this.props.currentElement) {
            const newAtts = {
                strokeWidth: this.props.currentElement.strokeWidth,
                stroke: this.props.currentElement.stroke,
                opacity: this.props.currentElement.opacity
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

        this.props.elementChange({[type]: value})
    };

    render() {
        return (
            <div>
                <div>
                    <label>Stroke Width (px)</label>
                    <input type="number" step="1" value={this.state.inputs.strokeWidth} onChange={(_) => this.handleChange(_, 'strokeWidth')} />
                </div>
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

export default LineSettings;

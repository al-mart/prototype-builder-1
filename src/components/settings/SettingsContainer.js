import React from 'react';
import { SettingsWrapper } from "../../assets/styles/SettingsWrapper.style";
import LineSettings from './settings/LineSettings/LineSettings';
import TextSettings from './settings/TextSettings/TextSettings';
import ShapeSettings from './settings/ShapeSettings/ShapeSettings';

class SettingsContainer extends React.Component {
    render() {
        let settings = null;
        if (this.props.currentElement.type === 'textbox') {
            settings = <TextSettings elementChange={this.props.elementChange} currentElement={this.props.currentElement} />
        } else if (this.props.currentElement.type === 'rect'
            || this.props.currentElement.type === 'triangle'
            || this.props.currentElement.type === 'circle') {
            settings = <ShapeSettings elementChange={this.props.elementChange} currentElement={this.props.currentElement} />
        }
        else if (this.props.currentElement.type === 'line') {
            settings = <LineSettings elementChange={this.props.elementChange} currentElement={this.props.currentElement} />
        }

        return (
            <SettingsWrapper>
                {settings ? settings : <h5>Please select element</h5>}
                {settings
                    ? <div className="objAlignBtns">
                        <button className="primary" onClick={this.props.bringToTop}>Bring forward</button>
                        <button className="primary" onClick={() => this.props.center('H')}>Center horizontally</button>
                        <button className="primary" onClick={() => this.props.center('V')}>Center vertically</button>
                    </div> : null}
            </SettingsWrapper>
        );
    }
}

export default SettingsContainer;

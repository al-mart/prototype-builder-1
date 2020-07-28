import React from 'react';
import { fabric } from 'fabric';
import SidebarContainer from "./sidebar/SidebarContainer";
import SettingsContainer from "./settings/SettingsContainer";
import HeaderSettings from "./settings/HeaderSettings";
import { WorkspaceWrapper } from "../assets/styles/WorkspaceWrapper.style";
import { MainContainer } from "../assets/styles/MainContainer.style";

// import 'fabric-history';

class CanvasContainer extends React.Component {
    state = {
        currentElement: {},
        panningMode: false,
        isPanning: false
    };

    deleteHandler = (event) => {
        if (event.isComposing || event.keyCode === 229) {
            return;
        }
        if (event.key === 'Delete' && Object.keys(this.state.currentElement).length > 0) {
            this.handleRemove(this.state.currentElement);
        }
    };

    componentDidMount() {
        this.canvas = new fabric.Canvas('canvas', {

        });
        this.canvas.on('selection:created', (event) => {
            this.setState({ currentElement: this.canvas.getActiveObject() });

        });
        this.canvas.on('selection:updated', (event) => {
            this.setState({ currentElement: this.canvas.getActiveObject() });
        });
        this.canvas.on('selection:cleared', (event) => {
            this.setState({ currentElement: {} });
        });
        this.handlePan();
        this.handleZoom();
        window.addEventListener("keydown", this.deleteHandler);
    };


    componentWillUnmount = () => {
        window.removeEventListener('keydown', this.deleteHandler);
    };
    

    handlePan = () => {
        this.canvas.on('mouse:move', (event) => {
            if (this.state.panningMode) {
                this.canvas.setCursor('grab');
            }
            if (this.state.isPanning && this.state.panningMode) {
                this.canvas.setCursor('grab');
                const { e: { movementX, movementY } } = event;
                const delta = new fabric.Point(movementX, movementY);
                this.canvas.relativePan(delta);
            }
        });
        this.canvas.on('mouse:down', () => {
            if (this.state.panningMode) {
                this.canvas.forEachObject((o) => o.selectable = false);
                this.canvas.setCursor('grab');
                this.setState({
                    isPanning: true
                });
                this.canvas.selection = false;
            } else {
                this.canvas.selection = true;
                this.canvas.forEachObject((o) => o.selectable = true);
            }
        });
        this.canvas.on('mouse:up', () => {
            this.setState({
                isPanning: false
            });
        });
    };

    handleUndoAndRedo = (type) => {
        type === 'undo' ? this.canvas.undo() : this.canvas.redo();
    };
    handleAdd = (obj) => {
        this.canvas.add(obj);
    };
    handleRemove = (obj) => {
        this.canvas.remove(obj);
        this.setState({ currentElement: {} });
    };

    handlePanningMode = () => {
        this.setState({
            panningMode: !this.state.panningMode
        });
    };


    handleElementPropChange = (inputs, item) => {
        const newCurrentElement = this.canvas.getActiveObject();
        if (newCurrentElement.type === 'group') {
            item.set({...inputs});
            this.canvas.renderAll();
        } else {
            newCurrentElement.set({ ...inputs });
            this.canvas.renderAll();
            this.setState({ currentElement: newCurrentElement });
        }
    };


    handleBringToTop = () => {
        this.state.currentElement.bringToFront()
    }
    handleCenter = (type) => {
        if (type === 'H') {
            this.state.currentElement.centerH();
            this.state.currentElement.setCoords();
        } else if (type === 'V') {
            this.state.currentElement.centerV();
            this.state.currentElement.setCoords();
        }
    }

    render() {
        return (
            <WorkspaceWrapper>
                <SidebarContainer handleAdd={this.handleAdd} />

                <MainContainer>
                    <HeaderSettings
                        panningMode={this.state.panningMode}
                        handlePanningMode={this.handlePanningMode}
                        handleUndoAndRedo={this.handleUndoAndRedo}
                        currentElement={this.state.currentElement}
                        handleRemove={this.handleRemove}
                        bringToTop={this.handleBringToTop}
                        center={this.handleCenter} />
                    <canvas
                        className='canvas'
                        height={500}
                        width={600}
                        id='canvas'>
                    </canvas>
                </MainContainer>

                <SettingsContainer
                    currentElement={this.state.currentElement}
                    elementChange={this.handleElementPropChange} />
            </WorkspaceWrapper>
        );
    }
}

export default CanvasContainer;



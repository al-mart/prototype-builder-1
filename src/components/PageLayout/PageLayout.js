import React from 'react';
import {fabric} from 'fabric';
import 'fabric-history';
import {connect} from 'react-redux';

import SidebarContainer from "../Sidebar/SidebarContainer";
import ItemSettingsContainer from "../ItemSettings/ItemSettingsContainer";
import HeaderContainer from "../Header/HeaderContainer";
import './PageLayout.scss';


import {
    updateElement,
    updateCurrentObject,
    deleteObject
} from '../../actions/canvasActions';
import Footer from "../Footer/Footer";


class PageLayout extends React.Component {

    constructor(props) {
        super(props);
        this.canvasRef = React.createRef();
    }
    state = {
        // currentElement: {},
        panningMode: false,
        isPanning: false,
        isDesktopView: false,
    };

    deleteHandler = (event) => {
        if (event.isComposing || event.keyCode === 229) {
            return;
        }
        if (event.key === 'Delete' && Object.keys(this.props.currentElement).length > 0) {
            this.handleRemove();
        }
    };

    updateSelection = () => {
        return this.props.onCurrentObjectUpdate(this.canvas.getActiveObject().toObject(['id']));
    };
    removeSelection = () => {
        return this.props.onCurrentObjectUpdate({})
    };

    componentDidMount() {
        this.canvas = new fabric.Canvas('canvas', {
            backgroundColor: '#FFFFFF'
        });
        this.canvas.on('selection:created', this.updateSelection);
        this.canvas.on('selection:updated', this.updateSelection);
        this.canvas.on('selection:cleared', this.removeSelection);
        this.handlePan();
        this.handleZoom();
        window.addEventListener("keydown", this.deleteHandler);
    };

    componentWillUnmount = () => {
        this.canvas.off('selection:created', this.updateSelection);
        this.canvas.off('selection:updated', this.updateSelection);
        this.canvas.off('selection:cleared', this.removeSelection);
        window.removeEventListener('keydown', this.deleteHandler);
    };

    handleZoom = () => {
        const returnCanvas = () => this.canvas;
        this.canvas.on('mouse:wheel', function (opt) {
            let delta = opt.e.deltaY;
            let zoom = returnCanvas().getZoom();
            zoom *= 0.999 ** delta;
            if (zoom > 20) zoom = 20;
            if (zoom < 0.5) zoom = 0.5;
            returnCanvas().zoomToPoint({x: opt.e.offsetX, y: opt.e.offsetY}, zoom);
            opt.e.preventDefault();
            opt.e.stopPropagation();
        });
    };

    handlePan = () => {
        this.canvas.on('mouse:move', (event) => {
            if (this.state.panningMode) {
                this.canvas.setCursor('grab');
            }
            if (this.state.isPanning && this.state.panningMode) {
                this.canvas.setCursor('grab');
                const {e: {movementX, movementY}} = event;
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
    handleRemove = () => {
        this.props.onDeleteObject(this.canvas, this.props.currentElement);
        /*
        const activeObj = this.canvas.getObjects().find(el => el.id === obj.id);
        console.log(activeObj)
        this.canvas.remove(activeObj);
        this.setState({ currentElement: {} });
         */
    };

    handlePanningMode = () => {
        this.setState({
            panningMode: !this.state.panningMode
        });
    };


    handleElementPropChange = (obj) => {
       /*
        const newCurrentElement = this.canvas.getActiveObject();
        newCurrentElement.set({ ...obj });
        this.canvas.renderAll();
        console.log(newCurrentElement === this.state.currentElement);
        this.setState({ currentElement: newCurrentElement.toObject() });
        */
        this.props.onElementPropChange(this.canvas, obj);
    };

    deviceViewHandler = (isDesktopView) => {
        this.canvasRef = null;
        this.setState({isDesktopView: isDesktopView});
    }


    handleBringToTop = () => {
        const activeObj = this.canvas.getActiveObject();
        activeObj.bringToFront();
    }
    handleCenter = (type) => {
        if (type === 'H') {
            const activeObj = this.canvas.getActiveObject();
            activeObj.centerH();
            activeObj.setCoords();
        } else if (type === 'V') {
            const activeObj = this.canvas.getActiveObject();
            activeObj.centerV();
            activeObj.setCoords();
        }
    };

    render() {
        const canvasSize = {
            height: 600,
            width: 800
        };
        if (!this.state.isDesktopView){
            canvasSize.height = 500;
            canvasSize.width = 300;
        }
        return (
            <div>
                <HeaderContainer
                    panningMode={this.state.panningMode}
                    handlePanningMode={this.handlePanningMode}
                    handleUndoAndRedo={this.handleUndoAndRedo}
                    currentElement={this.props.currentElement}
                    handleRemove={this.handleRemove}
                    bringToTop={this.handleBringToTop}
                    center={this.handleCenter}/>
                <div className="mainContainer">
                    <SidebarContainer handleAdd={this.handleAdd}/>
                        <canvas
                            className='canvas'
                            height={canvasSize.height}
                            width={canvasSize.width}
                            id='canvas'>
                        </canvas>
                    <ItemSettingsContainer
                        currentElement={this.props.currentElement}
                        elementChange={this.handleElementPropChange}
                        bringToTop={this.handleBringToTop}
                        center={this.handleCenter}
                    />
                </div>
                <Footer viewChanged={(event) => this.deviceViewHandler(event)}/>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        currentElement: state.currentElement
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onCurrentObjectUpdate: (obj) => dispatch(updateCurrentObject(obj)),
        onDeleteObject: (canvas, obj) => dispatch(deleteObject(canvas, obj)),
        onElementPropChange: (canvas, obj) => dispatch(updateElement(canvas, obj))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PageLayout);



import React from 'react';
import "./Footer.scss";
import {Icon} from "react-svg-library";

const FooterContainer = (props) => {
    return (
        <div className="footer-container">
            <div className="teamMemberesAndResources">
                <div>
                    <span className="memberName">Armen Petrosyan</span>
                    <a href="https://github.com/armen558" target="_blank">
                        <Icon icon="github" size='1.5em'></Icon>
                    </a>
                    <a href="https://www.linkedin.com/in/armen558/" target="_blank">
                        <Icon icon="linkedin-one" size='1.5em'></Icon>
                    </a>
                </div>
                <div>
                    <span className="memberName">Lilit Khachatryan</span>
                    <a href="https://github.com/Lilkhachatryan" target="_blank">
                        <Icon icon="github" size='1.5em'></Icon>
                    </a>
                    <a href="https://www.linkedin.com/in/lilit-khachatryan-25a919197/" target="_blank">
                        <Icon icon="linkedin-one" size='1.5em'></Icon>
                    </a>
                </div>
                <div>
                    <span className="memberName">Vardges Mushegyan</span>
                    <a href="https://github.com/vardges-musheghyan" target="_blank">
                        <Icon icon="github" size='1.5em'></Icon>
                    </a>
                    <a href="http://linkedin.com/in/vardges-musheghyan-a462b9154" target="_blank">
                        <Icon icon="linkedin-one" size='1.5em'></Icon>
                    </a>
                </div>
                <div>
                    <span className="memberName">Aleksandr Martirosyan</span>
                    <a href="https://github.com/al-mart" target="_blank">
                        <Icon icon="github" size='1.5em'></Icon>

                    </a>
                    <a href="https://www.linkedin.com/in/aleksandr-martirosyan/" target="_blank">
                        <Icon icon="linkedin-one" size='1.5em'></Icon>
                    </a>
                </div>
            </div>
            <div className="icons-container">
                <span>Toggle Canvas View</span>
                <div className="footerIconsContainer">
                    <div className="footerIconsContainerItem" onClick={() => props.viewChanged(true)}>
                        <Icon icon="website" size="2em"/>
                    </div>
                    <div className="footerIconsContainerItem" onClick={() => props.viewChanged(false)}>
                        <Icon icon="phone" size="2em"/>
                    </div>
                </div>
                <span>All Rights Reserved To Team Add Objects</span>
            </div>
            <div className="teamMemberesAndResources">
                <div className="linksContainer">
                    <a href="">React</a>
                    <a href="">Font Awesome</a>
                    <a href="">Axios</a>
                    <a href="">Fabric</a>
                    <a href="">Express</a>
                </div>
            </div>
        </div>
    );
};

export default FooterContainer;

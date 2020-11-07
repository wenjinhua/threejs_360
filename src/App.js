import React, { useEffect } from 'react';
import * as THREE from "three";
import './App.css';
import SceneLoader from './about_360/SceneLoader'
import SphereCom from './about_360/SphereCom'
import Event from './about_360/event'
import img_360 from './images/360.jpg';

function init() {
    // 全景图
    demo11();
}

function demo11() {
    window.obj = {
        camerax: 100,
        cameray: 0,
        cameraz: 50
    }
      
    new THREE.TextureLoader().load(img_360, texture => {
        const loader = SceneLoader()
        const sphere = SphereCom({ texture })
        loader.scene.add(sphere)
        Event(window.obj)
    })
      
}


export default function App(props) {
    useEffect(() => {
        init();
    }, [])

    return <div></div>
}
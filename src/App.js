import React, { useEffect } from 'react';
import * as THREE from "three";
import './App.css';
import SceneLoader from './about_360/SceneLoader'
import SphereCom from './about_360/SphereCom'
import Event from './about_360/event'
import tree from './images/tree.png';
import img_360 from './images/360.jpg';

function init() {
    // 1.创建渲染器，传入canvas元素，以便渲染器可将结果渲染到canvas中
    let renderer = new THREE.WebGLRenderer({
        canvas: document.getElementById('mainCanvas')
    });

    renderer.setClearColor(0x000000);

    // basic demo
    // demo1(renderer);

    // 透视投影相机
    // demo2(renderer);

    // 模型
    // demo3(renderer);

    // 精灵模型
    // demo4(renderer);

    // 环境光
    // demo5(renderer);

    // 点光源
    // demo6(renderer);

    // 平行光
    // demo7(renderer);

    // 聚光灯
    // demo8(renderer);

    // 阴影
    // demo9(renderer);

    // 动画
    // demo10(renderer);

    // 全景图
    demo11(renderer);
}

// basic demo
function demo1(renderer) {
    // 2.创建场景
    let scene = new THREE.Scene();

    //3.创建物体mesh-网格模型(立方体、材质),并添加到场景scene中
    let geometry = new THREE.CubeGeometry(1, 1, 1);
    let material = new THREE.MeshBasicMaterial({
        color: 0x0000ff,
        wireframe: true,
    });
    let mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);


    // 4.创建相机
    let camera = new THREE.OrthographicCamera(-2, 2, 1.5, -1.5, 1, 10);
    camera.position.set(4, -3, 5); //设置相机位置
    camera.lookAt(0, 0, 0); //设置相机方向(指向的场景对象)

    // 5.执行渲染操作
    renderer.render(scene, camera);
}

// 透视投影相机
function demo2(renderer) {
    let scene = new THREE.Scene();

    let geometry = new THREE.CubeGeometry(1, 1, 1);
    let material = new THREE.MeshBasicMaterial({
        color: 0x0000ff,
        wireframe: true,
    });
    let mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // main
    // let camera = new THREE.PerspectiveCamera(45, 400 / 300, 1, 10);
    // - 改变竖直张角
    let camera = new THREE.PerspectiveCamera(60, 400 / 300, 1, 10);
    camera.position.set(0, 0, 5);
    //end

    renderer.render(scene, camera);
}

// 模型（点、线模型）
function demo3(renderer) {
    let scene = new THREE.Scene();

    // 点模型
    // let geometry = new THREE.CubeGeometry(1, 1, 1); 
    // let material = new THREE.PointsMaterial({
    //     color: 0xff0000,
    //     size: 4.0 
    //   });
    // let mesh = new THREE.Points(geometry, material); 
    // scene.add(mesh); 

    // 线模型
    let geometry = new THREE.CubeGeometry(1, 1, 1); 
    let material = new THREE.LineBasicMaterial({
        color: 0xff0000,
    });
    let mesh = new THREE.Line(geometry, material); 
    scene.add(mesh); 
    //end

    let camera = new THREE.OrthographicCamera(-2, 2, 1.5, -1.5, 1, 10);
    camera.position.set(4, -3, 5);
    camera.lookAt(0, 0, 0);

    renderer.render(scene, camera);
}

// 精灵模型
function demo4(renderer) {
    renderer.setClearColor(0xb9d3ff);
    let scene = new THREE.Scene();

    // main
    // 加载树的纹理贴图
    let textureTree = new THREE.TextureLoader().load(tree, function () {
        renderer.render(scene, camera);
    });
    // 批量创建表示一个树的精灵模型
    for (let i = 0; i < 100; i++) {
        let spriteMaterial = new THREE.SpriteMaterial({
            map: textureTree,//设置精灵纹理贴图，不可显示
        });

        // 创建精灵模型对象
        let sprite = new THREE.Sprite(spriteMaterial);
        // 控制精灵大小,
        sprite.scale.set(150, 150, 1);
        let k1 = Math.random() - 0.5;
        let k2 = Math.random() - 0.5;
        // 设置精灵模型位置，在xoz平面上随机分布
        sprite.position.set(1000 * k1, 50, 1000 * k2);
        scene.add(sprite);
    }
    //end

    // 坐标系辅助显示
    let axesHelper = new THREE.AxesHelper(200);
    scene.add(axesHelper);

    // 透视投影相机设置
    let width = window.innerWidth; //窗口宽度
    let height = window.innerHeight; //窗口高度
    let camera = new THREE.PerspectiveCamera(60, width / height, 1, 1000);
    camera.position.set(600, 600, 500); //树上面观察
    // camera.position.set(20, 30, 200); //树下面观察
    camera.lookAt(scene.position); //设置相机方向(指向的场景对象)

    renderer.render(scene, camera);
}

// 环境光
function demo5(renderer) {
    let scene = new THREE.Scene();

    // 环境光
    // let light = new THREE.AmbientLight(0xffffff);
    let light = new THREE.AmbientLight(0xff0000);
    scene.add(light);
    //end

    let geometry = new THREE.CubeGeometry(1, 1, 1);
    let material = new THREE.MeshLambertMaterial({//Lambert材质
        color: 0xffffff,
    });
    let mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    let camera = new THREE.OrthographicCamera(-2, 2, 1.5, -1.5, 1, 10);
    camera.position.set(4, -3, 5);
    camera.lookAt(0, 0, 0);

    renderer.render(scene, camera);
}

// 点光源
function demo6(renderer) {
    let scene = new THREE.Scene();

    // main
    let light = new THREE.PointLight(0xffffff, 2, 100);
    light.position.set(-6, 5, 2);
    scene.add(light);
    //end

    let geometry = new THREE.CubeGeometry(1, 1, 1);
    let material = new THREE.MeshLambertMaterial({//Lambert材质
        color: 0xff0000,
    });
    let mesh = new THREE.Mesh(geometry, material);
    mesh.position.x = -1;
    scene.add(mesh);

    let mesh2 = new THREE.Mesh(geometry, material);
    mesh2.position.x = 3;
    scene.add(mesh2);

    let camera = new THREE.OrthographicCamera(-4, 4, 3, -3, 1, 10);
    camera.position.set(-3, 3, 6);
    camera.lookAt(0, 0, 0);

    renderer.render(scene, camera);
}

// 平行光
function demo7(renderer) {
    let scene = new THREE.Scene();

    // main
    let light = new THREE.DirectionalLight(0xffffff, 2, 100);
    // light.position.set(-1, 5, 2);
    light.position.set(-6, 5, 2);
    scene.add(light);
    //end

    let geometry = new THREE.CubeGeometry(1, 1, 1);
    let material = new THREE.MeshLambertMaterial({//Lambert材质
        color: 0xff0000,
    });
    let mesh = new THREE.Mesh(geometry, material);
    mesh.position.x = -1;
    scene.add(mesh);

    let mesh2 = new THREE.Mesh(geometry, material);
    mesh2.position.x = 3;
    scene.add(mesh2);

    let camera = new THREE.OrthographicCamera(-4, 4, 3, -3, 1, 10);
    camera.position.set(-3, 3, 6);
    camera.lookAt(0, 0, 0);

    renderer.render(scene, camera);
}

// 聚光灯
function demo8(renderer) {
    let scene = new THREE.Scene();

    let geometry = new THREE.CubeGeometry(1, 1, 1);
    let material = new THREE.MeshLambertMaterial({//Lambert材质
        color: 0xff0000,
    });
    let mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // main
    let light = new THREE.SpotLight(0xffff00, 1, 100, Math.PI / 6, 25);
    light.position.set(2, 5, 3);
    scene.add(light);
    //end

    let plane = new THREE.Mesh(new THREE.PlaneGeometry(8, 8, 16, 16),
        new THREE.MeshLambertMaterial({ color: 0xcccccc }));
    plane.rotation.x = -Math.PI / 2;
    plane.position.y = -1;
    scene.add(plane);

    let camera = new THREE.OrthographicCamera(-5, 5, 4, -4, 1, 100);
    camera.position.set(4, 15, 25);
    camera.lookAt(0, 0, 0);

    renderer.render(scene, camera);
}

// 阴影
function demo9(renderer) {
    renderer.shadowMap.enabled = true;
    let scene = new THREE.Scene();

    // 几何体
    let geometry = new THREE.CubeGeometry(1, 1, 1);
    let material = new THREE.MeshLambertMaterial({
        color: 0xff0000,
    });
    let mesh = new THREE.Mesh(geometry, material);
    mesh.castShadow = true;
    scene.add(mesh);

    // 光照
    let light = new THREE.SpotLight(0xffff00, 1, 100, Math.PI / 6, 25);
    light.position.set(2, 4, 2);
    light.castShadow = true;
    scene.add(light);
    //end

    // 创建一个平面几何体作为投影面
    let plane = new THREE.Mesh(new THREE.PlaneGeometry(8, 8, 16, 16),
        new THREE.MeshLambertMaterial({ color: 0xcccccc }));
    plane.rotation.x = -Math.PI / 2;
    plane.position.y = -1;
    plane.receiveShadow = true;
    scene.add(plane);

    let camera = new THREE.OrthographicCamera(-5, 5, 4, -4, 1, 100);
    camera.position.set(5, 15, 25);
    camera.lookAt(0, 0, 0);

    renderer.render(scene, camera);
}

function demo10(renderer) {
    let scene = new THREE.Scene();
    let camera = new THREE.OrthographicCamera(-2, 2, 1.5, -1.5, 1, 10); //相机的长宽比要和canvas的长宽比保持一致，否则相机会被拉伸
    camera.position.set(4, -3, 5);
    camera.lookAt(new THREE.Vector3(0, 0, 0));
    scene.add(camera);
    let mesh = new THREE.Mesh(new THREE.CubeGeometry(1, 1, 1),
        new THREE.MeshBasicMaterial({
            color: 0xff0000,
            wireframe: true, // 空心材质
        })
    );
    scene.add(mesh);
    renderer.render(scene, camera);

    // draw
    function draw() {
        mesh.rotation.y = (mesh.rotation.y + 0.01) % (Math.PI * 2);
        renderer.render(scene, camera);
    }
    // - setInterval实现动画
    let draw_id = setInterval(draw, 20);
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

    return <div>
        <canvas id="mainCanvas" className='mainCanvas'></canvas>
        {/* <button onClick="stop()">stop</button> */}
    </div>
}
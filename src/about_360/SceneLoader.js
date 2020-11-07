// 舞台相关基础设置 

import * as THREE from 'three'

// 初始化摄像机
const setupCamera = () => {
  const aspectRatio = window.innerWidth / window.innerHeight
  const camera = new THREE.PerspectiveCamera(90, aspectRatio, 0.0001, 10000)
  camera.position.set(window.obj.camerax, window.obj.cameray, window.obj.cameraz)

  return camera
}

// 初始化渲染器
const setupRenderer = () => {
  const renderer = new THREE.WebGLRenderer({antialias: true})
  renderer.setSize(window.innerWidth, window.innerHeight)
  document.body.appendChild(renderer.domElement)

  return renderer
}

export default function SceneLoader () {
  const scene = new THREE.Scene()
  const camera = setupCamera()
  const renderer = setupRenderer()

  // 辅助线
  const axesHelper = new THREE.AxesHelper(1000)
  const cameraHelper = new THREE.CameraHelper(camera)
  const gridHelper = new THREE.GridHelper(1000, 10)

  // 布置场景
  scene.add(axesHelper)
  scene.add(cameraHelper)
  scene.add(gridHelper)

  // 动态渲染
  const loop = () => {
    camera.position.set(window.obj.camerax, window.obj.cameray, window.obj.cameraz)
    camera.lookAt(0,0,0)//指定场景来设置相机的方向
    renderer.render(scene, camera)
    requestAnimationFrame(loop)
  }

  loop()

  return {
    scene,
    camera,
    renderer,
  }
}

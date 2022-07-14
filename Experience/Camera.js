import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

import Experience from './Experience.js'
import Bike from './World/Bike.js'

export default class Camera {
  constructor() {
    this.experience = new Experience()
    this.sizes = this.experience.sizes
    this.scene = this.experience.scene
    this.canvas = this.experience.canvas
    this.bike = this.experience.bike

    this.createPerspectiveCamera()
    this.createOrthographicCamera()
    this.setOrbitControls()

    // // Grid Helper
    // const size = 20;
    // const divisions = 20;

    // const gridHelper = new THREE.GridHelper( size, divisions );
    // this.scene.add(gridHelper)

    // // Axes Helper
    // const axesHelper = new THREE.AxesHelper(10);
    // this.scene.add(axesHelper);
  }

  createPerspectiveCamera() {
    this.perspectiveCamera = new THREE.PerspectiveCamera(
      35,
      this.sizes.aspect,
      0.1,
      1000
    )
    this.scene.add(this.perspectiveCamera)
    this.perspectiveCamera.position.x = 10
    this.perspectiveCamera.position.y = 6
    this.perspectiveCamera.position.z = 29
  }

  createOrthographicCamera() {
    this.orthographicCamera = new THREE.OrthographicCamera(
      (-this.sizes.aspect * this.sizes.frustum) / 2,
      (this.sizes.aspect * this.sizes.frustum) / 2,
      this.sizes.frustum  / 2,
      -this.sizes.frustum  / 2,
      -10,
      10
    )

    this.orthographicCamera.position.y = 1.25
    this.scene.add(this.orthographicCamera)

    // // Orthographic Camera Helper
    // this.orthographicCameraHelper = new THREE.CameraHelper(this.orthographicCamera)
    // this.scene.add(this.orthographicCameraHelper)
  }

  setOrbitControls() {
    this.controls = new OrbitControls(this.perspectiveCamera, this.canvas)
    this.controls.enableDamping = true
    this.controls.enableZoom = false
  }

  resize() {
    // Updating Perspective Camera on Resize
    this.perspectiveCamera.aspect = this.sizes.aspect
    this.perspectiveCamera.updateProjectionMatrix()

    // Updating Orthographic Camera on Resize
    this.orthographicCamera.left = (-this.sizes.aspect * this.sizes.frustrum) / 2
    this.orthographicCamera.right = (this.sizes.aspect * this.sizes.frustrum) / 2
    this.orthographicCamera.top = this.sizes.frustrum / 2
    this.orthographicCamera.bottom = -this.sizes.frustrum / 2
  }

  update() {
    // console.log(this.perspectiveCamera.position);
    this.controls.update()

    // // Updating Orthographic Camera Helper
    // this.orthographicCameraHelper.matrixWorldNeedsUpdate = true
    // this.orthographicCameraHelper.update()
    // this.orthographicCameraHelper.position.copy(this.orthographicCamera.position)
    // this.orthographicCameraHelper.position.copy(this.orthographicCamera.rotation)
  }
}

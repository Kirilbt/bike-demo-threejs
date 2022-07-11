import * as THREE from 'three'
import Experience from "./Experience.js"
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

export default class Camera {
  constructor() {
    this.experience = new Experience()
    this.sizes = this.experience.sizes
    this.scene = this.experience.scene
    this.canvas = this.experience.canvas

    this.createPerspectiveCamera()
    this.createOrthographicCamera() // Check if it works for the project
    this.setOrbitControls()
  }

  createPerspectiveCamera() {
    this.perspectiveCamera = new THREE.PerspectiveCamera(
      35,
      this.sizes.aspect,
      0.1, 1000
    )
    this.scene.add(this.perspectiveCamera)
    this.perspectiveCamera.position.z = 5
  }

  createOrthographicCamera() {
    this.frustrum = 5
    this.orthographicCamera = new THREE.OrthographicCamera(
      (-this.sizes.aspect * this.sizes.frustrum) / 2,
      (this.sizes.aspect * this.sizes.frustrum) / 2,
      this.sizes.frustrum / 2,
      -this.sizes.frustrum / 2,
      -100,
      100
    )
    this.scene.add(this.orthographicCamera)
  }

  setOrbitControls() {
    this.controls = new OrbitControls(this.perspectiveCamera, this.canvas)
    this.controls.enableDamping = true
    this.controls.enableZoom = true
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
    this.controls.update()
  }
}

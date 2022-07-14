import * as THREE from 'three'
import Experience from '../Experience.js'

export default class Environment {
  constructor() {
    this.experience = new Experience()
    this.scene = this.experience.scene
    this.resources = this.experience.resources
    this.debug = this.experience.debug

    // Debug
    if(this.debug.active) {
      this.debugFolder = this.debug.ui.addFolder('environment')
    }

    // Setup
    this.setLight()
  }

  setLight() {
    this.sunLight = new THREE.DirectionalLight("#ffffff", 3)
    this.sunLight.castShadow = true
    this.sunLight.shadow.camera.far = 20
    this.sunLight.shadow.mapSize.set(2048, 2048)
    this.sunLight.shadow.normalBias = 0.05
    this.sunLight.position.set(3, 7, 3)
    this.scene.add(this.sunLight)

    // // Sun Light Helper
    // this.sunLightHelper = new THREE.DirectionalLightHelper(this.sunLight, 5)
    // this.scene.add(this.sunLightHelper)

    this.ambientLight = new THREE.AmbientLight('#ffffff', 1)
    this.scene.add(this.ambientLight)

    // Debug
    if(this.debug.active) {
      this.debugFolder
        .add(this.sunLight, 'intensity')
        .name('sunLightIntensity')
        .min(0)
        .max(10)
        .step(0.001)

      this.debugFolder
        .add(this.sunLight.position, 'x')
        .name('sunLightX')
        .min(- 5)
        .max(5)
        .step(0.001)

      this.debugFolder
        .add(this.sunLight.position, 'y')
        .name('sunLightY')
        .min(- 5)
        .max(5)
        .step(0.001)

      this.debugFolder
        .add(this.sunLight.position, 'z')
        .name('sunLightZ')
        .min(- 5)
        .max(5)
        .step(0.001)

        this.debugFolder
        .add(this.sunLight.rotation, 'x')
        .name('sunRotationX')
        .min(- 5)
        .max(5)
        .step(0.001)

      this.debugFolder
        .add(this.sunLight.rotation, 'y')
        .name('sunRotationY')
        .min(- 5)
        .max(5)
        .step(0.001)

      this.debugFolder
        .add(this.sunLight.rotation, 'z')
        .name('sunRotationZ')
        .min(- 5)
        .max(5)
        .step(0.001)

      this.debugFolder
        .add(this.ambientLight, 'intensity')
        .name('ambLightIntensity')
        .min(0)
        .max(10)
        .step(0.001)
    }
  }

  resize() {

  }

  update() {

  }
}

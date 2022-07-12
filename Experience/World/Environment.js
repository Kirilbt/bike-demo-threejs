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
    this.setSunlight()
  }

  setSunlight() {
    this.sunLight = new THREE.DirectionalLight("#ffffff", 3)
    this.sunLightHelper = new THREE.DirectionalLightHelper(this.sunLight, 5)
    this.sunLight.castShadow = true
    this.sunLight.shadow.camera.far = 20
    this.sunLight.shadow.mapSize.set(1024, 1024)
    this.sunLight.shadow.normalBias = 0.05
    this.sunLight.position.set(1.5, 7, 3)
    this.scene.add(this.sunLight, this.sunLightHelper)

    // Debug - sunLight
    if(this.debug.active) {
      console.log(this.debugFolder);
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
    }

    this.ambientLight = new THREE.AmbientLight('#fff', 1)
    this.scene.add(this.ambientLight)
  }

  resize() {

  }

  update() {

  }
}

import * as THREE from 'three'
import Experience from '../Experience.js'

export default class Environment {
  constructor() {
    this.experience = new Experience()
    this.scene = this.experience.scene
    this.resources = this.experience.resources

    this.setSunlight()
  }

  setSunlight() {
    this.sunLight = new THREE.DirectionalLight("#ffffff", 3)
    this.sunLight.castShadow = true
    this.sunLight.shadow.camera.far = 20
    this.sunLight.shadow.mapSize.set(1024, 1024)
    this.sunLight.shadow.normalBias = 0.05
    this.sunLight.position.set(1.5, 7, 3)
    this.scene.add(this.sunLight)
  }

  resize() {

  }

  update() {

  }
}

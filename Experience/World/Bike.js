import * as THREE from 'three'
import GSAP from 'gsap'
import Experience from '../Experience.js'

export default class Bike {
  constructor() {
    this.experience = new Experience()
    this.scene = this.experience.scene
    this.resources = this.experience.resources
    this.bike = this.resources.items.bike
    this.actualBike = this.bike.scene

    this.lerp = {
      current: 0,
      target: 0,
      ease: 0.1
    }

    this.setModel()
    this.onMouseMove()
  }

  setModel() {

    this.actualBike.traverse((child) => {
      if(child instanceof THREE.Mesh) {
        // Shadows
        child.castShadow = true
        child.receiveShadow = true

        // Material
        child.material = new THREE.MeshStandardMaterial
        child.material.color.set(0x222222)
      }
    })

    this.scene.add(this.actualBike)
  }

  onMouseMove() {
    window.addEventListener('mousemove', (e) => {
      this.rotation = ((e.clientX - window.innerWidth / 2) * 2) / window.innerWidth // makes the position of the cursor from -1 to 1
      this.lerp.target = this.rotation * 0.5
    })
  }

  resize() {

  }

  update() {
    this.lerp.current = GSAP.utils.interpolate(
      this.lerp.current,
      this.lerp.target,
      this.lerp.ease
    )

    this.actualBike.rotation.y = this.lerp.current
  }
}

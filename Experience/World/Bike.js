import * as THREE from 'three'
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper.js'
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
    this.setRectAreaLight()
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
        child.material.color.set(0xECE5C7)
      }
    })

    this.scene.add(this.actualBike)
    console.log(this.actualBike.position);
  }

  setRectAreaLight() {
    const width = 1
    const height = 1
    const intensity = 5
    const rectLight = new THREE.RectAreaLight( 0xffffff, intensity,  width, height )
    rectLight.position.set( 3, 0.5, 2 )
    rectLight.rotation.y = Math.PI / 3.5
    this.actualBike.add( rectLight )

    // Rect Area Light Helper
    const rectLightHelper = new RectAreaLightHelper( rectLight );
    rectLight.add( rectLightHelper )
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

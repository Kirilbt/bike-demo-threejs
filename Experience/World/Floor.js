import * as THREE from 'three'
import GSAP from 'gsap'
import Experience from '../Experience.js'

export default class Floor {
  constructor() {
    this.experience = new Experience()
    this.scene = this.experience.scene

    this.setFloor()
  }

  setFloor() {
    this.geometry = new THREE.PlaneGeometry(100, 100)
    this.material = new THREE.MeshStandardMaterial({
      color: 0x020202,
      side: THREE.BackSide,
    })
    this.plane = new THREE.Mesh(this.geometry, this.material)
    this.plane.rotation.x = Math.PI / 2
    this.plane.receiveShadow= true

    this.scene.add(this.plane)
  }

  switchTheme(theme) {
    if(theme === 'dark') {
      GSAP.to(this.plane.material.color, {
        r: 2 / 255,
        g: 2 / 255,
        b: 2 / 255
      })
    } else {
      GSAP.to(this.plane.material.color, {
        r: 215 / 255,
        g: 216 / 255,
        b: 217 / 255
      })
    }
  }

  resize() {}

  update() {}
}

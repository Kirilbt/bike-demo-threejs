import * as THREE from 'three'
import GSAP from 'gsap'
import Experience from '../Experience.js'

export default class Floor {
  constructor() {
    this.experience = new Experience()
    this.scene = this.experience.scene

    this.setFloor()
    this.setCircles()
  }

  setFloor() {
    this.geometry = new THREE.PlaneGeometry(100, 100)
    this.material = new THREE.MeshStandardMaterial({
      color: 0xFAF5E3,
      side: THREE.BackSide,
    })
    this.plane = new THREE.Mesh(this.geometry, this.material)
    this.plane.rotation.x = Math.PI / 2
    this.plane.receiveShadow= true

    this.scene.add(this.plane)
  }

  setCircles() {
    const geometry = new THREE.CircleGeometry( 5, 64 )
    const material = new THREE.MeshStandardMaterial( { color: 0xFAF5E3 } )
    const material2 = new THREE.MeshStandardMaterial( { color: 0xFAF5E3 } )
    const material3 = new THREE.MeshStandardMaterial( { color: 0xFAF5E3 } )
    this.circleFirst = new THREE.Mesh( geometry, material )
    this.circleSecond = new THREE.Mesh( geometry, material2 )
    this.circleThird = new THREE.Mesh( geometry, material3 )

    this.circleFirst.position.y = 0.01
    this.circleSecond.position.y = 0.02
    this.circleThird.position.y = 0.03

    this.circleFirst.scale.set(0, 0, 0)
    this.circleSecond.scale.set(0, 0, 0)
    this.circleThird.scale.set(0, 0, 0)

    this.circleFirst.rotation.x = - Math.PI / 2
    this.circleSecond.rotation.x = - Math.PI / 2
    this.circleThird.rotation.x = - Math.PI / 2

    this.circleFirst.receiveShadow = true
    this.circleSecond.receiveShadow = true
    this.circleThird.receiveShadow = true

    this.scene.add(this.circleFirst)
    this.scene.add(this.circleSecond)
    this.scene.add(this.circleThird)
  }

  resize() {}

  update() {}
}

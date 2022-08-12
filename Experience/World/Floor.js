import * as THREE from 'three'
import GSAP from 'gsap'
import Experience from '../Experience.js'

export default class Floor {
  constructor() {
    this.experience = new Experience()
    this.scene = this.experience.scene

    this.setFloor()
    // this.setCircles()
  }

  setFloor() {
    this.geometry = new THREE.PlaneGeometry(100, 100)
    this.material = new THREE.MeshStandardMaterial({
      color: 0xd7d8d9,
      side: THREE.BackSide,
    })
    this.plane = new THREE.Mesh(this.geometry, this.material)
    this.plane.rotation.x = Math.PI / 2
    this.plane.receiveShadow= true

    this.scene.add(this.plane)
  }

  // setCircles() {
  //   const geometry = new THREE.CircleGeometry( 5, 64 )
  //   const material = new THREE.MeshStandardMaterial( { color: 0xd7d8d9 } )
  //   const material2 = new THREE.MeshStandardMaterial( { color: 0xd7d8d9 } )
  //   const material3 = new THREE.MeshStandardMaterial( { color: 0xd7d8d9 } )
  //   this.circleFirst = new THREE.Mesh( geometry, material )
  //   this.circleSecond = new THREE.Mesh( geometry, material2 )
  //   this.circleThird = new THREE.Mesh( geometry, material3 )

  //   this.circleFirst.position.y = 0.01
  //   this.circleSecond.position.y = 0.02
  //   this.circleThird.position.y = 0.03

  //   this.circleFirst.scale.set(0, 0, 0)
  //   this.circleSecond.scale.set(0, 0, 0)
  //   this.circleThird.scale.set(0, 0, 0)

  //   this.circleFirst.rotation.x = - Math.PI / 2
  //   this.circleSecond.rotation.x = - Math.PI / 2
  //   this.circleThird.rotation.x = - Math.PI / 2

  //   this.circleFirst.receiveShadow = true
  //   this.circleSecond.receiveShadow = true
  //   this.circleThird.receiveShadow = true

  //   this.scene.add(this.circleFirst)
  //   this.scene.add(this.circleSecond)
  //   this.scene.add(this.circleThird)
  // }

  switchTheme(theme) {
    if(theme === 'dark') {
      GSAP.to(this.plane.material.color, {
        r: 64 / 255,
        g: 64 / 255,
        b: 64 / 255
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

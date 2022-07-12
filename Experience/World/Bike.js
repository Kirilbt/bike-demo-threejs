import * as THREE from 'three'
import Experience from '../Experience.js'

export default class Bike {
  constructor() {
    this.experience = new Experience()
    this.scene = this.experience.scene
    this.resources = this.experience.resources
    this.bike = this.resources.items.bike
    this.actualBike = this.bike.scene

    this.setModel()

    console.log(this.actualBike.children[0].children);
  }

  setModel() {
    // Shadows
    this.actualBike.children[0].children.forEach(child => {
      child.castShadow = true
      child.receiveShadow = true
      // console.log(child);

      if (child instanceof THREE.Group) {
        child.children.forEach((groupchild) => {
          groupchild.castShadow = true
          groupchild.receiveShadow = true
        })
      }
    })

    this.scene.add(this.actualBike)
  }

  resize() {

  }

  update() {

  }
}

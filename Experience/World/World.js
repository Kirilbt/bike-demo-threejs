import * as THREE from 'three'
import Experience from "../Experience.js"

import Environment from './Environment.js'
import Bike from './Bike.js'


export default class World {
  constructor() {
    this.experience = new Experience()
    this.sizes = this.experience.sizes
    this.scene = this.experience.scene
    this.canvas = this.experience.canvas
    this.camera = this.experience.camera
    this.resources = this.experience.resources

    this.resources.on('ready', () => {
      this.environment = new Environment()
      this.bike = new Bike()
    })
  }

  resize() {

  }

  update() {
    if(this.bike) {
      this.bike.update()
    }
  }
}

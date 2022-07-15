import * as THREE from 'three'
import Experience from "../Experience.js"

import Environment from './Environment.js'
import Bike from './Bike.js'
import Floor from './Floor.js'
import Controls from './Controls.js'


export default class World {
  constructor() {
    this.experience = new Experience()
    this.sizes = this.experience.sizes
    this.scene = this.experience.scene
    this.canvas = this.experience.canvas
    this.camera = this.experience.camera
    this.resources = this.experience.resources
    this.theme = this.experience.theme

    this.resources.on('ready', () => {
      this.environment = new Environment()
      this.bike = new Bike()
      this.floor = new Floor()
      this.controls = new Controls()
    })

    this.theme.on('switch', (theme) => {
      theme = this.theme.theme
      this.switchTheme(theme)
    })
  }

  switchTheme(theme) {
    if(this.environment) {
      this.environment.switchTheme(theme)
    }
  }

  resize() {

  }

  update() {
    if(this.bike) {
      this.bike.update()
    }

    if(this.controls) {
      this.controls.update()
    }
  }
}

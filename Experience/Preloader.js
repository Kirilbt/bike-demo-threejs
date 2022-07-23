import GSAP from 'gsap'

import { EventEmitter } from 'events'
import Experience from "./Experience"

export default class Preloader extends EventEmitter {
  constructor() {
    super()
    this.experience = new Experience()
    this.scene = this.experience.scene
    this.resources = this.experience.resources
    this.sizes = this.experience.sizes
    this.camera = this.experience.camera
    this.world = this.experience.world
    this.device = this.sizes.device

    this.sizes.on('switchdevice', (device) => {
      this.device = device
      console.log(this.device);
    })

    this.world.on('worldready', () => {
      this.setAssets()
      this.playIntro()
    })
  }

  setAssets() {
    this.bike = this.experience.world.bike.actualBike
    this.bikeChildren = this.experience.world.bike.bikeChildren
    console.log(this.bikeChildren);
  }

  firstIntro() {
    this.timeline = new GSAP.timeline()

    this.timeline.to(this.bikeChildren.preloader.scale, {
      x: 1.4,
      y: 1.4,
      z: 1.4,
      ease: 'back.out(2.5)',
      duration: 0.7
    })
    .to(this.bike.position, {
      x: -1,
      ease: 'power1.out',
      duration: 0.7
    })
  }

  playIntro() {
    this.firstIntro()
  }
}

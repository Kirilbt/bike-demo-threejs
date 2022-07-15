import * as THREE from 'three'
import GSAP from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger.js'
import Experience from '../Experience.js'

export default class Controls {
  constructor() {
    this.experience = new Experience()
    this.scene = this.experience.scene
    this.resources = this.experience.resources
    this.sizes = this.experience.sizes
    this.time = this.experience.time
    this.camera = this.experience.camera
    this.bike = this.experience.world.bike.actualBike

    GSAP.registerPlugin(ScrollTrigger)

    this.setPath()
  }

  setPath() {
    console.log(this.bike);
    this.timeline = new GSAP.timeline()
    this.timeline.to(this.bike.position, {
      x: () => {
        return this.sizes.width * 0.0017 // to update something in GSAP on resize, we need to provide a functional value
      },
      scrollTrigger: {
        trigger: '.first-move',
        markers: true,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.6,
        invalidateOnRefresh: true
      }
    })
  }

  resize() {}

  update() {}
}

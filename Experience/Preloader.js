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
    return new Promise((resolve) => {
      this.timeline = new GSAP.timeline()

      if (this.device === 'desktop') {
        this.timeline.to(this.bikeChildren.preloader.scale, {
          x: 0.3,
          y: 0.3,
          z: 0.3,
          ease: 'back.out(2.5)',
          duration: 0.7
        })
        .to(this.bike.position, {
          x: -1,
          ease: 'power1.out',
          duration: 0.7,
          onComplete: resolve
        })
      } else {
        this.timeline.to(this.bikeChildren.preloader.scale, {
          x: 0.3,
          y: 0.3,
          z: 0.3,
          ease: 'back.out(2.5)',
          duration: 0.7
        })
        .to(this.bike.position, {
          z: -1,
          ease: 'power1.out',
          duration: 0.7,
          onComplete: resolve
        })
      }
    })
  }

  secondIntro() {
    return new Promise((resolve) => {
      this.secondTimeline = new GSAP.timeline()

      this.secondTimeline.to(this.bike.position, {
        x: 0,
        y: 0,
        z: 0,
        ease: 'power1.out'
      }, 'same')
      .to(this.bikeChildren.preloader.rotation, {
        y: 2*Math.PI + Math.PI/4
      }, 'same')
      .to(this.bikeChildren.preloader.scale, {
        x: 2,
        y: 2,
        z: 2
      }, 'same')
      .to(this.camera.orthographicCamera.position, {
        y: 1.25
      }, 'same')
      .to(this.bikeChildren.preloader.position, {
        x: 0,
        y: 0,
        z: 0
      }, 'same')
      .set(this.bikeChildren.bike.scale, {
        x: 1,
        y: 1,
        z: 1
      })
      .to(this.bikeChildren.preloader.scale, {
        x: 0,
        y: 0,
        z: 0,
        onComplete: resolve
      })
    })
  }

  onScroll(e) {
    if(e.deltaY > 0) {
      this.removeEventListeners()
      this.playSecondIntro()
    }
  }

  onTouch(e) {
    this.initialY = e.touches[0].clientY
  }

  onTouchMove(e) {
    let currentY = e.touches[0].clientY
    let difference = this.initialY - currentY
    if(difference > 0) {
      console.log('swipped up')
      this.removeEventListeners()
      this.playSecondIntro()
    }
    this.initialY = null
  }

  removeEventListeners() {
    window.removeEventListener('wheel', this.scrollOnceEvent)
    window.removeEventListener('touchstart', this.touchStart)
    window.removeEventListener('touchmove', this.touchMove)
  }

  async playIntro() {
    await this.firstIntro()
    this.moveFlag = true

    // Mouse
    this.scrollOnceEvent = this.onScroll.bind(this)

    // Touch
    this.touchStart = this.onTouch.bind(this)
    this.touchMove = this.onTouchMove.bind(this)

    window.addEventListener('wheel', this.scrollOnceEvent)
    window.addEventListener('touchstart', this.touchStart)
    window.addEventListener('touchmove', this.touchMove)
  }

  async playSecondIntro() {
    this.moveFlag = false
    this.scaleFlag = true

    await this.secondIntro()
    this.scaleFlag = false
    this.emit('enableControls')
  }

  move() {
    if(this.device === 'desktop') {
      this.bike.position.set(-1, 0, 0) // same values as provided to gsap
    } else {
      this.bike.position.set(0, 0, -1) // same values as provided to gsap
    }
  }

  scale() {
    if(this.device === 'desktop') {
      this.bike.scale.set(1, 1, 1) // same values as provided to gsap
    } else {
      this.bike.scale.set(0.5, 0.5, 0.5) // same values as provided to gsap
    }
  }

  update() {
    if(this.moveFlag) {
      this.move()
    }

    if(this.scaleFlag) {
      this.scale()
    }
  }
}

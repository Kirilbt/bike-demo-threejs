import GSAP from 'gsap'
import { EventEmitter } from 'events'
import convert from './Utils/convertDivsToSpans'

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
    convert(document.querySelector('.intro-text'))
    convert(document.querySelector('.hero-main-title'))
    convert(document.querySelector('.hero-main-description'))
    convert(document.querySelector('.hero-second-subheading'))
    convert(document.querySelector('.second-sub'))
    this.group = this.experience.world.bike.group
    this.actualBike = this.experience.world.bike.actualBike
    this.bikeChildren = this.experience.world.bike.bikeChildren
  }

  firstIntro() {
    return new Promise((resolve) => {
      this.timeline = new GSAP.timeline()
      this.timeline.set('.animatethis', { y: 0, yPercent: 100 })
      this.timeline.to('.preloader', {
        opacity: 0,
        delay: 1,
        onComplete: () => {
          document.querySelector('.preloader').classList.add('hidden')
        }
      })

      if (this.device === 'desktop') {
        this.timeline.to(this.bikeChildren.preloader.scale, {
          x: 0.3,
          y: 0.3,
          z: 0.3,
          ease: 'back.out(2.5)',
          duration: 0.7
        })
        .to(this.group.position, {
          x: -0.25,
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
        .to(this.group.position, {
          z: -1,
          ease: 'power1.out',
          duration: 0.7
        })
      }

      this.timeline.to('.intro-text .animatethis', {
        yPercent: 0,
        stagger: 0.04,
        ease: 'back.out(1.5)',
        onComplete: resolve
      })
      .to('.arrow-svg-wrapper', {
        opacity: 1
      }, 'fadein')
      .to('.toggle-bar', {
        opacity: 1,
        onComplete: resolve
      }, 'fadein')
    })
  }

  secondIntro() {
    return new Promise((resolve) => {
      this.secondTimeline = new GSAP.timeline()

      this.secondTimeline.to('.intro-text .animatethis', {
        yPercent: 100,
        stagger: 0.04,
        ease: 'back.in(1.5)'
      }, 'fadeout')
      .to('.arrow-svg-wrapper', {
        opacity: 0
      }, 'fadeout')
      .to(this.group.position, {
        x: 1,
        y: 0,
        z: 0,
        ease: 'power1.out'
      }, 'same')
      .to(this.bikeChildren.preloader.rotation, {
        y: 2 * Math.PI + Math.PI/4
      }, 'same')
      .to(this.bikeChildren.preloader.scale, {
        x: 2,
        y: 2,
        z: 2
      }, 'same')
      .to(this.camera.perspectiveCamera.position, {
        y: 1.25
      }, 'same')
      .to(this.bikeChildren.preloader.position, {
        x: 0,
        y: 0,
        z: 0
      }, 'same')
      .set(this.actualBike.scale, {
        x: 0.65,
        y: 0.65,
        z: 0.65,
        ease: 'power1.out'
      }, 'same')
      .to(this.bikeChildren.preloader.scale, {
        x: 0,
        y: 0,
        z: 0,
        duration: 1
      }, 'introtext')
      .to('.hero-main-title .animatethis', {
        yPercent: 0,
        stagger: 0.02,
        ease: 'back.out(1.5)'
      }, 'introtext')
      .to('.hero-main-description .animatethis', {
        yPercent: 0,
        stagger: 0.02,
        ease: 'back.out(1.5)'
      }, 'introtext')
      .to('.first-sub .animatethis', {
        yPercent: 0,
        stagger: 0.02,
        ease: 'back.out(1.5)'
      }, 'introtext')
      .to('.second-sub .animatethis', {
        yPercent: 0,
        stagger: 0.02,
        ease: 'back.out(1.5)'
      }, 'introtext')
      .to('.arrow-svg-wrapper', {
        opacity: 1,
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
      this.group.position.set(-1, 0, 0) // same values as provided to gsap
    } else {
      this.group.position.set(0, 0, -1) // same values as provided to gsap
    }
  }

  scale() {
    if(this.device === 'desktop') {
      this.group.scale.set(1, 1, 1) // same values as provided to gsap
    } else {
      this.group.scale.set(0.5, 0.5, 0.5) // same values as provided to gsap
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

import * as THREE from 'three'
import GSAP from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger.js'
import ASScroll from '@ashthornton/asscroll'
import Experience from '../Experience.js'

export default class Controls {
  constructor() {
    this.experience = new Experience()
    this.scene = this.experience.scene
    this.resources = this.experience.resources
    this.sizes = this.experience.sizes
    this.time = this.experience.time
    this.camera = this.experience.camera
    this.actualBike = this.experience.world.bike.actualBike

    this.actualBike.children.forEach(child => {
      if(child.type === 'RectAreaLight') {
        this.rectLight = child
      }
    })

    this.circleFirst = this.experience.world.floor.circleFirst
    this.circleSecond = this.experience.world.floor.circleSecond
    this.circleThird = this.experience.world.floor.circleThird

    GSAP.registerPlugin(ScrollTrigger)

    document.querySelector('.page').style.overflow = 'visible'

    this.setSmoothScroll()
    this.setScrollTrigger()
  }

  setupASScroll() {
    // https://github.com/ashthornton/asscroll
    const asscroll = new ASScroll({
      // ease: 0.5,
      disableRaf: true
    });


    GSAP.ticker.add(asscroll.update);

    ScrollTrigger.defaults({
      scroller: asscroll.containerElement });


    ScrollTrigger.scrollerProxy(asscroll.containerElement, {
      scrollTop(value) {
        if (arguments.length) {
          asscroll.currentPos = value;
          return;
        }
        return asscroll.currentPos;
      },
      getBoundingClientRect() {
        return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
      },
      fixedMarkers: true });


    asscroll.on("update", ScrollTrigger.update);
    ScrollTrigger.addEventListener("refresh", asscroll.resize);

    requestAnimationFrame(() => {
      asscroll.enable({
        newScrollElements: document.querySelectorAll(".gsap-marker-start, .gsap-marker-end, [asscroll]") });

    });
    return asscroll;
  }

  setSmoothScroll() {
    this.asscroll = this.setupASScroll()
  }

  setScrollTrigger() {
    ScrollTrigger.matchMedia({
      // Desktop
      "(min-width: 969px)": () => {
        console.log('fired desktop');

        // Resets
        this.actualBike.scale.set(1, 1, 1)
        this.rectLight.width = 1
        this.rectLight.height = 1

        // First Section
        this.firstMoveTimeline = new GSAP.timeline({
          scrollTrigger: {
            trigger: '.first-move',
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.6,
            invalidateOnRefresh: true
          }
        })
        this.firstMoveTimeline.to(this.actualBike.position, {
          x: () => {
            return this.sizes.width * 0.0014
          }
        })

        // Second Section
        this.secondMoveTimeline = new GSAP.timeline({
          scrollTrigger: {
            trigger: '.second-move',
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.6,
            invalidateOnRefresh: true
          }
        })
        .to(this.actualBike.position, {
          x: () => {
            return 0.5
          },
          z: () => {
            return this.sizes.height * 0.0032
          }
        }, 'same-position')
        .to(this.actualBike.scale, {
          x: 2,
          y: 2,
          z: 2
        }, 'same-position')
        .to(this.rectLight, {
          width: 1 * 2, // !!! same increased values as actualBike
          height: 1 * 2, // !!! same increased values as actualBike
        }, 'same-position')

        // Third Section
        this.thirdMoveTimeline = new GSAP.timeline({
          scrollTrigger: {
            trigger: '.third-move',
            start: 'top top',
            end: 'bottom bottom',
            markers: true,
            scrub: 0.6,
            invalidateOnRefresh: true
          }
        })
        .to(this.camera.orthographicCamera.position, {
          x: -4.1,
          y: 1.5,
        })
      },

      // Mobile
      "(max-width: 968px)": () => {
        console.log('fired mobile')

        // Resets
        this.actualBike.scale.set(0.5, 0.5, 0.5)
        this.actualBike.position.set(0, 0, 0)
        this.rectLight.width = 1 * 0.5 // !!! same increased values as actualBike
        this.rectLight.height = 1 * 0.5 // !!! same increased values as actualBike

        // First Section - Mobile
        this.firstMoveTimeline = new GSAP.timeline({
          scrollTrigger: {
            trigger: '.first-move',
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.6,
            invalidateOnRefresh: true
          }
        })
        .to(this.actualBike.scale, {
          x: 0.75,
          y: 0.75,
          z: 0.75
        })

        // Second Section - Mobile
        this.secondMoveTimeline = new GSAP.timeline({
          scrollTrigger: {
            trigger: '.second-move',
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.6,
            invalidateOnRefresh: true
          }
        })
        .to(this.actualBike.scale, {
          x: 1,
          y: 1,
          z: 1
        }, 'same')
        .to(this.rectLight, {
          width: 1,
          height: 1
        }, 'same')
        .to(this.actualBike.position, {
          x: 1.4
        }, 'same')

        // Third Section - Mobile
        this.thirdMoveTimeline = new GSAP.timeline({
          scrollTrigger: {
            trigger: '.third-move',
            start: 'top top',
            end: 'bottom bottom',
            markers: true,
            scrub: 0.6,
            invalidateOnRefresh: true
          }
        })
        .to(this.camera.orthographicCamera.position, {
          x: 3,
          y: 1.5,
        })
      },

      // all
      "all": () => {
        this.sections = document.querySelectorAll('.section')
        this.sections.forEach(section => {
          this.progressWrapper = section.querySelector('.progress-wrapper')
          this.progressBar = section.querySelector('.progress-bar')

          if(section.classList.contains('right')) {
            GSAP.to(section, {
              borderTopLeftRadius: 10,
              scrollTrigger: {
                trigger: section,
                start: 'top bottom',
                end: 'top top',
                scrub: 0.6
              }
            })
            GSAP.to(section, {
              borderBottomLeftRadius: 700,
              scrollTrigger: {
                trigger: section,
                start: 'bottom bottom',
                end: 'bottom top',
                scrub: 0.6
              }
            })
          } else {
            GSAP.to(section, {
              borderTopRightRadius: 10,
              scrollTrigger: {
                trigger: section,
                start: 'top bottom',
                end: 'top top',
                scrub: 0.6
              }
            })
            GSAP.to(section, {
              borderBottomRightRadius: 700,
              scrollTrigger: {
                trigger: section,
                start: 'bottom bottom',
                end: 'bottom top',
                scrub: 0.6
              }
            })
          }

          GSAP.from(this.progressBar, {
            scaleY: 0,
            scrollTrigger: {
              trigger: section,
              start: 'top top',
              end: 'bottom bottom',
              scrub: 0.4,
              pin: this.progressWrapper,
              pinSpacing: false
            }
          })
        })

        // Circle Animations
        // First Section
        this.firstMoveTimeline = new GSAP.timeline({
          scrollTrigger: {
            trigger: '.first-move',
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.6,
            invalidateOnRefresh: true
          }
        })
        .to(this.circleFirst.scale, {
          x: 3,
          y: 3,
          z: 3
        })

        // Second Section
        this.secondMoveTimeline = new GSAP.timeline({
          scrollTrigger: {
            trigger: '.second-move',
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.6,
            invalidateOnRefresh: true
          }
        })
        .to(this.circleSecond.scale, {
          x: 3,
          y: 3,
          z: 3
        })

        // Third Section
        this.thirdMoveTimeline = new GSAP.timeline({
          scrollTrigger: {
            trigger: '.third-move',
            start: 'top top',
            end: 'bottom bottom',
            markers: true,
            scrub: 0.6,
            invalidateOnRefresh: true
          }
        })
        .to(this.circleThird.scale, {
          x: 3,
          y: 3,
          z: 3
        })
      }

    });
  }

  resize() {}

  update() {}
}

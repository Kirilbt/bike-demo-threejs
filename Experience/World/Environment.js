import * as THREE from 'three'
import GSAP from 'gsap'
import Experience from '../Experience.js'

export default class Environment {
  constructor() {
    this.experience = new Experience()
    this.scene = this.experience.scene
    this.resources = this.experience.resources
    this.debug = this.experience.debug

    // Debug
    if(this.debug.active) {
      this.debugFolder = this.debug.ui.addFolder('environment')
      this.obj = {
        colorObj: {r:0 , g: 0, b: 0}
      }
    }

    // Setup
    this.setLight()
  }

  setLight() {
    this.sunLight = new THREE.DirectionalLight("#ffffff", 3)
    this.sunLight.castShadow = true
    this.sunLight.shadow.camera.far = 20
    this.sunLight.shadow.mapSize.set(2048, 2048)
    this.sunLight.shadow.normalBias = 0.05
    this.sunLight.position.set(3, 7, 3)
    this.scene.add(this.sunLight)

    // // Sun Light Helper
    // this.sunLightHelper = new THREE.DirectionalLightHelper(this.sunLight, 5)
    // this.scene.add(this.sunLightHelper)

    this.ambientLight = new THREE.AmbientLight('#ffffff', 1)
    this.scene.add(this.ambientLight)

    // Debug
    if(this.debug.active) {
      this.debugFolder
        .addColor(this.obj, 'colorObj')
        .name('lightsColor')
        .onChange(() => {
          this.sunLight.color.copy(this.obj.colorObj)
          this.ambientLight.color.copy(this.obj.colorObj)
        })

      this.debugFolder
        .add(this.sunLight, 'intensity')
        .name('sunLightIntensity')
        .min(0)
        .max(10)
        .step(0.001)

      this.debugFolder
        .add(this.sunLight.position, 'x')
        .name('sunLightX')
        .min(- 5)
        .max(5)
        .step(0.001)

      this.debugFolder
        .add(this.sunLight.position, 'y')
        .name('sunLightY')
        .min(- 5)
        .max(5)
        .step(0.001)

      this.debugFolder
        .add(this.sunLight.position, 'z')
        .name('sunLightZ')
        .min(- 5)
        .max(5)
        .step(0.001)

        this.debugFolder
        .add(this.sunLight.rotation, 'x')
        .name('sunRotationX')
        .min(- 5)
        .max(5)
        .step(0.001)

      this.debugFolder
        .add(this.sunLight.rotation, 'y')
        .name('sunRotationY')
        .min(- 5)
        .max(5)
        .step(0.001)

      this.debugFolder
        .add(this.sunLight.rotation, 'z')
        .name('sunRotationZ')
        .min(- 5)
        .max(5)
        .step(0.001)

      this.debugFolder
        .add(this.ambientLight, 'intensity')
        .name('ambLightIntensity')
        .min(0)
        .max(10)
        .step(0.001)
    }
  }

  switchTheme(theme) {
    if(theme === 'dark') {
      GSAP.to(this.sunLight.color, {
        r: 0.17,
        g: 0.23,
        b: 0.68
      })
      GSAP.to(this.ambientLight.color, {
        r: 0.17,
        g: 0.23,
        b: 0.68
      })
      GSAP.to(this.sunLight, {
        intensity: 1
      })
      GSAP.to(this.ambientLight, {
        intensity: 1
      })
    } else {
      GSAP.to(this.sunLight.color, {
        r: 255 / 255,
        g: 255 / 255,
        b: 255 / 255
      })
      GSAP.to(this.ambientLight.color, {
        r: 255 / 255,
        g: 255 / 255,
        b: 255 / 255
      })
      GSAP.to(this.sunLight, {
        intensity: 3
      })
      GSAP.to(this.ambientLight, {
        intensity: 1
      })
    }
  }

  resize() {

  }

  update() {

  }
}

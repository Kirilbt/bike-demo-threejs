import * as THREE from 'three'
import { DirectionalLightHelper } from 'three'
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
    this.setBackground()
    this.setLights()
    this.setEnvironmentMap()
  }

  setBackground() {
    this.bgColor = 0x222222
    this.scene.background = new THREE.Color(this.bgColor)
    this.scene.fog = new THREE.Fog(this.bgColor, 5, 20)
  }

  setLights() {
    // Sun Light
    this.sunLight = new THREE.DirectionalLight("#222222", 0.2)
    this.sunLight.castShadow = true
    this.sunLight.shadow.camera.far = 20
    this.sunLight.shadow.mapSize.set(1024, 1024)
    this.sunLight.shadow.normalBias = 0.05
    this.sunLight.position.set(3, 7, 3)
    this.scene.add(this.sunLight)

    // // Sun Light Helper
    // this.sunLightHelper = new THREE.DirectionalLightHelper(this.sunLight, 5)
    // this.scene.add(this.sunLightHelper)

    // Ambient Light
    this.ambientLight = new THREE.AmbientLight('#222222', 0.2)
    this.scene.add(this.ambientLight)

    // Directional Light
    const color = 0xffffff
    const intensity = 1

    const targetObject = new THREE.Object3D();
    targetObject.position.set(0, 0.5, 0)
    this.scene.add(targetObject);

    this.directionalLight = new THREE.DirectionalLight( color, intensity )
    this.directionalLight.position.set( 0, 1.5, 3 )
    this.directionalLight.target = targetObject;
    this.scene.add( this.directionalLight )

    this.directionalLight2 = new THREE.DirectionalLight( color, intensity )
    this.directionalLight2.position.set( -2, 2, 3 )
    this.directionalLight2.target = targetObject;
    this.scene.add( this.directionalLight2 )

    this.directionalLight3 = new THREE.DirectionalLight( color, intensity )
    this.directionalLight3.position.set( 2, 2, 3 )
    this.directionalLight3.target = targetObject;
    this.directionalLight3.castShadow = true
    this.directionalLight3.shadow.camera.far = 20
    this.directionalLight3.shadow.mapSize.set(1024, 1024)
    this.directionalLight3.shadow.normalBias = 0.05
    this.scene.add( this.directionalLight3 )

    // // Directional Light Helpers
    // this.directionalLightHelper = new DirectionalLightHelper( this.directionalLight )
    // this.directionalLight.add( this.directionalLightHelper )
    // this.directionalLightHelper2 = new DirectionalLightHelper( this.directionalLight2 )
    // this.directionalLight2.add( this.directionalLightHelper2 )
    // this.directionalLightHelper3 = new DirectionalLightHelper( this.directionalLight3 )
    // this.directionalLight3.add( this.directionalLightHelper3 )

    // Debug
    if(this.debug.active) {
      // All Lights
      this.debugFolder
        .addColor(this.obj, 'colorObj')
        .name('lightsColor')
        .onChange(() => {
          this.sunLight.color.copy(this.obj.colorObj)
          this.ambientLight.color.copy(this.obj.colorObj)
          this.directionalLight.color.copy(this.obj.colorObj)
          this.directionalLight2.color.copy(this.obj.colorObj)
          this.directionalLight3.color.copy(this.obj.colorObj)
        })

      // Sun Light
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

      // Ambient Light
      this.debugFolder
        .add(this.ambientLight, 'intensity')
        .name('ambLightIntensity')
        .min(0)
        .max(10)
        .step(0.001)

      // Directional Lights
      // 1
      this.debugFolder
        .add(this.directionalLight, 'intensity')
        .name('directionalLightIntensity')
        .min(0)
        .max(10)
        .step(0.001)

      this.debugFolder
        .add(this.directionalLight.position, 'x')
        .name('directionalLightX')
        .min(- 10)
        .max(10)
        .step(0.001)

      this.debugFolder
        .add(this.directionalLight.position, 'y')
        .name('directionalLightY')
        .min(- 10)
        .max(10)
        .step(0.001)

      this.debugFolder
        .add(this.directionalLight.position, 'z')
        .name('directionalLightZ')
        .min(- 10)
        .max(10)
        .step(0.001)

      this.debugFolder
        .add(this.directionalLight.rotation, 'x')
        .name('directionalLightRotX')
        .min(- 10)
        .max(10)
        .step(0.001)

      this.debugFolder
        .add(this.directionalLight.rotation, 'y')
        .name('directionalLightRotY')
        .min(- 10)
        .max(10)
        .step(0.001)

      this.debugFolder
        .add(this.directionalLight.rotation, 'z')
        .name('directionalLightRotZ')
        .min(- 10)
        .max(10)
        .step(0.001)

      // 2
      this.debugFolder
        .add(this.directionalLight2, 'intensity')
        .name('directionalLight2Intensity')
        .min(0)
        .max(10)
        .step(0.001)

      this.debugFolder
        .add(this.directionalLight2.position, 'x')
        .name('directionalLight2X')
        .min(- 10)
        .max(10)
        .step(0.001)

      this.debugFolder
        .add(this.directionalLight2.position, 'y')
        .name('directionalLight2Y')
        .min(- 10)
        .max(10)
        .step(0.001)

      this.debugFolder
        .add(this.directionalLight2.position, 'z')
        .name('directionalLight2Z')
        .min(- 10)
        .max(10)
        .step(0.001)

      this.debugFolder
        .add(this.directionalLight2.rotation, 'x')
        .name('directionalLight2RotX')
        .min(- 10)
        .max(10)
        .step(0.001)

      this.debugFolder
        .add(this.directionalLight2.rotation, 'y')
        .name('directionalLight2RotY')
        .min(- 10)
        .max(10)
        .step(0.001)

      this.debugFolder
        .add(this.directionalLight2.rotation, 'z')
        .name('directionalLight2RotZ')
        .min(- 10)
        .max(10)
        .step(0.001)

      // 3
      this.debugFolder
        .add(this.directionalLight3, 'intensity')
        .name('directionalLight3Intensity')
        .min(0)
        .max(10)
        .step(0.001)

      this.debugFolder
        .add(this.directionalLight3.position, 'x')
        .name('directionalLight3X')
        .min(- 10)
        .max(10)
        .step(0.001)

      this.debugFolder
        .add(this.directionalLight3.position, 'y')
        .name('directionalLight3Y')
        .min(- 10)
        .max(10)
        .step(0.001)

      this.debugFolder
        .add(this.directionalLight3.position, 'z')
        .name('directionalLight3Z')
        .min(- 10)
        .max(10)
        .step(0.001)

      this.debugFolder
        .add(this.directionalLight3.rotation, 'x')
        .name('directionalLight3RotX')
        .min(- 10)
        .max(10)
        .step(0.001)

      this.debugFolder
        .add(this.directionalLight3.rotation, 'y')
        .name('directionalLight3RotY')
        .min(- 10)
        .max(10)
        .step(0.001)

      this.debugFolder
        .add(this.directionalLight3.rotation, 'z')
        .name('directionalLight3RotZ')
        .min(- 10)
        .max(10)
        .step(0.001)
    }
  }

  setEnvironmentMap() {
    this.environmentMap = {}
    this.environmentMap.intensity = 1
    this.environmentMap.texture = this.resources.items.environmentMapTexture
    this.environmentMap.texture.encoding = THREE.sRGBEncoding

    this.scene.environment = this.environmentMap.texture

    this.environmentMap.updateMaterials = () => {
      this.scene.traverse((child) => {
        if(child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial)
        {
            child.material.envMap = this.environmentMap.texture
            child.material.envMapIntensity = this.environmentMap.intensity
            child.material.needsUpdate = true
        }
      })
    }
    this.environmentMap.updateMaterials()
  }

  switchTheme(theme) {
    if(theme === 'dark') {
      this.toDarkTimeline = new GSAP.timeline()
      .to(this.scene.background, {
        r: 34 / 255,
        g: 34 / 255,
        b: 34 / 255
      }, 'same')
      .to(this.scene.fog.color, {
        r: 34 / 255,
        g: 34 / 255,
        b: 34 / 255
      }, 'same')
      .to(this.sunLight.color, {
        r: 34 / 255,
        g: 34 / 255,
        b: 34 / 255
      }, 'same')
      .to(this.ambientLight.color, {
        r: 34 / 255,
        g: 34 / 255,
        b: 34 / 255
      }, 'same')
      .to(this.sunLight, {
        intensity: 0.2
      }, 'same')
      .to(this.ambientLight, {
        intensity: 0.2
      }, 'same')
      .to(this.directionalLight, {
        intensity: 1
      }, 'same')
      .to(this.directionalLight2, {
        intensity: 1
      }, 'same')
      .to(this.directionalLight3, {
        intensity: 1
      }, 'same')
    } else {
      this.toLightTimeline = new GSAP.timeline()
      .to(this.scene.background, {
        r: 215 / 255,
        g: 216 / 255,
        b: 217 / 255
      }, 'same')
      .to(this.scene.fog.color, {
        r: 215 / 255,
        g: 216 / 255,
        b: 217 / 255
      }, 'same')
      .to(this.sunLight.color, {
        r: 215 / 255,
        g: 216 / 255,
        b: 217 / 255
      }, 'same')
      .to(this.ambientLight.color, {
        r: 215 / 255,
        g: 216 / 255,
        b: 217 / 255
      }, 'same')
      .to(this.sunLight, {
        intensity: 3
      }, 'same')
      .to(this.ambientLight, {
        intensity: 1
      }, 'same')
      .to(this.directionalLight, {
        intensity: 0
      }, 'same')
      .to(this.directionalLight2, {
        intensity: 0
      }, 'same')
      .to(this.directionalLight3, {
        intensity: 0
      }, 'same')
    }
  }

  resize() {}

  update() {}
}

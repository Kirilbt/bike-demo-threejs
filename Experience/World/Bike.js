import * as THREE from 'three'
import { Camera } from "three";
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper.js'
import GSAP from 'gsap'
import Experience from '../Experience.js'

export default class Bike {
  constructor() {
    this.experience = new Experience()
    this.scene = this.experience.scene
    this.resources = this.experience.resources
    this.bike = this.resources.items.bike
    this.actualBike = this.bike.scene
    this.bikeChildren = {}

    this.lerp = {
      current: 0,
      target: 0,
      ease: 0.1
    }

    this.setModel()
    this.setRectAreaLight()
    this.setLookAtCube()
    this.onMouseMove()
    this.setBikeGroup()
  }

  setModel() {
    // this.actualBike.scale.set(0, 0, 0)

    this.actualBike.traverse((child) => {
      if(child instanceof THREE.Mesh) {
        // Shadows
        child.castShadow = true
        child.receiveShadow = true

        // Material
        child.material = new THREE.MeshStandardMaterial
        child.material.color.set(0xd7d8d9)
      }

      if(child.name === 'Preloader') {
        child.scale.set(1, 1, 1)
        child.rotation.y = Math.PI / 4
      }

      this.bikeChildren[child.name.toLowerCase()] = child
    })
  }

  setRectAreaLight() {
    const width = 1
    const height = 1
    const intensity = 5
    this.rectLight = new THREE.RectAreaLight( 0xffffff, intensity,  width, height )
    this.rectLight.position.set( 3, 1, 2 )
    this.rectLight.rotation.y = Math.PI / 3.5
    this.rectLight.rotation.z = Math.PI / 3.5
    this.actualBike.add( this.rectLight )

    this.bikeChildren['rectLight'] = this.rectLight

    // // Rect Area Light Helper
    // const rectLightHelper = new RectAreaLightHelper( rectLight );
    // rectLight.add( rectLightHelper )
  }

  setLookAtCube() {
    const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5)
    const material = new THREE.MeshBasicMaterial({
      color: 0xff0000,
      wireframe: true
    })
    this.lookAtCube = new THREE.Mesh(geometry, material)
    // this.lookAtCube.material.visible = false // Make it Invisible
    this.lookAtCube.position.y = 1
    this.actualBike.add(this.lookAtCube)

    this.bikeChildren['lookAtCube'] = this.lookAtCube
  }

  switchTheme(theme) {
    if(theme === 'dark') {
      GSAP.to(this.rectLight, {
        intensity: 1
      })
    } else {
      GSAP.to(this.rectLight, {
        intensity: 5
      })
    }
  }

  onMouseMove() {
    window.addEventListener('mousemove', (e) => {
      this.rotation = ((e.clientX - window.innerWidth / 2) * 2) / window.innerWidth // makes the position of the cursor from -1 to 1
      this.lerp.target = this.rotation * 0.5
    })
  }

  setBikeGroup() {
    // New group so we can rotate the bike with GSAP without intefering with our mouse rotation lerping
    // Like a spinning plateform that can spin independetly from others
    this.group = new THREE.Group()
    this.group.add(this.actualBike)
    this.scene.add(this.group)
  }

  resize() {}

  update() {
    this.lerp.current = GSAP.utils.interpolate(
      this.lerp.current,
      this.lerp.target,
      this.lerp.ease
    )

    this.group.rotation.y = this.lerp.current
  }
}

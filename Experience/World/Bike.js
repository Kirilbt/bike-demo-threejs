import * as THREE from 'three'
import { DirectionalLightHelper } from 'three'
import GSAP from 'gsap'
import Experience from '../Experience.js'

export default class Bike {
  constructor() {
    this.experience = new Experience()
    this.scene = this.experience.scene
    this.resources = this.experience.resources
    this.debug = this.experience.debug
    this.bike = this.resources.items.bike
    this.actualBike = this.bike.scene
    this.bikeChildren = {}

    this.lerp = {
      current: 0,
      target: 0,
      ease: 0.1
    }

    // Debug
    if(this.debug.active) {
      this.debugFolder = this.debug.ui.addFolder('bike')
      this.obj = {
        colorObj: {r:0 , g: 0, b: 0}
      }
    }

    this.setBikeModel()
    this.onMouseMove()
    this.setBikeGroup()
  }

  setBikeModel() {
    this.actualBike.scale.set(0, 0, 0)

    this.actualBike.traverse((child) => {
      if(child instanceof THREE.Mesh) {
        // Shadows
        child.castShadow = true
        child.receiveShadow = true

        // Material
        this.bikeMaterial = new THREE.MeshStandardMaterial({
          color: 0xd7d8d9,
          envMapIntensity: 0.1
        })
        child.material = this.bikeMaterial
      }

      if(child.name === 'BoxFace1') {
        child.material.side = THREE.BackSide
        child.material.color.set(0x111111)
      }
      if(child.name === 'BoxFace2') {
        child.material.side = THREE.BackSide
        child.material.color.set(0x111111)
      }
      if(child.name === 'BoxFace3') {
        child.material.side = THREE.BackSide
        child.material.color.set(0x111111)
      }
      if(child.name === 'BoxFace4') {
        child.material.side = THREE.BackSide
        child.material.color.set(0x111111)
      }

      if(child.name === 'BrakeF') {
        child.material.color.set(0x050505)
      }

      if(child.name === 'BrakeB') {
        child.material.color.set(0x050505)
      }

      if(child.name === 'BrakePadsF') {
        child.material.color.set(0x050505)
      }

      if(child.name === 'BrakePadsB') {
        child.material.color.set(0x050505)
      }

      if(child.name === 'BrakeCableF') {
        child.material.color.set(0xff8c00)
      }

      if(child.name === 'BrakeCableB') {
        child.material.color.set(0xff8c00)
      }

      if(child.name === 'BrakeDetailF') {
        child.material.color.set(0xff8c00)
      }

      if(child.name === 'BrakeDetailB') {
        child.material.color.set(0xff8c00)
      }

      if(child.name === 'Frame') {
        child.material.metalness = 0.9
        child.material.roughness = 0
      }

      if(child.name === 'Chain1') {
        child.material.color.set(0x050505)
        child.material.metalness = 0.9
        child.material.roughness = 0
      }

      if(child.name === 'Chain2') {
        child.material.color.set(0x050505)
        child.material.metalness = 0.9
        child.material.roughness = 0
      }

      if(child.name === 'ChainringsCover') {
        child.material.color.set(0x050505)
        child.material.metalness = 0.9
        child.material.roughness = 0
      }

      if(child.name === 'CrankArm') {
        child.material.metalness = 0.9
        child.material.roughness = 0
      }

      if(child.name === 'Cassette') {
        child.material.metalness = 0.9
        child.material.roughness = 0
      }

      if(child.name === 'PedalL') {
        child.material.color.set(0x050505)
      }

      if(child.name === 'PedalR') {
        child.material.color.set(0x050505)
      }

      if(child.name === 'PedalGripL') {
        child.material.color.set(0x050505)
      }

      if(child.name === 'PedalGripR') {
        child.material.color.set(0x050505)
      }

      if(child.name === 'CockpitStem') {
        child.material.color.set(0x050505)
        child.material.metalness = 0.5
        child.material.roughness = 0
      }

      if(child.name === 'CockpitHandlebar') {
        child.material.color.set(0x050505)
        child.material.roughness = 1
      }

      if(child.name === 'TireF') {
        child.material.color.set(0x050505)
        child.material.roughness = 1
      }

      if(child.name === 'TireB') {
        child.material.color.set(0x050505)
        child.material.roughness = 1
      }

      if(child.name === 'RimF') {
        child.material.metalness = 0.5
        child.material.roughness = 0
      }

      if(child.name === 'RimB') {
        child.material.metalness = 0.5
        child.material.roughness = 0
      }

      if(child.name === 'RimInnerF') {
        child.material.color.set(0xff8c00)
        child.material.roughness = 0
      }

      if(child.name === 'RimInnerB') {
        child.material.color.set(0xff8c00)
        child.material.roughness = 0
      }

      if(child.name === 'SpokesF') {
        child.material.metalness = 0.9
        child.material.roughness = 0
      }

      if(child.name === 'SpokesB') {
        child.material.metalness = 0.9
        child.material.roughness = 0
      }

      if(child.name === 'FasteningF') {
        child.material.color.set(0x050505)
        child.material.metalness = 0.5
        child.material.roughness = 0
      }

      if(child.name === 'FasteningB') {
        child.material.color.set(0x050505)
        child.material.metalness = 0.5
        child.material.roughness = 0
      }

      if(child.name === 'HubF') {
        child.material.color.set(0x050505)
        child.material.metalness = 0.5
        child.material.roughness = 0
      }

      if(child.name === 'HubB') {
        child.material.color.set(0x050505)
        child.material.metalness = 0.5
        child.material.roughness = 0
      }

      if(child.name === 'Seat') {
        child.material.color.set(0x050505)
        child.material.roughness = 1
      }

      this.bikeChildren[child.name.toLowerCase()] = child
    })
  }

  switchTheme(theme) {
    if(theme === 'dark') {
      this.toDarkTimeline = new GSAP.timeline()

      this.actualBike.traverse((child) => {
        if(child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial) {
          this.toDarkTimeline.to(child.material, {
            envMapIntensity: 0.1
          }, 'same')
        }

        if(child.name === 'BoxFace1') {
          child.material.color.set(0x111111)
        } else if (child.name === 'BoxFace2') {
          child.material.color.set(0x111111)
        } else if (child.name === 'BoxFace3') {
          child.material.color.set(0x111111)
        } else if (child.name === 'BoxFace4') {
          child.material.color.set(0x111111)
        }
      })
    } else {
      this.toLightTimeline = new GSAP.timeline()

      this.actualBike.traverse((child) => {
        if(child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial) {
          this.toLightTimeline.to(child.material, {
            envMapIntensity: 1
          }, 'same')
        }

        if(child.name === 'BoxFace1') {
          child.material.color.set(0xd7d8d9)
        } else if (child.name === 'BoxFace2') {
          child.material.color.set(0xd7d8d9)
        } else if (child.name === 'BoxFace3') {
          child.material.color.set(0xd7d8d9)
        } else if (child.name === 'BoxFace4') {
          child.material.color.set(0xd7d8d9)
        }
      })
    }
  }

  onMouseMove() {
    window.addEventListener('mousemove', (e) => {
      this.rotation = ((e.clientX - window.innerWidth / 2) * 2) / window.innerWidth // makes the position of the cursor from -1 to 1
      this.lerp.target = this.rotation * 0.3
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

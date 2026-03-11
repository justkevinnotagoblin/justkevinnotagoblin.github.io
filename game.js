let scene = new THREE.Scene()

let camera = new THREE.PerspectiveCamera(
75,
window.innerWidth/window.innerHeight,
0.1,
1000
)

let renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth,window.innerHeight)
document.body.appendChild(renderer.domElement)

camera.position.set(0,1.6,5)

let light = new THREE.PointLight(0xffffff,1)
light.position.set(0,5,0)
scene.add(light)

let floorGeo = new THREE.BoxGeometry(20,1,20)
let floorMat = new THREE.MeshStandardMaterial({color:0x888888})
let floor = new THREE.Mesh(floorGeo,floorMat)
floor.position.y=-1
scene.add(floor)

let wallMat = new THREE.MeshStandardMaterial({color:0xffffff})

function wall(x,y,z,w,h,d){
let g=new THREE.BoxGeometry(w,h,d)
let m=new THREE.Mesh(g,wallMat)
m.position.set(x,y,z)
scene.add(m)
}

wall(0,2,-10,20,5,1)
wall(-10,2,0,1,5,20)
wall(10,2,0,1,5,20)

let bluePortal=null
let orangePortal=null

function createPortal(color){
let g=new THREE.CircleGeometry(1,32)
let m=new THREE.MeshBasicMaterial({color:color})
let p=new THREE.Mesh(g,m)
return p
}

document.addEventListener("mousedown",e=>{

let dir=new THREE.Vector3()
camera.getWorldDirection(dir)

let pos=camera.position.clone().add(dir.multiplyScalar(5))

if(e.button===0){

if(bluePortal) scene.remove(bluePortal)

bluePortal=createPortal(0x00aaff)
bluePortal.position.copy(pos)
scene.add(bluePortal)

}

if(e.button===2){

if(orangePortal) scene.remove(orangePortal)

orangePortal=createPortal(0xff8800)
orangePortal.position.copy(pos)
scene.add(orangePortal)

}

})

let keys={}

document.addEventListener("keydown",e=>keys[e.key]=true)
document.addEventListener("keyup",e=>keys[e.key]=false)

function move(){

let speed=0.08

if(keys["w"]) camera.position.z-=speed
if(keys["s"]) camera.position.z+=speed
if(keys["a"]) camera.position.x-=speed
if(keys["d"]) camera.position.x+=speed

}

function portalCheck(){

if(!bluePortal || !orangePortal) return

let d1=camera.position.distanceTo(bluePortal.position)
let d2=camera.position.distanceTo(orangePortal.position)

if(d1<1){
camera.position.copy(orangePortal.position)
}

if(d2<1){
camera.position.copy(bluePortal.position)
}

}

function loop(){

move()
portalCheck()

renderer.render(scene,camera)

requestAnimationFrame(loop)

}

loop()

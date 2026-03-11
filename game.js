const canvas = document.getElementById("game")
const ctx = canvas.getContext("2d")

canvas.width = window.innerWidth
canvas.height = window.innerHeight

let player = {
x:200,
y:200,
size:20,
speed:3
}

let keys = {}

let bluePortal = null
let orangePortal = null

let walls = [
{x:300,y:200,w:200,h:20},
{x:500,y:350,w:20,h:200},
{x:150,y:450,w:250,h:20}
]

document.addEventListener("keydown",e=>keys[e.key]=true)
document.addEventListener("keyup",e=>keys[e.key]=false)

canvas.addEventListener("click",e=>{
bluePortal = {x:e.clientX,y:e.clientY}
})

canvas.addEventListener("contextmenu",e=>{
e.preventDefault()
orangePortal = {x:e.clientX,y:e.clientY}
})

function movePlayer(){

if(keys["w"]) player.y -= player.speed
if(keys["s"]) player.y += player.speed
if(keys["a"]) player.x -= player.speed
if(keys["d"]) player.x += player.speed

}

function portalTeleport(){

if(!bluePortal || !orangePortal) return

let dx = player.x-bluePortal.x
let dy = player.y-bluePortal.y

if(Math.sqrt(dx*dx+dy*dy) < 20){
player.x = orangePortal.x
player.y = orangePortal.y
}

dx = player.x-orangePortal.x
dy = player.y-orangePortal.y

if(Math.sqrt(dx*dx+dy*dy) < 20){
player.x = bluePortal.x
player.y = bluePortal.y
}

}

function drawWalls(){

ctx.fillStyle="white"

for(let w of walls){
ctx.fillRect(w.x,w.y,w.w,w.h)
}

}

function drawPortals(){

if(bluePortal){
ctx.fillStyle="blue"
ctx.beginPath()
ctx.arc(bluePortal.x,bluePortal.y,15,0,Math.PI*2)
ctx.fill()
}

if(orangePortal){
ctx.fillStyle="orange"
ctx.beginPath()
ctx.arc(orangePortal.x,orangePortal.y,15,0,Math.PI*2)
ctx.fill()
}

}

function drawPlayer(){

ctx.fillStyle="red"
ctx.fillRect(
player.x-player.size/2,
player.y-player.size/2,
player.size,
player.size
)

}

function loop(){

ctx.clearRect(0,0,canvas.width,canvas.height)

movePlayer()
portalTeleport()

drawWalls()
drawPortals()
drawPlayer()

requestAnimationFrame(loop)

}

loop()

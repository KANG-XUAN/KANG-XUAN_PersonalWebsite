<template>
  <!-- 黑夜遮罩層 -->
  <canvas ref="maskCanvas" class="dark-overlay" />


  <!-- 螢火蟲容器 -->
  <div class="fireflies-container" ref="firefliesContainerRef">

    <div v-for="(firefly, index) in fireflies" :key="index" class="firefly" :style="{
      top: firefly.y + 'px',
      left: firefly.x + 'px'
    }"></div>

  </div>

</template>


<script setup>

import {
  ref,
  onMounted,
  onBeforeUnmount
} from 'vue'


/*
  滑鼠位置
*/
const mouseX = ref(
  window.innerWidth / 2
)

const mouseY = ref(
  window.innerHeight / 2
)



/*
  螢火蟲資料
*/
const fireflies = ref([])



const firefliesContainerRef =
  ref(null)



const maskCanvas =
  ref(null)



let animationId = null



/***********************
 * 螢火蟲數量
 ***********************/

const birth =
  new Date('2001-03-20')


const now =
  new Date()


const age =
  now.getFullYear()
  -
  birth.getFullYear()
  -
  (
    now <
    new Date(
      now.getFullYear(),
      2,
      20
    )
  )


const fireflyCount = age



/***********************
 * 建立螢火蟲
 ***********************/

function createFireflies() {

  const rect =
    firefliesContainerRef.value
      .getBoundingClientRect()


  fireflies.value =
    Array.from(
      {
        length: fireflyCount
      }
    )
      .map(() => ({

        x:
          Math.random()
          *
          rect.width,


        y:
          Math.random()
          *
          rect.height,


        vx: 0,

        vy: 0,


        targetX:
          Math.random()
          *
          rect.width,


        targetY:
          Math.random()
          *
          rect.height

      }))

}




/***********************
 * canvas 尺寸
 ***********************/

function resizeCanvas() {

  const canvas =
    maskCanvas.value


  if (!canvas)
    return


  canvas.width =
    window.innerWidth


  canvas.height =
    window.innerHeight

}



/***********************
 * 更新黑霧與破口
 ***********************/

function updateMask() {

  const canvas =
    maskCanvas.value


  if (!canvas)
    return


  const ctx =
    canvas.getContext('2d')



  /*
    清除上一幀
  */

  ctx.clearRect(
    0,
    0,
    canvas.width,
    canvas.height
  )



  /*
    畫黑霧
  */

  ctx.fillStyle =
    'rgba(0,0,0,0.75)'


  ctx.fillRect(
    0,
    0,
    canvas.width,
    canvas.height
  )



  /*
    開始挖洞
  */

  ctx.globalCompositeOperation =
    'destination-out'



  /*
    滑鼠光圈
  */

  drawHole(
    ctx,
    mouseX.value,
    mouseY.value,
    120
  )



  /*
    螢火蟲光圈
  */

  const rect =
    firefliesContainerRef.value
      .getBoundingClientRect()



  fireflies.value.forEach(f => {


    const x =
      rect.left + f.x


    const y =
      rect.top + f.y



    drawHole(
      ctx,
      x,
      y,
      60
    )


  })



  /*
    恢復
  */

  ctx.globalCompositeOperation =
    'source-over'

}





/***********************
 * 畫圓形破口
 ***********************/

function drawHole(
  ctx,
  x,
  y,
  radius
) {


  const gradient =
    ctx.createRadialGradient(
      x,
      y,
      0,
      x,
      y,
      radius
    )


  gradient.addColorStop(
    0,
    'rgba(0,0,0,1)'
  )


  gradient.addColorStop(
    1,
    'rgba(0,0,0,0)'
  )


  ctx.fillStyle =
    gradient



  ctx.beginPath()


  ctx.arc(
    x,
    y,
    radius,
    0,
    Math.PI * 2
  )


  ctx.fill()

}




/***********************
 * 螢火蟲動畫
 ***********************/

function animateFireflies() {

  const rect =
    firefliesContainerRef.value
      .getBoundingClientRect()



  fireflies.value.forEach(f => {


    const dx =
      f.targetX - f.x


    const dy =
      f.targetY - f.y


    const distance =
      Math.hypot(
        dx,
        dy
      )



    const angle =
      Math.atan2(
        dy,
        dx
      )



    const speed =
      0.3


    const turn =
      0.02



    const desiredVx =
      Math.cos(angle)
      *
      speed


    const desiredVy =
      Math.sin(angle)
      *
      speed



    f.vx +=
      (
        desiredVx
        -
        f.vx
      )
      *
      turn



    f.vy +=
      (
        desiredVy
        -
        f.vy
      )
      *
      turn



    f.x += f.vx

    f.y += f.vy




    if (distance < 30) {

      f.targetX =
        Math.random()
        *
        rect.width


      f.targetY =
        Math.random()
        *
        rect.height

    }

  })



  updateMask()



  animationId =
    requestAnimationFrame(
      animateFireflies
    )

}





/***********************
 * 滑鼠
 ***********************/

function handleMouseMove(e) {

  mouseX.value =
    e.clientX


  mouseY.value =
    e.clientY


  updateMask()

}





/***********************
 * 啟動
 ***********************/

onMounted(() => {


  resizeCanvas()



  createFireflies()



  window.addEventListener(
    'mousemove',
    handleMouseMove
  )


  window.addEventListener(
    'resize',
    resizeCanvas
  )



  animateFireflies()

})




onBeforeUnmount(() => {


  window.removeEventListener(
    'mousemove',
    handleMouseMove
  )


  window.removeEventListener(
    'resize',
    resizeCanvas
  )


  cancelAnimationFrame(
    animationId
  )


})



</script>



<style scoped>
.dark-overlay {

  position: absolute;

  top: 0;
  left: 0;

  width: 100%;
  height: 100%;

  pointer-events: none;

  cursor: none;

  z-index: 1;

}



.fireflies-container {

  position: absolute;

  top: 0;
  left: 0;

  width: 100%;
  height: 100%;

  overflow: hidden;

  pointer-events: none;

  z-index: 2;

}



.firefly {

  position: absolute;

  width: 8px;

  height: 8px;

  background: #fff9c4;

  border-radius: 50%;

  opacity: 0.8;

  box-shadow:
    0 0 10px 3px rgba(255,
      255,
      200,
      0.5);


  animation:
    flicker 2s infinite ease-in-out;

}



@keyframes flicker {

  0%,
  100% {
    opacity: 0.6;
  }


  50% {
    opacity: 1;
  }

}
</style>
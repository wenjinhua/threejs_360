import gsap from 'gsap'
import setCameraPos from './setCameraPos'

// 鼠标位移与经纬度的转换
const getMovPos = ({ startPos, endPos, curRotate }) => {
  const { x: sx, y: sy } = startPos
  const { x: ex, y: ey } = endPos
  const { longtitude: curLongtitude, latitude: curLatitude } = curRotate

  const longtitude = (sx - ex) * 0.138 + curLongtitude
  const latitude = (sy - ey) * 0.12 + curLatitude
  return {
    longtitude,
    latitude,
  }
}

export default function Event(posObj) {
  let startPosX = 0
  let startPosY = 0
  let startTs = 0
  let isMouseDown = false
  const moveBuffTime = 10
  const movObj = {
    longtitude: 0,
    latitude: 0,
  }

// 鼠标移动时，移动相机
// 1. 将鼠标移动距离转化为经纬度
// 2. 将经纬度转化为相机的坐标
// 3. 改变相机的位置
  const move = (startPos, endPos, duration) => {
    if (duration === 0) return

    const { x: sx, y: sy } = startPos
    const { x: ex, y: ey } = endPos
    const vx = (ex - sx) / duration// X 轴方向上的速度
    const vy = (ey - sy) / duration// Y 轴方向上的速度
    // 1.鼠标移动距离->经纬度
    const { longtitude, latitude } = getMovPos({
        startPos,
        endPos: { x: vx * moveBuffTime + ex, y: vy * moveBuffTime + ey },
        curRotate: { longtitude: movObj.longtitude , latitude: movObj.latitude },
    })
    // 2.经纬度->相机的坐标
    // 缺点（以横向移动鼠标为例）：理论上讲，相机应该只有水平上的移动，不应该有竖直方向的移动。
    // 但是由于对于只要sy-ey出现些许偏差，那么由getMovPos函数计算出的latitude就会有值，并且这个值会被当做后续的curLatitude一直计算下去
    // const { latitude: newLatitude, posObj: newPos } = setCameraPos({longtitude: movObj.longtitude, latitude: movObj.latitude})
    // console.log('longtitude, latitude', longtitude, latitude)
    // // 3.移动相机
    // gsap.to(posObj, {
    //     ease: 'power4.out',
    //     duration: 1,
    //     camerax: newPos.x,
    //     cameray: newPos.y,
    //     cameraz: newPos.z,
    // })
    // movObj.longtitude = longtitude
    // movObj.latitude = latitude


    // 在update中设置相机实时的坐标会比上面的方法转动的更细腻
    const gsapOpts = {
      id: "gsapTween",
      ease: "power4.out",
      duration: 1,
      onUpdate: () => {
        // 将经纬值换算为摄像机的坐标值
        const { posObj: newPos } = setCameraPos({
          longtitude: movObj.longtitude,
          latitude: movObj.latitude
        });

        movObj.latitude = latitude;
        movObj.longtitude = longtitude;

        // 设置摄像机坐标
        posObj.camerax = newPos.x;
        posObj.cameray = newPos.y;
        posObj.cameraz = newPos.z;
      },
      
    };
    gsap.to(movObj, gsapOpts);
  }
 

  window.addEventListener('mousedown', e => {
    startPosX = e.clientX
    startPosY = e.clientY
    startTs = Date.now()
    isMouseDown = true
  })

  window.addEventListener('mousemove', e => {
    if (!isMouseDown) return
    const posX = e.clientX
    const posY = e.clientY
    const curTs = Date.now()

    // 根据起始和移动过程中的坐标、移动的时间来移动相机
    let startPos = { x: startPosX, y: startPosY };
    let endPos = { x: posX, y: posY };
    console.log('sy-ey', startPosY-posY)
    let duration = curTs - startTs;
    move(startPos, endPos, duration)

    // 以当前的终点为下一次的起点
    startPosX = posX
    startPosY = posY
    startTs = curTs
  })

  window.addEventListener('mouseup', e => {
    const posX = e.clientX
    const posY = e.clientY
    const curTs = Date.now()

    move({ x: startPosX, y: startPosY }, { x: posX, y: posY }, curTs - startTs)

    isMouseDown = false
  })
}

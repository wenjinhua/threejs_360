/**
 * @desc 将经纬度换算为摄像机的坐标值
 * 纬度（线面角）:是指某点与地球球心的连线和地球赤道面所成的线面角
 * 经度（面面角）:该点所在的经线平面与本初子午线平面间的夹角
 */

import * as THREE from 'three'

export default function setCameraPos ({latitude,longtitude}) {
	//将经纬度转化为弧度
	const phi = THREE.MathUtils.degToRad(latitude)
	const theta = THREE.MathUtils.degToRad(longtitude)

	const posObj = {
		x: 0,
		y: 0,
		z: 0,
	}

	// 关键公式
    const r = 100;
    posObj.y = r * Math.sin(phi);
    const ob = r * Math.cos(phi);
    posObj.z = ob * Math.cos(theta);
	posObj.x = ob * Math.sin(theta);
	
	return {
		posObj,
	}
}

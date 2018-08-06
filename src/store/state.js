/**
 * 地理位置
 * defaultCity 定位到的名字
 * longitude latitude 经纬度
 */
let defaultCity = '获取中...' 
let longitude = ''
let latitude = ''
try {
    if (localStorage.defaultCity) {
      defaultCity = localStorage.city
    }
  } catch (e) {}

export default{
  defaultCity:defaultCity
}
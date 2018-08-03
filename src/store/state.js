/**
 * 地理位置
 * defaultCity 定位到的名字
 * longitude latitude 经纬度
 */
let defaultCity = '...' 
let longitude = ''
let latitude = ''
try {
    if (localStorage.city) {
      defaultCity = localStorage.city
    }
  } catch (e) {}

export default{
    city:defaultCity
}
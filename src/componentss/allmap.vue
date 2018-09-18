<template>
  <div class="home">
    <div id="allmap" class="allmap"></div>
  </div>
</template>

<script>
//   import {getStore, setStore, removeStore} from '@/config/Utils'
  import BMap from 'BMap'
  import { Loading } from 'element-ui'
  export default {
    name:'allmap',
    data () {
      return {
        type: 'tab',
        address_detail: null,
        center: {lng: 116.40387397, lat: 39.91488908},
        BMap_address:""
      }
    },
    props:["loding"],
    mounted () {
      this.ready()
    },
    methods: {
      changeLoading () {
        this.$emit("lodingS","flase")
        this.$store.dispatch("changeCity",this.BMap_address)
      },
      ready () {
        const that = this
        let map = new BMap.Map('allmap')
        let point = new BMap.Point(this.center.lng, this.center.lat)
        map.centerAndZoom(point, 10)
        map.enableScrollWheelZoom(true)
        map.enableDoubleClickZoom(true)
        var geolocation = new BMap.Geolocation()
        geolocation.getCurrentPosition((r) => {
            this.BMap_address = r.address.district + r.address.street + r.address.street_number
            this.changeLoading()
            if (r.point) {
                this.center.lng = r.longitude
                this.center.lat = r.latitude
                this.$emit('handMap',r.longitude +"," + r.latitude) //坐标传给父级
                // this.$emit('handMap','104.106714,30.681411')
                let markers = new BMap.Marker(r.point)
                map.addOverlay(markers)
                map.panTo(r.point)
                map.centerAndZoom(r.point, 16)
          }
        }, { enableHighAccuracy: true })
      },
     
    }
  }
</script>

<style>
  #allmap{
    display: none
  }
</style>
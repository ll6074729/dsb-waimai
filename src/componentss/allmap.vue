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
      this.aa()
    },
    methods: {
      changeLoading (){
        this.$emit("lodingS","flase")
        this.$store.dispatch("changeCity",this.BMap_address)
      },
      aa () {
         this.$http({
            method: 'post',
            url: 'http://api.dqvip.cc/buyer/area_list',
            data: {
              // long_and_lat:r.longitude +"," + r.latitude
                long_and_lat:"104.106714,30.681411",
            },
            headers:{
              'Accept':'application/json',
              // 'Authorization': this.$store.state.token_type +' ' + this.$store.state.access_token,
              'content-type': 'multipart/form-data',
              'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjVhOTI3MmZjOGE0MTdlZDk0MzAzYzIwODUyNjJhMWMxNjE0Mzg5MjAwMDY0M2IxYWZlYzk4ZTQ1YjU0NDViZGYzOGUxMTk4NGI1NTdlMTliIn0.eyJhdWQiOiIyIiwianRpIjoiNWE5MjcyZmM4YTQxN2VkOTQzMDNjMjA4NTI2MmExYzE2MTQzODkyMDAwNjQzYjFhZmVjOThlNDViNTQ0NWJkZjM4ZTExOTg0YjU1N2UxOWIiLCJpYXQiOjE1MzM3MjAwNTksIm5iZiI6MTUzMzcyMDA1OSwiZXhwIjoxNTM2MzEyMDU5LCJzdWIiOiIyMiIsInNjb3BlcyI6WyIqIl19.fIdh255EGy6Ybqw6vJxRoIiH059QI--U7pZor3iGjepyELqJirW-YhniKLjM5gSXflekVJPv5-R-QgbkiQfp68jjiRo7eGJNpZcvoTH2rpjoSYGwyM5gzrqsZZVicACaej-2Z2G9bgAGQpErk4lW13x1wow4JQiUHRVQiqVauleuM7A7UGN0nTH4yUxH_BUc6pemmSnX2sBU4W-7WGyp-VzM_NSWN9YhUMsNdxHFml8I5C0b3fItEsItLyXKCbU6egjCtVNFVUnEaFQ9QHAQK-OaESaWSwHSs6VTasKbOk0D3bG-S2gjSzSLXdQub8Fxmd2n5kuyxtKMguwHDJFHjKERjGBC5oYwVXHr4f5GOpNTBPs-2haV7tSvxSaqw7Snwo3j59kuPJfaPLL-zD_xlp_msfnkDwfKxMrLy3-YAzMtWYE225m00GHNDVuaFkTW3kVkX_5xqLMefctzBTSmMX5hCigBpbcLy1_pSD6e7Z0Vm9PnAqGBI9rjkQu8nHvjjGgTGUa4WEzkZqMGUYKT7nfISmtvf85fepX80HdZg8-DE2CVKFzkiOesDX3SercopVTr4iuRwW2oQslgmPcnYxAH96-MotD-WNn55j7dVO5gYJ9nkET0UcHUjObX0rAIsKmsajYJg9nySONuk0FNyyr0T1pPzKJT0sdVuTtfE4I'
            },
          })
      },
      ready () {
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
                this.$http({
                  method: 'post',
                  url: 'http://api.dqvip.cc/buyer/area_list',
                  params: {
                    long_and_lat:r.longitude +"," + r.latitude
                  },
                  headers:{
                    'Accept':'application/json',
                    'Authorization': this.$store.state.token_type +' ' + this.$store.state.access_token,
                    'content-type': 'multipart/form-data',
                  },
                })
                  .then(function (response) {
                    console.log(response);
                    
                  })
                  .catch(function (error) {
                    console.log(error);
                  });

                // axios.post('http://api.dqvip.cc/buyer/area_list',{
                //   long_and_lat:r.longitude +"," + r.latitude
                // })
                  // .then(function (response) {
                  //   console.log(response);
                  // })
                  // .catch(function (error) {
                  //   console.log(error);
                  // });
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
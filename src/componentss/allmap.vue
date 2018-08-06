<template>
  <div class="home">
    <div id="allmap" class="allmap"></div>
  </div>
</template>

<script>
//   import {getStore, setStore, removeStore} from '@/config/Utils'
  import BMap from 'BMap'
  import axios from 'axios'
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
    },
    methods: {
      changeLoading (){
        this.$emit("lodingS","flase")
        this.$store.dispatch("changeCity",this.BMap_address)
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
                axios({
                  method: 'post',
                  url: './api/area_list',
                  data: {
                    long_and_lat:r.longitude +"," + r.latitude
                  },
                  headers:{
                    'Accept':'application/json',
                    'Authorization':'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImJmYzcyMjAyYjgyZjdiM2I3ZjQ0YjA2ZGJlMGRhZTRmMzcwN2ZkZjBlOGQ0ZTZjZmI3YTIxZGQ2Mjc0MTAyMjMyMTRiNWRiMGU0MzcyN2ZlIn0.eyJhdWQiOiIyIiwianRpIjoiYmZjNzIyMDJiODJmN2IzYjdmNDRiMDZkYmUwZGFlNGYzNzA3ZmRmMGU4ZDRlNmNmYjdhMjFkZDYyNzQxMDIyMzIxNGI1ZGIwZTQzNzI3ZmUiLCJpYXQiOjE1MzM1NDE5MzQsIm5iZiI6MTUzMzU0MTkzNCwiZXhwIjoxNTMzNzU3OTM0LCJzdWIiOiIxMyIsInNjb3BlcyI6WyIqIl19.nFLlN0Y-h-vPe64NmsaN9WIHy92OzcQF0R9orzQ7CyMV9bCsC3NDzmxQN0qYfSJPLsOcZvIpbIiewZf9FY3geuQqbfXAgnF0DDimhxRre8MHNJqKLVXHMlMPxVD01vVfCs5LNeJMLqCOVnRsanruTOprKtkFLxUJhS1w6Qv6yb3feNLC3hd6AuNsYsRGF7i8WgacI0Het-DrfT4pAPY3LE0HGB-k8deinMIZJWhEgbMxuF9YOQI7jp1ZBnZXxZhlx3GDKUbP7eRx5q7Q9CILLgfrVjIJbnC59yt2xTveV2CaDFRbPKifteujUJoI5O5B8N9f-bDQndSng5HNS_HFkCthT8v10cmwCkyNxaY9RvJ7uoQCPW-CDnqNwgigyi5dvklQ-p0x8DPrRsickELv-1Djz9SRRZEqliKn_lCX8zJfDEdNcR_MpIDLI86tNFdsuj6erZqoIWqJTSBrXYvjnxN7nH31pJrEEHHMgsOEGH2QHQ_V9b7sYBrmBiH_YJqQuUo7TZjaWhN3yFKI5-SZMA_HQzFkWIK5nCAjGmEbFsoFgqqK36nMFRotwyoAbfpcaeuYLpLkKy25WZUxDnXFYxhCKTPb5BjpoOgp2by2TXJDlamgiGJPNQyXGiL13dWmcjEyocnzkDEQigsZdHrRnhZe0BVcgTJruk_Pzox-UbE',
                    'content-type': 'multipart/form-data'
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
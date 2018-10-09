<template>
    <div>
        123
    </div>
</template>
<script>
export default {
    name:'liu',
    methods : {
        init(){
            this.$http({
                method: 'get',
                url:'http://api.dqvip.cc/test',
                // headers :{
                //     'Accept':'application/json',
                //     'Authorization':'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImVhYTBlYzkzZTVlNTczZGEwOGY4ZTMyMzdhYTIxN2ZkZGU2NDFiODVkMGYzNGQzYTA4Y2E0MGNiM2Q4NjhjNjBmYjI5NjA4YjIzMDZiM2FjIn0.eyJhdWQiOiIyIiwianRpIjoiZWFhMGVjOTNlNWU1NzNkYTA4ZjhlMzIzN2FhMjE3ZmRkZTY0MWI4NWQwZjM0ZDNhMDhjYTQwY2IzZDg2OGM2MGZiMjk2MDhiMjMwNmIzYWMiLCJpYXQiOjE1MzkwNTczMDgsIm5iZiI6MTUzOTA1NzMwOCwiZXhwIjoxNTM5MTQzNzA4LCJzdWIiOiIyIiwic2NvcGVzIjpbIioiXX0.rxY0CY3pKxfi9pbEDBpCqeru1mpD62yEoFpsfgWn-P9UVsq737WYlTKOFQlX4tZ9-ebsMr1mXM1Z5PT9RTGQ4IHNZL_fK0Yw3Kv4IWimpJrAkv-9oyTcIjnHyuL4Bxm7E0d0EJq4lRXqYxD_2usYMsvxF8Gm6kZBZGhmQoCeQ-T_7_yPEiubTIxcSEtNapmuD_oGwwDkMuIpmqSQCoAv2EmbJ__GlLIWf5l6lk1l-o0_1oOf3dM6vPhQVz9QCdo1jsWbnCxiDWy1C-YVtY9cnhBsPKLfFzrOWyIfoIX4RzrRfay0P2n8Hr271yIV0UIF5y16W44xU--lWcx_sU48zgvFsPGLfddbkyCkBC4oR7UHXFyB0nM6YA3QOym-fsJEC7nG8j2ubvEHHkj05bcPeAFbJWsUFrkc8LV8S2rPMJvGXlxbzKNmYDuBr3g1_CtY9yrpTi_oQXhYVTuaFM8dtp-QeBT4gJi4Z0V_UZQ4ihSvW9mF6r9KUeW1jrc4r15ajf-xokzrIiwkusAPGAgpwtNZsD5iisDzBtTHIXj-4i9vjs9Py42LTBYIfCRxN6ej6qVswN5mHXfg88SxNUPcoKUzFEERqHzx3NaFBdXfBl5AmJeixUJhNMFc4_vzcZ29qMGdsgZnuxXwJStv50Y3OkTfy5kCDVBc2vlHB46zNzo'
                // }
            })
                .then(function (res){
                    console.log(res)
                })
                .catch(function (error) {
                    console.log(error);
                })
        }
    },
    mounted (){
        this.init()
        
    }
}
</script>


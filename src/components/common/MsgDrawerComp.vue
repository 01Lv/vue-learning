<template>
    <div>
        <el-drawer title="站内信" :visible.sync="drawer" :direction="direction">
            <span style="color: green">abc</span>
        </el-drawer>
    </div>
</template>

<script>
export default {
    data() {
        return {
            drawer: false,
            direction: 'rtl'
        }
    },
    created(){

    },
    methods:{
        openDrawer(){
            this.drawer = true
        }
    }
}
</script>
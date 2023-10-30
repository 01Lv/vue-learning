<template>
    <el-container class="home-container">
        <!-- header -->
        <el-header>
            <div>
                <span>管理系统</span>
            </div>
            <el-button type="info" @click="logout">退出</el-button>
        </el-header>
        <!-- body -->
        <el-container>
            <!-- 侧边栏 -->
            <el-aside width="200px">
                <!-- 侧边栏菜单区域 -->
                <el-menu background-color="rgb(54, 80, 128)" text-color="#fff" active-text-color="#ffd04b">
                    <!-- 一级菜单 -->
                    <el-submenu :index="item.id+''" v-for="item in menulist" :key="item.id">
                        <!-- 一级菜单模板区域 -->
                        <template slot="title">
                            <!-- 图标 -->
                            <i class="el-icon-location"></i>
                            <!-- 文本 -->
                            <span>{{ item.name }}</span>
                        </template>
                        <!-- 二级菜单 -->
                        <el-submenu :index="subItem.id+''" v-for="subItem in item.child" :key="subItem.id">
                            <template slot="title">
                            <!-- 图标 -->
                            <i class="el-icon-location"></i>
                            <!-- 文本 -->
                            <span>{{ subItem.name }}</span>
                        </template>
                        </el-submenu>
                    </el-submenu>
                </el-menu>
            </el-aside>
            <!-- 右侧内容主体 -->
            <el-main>Main</el-main>
        </el-container>
    </el-container>
</template>

<script>
export default {
    data(){
        return {
            //左侧菜单数据
            menulist: []
        }
    },
    created(){
        this.getMenuList()
    },
    methods: {
        logout() {
            window.sessionStorage.clear()
            this.$router.push('/login')
        },
        //获取所有的菜单
        async getMenuList() {
            const{ data: res } = await this.$http.get("menus")
            if(res.code !== 200) return this.$message.error(res.msg)
            this.menulist = res.data
        }
    }
}
</script>

<style>
.el-header {
    background-color: cadetblue;
    display: flex;
    justify-content: space-between;
    padding-left: 0;
    align-items: center;
    color: #fff;
    font-size: 20px;
}

.el-aside {
    background-color: rgb(54, 80, 128);
}

.el-main {
    background-color: antiquewhite;
}

.home-container {
    height: 100%;
}
</style>
<template>
    <el-container class="home-container">
        <!-- header -->
        <el-header>
            <div>
                <span>vue-admin</span>
            </div>
            <div class="c1">
                <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
                    style="margin-right: 10px;"></el-avatar>
                <el-dropdown @command="handleCommand">
                    <span class="el-dropdown-link">
                        {{ userName }}<i class="el-icon-arrow-down el-icon--right"></i>
                    </span>

                    <el-dropdown-menu>
                        <el-dropdown-item command="a">个人设置</el-dropdown-item>
                        <el-dropdown-item command="b" @click="logout">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </el-header>
        <!-- body -->
        <el-container>
            <!-- 侧边栏 -->
            <el-aside :width="isCollapse ? '64px' : '200px'">
                <div class="toggle-button" @click="toggleCollapse">{{ toggleCollapseData }}</div>
                <!-- 侧边栏菜单区域 -->
                <el-menu background-color="rgb(54, 80, 128)" text-color="#fff" active-text-color="#ffd04b" unique-opened
                    :collapse="isCollapse" :collapse-transition="false" router :default-active="activePath">
                    <!-- 一级菜单 -->
                    <el-submenu :index="item.id + ''" v-for="item in menulist" :key="item.id"
                        @click="saveNavState(subItem.path)">
                        <!-- 一级菜单模板区域 -->
                        <template slot="title">
                            <!-- 图标 -->
                            <i class="el-icon-location"></i>
                            <!-- 文本 -->
                            <span>{{ item.name }}</span>
                        </template>
                        <!-- 二级菜单 -->
                        <el-menu-item :index="subItem.path" v-for="subItem in item.child" :key="subItem.id">
                            <template slot="title">
                                <!-- 图标 -->
                                <i class="el-icon-location"></i>
                                <!-- 文本 -->
                                <span>{{ subItem.name }}</span>
                            </template>
                        </el-menu-item>
                    </el-submenu>
                </el-menu>
            </el-aside>
            <!-- 右侧内容主体 -->
            <el-main>
                <!-- 路由占位符-->
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
export default {
    data() {
        return {
            //左侧菜单数据
            menulist: [],
            //是否折叠
            isCollapse: false,
            //被激活的链接
            activePath: '',
            toggleCollapseData: '<<<',
            userName: window.sessionStorage.getItem('userId')
        }
    },
    created() {
        this.getMenuList(),
            this.activePath = window.sessionStorage.getItem('activePath')
    },
    mounted() {
        if (!this.$store.state.userInfo) {
            this.$router.push('/login')
        }
    },
    methods: {
        logout() {
            window.sessionStorage.clear()
            this.$router.push('/login')
        },
        //获取所有的菜单
        async getMenuList() {
            const { data: res } = await this.$http.get("menus")
            if (res.code !== 200) return this.$message.error(res.msg)
            this.menulist = res.data
        },
        //点击按钮，折叠菜单
        toggleCollapse() {
            this.isCollapse = !this.isCollapse
            if (this.isCollapse) {
                this.toggleCollapseData = '>>>'
            } else {
                this.toggleCollapseData = '<<<'
            }
        },
        //保存链接激活状态
        saveNavState(activePath) {
            window.sessionStorage.setItem('activePath', activePath)
            this.activePath = activePath
        },
        handleCommand(command) {
            if (command === 'b') {
                this.logout()
            }
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

    .el-menu {
        border-right: none;
    }
}

.el-main {
    background-color: rgb(255, 255, 255);
}

.home-container {
    height: 100%;
}

.toggle-button {
    background-color: rgb(54, 80, 128);
    font-size: 12px;
    line-height: 24px;
    color: #fff;
    text-align: center;
    cursor: pointer;
}

.c1 {
    display: flex;
    align-items: center;
    justify-content: flex-end;
}
</style>
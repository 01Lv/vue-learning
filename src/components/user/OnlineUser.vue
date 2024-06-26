<template>
    <div>
        <!-- 面包屑导航区域 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>用户管理</el-breadcrumb-item>
            <el-breadcrumb-item>在线用户</el-breadcrumb-item>
        </el-breadcrumb>

        <div class="c1">
            <el-dropdown>
                <span class="el-dropdown-link">
                    更多选择<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu v-slot="dropdown">
                    <el-dropdown-item command="a">批量下线</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>

            <div class="c2">
                <el-input placeholder="请输入内容" v-model="searchReq.loginCity" clearable class="input-with-select">
                    <el-select v-model="selectData" slot="prepend">
                        <el-option label="活跃" value="1"></el-option>
                        <el-option label="城市" value="2"></el-option>
                        <el-option label="ip" value="3"></el-option>
                    </el-select>
                    <el-button slot="append" icon="el-icon-search"></el-button>
                </el-input>
                <div class="btn-group">
                    <el-button type="primary" icon="el-icon-setting" circle></el-button>
                    <el-button type="success" icon="el-icon-refresh" circle></el-button>

                </div>
            </div>
        </div>

        <el-card>
            <el-table :data="onlineUserList" style="margin-top: 0;">
                <el-table-column prop="userId" label="用户" />
                <el-table-column prop="loginIp" label="登录ip" />
                <el-table-column prop="loginCity" label="登录城市" />
                <el-table-column prop="createDate" label="登录日期" />
                <el-table-column prop="actived" label="活跃" />
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button type="danger" content="下线" icon="el-icon-delete" 
                        size="mini" @click="offline(scope.row.userId)"></el-button>
                    </template>
                </el-table-column>
            </el-table>

            <div class="c3">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                    :current-page.sync="searchReq.pageNum" :page-size="searchReq.pageSize" 
                    layout="total, prev, pager, next" :total="total">
                </el-pagination>
            </div>
        </el-card>
    </div>
</template>

<script>
export default {
    data() {
        return {
            selectData: 0,
            onlineUserList: [],
            total: 0,
            searchReq: {
                loginCity: '',
                loginIp: '',
                actived: 1,
                pageNum: 0,
                pageSize: 5
            }
        }
    },
    created(){
        this.getOnlineUserList()
    },
    methods: {
        async getOnlineUserList(){
            const {data :res} = await this.$http.post('getOnlineUserList',this.searchReq)
            if(res.code !== 200){
                return this.$message.error('获取在线用户列表失败')
            }
            this.onlineUserList = res.data
            this.total = res.total
            console.log(res.data)
        },
        offline(userId){

        },
        handleSizeChange() {},
        handleCurrentChange() {}
    }
}
</script>

<style lang="less" scoped>
.el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
}

.c1 {
    display: flex;
    justify-content: space-between;
    padding-left: 0;
    align-items: center;
    margin-bottom: 10px;
}

.c2 {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    margin-bottom: 10px;
}

.c3 {
    display: flex;
    justify-content: flex-end;
}

.input-with-select {
    background-color: #fff;
}

.btn-group {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    padding-left: 10px;
}
</style>
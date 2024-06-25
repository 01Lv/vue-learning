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
                <el-input placeholder="请输入内容" v-model="searchData" class="input-with-select">
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
            <el-table :data="tableData" style="margin-top: 0;">
                <el-table-column prop="userName" label="用户" />
                <el-table-column prop="loginIp" label="登录ip" />
                <el-table-column prop="loginCity" label="登录城市" />
                <el-table-column prop="createdDate" label="创建日期" />
                <el-table-column prop="activeOrNot" label="活跃" />
                <el-table-column prop="operate" label="操作" />
            </el-table>

            <div class="c3">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                    :current-page.sync="currentPage1" :page-size="100" layout="total, prev, pager, next" :total="1000">
                </el-pagination>
            </div>
        </el-card>
    </div>
</template>

<script>
export default {
    data() {
        return {
            selectData: {},
            searchData: '',
            tableData: {}
        }
    },
    methods: {

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
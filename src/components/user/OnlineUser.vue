<template>
    <div>
        <!-- 面包屑导航区域 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>用户管理</el-breadcrumb-item>
            <el-breadcrumb-item>在线用户</el-breadcrumb-item>
        </el-breadcrumb>

        <div class="c1">
            <el-dropdown @command="batchOffline">
                <span class="el-dropdown-link">
                    更多选择<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu v-slot="dropdown">
                    <el-dropdown-item command="a">批量下线</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>

            <div class="c2">
                <el-input placeholder="请输入内容" v-model="inputData" clearable class="input-with-select"
                    @clear="getOnlineUserList">
                    <el-select v-model="selectData" slot="prepend">
                        <el-option v-for="item in selectOptions" :label="item.label" :value="item.value"
                            :key="item.label"></el-option>
                    </el-select>
                    <el-button slot="append" icon="el-icon-search" @click="getOnlineUserList"></el-button>
                </el-input>
                <div class="btn-group">
                    <el-button type="primary" icon="el-icon-setting" circle></el-button>
                    <el-button type="success" icon="el-icon-refresh" @click="refreshOnlineUserList" circle></el-button>
                </div>
            </div>
        </div>

        <el-card>
            <el-table :loading="tableLoading" :data="onlineUserList" ref="mutipleTable" 
            @selection-change="handleSelectChange" style="margin-top: 0;">
                <el-table-column type="selection" width="55" />
                <el-table-column prop="userId" label="用户" />
                <el-table-column prop="loginIp" label="登录ip" />
                <el-table-column prop="loginCity" label="登录城市" />
                <el-table-column prop="createDate" label="登录日期" />
                <el-table-column prop="actived" label="活跃" />
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button type="danger" size="mini" @click="offline(scope.row.id)">下线</el-button>
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
            selectData: '',
            inputData: '',
            onlineUserList: [],
            total: 0,
            searchReq: {
                loginCity: '',
                loginIp: '',
                actived: null,
                pageNum: 0,
                pageSize: 5
            },
            selectOptions: [
                {
                    label: '活跃',
                    value: 1
                },
                {
                    label: '登录城市',
                    value: 2
                },
                {
                    label: '登录ip',
                    value: 3
                }
            ],
            tableLoading: false,
            selectRows: []
        }
    },
    created() {
        this.getOnlineUserList()
    },
    methods: {
        async getOnlineUserList() {
            this.tableLoading = true
            if (this.selectData) {
                if (1 === this.selectData) {
                    this.searchReq.actived = this.inputData
                } else if (2 === this.selectData) {
                    this.searchReq.loginCity = this.inputData
                }
                else if (3 === this.selectData) {
                    this.searchReq.loginIp = this.inputData
                }
            }
            const { data: res } = await this.$http.post('getOnlineUserList', this.searchReq)
            if (res.code !== 200) {
                this.tableLoading = false
                return this.$message.error('获取在线用户列表失败')
            }
            this.onlineUserList = res.data
            this.total = res.total
            this.tableLoading = false
        },
        async offline(id) {

            console.log(id)
            await this.$http.put(`offline/${id}`)
                .then(res => {

                }).catch(err => {
                    return this.$message.error('调用下线接口失败')
                })

            window.sessionStorage.removeItem('token')
            if (!window.sessionStorage.getItem('toke')) {
                this.getOnlineUserList()
                return this.$message.info('下线成功')
            } else {
                return this.$message.error('下线失败')
            }
        },
        refreshOnlineUserList() {
            this.selectData = ''
            this.inputData = ''
            this.getOnlineUserList()
        },
        handleSizeChange() { },
        handleCurrentChange() { },
        handleSelectChange(val){
            this.selectRows = val
        },
        async batchOffline(){
            let fieldSet = new Set()
            this.selectRows.forEach(e => {
                fieldSet.add(e.id)
            })
            const newArr = Array.from(fieldSet)
            const {data: res} = await this.$http.post('batchOffline',newArr)
            .then(res=> {
                window.sessionStorage.removeItem('token')
                return this.$message.info('批量下线成功')
            })
            .catch(err => {
                return this.$message.error('批量下线失败')
            })
        }
        
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

.el-select {
    width: 130px;
}
</style>
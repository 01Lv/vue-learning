<template>
    <div>
        <!-- 面包屑导航区域 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>代码管理</el-breadcrumb-item>
            <el-breadcrumb-item>代码发布</el-breadcrumb-item>
        </el-breadcrumb>

        <div class="c1">
            <span>生产分支: main</span>
            <span>代码仓库: http://baidu.com</span>
        </div>
        <el-divider></el-divider>

        <el-tabs v-model="activeTab" @tab-click="">
            <el-tab-pane label="开发环境" name="dev">
                <el-descriptions :column="5">
                    <el-descriptions-item label="发布分支">
                        <el-tag size="small">xxx-dev</el-tag>
                    </el-descriptions-item>
                    <el-descriptions-item label="最后操作人">苏州市</el-descriptions-item>
                    <el-descriptions-item label="最后执行时间">苏州市</el-descriptions-item>
                    <el-descriptions-item label="命名空间">18100000000</el-descriptions-item>
                    <el-descriptions-item label="发布状态">
                        <el-tag type="success" size="small">成功</el-tag>
                    </el-descriptions-item>
                    <el-descriptions-item label="发布日志">
                        <el-link type="primary">6699</el-link>
                    </el-descriptions-item>
                    <el-descriptions-item label="发布镜像">18100000000</el-descriptions-item>
                </el-descriptions>

                <el-button type="primary" size="medium">发布</el-button>
                <el-button type="warning" size="medium" @click="getBranchs()">管理分支</el-button>
                <el-divider></el-divider>

                <el-dialog title="编辑发布分支" :visible.sync="editBranchVisible">
                    <el-table :data="branchs" style="width: 1120px;">
                        <el-table-column prop="createDate" label="创建时间">
                        </el-table-column>
                        <el-table-column prop="branch" label="分支">
                        </el-table-column>
                        <el-table-column prop="lastUpdateBy" label="最后操作人">
                        </el-table-column>
                        <el-table-column prop="desc" label="描述">
                        </el-table-column>
                        <el-table-column prop="operate" label="操作">
                        </el-table-column>
                    </el-table>

                </el-dialog>

                <el-card v-for="e in cards" :key="e.id" class="box-card" shadow="always">
                    <div slot="header" class="clearfix">
                        <el-tag v-if="e.status === 1" type="info">未发布</el-tag>
                        <el-tag v-if="e.status === 2" type="success">已发布</el-tag>
                        <el-tag v-if="e.status === 3" type="danger">合并冲突</el-tag>
                        <span>{{ e.branchName }}</span>
                        <el-tooltip class="item" effect="dark" content="仅对当前分支合并,其他开发分支内容丢失" placement="top">
                            <el-button type="primary" icon="el-icon-caret-right" size="small" circle></el-button>
                        </el-tooltip>
                    </div>
                    <el-descriptions :column="1">
                        <el-descriptions-item label="创建人">{{ e.createBy }}</el-descriptions-item>
                        <el-descriptions-item label="创建日期">{{ e.createDate }}</el-descriptions-item>
                    </el-descriptions>
                </el-card>
            </el-tab-pane>
            <el-tab-pane label="测试环境" name="test">测试环境</el-tab-pane>
            <el-tab-pane label="生产环境" name="prd">生产环境</el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
export default {
    data() {
        return {
            activeTab: 'dev',
            editBranchVisible: false,
            cards: [
                {
                    id: 1,
                    status: 1,
                    branchName: 'branch1',
                    createBy: 'eason',
                    createDate: '20240708'
                },
                {
                    id: 2,
                    status: 2,
                    branchName: 'branch2',
                    createBy: 'eason',
                    createDate: '20240708'
                },
                {
                    id: 3,
                    status: 2,
                    branchName: 'branch2',
                    createBy: 'eason',
                    createDate: '20240708'
                },
                {
                    id: 4,
                    status: 3,
                    branchName: 'branch2',
                    createBy: 'eason',
                    createDate: '20240708'
                }
            ],
            branchs: []
        }
    },
    methods: {
        getBranchs() {
            this.editBranchVisible = true
        }
    }
}
</script>

<style lang="less" scoped>
.c1 {
    display: flex;
    justify-content: space-between;
}

.el-divider {
    margin-top: 10px;
    margin-bottom: 10px;
}

.el-page-header {
    font-size: 12px;
}

.box-card {
    display: inline-block;
    width: 360px;
    margin: 5px;
}

.clearfix {
    display: flex;
    justify-content: space-between;
}
</style>
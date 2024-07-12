<template>
    <div>
        <!-- 面包屑导航区域 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/project'}">项目管理</el-breadcrumb-item>
            <el-breadcrumb-item>代码发布</el-breadcrumb-item>
        </el-breadcrumb>

        <div class="c1">
            <span>{{ releaseInfo.projectName }}</span>
            <span>生产分支: {{ releaseInfo.prdBranch }}</span>
            <span>代码仓库: {{ releaseInfo.codeRepo }}</span>
        </div>
        <el-divider></el-divider>

        <el-tabs v-model="activeTab">
            <el-tab-pane label="开发环境" name="dev">
                <el-descriptions :column="3">
                    <el-descriptions-item label="发布分支">
                        <el-tag size="small" v-if="!devInfo.onlineBranch">-</el-tag>
                        <el-tag size="small" v-if="devInfo.onlineBranch">{{ devInfo.onlineBranch }}</el-tag>
                    </el-descriptions-item>
                    <el-descriptions-item label="最后操作人">
                        <span v-if="devInfo.lastModifiedBy">{{ devInfo.lastModifiedBy }}</span>
                        <span v-if="!devInfo.lastModifiedBy">-</span>
                    </el-descriptions-item>
                    <el-descriptions-item label="最后执行时间">
                        <span v-if="devInfo.lastModifiedDate">{{ devInfo.lastModifiedDate }}</span>
                        <span v-if="!devInfo.lastModifiedDate">-</span>
                    </el-descriptions-item>
                    <el-descriptions-item label="命名空间">
                        <span v-if="devInfo.nameSpace">{{ devInfo.nameSpace }}</span>
                        <span v-if="!devInfo.nameSpace">-</span>
                    </el-descriptions-item>
                    <el-descriptions-item label="发布状态">
                        <el-tag type="info" size="small" v-if="!devInfo.releaseStatus">-</el-tag>
                        <el-tag type="success" size="small" v-if="devInfo.releaseStatus === 1">成功</el-tag>
                        <el-tag type="danger" size="small" v-if="devInfo.releaseStatus === 2">失败</el-tag>
                    </el-descriptions-item>
                </el-descriptions>

                <el-button type="primary" size="medium">发布</el-button>
                <el-button type="warning" size="medium" @click="getBranchs()">管理分支</el-button>
                <el-divider></el-divider>

                <el-dialog title="编辑发布分支" :visible.sync="editBranchVisible">
                    <el-table :data="branches">
                        <el-table-column prop="committedDate" label="创建时间">
                        </el-table-column>
                        <el-table-column prop="name" label="分支">
                        </el-table-column>
                        <el-table-column prop="authorName" label="最后操作人">
                        </el-table-column>
                        <el-table-column prop="message" label="描述">
                        </el-table-column>
                        <el-table-column prop="operate" label="操作">
                            <template slot-scope="scope">
                                <el-button type="primary" size="mini" v-if="!scope.row.addBranched" @click="addBranch(scope)">添加</el-button>
                                <el-button type="info" size="mini" v-if="scope.row.addBranched" :disabled="true">已添加</el-button>
                            </template>
                        </el-table-column>
                    </el-table>

                </el-dialog>

                <el-card v-for="e in cards" :key="e.id" class="box-card" shadow="always">
                    <div slot="header" class="clearfix">
                        <el-tag v-if="e.releaseStatus === 1" type="info">未发布</el-tag>
                        <el-tag v-if="e.releaseStatus === 2" type="success">已发布</el-tag>
                        <el-tag v-if="e.releaseStatus === 3" type="danger">合并冲突</el-tag>
                        <span>{{ e.name }}</span>
                        <el-tooltip class="item" effect="dark" content="仅对当前分支合并,其他开发分支内容丢失" placement="top">
                            <el-button type="primary" icon="el-icon-caret-right" size="small" circle></el-button>
                        </el-tooltip>
                    </div>
                    <el-descriptions :column="1">
                        <el-descriptions-item label="提交人">{{ e.authorName }}</el-descriptions-item>
                        <el-descriptions-item label="提交日期">{{ e.submitTime }}</el-descriptions-item>
                        <el-descriptions-item label="提交内容">{{ e.submitContent }}</el-descriptions-item>
                    </el-descriptions>
                </el-card>
            </el-tab-pane>
            <el-tab-pane label="测试环境" name="test">测试环境</el-tab-pane>
            <el-tab-pane label="预生产环境" name="pre">预生产环境</el-tab-pane>
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
            cards: [],
            branches: [],
            releaseInfo: {},
            devInfo: {},
            addBranchReq: {
                envId: '',
                projectId: 0,
                sourceBranch: ''
            },
            projectId: 0,
        }
    },
    created() {
        this.release(this.$route.params.id)
        this.projectId = this.$route.params.id
    },
    methods: {
        async release(id) {
            await this.$http.get(`/release/${id}`)
                .then(res => {
                    console.log(res)
                    this.releaseInfo = res.data.data
                    if (this.releaseInfo.envContents) {
                        this.releaseInfo.envContents.forEach(e => {
                            if (e.envId === 'dev') {
                                this.devInfo = e
                                this.cards = this.devInfo.branchList
                            }
                        });
                    }
                })
                .catch(err => {
                    this.$message.error('获取发布消息失败')
                    console.log(err)
                })
        },
        async getBranchs() {
            this.editBranchVisible = true

            await this.$http.get(`getBranches/${this.projectId}/${this.activeTab}`)
                .then(res => {
                    this.branches = res.data.data
                    console.log(this.branches)
                })
                .catch(err => {
                    this.$message.error('获取分支列表失败')
                })
        },
        addBranch(scope){
            this.addBranchReq = {
                envId: this.activeTab,
                projectId: scope.row.projectId,
                sourceBranch: scope.row.name
            }
            this.$http.post('addBranch',this.addBranchReq)
            .then(res => {
                this.$message.success('添加分支成功')
                this.getBranchs()
            })
            .catch(err => {
                return this.$message.error('添加分支失败')
                console.log(err)
            })
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

.el-dialog__body {
    font-size: 20px;
}
</style>
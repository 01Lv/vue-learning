<template>
    <div>
        <!-- 面包屑导航区域 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/project' }">项目管理</el-breadcrumb-item>
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
                <ReleaseInfoComp :activeTab="activeTab" :projectId="projectId"></ReleaseInfoComp>
            </el-tab-pane>
            <el-tab-pane label="测试环境" name="test">
            </el-tab-pane>
            <el-tab-pane label="预生产环境" name="pre">预生产环境</el-tab-pane>
            <el-tab-pane label="生产环境" name="prd">
                <ReleaseInfoComp :activeTab="activeTab" :projectId="projectId"></ReleaseInfoComp>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import ReleaseInfoComp from '@/components/common/ReleaseInfoComp.vue'

export default {
    components: {
        ReleaseInfoComp
    },
    data() {
        return {
            activeTab: 'dev',
            editBranchVisible: false,
            devCards: [],
            branches: [],
            releaseInfo: {},
            devInfo: {},
            addBranchReq: {
                envId: '',
                projectId: 0,
                sourceBranch: ''
            },
            projectId: 0,
            getBranchLoading: false
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
                    this.releaseInfo = res.data.data
                    if (this.releaseInfo.envContents) {
                        this.releaseInfo.envContents.forEach(e => {
                            if (e.envId === 'dev') {
                                this.devInfo = e
                                this.devCards = this.devInfo.branchList
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
                })
                .catch(err => {
                    this.$message.error('获取分支列表失败')
                })
        },
        addBranch(scope) {
            this.addBranchReq = {
                envId: this.activeTab,
                projectId: scope.row.projectId,
                sourceBranch: scope.row.name
            }
            this.$http.post('addBranch', this.addBranchReq)
                .then(res => {
                    this.$message.success('添加分支成功')
                    this.getBranchs()
                })
                .catch(err => {
                    console.log(err)
                    return this.$message.error('添加分支失败')
                })
        },
        handleDialogClose() {
            this.release(this.projectId)
        },
        async deleteBranch(scope) {
            await this.$http.delete(`deleteBranch/${scope.row.id}`)
                .then(res => {
                    this.getBranchs()
                    this.$message.success('下线分支成功')
                })
                .catch(err => {
                    this.$message.error('下线分支失败')
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
</style>
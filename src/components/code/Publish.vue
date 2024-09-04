<template>
    <div>
        <!-- 面包屑导航区域 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/project' }">项目管理</el-breadcrumb-item>
            <el-breadcrumb-item>代码发布</el-breadcrumb-item>
        </el-breadcrumb>

        <div class="c1">
            <span>{{ projectInfo.projectName }}</span>
            <span>生产分支: {{ projectInfo.prdBranch }}</span>
            <span>代码仓库: {{ projectInfo.codeRepo }}</span>
        </div>
        <el-divider></el-divider>

        <el-tabs v-model="activeTab">
            <el-tab-pane label="开发环境" name="dev">
                <ReleaseInfoComp :activeTab="activeTab" :projectId="projectId" :initCards="cards"></ReleaseInfoComp>
            </el-tab-pane>
            <el-tab-pane label="测试环境" name="test">
            </el-tab-pane>
            <el-tab-pane label="预生产环境" name="pre">预生产环境</el-tab-pane>
            <el-tab-pane label="生产环境" name="prd">
                <ReleaseInfoComp :activeTab="activeTab" :projectId="projectId" :initCards="cards"></ReleaseInfoComp>
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
            cards: [],
            branches: [],
            projectInfo: {},
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
                    this.projectInfo = res.data.data
                    if (this.projectInfo.envContents) {
                        this.projectInfo.envContents.forEach(e => {
                            this.releaseBaseInfo = e
                            this.cards = this.releaseBaseInfo.branchList
                        });
                    }
                })
                .catch(err => {
                    this.$message.error('获取发布消息失败')
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
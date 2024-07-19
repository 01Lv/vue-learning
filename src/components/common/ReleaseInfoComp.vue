<template>
    <div>
        <el-descriptions :column="3">
            <el-descriptions-item label="发布分支">
                <el-tag size="small" v-if="!releaseBaseInfo.onlineBranch">-</el-tag>
                <el-tag size="small" v-if="releaseBaseInfo.onlineBranch">{{ releaseBaseInfo.onlineBranch }}</el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="最后操作人">
                <span v-if="releaseBaseInfo.lastModifiedBy">{{ releaseBaseInfo.lastModifiedBy }}</span>
                <span v-if="!releaseBaseInfo.lastModifiedBy">-</span>
            </el-descriptions-item>
            <el-descriptions-item label="最后执行时间">
                <span v-if="releaseBaseInfo.lastModifiedDate">{{ releaseBaseInfo.lastModifiedDate }}</span>
                <span v-if="!releaseBaseInfo.lastModifiedDate">-</span>
            </el-descriptions-item>
            <el-descriptions-item label="命名空间">
                <span v-if="releaseBaseInfo.nameSpace">{{ releaseBaseInfo.nameSpace }}</span>
                <span v-if="!releaseBaseInfo.nameSpace">-</span>
            </el-descriptions-item>
            <el-descriptions-item label="发布状态">
                <el-tag type="info" size="small" v-if="!releaseBaseInfo.releaseStatus">-</el-tag>
                <el-tag type="info" size="small" v-if="releaseBaseInfo.releaseStatus === -1">未发布</el-tag>
                <el-tag type="success" size="small" v-if="releaseBaseInfo.releaseStatus === 1">成功</el-tag>
                <el-tag type="danger" size="small" v-if="releaseBaseInfo.releaseStatus === 2">失败</el-tag>
            </el-descriptions-item>
        </el-descriptions>

        <el-button v-if="activeTab === 'dev'" type="primary" size="medium">发布</el-button>
        <el-button v-if="activeTab === 'prd'" type="primary" size="medium">申请发布</el-button>
        <el-button type="warning" size="medium" @click="getBranchs()">管理分支</el-button>
        <el-divider></el-divider>

        <el-dialog title="编辑发布分支" :visible.sync="editBranchVisible" @close="handleDialogClose()">
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
                        <el-button type="primary" size="mini" v-if="!scope.row.addBranched"
                            @click="addBranch(scope)">添加</el-button>
                        <el-tooltip class="item" effect="dark" content="下线需新建临时合并分支" placement="top">
                            <el-button type="info" size="mini" v-if="scope.row.addBranched"
                                @click="deleteBranch(scope)">下线</el-button>
                        </el-tooltip>
                    </template>
                </el-table-column>
            </el-table>
        </el-dialog>

        <el-row :gutter="20">
            <el-col :span="6" v-for="e in cards" :key="e.id" class="card-col">
                <el-card class="card-container" shadow="always">
                    <div slot="header" class="clearfix">
                        <el-tag v-if="e.releaseStatus === 1" type="info">未发布</el-tag>
                        <el-tag v-if="e.releaseStatus === 2" type="success">已发布</el-tag>
                        <el-tag v-if="e.releaseStatus === 3" type="danger">合并冲突</el-tag>
                        <el-tooltip class="item" effect="dark" :content="e.name" placement="top">
                            <span class="branch-name">{{ e.name }}</span>
                        </el-tooltip>
                        <el-tooltip class="item" effect="dark" content="仅对当前分支合并,其他开发分支内容丢失" placement="top">
                            <el-button type="primary" icon="el-icon-caret-right" size="small" circle></el-button>
                        </el-tooltip>
                    </div>
                    <el-descriptions :column="1">
                        <el-descriptions-item label="提交人">{{ e.authorName }}</el-descriptions-item>
                        <el-descriptions-item label="提交日期">{{ e.committedDate }}</el-descriptions-item>
                        <el-descriptions-item label="提交内容">{{ e.message }}</el-descriptions-item>
                        <el-descriptions-item label="url">
                            <el-link type="primary" :href="e.commitContentUrl" icon="el-icon-link">
                                提交内容
                            </el-link>
                        </el-descriptions-item>
                    </el-descriptions>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    name: 'ReleaseInfoComp',
    data() {
        return {
            releaseInfo: {},
            editBranchVisible: false,
            cards: [],
            branches: [],
            releaseBaseInfo: {},
            addBranchReq: {
                envId: '',
                projectId: 0,
                sourceBranch: ''
            },
        }
    },
    props: {
        activeTab: '',
        projectId: 0
    },
    methods: {
        async release(id) {
            await this.$http.get(`/release/${id}`)
                .then(res => {
                    this.releaseInfo = res.data.data
                    if (this.releaseInfo.envContents) {
                        this.releaseInfo.envContents.forEach(e => {
                            if (e.envId === 'dev') {
                                this.releaseBaseInfo = e
                                this.cards = this.releaseBaseInfo.branchList
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
.el-divider {
    margin-top: 10px;
    margin-bottom: 10px;
}

.el-page-header {
    font-size: 12px;
}

.clearfix {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.card-container {
    width: 100%;
    height: 260px;
}

/* 文字过长隐藏为缩略号 */
.branch-name {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 200px;
}

.card-col {
    margin-bottom: 20px;

    &:last-child {
        margin-bottom: 0;
    }
}
</style>
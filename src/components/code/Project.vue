<template>
    <el-tabs v-model="activeTab" @tab-click="tabClick()">
        <el-tab-pane label="part" name="1237">
            <el-table :data="projects.filter(data => !searchProject || data.name.toLowerCase().includes(searchProject.toLowerCase()))" 
                @row-click="rowClick">
                <el-table-column prop="committedDate" label="状态">
                </el-table-column>
                <el-table-column prop="name" label="名称">
                </el-table-column>
                <el-table-column prop="lastActivityAt" label="上次发布时间">
                </el-table-column>
                <el-table-column align="right">
                    <template slot="header" slot-scope="scope">
                        <el-input v-model="searchProject" size="mini" placeholder="输入关键字搜索"></el-input>
                    </template>
                </el-table-column>
            </el-table>
        </el-tab-pane>
        <el-tab-pane label="sms" name="381">
            <el-table :data="projects.filter(data => !searchProject || data.name.toLowerCase().includes(searchProject.toLowerCase()))" @row-click="rowClick">
                <el-table-column prop="committedDate" label="状态">
                </el-table-column>
                <el-table-column prop="name" label="名称">
                </el-table-column>
                <el-table-column prop="lastActivityAt" label="上次发布时间">
                </el-table-column>
                <el-table-column align="right">
                    <template slot="header" slot-scope="scope">
                        <el-input v-model="searchProject" size="mini" placeholder="输入关键字搜索"></el-input>
                    </template>
                </el-table-column>
            </el-table>
        </el-tab-pane>
    </el-tabs>
</template>

<script>
export default {
    data() {
        return {
            activeTab: '1237',
            projects: [],
            searchProject: ''
        }
    },
    created() {
        this.getProjects()
    },
    methods: {
        async getProjects() {
            await this.$http.get(`projects/${this.activeTab}`)
                .then(res => {
                    this.projects = res.data.data
                    console.log(this.projects)
                })
                .catch(err => {
                    return this.$message.error('获取项目列表失败')
                })
        },
        tabClick() {
            this.getProjects()
        },
        rowClick(row,event,column) {
            this.$router.push(`/publish/${row.id}`)
        }
    }
}
</script>
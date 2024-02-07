<template>
    <div>
        <!-- 面包屑导航区域 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>权限管理</el-breadcrumb-item>
            <el-breadcrumb-item>权限列表</el-breadcrumb-item>
        </el-breadcrumb>

        <!-- 卡片区域 -->
        <el-card>
            <!-- 用户列表区域 -->
            <el-table :data="rights" border stripe>
                <el-table-column label="#" type="index"></el-table-column>
                <el-table-column label="权限名称" prop="authName"></el-table-column>
                <el-table-column label="路径" prop="path"></el-table-column>
                <el-table-column label="权限等级" prop="level">
                    <template slot-scope="scope">
                        <el-tag v-if="scope.row.level === 0">1</el-tag>
                        <el-tag type="success" v-if="scope.row.level === 1">2</el-tag>
                        <el-tag type="warning" v-if="scope.row.level === 2">3</el-tag>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
    </div>
</template>

<script>
export default {
    data(){
      return {
        //权限列表
        rights: []
      }  
    },
    created(){
        //获取所有权限
        this.getRights()
    },
    methods: {
        //获取权限列表
        async getRights(){
            const {data: res} = await this.$http.get('/rights')
            if(res.code !== 200){
                this.$message.error('获取权限列表失败')
            }
            this.rights = res.data
            console.log(res.data)
        }
    }

}
</script>

<style lang="less" scoped></style>
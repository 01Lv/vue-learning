<template>
    <div>
        <!-- 面包屑导航区域 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>商户管理</el-breadcrumb-item>
            <el-breadcrumb-item>商户分类</el-breadcrumb-item>
        </el-breadcrumb>

        <!-- 卡片视图区域 -->
        <el-card>
            <el-row>
                <el-col>
                    <el-button type="primary">添加分类</el-button>
                </el-col>

                <!-- 表格 -->

                <!-- 分页区域 -->

            </el-row>
        </el-card>
    </div>
</template>

<script>
export default {
    data() {
        return {
            //商品分类的数据列表
            categoryList: [],
            queryInfo: {
                type: 3,
                pageNum: 1,
                pageSize: 5
            }
        }
    },
    created() {
        this.getCategoryList()
    },
    methods: {
        //获取商品分类数据
        getCategoryList() {
            const { data: res } = this.$http.post('categoryList', this.queryInfo)
            if(res.code !== 200){
                this.$message.error('获取商品分类失败')
            }
            this.categoryList = res.data
        }
    }
}
</script>

<style lang="less" scoped></style>
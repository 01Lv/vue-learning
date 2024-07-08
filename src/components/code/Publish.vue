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
                <el-descriptions>
                    <el-descriptions-item label="发布分支">kooriookami</el-descriptions-item>
                    <el-descriptions-item label="命名空间">18100000000</el-descriptions-item>
                    <el-descriptions-item label="最后操作人">苏州市</el-descriptions-item>
                    <el-descriptions-item label="备注">
                        <el-tag size="small">学校</el-tag>
                    </el-descriptions-item>
                    <el-descriptions-item label="联系地址">江苏省苏州市吴中区吴中大道 1188 号</el-descriptions-item>
                </el-descriptions>

                <el-button type="primary" size="medium">发布</el-button>
                <el-button type="warning" size="medium">管理分支</el-button>
                <el-divider></el-divider>

                <!-- <el-card class="box-card" shadow="always">
                    <div slot="header" class="clearfix">
                        <el-tag type="info">未发布</el-tag>
                        <span>分支名称</span>
                        <el-button type="primary" icon="el-icon-caret-right" size="small" circle></el-button>
                    </div>
                </el-card> -->

                <el-card v-for="e in cards" :key="e.id" class="box-card" shadow="always">
                    <div slot="header" class="clearfix">
                        <el-tag type="info">{{ e.status }}</el-tag>
                        <span>{{ e.branchName }}</span>
                        <el-button type="primary" icon="el-icon-caret-right" size="small" circle></el-button>
                    </div>
                    <div>
                        <span>创建人：{{ e.createBy }}</span>
                        <span>创建日期：{{ e.createDate }}</span>
                    </div>
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
                    status: 3,
                    branchName: 'branch2',
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
                    status: 3,
                    branchName: 'branch2',
                    createBy: 'eason',
                    createDate: '20240708'
                }
            ]
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
<template>
    <div>
        <!-- 面包屑导航区域 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>权限管理</el-breadcrumb-item>
            <el-breadcrumb-item>角色列表</el-breadcrumb-item>
        </el-breadcrumb>

        <el-card>
            <el-col>
                <el-button type="primary">添加角色</el-button>
            </el-col>

            <el-table :data="roleList" border stripe>
                <!--展开列-->
                <el-table-column type="expand">
                    <template slot-scope="scope">
                        <el-row v-for="(item1, i1) in scope.row.rights" :key="item1.id">
                            <!-- 渲染一级权限 -->
                            <el-col :span="5">
                                <el-tag closable @close="removeByRightId(scope.row, item1.id)">{{ item1.desc }}</el-tag>
                            </el-col>
                        </el-row>
                    </template>
                </el-table-column>
                <!--索引列-->
                <el-table-column type="index"></el-table-column>
                <el-table-column label="角色名称" prop="roleName"></el-table-column>
                <el-table-column label="角色描述" prop="desc"></el-table-column>
                <el-table-column label="操作" width="300px">
                    <template slot-scope="scope">
                        <el-button size="mini" type="primary" icon="el-icon-edit">编辑</el-button>
                        <el-button size="mini" type="danger" icon="el-icon-delete">删除</el-button>
                        <el-button size="mini" type="warning" icon="el-icon-setting"
                            @click="showRightDialog(scope.row)">分配权限</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>

        <!-- 分配权限对话框 -->
        <el-dialog title="分配权限" :visible.sync="showRightDialogVisible" width="50%" @close="dialogClose">
            <el-tree :data="rights" :props="treeNode" show-checkbox @check-change="handleCheckChange" node-key="id" :default-checked-keys="defKeys">
            </el-tree>
            <span slot="footer" class="dialog-footer">
                <el-button @click="showRightDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="showRightDialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
    data() {
        return {
            roleList: [],
            //控制分配权限对话框显示
            showRightDialogVisible: false,
            //所有权限数据
            rights: [],
            treeNode: {
                id: 'id',
                label: 'desc'
            },
            //默认选中的节点id值数组
            defKeys: []
        }
    },
    created() {
        this.getRoleList()
    },
    methods: {
        async getRoleList() {
            const { data: res } = await this.$http.get('roleList')
            if (res.code !== 200) {
                this.$message.error('查询角色信息失败')
            }
            this.$message.success('查询角色信息成功')
            this.roleList = res.data
            console.log(this.roleList)
        },
        //根据id删除对应权限
        async removeByRightId(role, rightId) {
            //弹窗提示用户是否要删除
            const confirmResult = await this.$confirm('此操作将永久删除', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).catch(err => err)

            if (confirmResult !== 'confirm') {
                return this.$message.info('取消删除')
            }
            const { data: res } = await this.$http.delete(`roles/${role.id}/${rightId}`).catch(err => {
                this.$message.error('调用删除接口失败')
            })
            if (res.code !== 200) {
                this.$message.error('删除权限失败')
            }
            this.$message.info('删除权限成功')
        },
        //展示权限对话框
        async showRightDialog(role) {
            //获取所有权限数据
            const { data: res } = await this.$http.get('rights')
            if (res.code !== 200) {
                this.$message.error('获取权限数据失败')
            }
            this.rights = res.data
            console.log(role)
            this.getDefKeys(role.rights,this.defKeys)
            this.showRightDialogVisible = true
        },
        handleCheckChange(){},
        //获取角色当前配置权限
        getDefKeys(rights,arr){
            if(!rights){
                return arr
            }
            rights.forEach(e => arr.push(e.id))
            return arr
        },
        //分配权限对话框关闭
        dialogClose(){
            this.defKeys = []
        }
    }
}
</script>

<style lang="less" scoped>
.el-tag {
    margin: 7px;
}

.bdtop {
    border-top: 1px solid #eee;
}

.bdbottom {
    border-bottom: 1px solid #eee;
}
</style>
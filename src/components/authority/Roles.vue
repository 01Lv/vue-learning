<template>
    <div>
        <!-- 面包屑导航区域 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>权限管理</el-breadcrumb-item>
            <el-breadcrumb-item>角色列表</el-breadcrumb-item>
        </el-breadcrumb>

        <el-card>
            <el-col style="margin-bottom: 10px;">
                <el-button type="primary" @click="addRoleDialogVisible = true">添加角色</el-button>
            </el-col>

            <el-dialog title="添加角色" :visible.sync="addRoleDialogVisible" width="50%">
                <el-form :model="addRoleForm" label-width="70px">
                    <el-form-item label="角色名称" prop="roleName">
                        <el-input v-model="addRoleForm.roleName"></el-input>
                    </el-form-item>
                    <el-form-item label="角色描述" prop="remark">
                        <el-input v-model="addRoleForm.remark"></el-input>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="addRoleDialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="addRole()">确 定</el-button>
                </span>
            </el-dialog>

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
                        <el-popover placement="top" width="160" v-model="scope.row.deleteRolePopOver"
                            visible-arrow=true>
                            <span>确定删除吗？</span>
                            <div style="text-align: right; margin: 0">
                                <el-button size="mini" type="text"
                                    @click="scope.row.deleteRolePopOver = false">取消</el-button>
                                <el-button type="primary" size="mini" @click="deleteRole(scope.row.id)">确定</el-button>
                            </div>
                            <el-button size="mini" slot="reference" type="danger" icon="el-icon-delete"
                                style="margin: 10px;">删除</el-button>
                        </el-popover>
                        <el-button size="mini" type="warning" icon="el-icon-setting"
                            @click="showRightDialog(scope.row)">分配权限</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>

        <!-- 分配权限对话框 -->
        <el-dialog title="分配权限" :visible.sync="showRightDialogVisible" width="50%" @close="dialogClose">
            <el-tree :data="rights" :props="treeNode" show-checkbox node-key="id" :default-checked-keys="defKeys"
                ref="treeRef">
            </el-tree>
            <span slot="footer" class="dialog-footer">
                <el-button @click="showRightDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="updateRights()">确 定</el-button>
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
            //添加角色对话框
            addRoleDialogVisible: false,
            deleteRolePopOver: false,
            addRoleForm: {
                roleName: '',
                remark: ''
            },
            //所有权限数据
            rights: [],
            treeNode: {
                id: 'id',
                label: 'desc'
            },
            //默认选中的节点id值数组
            defKeys: [],
            roleId: 0
        }
    },
    created() {
        this.getRoleList()
    },
    methods: {
        async getRoleList() {
            await this.$http.get('roleList')
                .then(res => {
                    this.roleList = res.data.data.map(item => ({
                        ...item,
                        deleteRolePopOver: false
                    }))
                }).catch(err => {
                    this.$notify({
                        title: '提示',
                        message: err,
                    });
                    return this.$message.error('查询角色信息失败')
                })
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
            this.roleId = role.id
            //获取所有权限数据
            const { data: res } = await this.$http.get('rights')
            if (res.code !== 200) {
                this.$message.error('获取权限数据失败')
            }
            this.rights = res.data
            this.getDefKeys(role.rights, this.defKeys)
            this.showRightDialogVisible = true
        },
        handleCheckChange() { },
        //获取角色当前配置权限
        getDefKeys(rights, arr) {
            if (!rights) {
                return arr
            }
            rights.forEach(e => arr.push(e.id))
            return arr
        },
        //分配权限对话框关闭
        dialogClose() {
            this.defKeys = []
        },
        async updateRights() {
            const keys = [
                ...this.$refs.treeRef.getCheckedKeys(),
                ...this.$refs.treeRef.getHalfCheckedKeys()
            ]

            if (keys) {
                const { data: res } = await this.$http.post(`/updateRight/${this.roleId}`, keys)
                if (res.code !== 200) {
                    this.$message.error('更新角色权限失败')
                }
            }
            this.getRoleList()
            this.showRightDialogVisible = false

        },
        addRole() {
            const { data: res } = this.$http.post('addRole', this.addRoleForm)
                .then(res => {
                    this.getRoleList()
                    return this.$message.info('添加角色成功')
                })
                .catch(err => {
                    return this.$message.error('添加角色失败')
                })
            this.getRoleList()
            this.addRoleDialogVisible = false
        },
        deleteRole(roleId) {
            const { data: res } = this.$http.put(`deleteRole/${roleId}`)
                .then(res => {
                    this.getRoleList()
                    this.$message.info('删除角色成功')
                })
                .catch(err => {
                    this.$message.error('删除角色失败')
                })
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
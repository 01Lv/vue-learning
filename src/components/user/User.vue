<template>
    <div>
        <!-- 面包屑导航区域 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>商户管理</el-breadcrumb-item>
            <el-breadcrumb-item>商户管理子1</el-breadcrumb-item>
        </el-breadcrumb>

        <!-- 卡片区域 -->
        <el-card>
            <!-- 搜索添加区域 -->
            <el-row :gutter="20">
                <el-col :span="8">
                    <el-input placeholder="请输入内容" v-model="queryInfo.query" clearable @clear="getUserList">
                        <el-button slot="append" icon="el-icon-search" @click="getUserList"></el-button>
                    </el-input>
                </el-col>
                <el-col :span="4">
                    <el-button type="primary" @click="addDialogVisible = true">添加用户</el-button>
                </el-col>
            </el-row>

            <!-- 用户列表区域 -->
            <el-table :data="userlist" border stripe>
                <el-table-column type="index"></el-table-column>
                <el-table-column label="姓名" prop="name"></el-table-column>
                <el-table-column label="邮箱" prop="email"></el-table-column>
                <el-table-column label="电话" prop="phone"></el-table-column>
                <el-table-column label="角色" prop="role"></el-table-column>
                <el-table-column label="状态" prop="stat">
                    <template slot-scope="scope">
                        <el-switch v-model="scope.row.stat" @change="userStateChanged(scope.row)"></el-switch>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="180px">
                    <template slot-scope="scope">
                        <el-button type="primary" icon="el-icon-edit" size="mini"
                            @click="editUserDialog(scope.row.id)"></el-button>
                        <el-button type="danger" icon="el-icon-delete" size="mini"
                            @click="deleteUser(scope.row.id)"></el-button>
                        <el-tooltip effect="dark" content="设置" placement="top" :enterable="false">
                            <el-button type="warning" icon="el-icon-setting" size="mini"></el-button>
                        </el-tooltip>
                    </template>
                </el-table-column>
            </el-table>

            <!-- 分页区域 -->
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                :current-page="queryInfo.pagenum" :page-sizes="[1, 5, 10, 50]" :page-size="queryInfo.pagesize"
                layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
        </el-card>

        <!-- 添加用户对话框 -->
        <el-dialog title="添加用户" :visible.sync="addDialogVisible" width="50%" @close="addDialogClosed">
            <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="70px" class="demo-ruleForm">
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="addForm.username"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="addForm.password"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="addForm.email"></el-input>
                </el-form-item>
                <el-form-item label="手机" prop="phone">
                    <el-input v-model="addForm.phone"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="addUser">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 修改用户对话框 -->
        <el-dialog title="修改用户" :visible.sync="editDialogVisible" width="50%">
            <el-form :model="editForm" :rules="editFormRules" ref="editFormRef" label-width="70px">
                <el-form-item label="用户名" prop="name">
                    <el-input v-model="editForm.name" disabled></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="editForm.email"></el-input>
                </el-form-item>
                <el-form-item label="手机" prop="phone">
                    <el-input v-model="editForm.phone"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="editUser">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
    data() {
        return {
            //获取用户列表的参数对象
            queryInfo: {
                query: '',
                pageNum: 1,
                pageSize: 10
            },
            userlist: [],
            total: 0,
            //控制添加用户对话框显示与隐藏
            addDialogVisible: false,
            //修改用户对话框显示与隐藏
            editDialogVisible: false,
            //添加用户表单数据
            addForm: {
                username: '',
                password: '',
                email: '',
                phone: ''
            },
            //编辑表单
            editForm: {
                id: {},
                name: '',
                email: '',
                phone: ''
            },
            //添加表单的验证规则对象
            addFormRules: {
                username: [
                    {
                        required: true,
                        message: "请输入用户名",
                        trigger: 'blur'
                    },
                    {
                        min: 3,
                        max: 10,
                        message: '用户名长度3～10之间',
                        trigger: 'blur'
                    }
                ],
                password: [
                    {
                        required: true,
                        message: "请输入密码",
                        trigger: 'blur'
                    },
                    {
                        min: 6,
                        max: 15,
                        message: '密码长度6～15之间',
                        trigger: 'blur'
                    }
                ],
                email: [
                    {
                        required: true,
                        message: "请输入邮箱",
                        trigger: 'blur'
                    }
                ],
                phone: [
                    {
                        required: true,
                        message: "请输入手机",
                        trigger: 'blur'
                    },
                ]
            },
            //编辑用户规则
            editFormRules: {
                email: [
                    {
                        required: true,
                        message: "请输入邮箱",
                        trigger: 'blur'
                    }
                ],
                phone: [
                    {
                        required: true,
                        message: "请输入手机",
                        trigger: 'blur'
                    },
                ]
            }
        }
    },
    created() {
        this.getUserList()
    },
    methods: {
        async getUserList() {
            const { data: res } = await this.$http.post('users', this.queryInfo)
            if (res.code !== 200) return this.$message.error('获取用户列表失败')
            this.userlist = res.data
            this.total = res.total
        },
        //监听 pageSize 改变的事件
        handleSizeChange(newSize) {
            this.queryInfo.pagesize = newSize
            this.getUserList()
        },
        //监听页码值改变事件
        handleCurrentChange(newPage) {
            this.queryInfo.pagenum = newPage
            this.getUserList()
        },
        //监听 switch 开关状态改变
        async userStateChanged(userinfo) {
            console.log(userinfo)
            const { data: res } = await this.$http.put(`userStateUpdate/${userinfo.id}/${userinfo.stat}`)
            if (res.code !== 200) {
                userinfo.stat = !userinfo.stat
                return this.$message.error('更新用户状态失败')
            }
            this.$message.success('更新用户信息成功')
        },
        //监听添加用户对话框关闭事件
        addDialogClosed() {
            this.$refs.addFormRef.resetFields()
        },
        //监听添加用户确定按键
        addUser() {
            this.$refs.addFormRef.validate(async valid => {
                if (!valid) return
                const { data: res } = await this.$http.post('addUser', this.addForm)
                if (res.code !== 200) {
                    this.$message.error('添加用户失败')
                }
                this.$message.success('添加用户成功')
                //隐藏添加用户对话框
                this.addDialogVisible = false
                //刷新用户列表
                this.getUserList()
            })
        },
        //监听修改用户确定按键
        editUser() {
            this.$refs.editFormRef.validate(async valid => {
                if (!valid) return
                const { data: res } = await this.$http.put('editUser', this.editForm)
                if (res.code !== 200) {
                    this.$message.error('修改用户失败')
                }
                this.$message.success('修改用户成功')
                //隐藏修改用户对话框
                this.editDialogVisible = false
                //刷新用户列表
                this.getUserList()
            })
        },
        //修改用户对话框
        async editUserDialog(id) {
            const { data: res } = await this.$http.get('user/' + id)
            if (res.code !== 200) {
                this.$message.error('查询用户信息失败')
            }
            this.editForm = res.data
            this.editDialogVisible = true;
        },
        //删除用户操作
        async deleteUser(id) {
            const confirmResult = await this.$confirm('此操作将永久删除该用户?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).catch(err => err);

            if (confirmResult == 'confirm') {
                const {data: res} = await this.$http.delete('delete/' + id)
                if(res.code !== 200){
                    this.$message.error('删除用户信息失败')
                }
                this.$message.success('删除用户成功')
                //刷新用户列表
                this.getUserList()
            }
        }
    }
}
</script>

<style lang="less" scoped></style>
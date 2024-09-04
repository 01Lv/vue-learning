<template>
    <div>
        <el-radio-group v-model="select" class="switch" size="medium">
            <el-radio-button v-for="i in iOptions" :key="i.value" :label="i.value">
                {{ i.label }}
            </el-radio-button>
        </el-radio-group>

        <el-row :gutter="20" style="padding: 10px 0;">
            <el-col :span="12">
                <div style="min-height: 108px;background-color: white;">
                    <div style="padding-top: 10px;padding-left: 10px;padding-bottom: 10px;">
                        <span>日志数据</span>
                    </div>

                    <el-row>
                        <el-col :span="8">
                            <div style="min-height: 72px;">
                                <div style="font-size: 12px;color: gray;text-align: center;">登录数</div>
                                <h1 style="text-align: center;">92</h1>
                            </div>
                        </el-col>
                        <el-col :span="8">
                            <div style="min-height: 72px;">
                                <div style="font-size: 12px;color: gray;text-align: center;">操作日志数</div>
                                <h1 style="text-align: center;">210</h1>
                            </div>
                        </el-col>
                        <el-col :span="8">
                            <div style="min-height: 72px;">
                                <div style="font-size: 12px;color: gray;text-align: center;">改密日志数</div>
                                <h1 style="text-align: center;">0</h1>
                            </div>
                        </el-col>
                    </el-row>
                </div>
            </el-col>
            <el-col :span="12">
                <div style="background: #e5e9f2;min-height: 108px;"></div>
            </el-col>
        </el-row>

        <el-row :gutter="20" style="padding: 10px 0;">
            <el-col :span="12">
                <el-row :gutter="20">
                    <el-col :span="12">
                        <div style="background: #d3dce6;min-height: 324px;"></div>
                    </el-col>
                    <el-col :span="12">
                        <div style="background: #e5e9f2;min-height: 324px;"></div>
                    </el-col>
                </el-row>
            </el-col>
            <el-col :span="12">
                <el-row>
                    <el-col :span="24">
                        <div style="background: #d3dce6;min-height: 206px;"></div>
                    </el-col>
                    <el-col :span="24" style="padding-top: 10px;">
                        <div style="background: #e5e9f2;min-height: 108px;"></div>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>

        <el-row style="padding: 10px 0;">
            <el-col :span="24">
                <div style="background: #d3dce6;min-height: 324px;"></div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    data() {
        const defaultOptions = [
            {
                label: '今天',
                value: 1
            },
            {
                label: '近7天',
                value: 7
            },
            {
                label: '30天',
                value: 30
            },
        ]
        return {
            select: '',
            iOptions: defaultOptions
        }
    }
}
</script>

<style lang="less" scoped>
.switch {
    background: #EFF0F1;
    border-radius: 4px;
}
</style>
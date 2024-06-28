<template>
    <span>
        <el-radio-group v-model="select" class="switch" size="mini">
            <el-radio-button v-for="i in iOptions" :key="i.value" :label="i.value">
                {{ i.label }}
            </el-radio-button>
        </el-radio-group>
    </span>
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
    padding: 1px 4px;

    .el-radio-button {
        .el-radio-button__inner {
            border: none;
            color: #8F959E;
            background: #EFF0F1;
        }

        &.is-active {
            border-radius: 4px;
            padding: 4px 0;
            box-shadow: 2px 1px 2px rgba(0 0 0 / 8%);

            .el-radio-button__inner {
                color: black;
                background-color: #FFF;
                border-radius: 4px;
                box-shadow: 0 2px 2px rgb(90 97 105 / 31%) !important;
            }
        }
    }

    .el-radio-button__orig-radio:checked+.el-radio-button__inner {
        box-shadow: none;
    }
}
</style>
<template>
    <div class="page-wrapper">
        <BasicTable title="用户管理" search-text="请输入用户账号" :columns="columns" :data-source="tableData" :loading="loading"
            :pagination="pagination" @change="handleTableChange" @refresh="fetchData">

            <template #searchExtend="{ model }">

                <!-- <span style="margin-left: 12px">状态：</span> -->
                <a-select size="large" v-model:value="model.status" placeholder="请选择状态" style="width: 120px" allow-clear>
                    <a-select-option :value="1">启用</a-select-option>
                    <a-select-option :value="0">禁用</a-select-option>
                </a-select>

                <!-- <span style="margin-left: 12px">角色：</span> -->
                <a-select size="large" v-model:value="model.role" placeholder="全部角色" style="width: 120px" allow-clear>
                    <a-select-option value="admin">管理员</a-select-option>
                    <a-select-option value="user">普通用户</a-select-option>
                </a-select>

            </template>

            <template #toolbar>
                <a-button type="primary" @click="handleAdd">
                    <template #icon>
                        <PlusOutlined />
                    </template>
                    新增用户
                </a-button>
                <a-button>导出</a-button>
            </template>

            <template #avatar="{ text }">
                <a-avatar :src="text" />
            </template>

            <template #status="{ text }">
                <a-tag :color="text === 1 ? 'green' : 'red'">
                    {{ text === 1 ? '启用' : '禁用' }}
                </a-tag>
            </template>

            <template #action="{ record }">
                <a @click="handleEdit(record)">编辑</a>
                <a-divider type="vertical" />
                <a-popconfirm title="确定删除吗？" @confirm="handleDelete(record.id)">
                    <a style="color: red">删除</a>
                </a-popconfirm>
            </template>

        </BasicTable>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import { PlusOutlined } from '@ant-design/icons-vue';

import BasicTable from '@/components/table/BaseTable.vue';
import type { TableColumn } from '@/components/table/types';

// 定义列
const columns: TableColumn[] = [
    //   { title: 'ID', dataIndex: 'id', width: 80 },
    { title: '头像', dataIndex: 'avatar', width: 100 },
    { title: '用户名', dataIndex: 'name' },
    { title: '角色', dataIndex: 'role' },
    { title: '状态', dataIndex: 'status' }, // 将会被插槽自定义
    { title: '操作', dataIndex: 'action', width: 150, fixed: 'right' }, // 操作列
];


// 状态管理
const loading = ref(false);
const tableData = ref<any>([]);
const pagination = reactive({
    current: 1,
    pageSize: 10,
    total: 0,
});

// 模拟数据请求
const fetchData = async () => {
    loading.value = true;
    setTimeout(() => {
        // 模拟数据
        tableData.value = [
            { id: 1, name: 'Admin', role: '管理员', status: 1, avatar: 'https://joeschmoe.io/api/v1/random' },
            { id: 2, name: 'User', role: '普通用户', status: 0, avatar: 'https://joeschmoe.io/api/v1/jess' },
        ];
        pagination.total = 20;
        loading.value = false;
    }, 500);
};

// 事件处理
const handleTableChange = (pag: any) => {
    console.log(pag);
    
    pagination.current = pag.current;
    pagination.pageSize = pag.pageSize;
    fetchData(); // 重新加载数据
};

const handleAdd = () => { console.log('点击新增'); };
const handleEdit = (record: any) => { console.log('编辑', record); };
const handleDelete = (id: number) => { console.log('删除 ID:', id); };

onMounted(() => {
    fetchData();
});
</script>
<style></style>
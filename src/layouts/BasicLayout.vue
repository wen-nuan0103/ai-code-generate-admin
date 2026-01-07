<template>
    <a-layout class="layout-container">
        <a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible>
            <div class="logo">
                <span v-if="!collapsed" class="logo-text">Admin Pro</span>
            </div>

            <a-menu v-model:selectedKeys="selectedKeys" v-model:openKeys="openKeys" theme="dark" mode="inline"
                @click="handleMenuClick">
                <a-menu-item key="/dashboard">
                    <DashboardOutlined />
                    <span>仪表盘</span>
                </a-menu-item>

                <a-menu-item key="/users">
                    <user-outlined />
                    <span>用户管理</span>
                </a-menu-item>

                <a-sub-menu key="/model">
                    <template #title>
                        <span>
                            <RobotOutlined />
                            <span>模型管理</span>
                        </span>
                    </template>
                    <a-menu-item key="/model/option1">模型选项1</a-menu-item>
                    <a-menu-item key="/model/option2">模型选项2</a-menu-item>
                </a-sub-menu>

                <a-menu-item key="/upload">
                    <upload-outlined />
                    <span>文件上传</span>
                </a-menu-item>
            </a-menu>
        </a-layout-sider>

        <a-layout>
            <a-layout-header style="background: #fff; padding: 0">
                <menu-unfold-outlined v-if="collapsed" class="trigger" @click="() => (collapsed = !collapsed)" />
                <menu-fold-outlined v-else class="trigger" @click="() => (collapsed = !collapsed)" />
                <!-- <span style="float: right; margin-right: 20px;">管理员</span> -->
                <div style="float: right; margin-right: 20px;">
                    <a-dropdown>
                        <a-space class="user-info">
                            <a-avatar :src="userStore.user.avatar" style="width: 48px;height: 48px;" />
                            <span class="user-name">{{ userStore.user.userName ?? '无名' }}</span>
                        </a-space>
                        <template #overlay>
                            <a-menu>
                                <a-menu-item @click="router.push('/user/profile')">
                                    <UserOutlined />
                                    个人中心
                                </a-menu-item>
                                <a-menu-item @click="handleLogout">
                                    <LogoutOutlined />
                                    退出登录
                                </a-menu-item>
                            </a-menu>
                        </template>
                    </a-dropdown>
                </div>
            </a-layout-header>

            <a-breadcrumb style="margin: 16px">
                <a-breadcrumb-item v-for="(item, index) in breadList" :key="index">
                    {{ item }}
                </a-breadcrumb-item>
            </a-breadcrumb>

            <a-layout-content
                :style="{ margin: '0 16px 24px 16px', padding: '24px', background: '#fff', minHeight: '280px' }">
                <RouterView />
            </a-layout-content>
        </a-layout>
    </a-layout>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import {
    DashboardOutlined,
    UserOutlined,
    RobotOutlined,
    UploadOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    LogoutOutlined
} from '@ant-design/icons-vue';
import { useUserStore } from '@/stores/user'
import { logout } from '@/api/userController';
import { message } from 'ant-design-vue';

const collapsed = ref<boolean>(false);
const selectedKeys = ref<string[]>([]);
const openKeys = ref<string[]>([]);
const breadList = ref<string[]>([]);

const router = useRouter();
const route = useRoute();
const userStore = useUserStore()

const handleMenuClick = ({ key }: { key: string }) => {
    router.push(key);
};

const handleLogout = async () => {
    const result = await logout()
    if (result.data.code === 0) {
        userStore.setUser({
            userName: '未登录',
        })
        message.success('退出登录成功')
        await router.push('/login')
    } else {
        message.error(`退出登录失败: ${result.data.message}`)
    }
}


// 核心：监听路由变化，统一处理高亮、展开和面包屑
watch(
    () => route.path,
    (newPath) => {
        selectedKeys.value = [newPath];
        const parentPath = '/' + newPath.split('/')[1];
        if (newPath.split('/').length > 2 && !openKeys.value.includes(parentPath)) {
            openKeys.value.push(parentPath);
        }
        breadList.value = newPath
            .split('/')
            .filter(item => item)
            .map(item => item.charAt(0).toUpperCase() + item.slice(1));
    },
    { immediate: true }
);
</script>

<style scoped>
.layout-container {
    height: 100vh;
    /* 让布局撑满全屏 */
}

.trigger {
    font-size: 18px;
    line-height: 64px;
    padding: 0 24px;
    cursor: pointer;
    transition: color 0.3s;
}

.trigger:hover {
    color: #1890ff;
}

.logo {
    height: 32px;
    background: rgba(255, 255, 255, 0.2);
    margin: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    font-weight: bold;
    overflow: hidden;
}

.logo-text {
    white-space: nowrap;
}
</style>
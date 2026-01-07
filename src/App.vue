<script setup lang="ts">
import zhCN from 'ant-design-vue/es/locale/zh_CN';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';

dayjs.locale('zh-cn');
const locale = zhCN
</script>

<template>
  <a-config-provider :locale="locale">
      这是测试
  </a-config-provider>
</template>

<style scoped>

</style>

<template>
  <div class="header-container">
    <div>
      <i class="el-icon-s-fold" @click="setIsCollapse"></i>
      <span>江苏传智播客科技教育有限公司</span>
    </div>
    <el-dropdown>
      <div class="avatar-wrap">
        <el-image class="avatar" :src="user.photo"></el-image>
        <span>{{ user.name }}</span>
        <i class="el-icon-arrow-down el-icon--right"></i>
      </div>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>设置</el-dropdown-item>
        <el-dropdown-item>退出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
import { getUserProfile } from '@/api/user'
export default {
  name: 'AppHeader',
  components: {},
  props: {},
  data() {
    return {
      src: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
      user: {},
    }
  },
  computed: {},
  watch: {},
  created() {
    // 获取用户资料
    this.loadUserProfile()
  },
  mounted() {},
  methods: {
    // 除了登录接口，其他所有接口都需要授权使用才能请求
    loadUserProfile() {
      getUserProfile().then((res) => {
        this.user = res.data.data
      })
    },
  },
}
</script>

<style scoped lang="less">
.header-container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ccc;
  .avatar-wrap {
    display: flex;
    align-items: center;
    .avatar {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      margin-right: 10px;
    }
  }
}
</style>
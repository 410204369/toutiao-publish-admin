<template>
  <el-container class="layout-container">
    <el-aside class="aside" :width="isCollapse ? '64px' : '200px'">
      <app-aside class="aside-menu" :is-collapse="isCollapse" />
    </el-aside>
    <el-container>
      <el-header class="header">
        <div class="header-container">
          <div>
            <i
              :class="{
                'el-icon-s-fold': isCollapse,
                'el-icon-s-unfold': !isCollapse,
              }"
              @click="isCollapse = !isCollapse"
            ></i>
            <span>湖南科技大学教务管理系统</span>
          </div>
          <el-dropdown>
            <div class="avatar-wrap">
              <el-image class="avatar" :src="user.photo"></el-image>
              <span>{{ user.name }}</span>
              <i class="el-icon-arrow-down el-icon--right"></i>
            </div>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>设置</el-dropdown-item>
              <!-- 组件默认是不识别原生事件， 除非内部做了处理 -->
              <el-dropdown-item @click.native="onLogout">退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-header>
      <el-main class="main">
        <!-- 子路由出口 -->
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import AppAside from './components/aside'
import { getUserProfile } from '@/api/user'

export default {
  name: 'LayoutIndex',
  components: {
    AppAside,
  },
  props: {},
  data() {
    return {
      isCollapse: false,
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
    // 退出登录
    onLogout() {
      this.$confirm('是否退出登录?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          // 把用户登录状态清除
          window.localStorage.removeItem('user')
          // 跳转登录页
          this.$router.push('/login')
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消退出',
          })
        })
    },
  },
}
</script>

<style scoped lang="less">
.layout-container {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}

.aside {
  background-color: #d3dce6;
  .aside-menu {
    height: 100%;
  }
}

.main {
  background-color: #e9eef3;
}
.nav-menu {
  .iconfont {
    margin-right: 10px;
    padding-left: 5px;
  }
}
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
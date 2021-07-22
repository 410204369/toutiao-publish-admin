<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>评论管理</span>
      </div>
      <el-table
        :data="articles"
        style="width: 100%"
        size="mini"
        :header-cell-style="{
          textAlign: 'center',
          background: '#f5f7fa',
          height: '50px',
        }"
        :cell-style="{ textAlign: 'center' }"
      >
        <el-table-column prop="title" label="标题" width="180">
        </el-table-column>
        <el-table-column prop="total_comment_count" label="总评论数">
        </el-table-column>
        <el-table-column prop="fans_comment_count" label="粉丝评论数据">
        </el-table-column>
        <el-table-column label="评论状态" width="180">
          <template slot-scope="scope">
            <!-- 开关组件绑定的数据是一个布尔值，它会根据布尔值的真假来决定开关状态 -->
            <el-switch
              v-model="scope.row.comment_status"
              active-color="#13ce66"
              inactive-color="#ff4949"
              :disabled="scope.row.statusDisable"
              @change="onStatusChange(scope.row)"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template>
            <el-button type="primary" size="small">修改</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 数据分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="page"
        :page-sizes="[10, 20, 50]"
        :page-size.sync="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalCount"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import { getArticles, updateCommentStatus } from '@/api/article'
export default {
  // 组件的 name 最好起名为两个单词，尽量少用一个单词
  // 为什么？为了避免和原生的 html 标签冲突
  name: 'CommentIndex',
  components: {},
  props: {},
  data() {
    return {
      articles: [], // 文章列表（文章的评论数据字段）
      totalCount: 0,
      pageSize: 10,
      page: 1,
    }
  },
  computed: {},
  watch: {},
  created() {
    this.loadArticles()
  },
  methods: {
    loadArticles(page = 1) {
      this.page = page
      getArticles({
        response_type: 'comment',
        page,
        per_page: this.pageSize
      }).then((res) => {
        const results = res.data.data.results
        this.totalCount = res.data.data.total_count
        results.forEach((item) => {
          item.statusDisable = false
        })
        this.articles = results
      })
    },
    onStatusChange(row) {
      // 禁用
      row.statusDisabled = true
      // 请求提交修改
      updateCommentStatus(row.id.toString(), row.comment_status).then((res) => {
        row.statusDisabled = false
        this.$message({
          type: 'success',
          message: row.comment_status ? '开启成功' : '关闭成功',
        })
      })
    },
    handleSizeChange(val) {
      this.loadArticles(1, val)
    },

    handleCurrentChange(val) {
      this.loadArticles(val)
    },
  },
}
</script>

<style lang="less" scoped>
.el-pagination {
  white-space: nowrap;
  padding: 2px 5px;
  color: #303133;
  font-weight: 700;
  display: flex;
  justify-content: flex-end;
}
</style>
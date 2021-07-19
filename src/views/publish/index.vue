<template>
  <div class="publish-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <!-- 面包屑路径导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
          <el-breadcrumb-item>{{
            $route.query.id ? '修改文章' : '发布文章'
          }}</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- /面包屑路径导航 -->
      </div>
      <el-form
        ref="publish-form"
        :model="article"
        :rules="formRules"
        label-width="40px"
      >
        <el-form-item label="标题">
          <el-input v-model="article.title"></el-input>
        </el-form-item>
        <el-form-item label="内容">
          <!-- <el-input type="textarea" v-model="article.content"></el-input> -->
          <el-tiptap
            v-model="article.content"
            :extensions="extensions"
            height="350"
            placeholder="请输入文章内容"
            lang="zh"
          ></el-tiptap>
        </el-form-item>
        <el-form-item label="封面">
          <el-radio-group v-model="article.cover.type">
            <el-radio :label="1">单图</el-radio>
            <el-radio :label="3">三图</el-radio>
            <el-radio :label="0">无图</el-radio>
            <el-radio :label="-1">自动</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道">
          <el-select v-model="article.channel_id" placeholder="请选择频道">
            <el-option label="全部" :value="null"></el-option>
            <el-option
              v-for="(channel, index) in channels"
              :label="channel.name"
              :value="channel.id"
              :key="index"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onPublish(false)">发表</el-button>
          <el-button @click="onPublish(true)">存入草稿</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import {
  getArticleChannels,
  addArticle,
  getArticle,
  updateArticle,
} from '@/api/article'
import 'element-tiptap/lib/index.css'
import 'element-tiptap/lib/index.css'
import {
  ElementTiptap,
  Doc,
  Text,
  Paragraph,
  Heading,
  Bold,
  Underline,
  Italic,
  Image,
  Strike,
  ListItem,
  BulletList,
  OrderedList,
  TodoItem,
  TodoList,
  HorizontalRule,
  Fullscreen,
  Preview,
  CodeBlock,
} from 'element-tiptap'
import { uploadImage } from '@/api/image'
export default {
  name: 'PublishIndex',
  components: {
    'el-tiptap': ElementTiptap,
  },
  props: {},
  data() {
    return {
      extensions: [
        new Doc(),
        new Text(),
        new Paragraph(),
        new Heading({ level: 3 }),
        new Bold({ bubble: true }), // 在气泡菜单中渲染菜单按钮
        new Image({
          uploadRequest(file) {
            const fd = new FormData()
            // Content-Type 设置为 multipart/form-data,那么请求体必须使用FormData格式
            // 第一个return 返回一个promise对象，因为axios返回promise
            fd.append('image', file)
            return uploadImage(fd).then((res) => {
              // 这个return是返回最后的结果
              return res.data.data.url
            })
          },
        }),
        new Underline(), // 下划线
        new Italic(), // 斜体
        new Strike(), // 删除线
        new HorizontalRule(), // 华丽的分割线
        new ListItem(),
        new BulletList(), // 无序列表
        new OrderedList(), // 有序列表
        new TodoItem(),
        new TodoList(),
        new Fullscreen(),
        new Preview(),
        new CodeBlock(),
      ],
      channels: [],
      article: {
        title: '', // 文章标题
        content: '', // 文章内容
        cover: {
          // 文章封面
          type: 0, // 封面类型 -1:自动，0-无图，1-1张，3-3张
          images: [], // 封面图片的地址
        },
        channel_id: null,
      },
      formRules: {
        title: [
          { required: true, message: '请输入文章标题', trigger: 'blur' },
          {
            min: 5,
            max: 30,
            message: '长度在 5 到 30 个字符',
            trigger: 'blur',
          },
        ],
        content: [
          // { required: true, message: '请输入文章内容', trigger: 'change' }
          {
            validator(rule, value, callback) {
              if (value === '<p></p>') {
                // 验证失败
                callback(new Error('请输入文章内容'))
              } else {
                // 验证通过
                callback()
              }
            },
          },
          { required: true, message: '请输入文章内容', trigger: 'blur' },
        ],
        channel_id: [{ required: true, message: '请选择文章频道' }],
      },
    }
  },
  computed: {},
  watch: {},
  created() {
    this.loadChannels()
    // 编辑页面和发布页面是同一个组件，所以需要根据id判断
    if (this.$route.query.id) {
      this.loadArticle()
    }
  },
  mounted() {},
  methods: {
    loadChannels() {
      getArticleChannels().then(({ data }) => {
        // 对象结构
        this.channels = data.data.channels
      })
    },
    onPublish(draft = false) {
      this.$refs['publish-form'].validate((valid) => {
        if (!valid) {
          return
        }
        const articleId = this.$route.query.id
        // 执行修改操作
        if (articleId) {
          updateArticle(articleId, this.article, draft).then((res) => {
            this.$message({
              message: `${draft ? '存入草稿' : '修改'}成功`,
              type: 'success',
            })
            // 跳转内容管理页
            this.$router.push('/article')
          })
        } else {
          addArticle(this.article, draft).then((res) => {
            this.$message({
              message: `${draft ? '存入草稿' : '发布'}成功`,
              type: 'success',
            })
            // 跳转内容管理页
            this.$router.push('/article')
          })
        }
      })
    },

    // 修改文章，加载文章内容
    loadArticle() {
      getArticle(this.$route.query.id).then((res) => {
        this.article = res.data.data
      })
    },
  },
}
</script>

<style scoped lang="less"></style>
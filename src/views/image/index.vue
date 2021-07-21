<template>
  <div class="image-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <!-- 面包屑路径导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
          <el-breadcrumb-item>素材管理</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- /面包屑路径导航 -->
        <!-- <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button> -->
      </div>
      <div class="action-head">
        <el-radio-group v-model="collect" size="mini" @change="onChangeCollect">
          <el-radio-button :label="false">全部</el-radio-button>
          <el-radio-button :label="true">收藏</el-radio-button>
        </el-radio-group>
        <el-button
          size="mini"
          type="success"
          @click="dialogUploadVisible = true"
        >
          上传素材
        </el-button>
      </div>
      <!-- 素材列表 -->
      <el-row :gutter="10">
        <el-col
          :xs="12"
          :sm="6"
          :md="6"
          :lg="4"
          v-for="(img, index) in images"
          :key="index.vue"
          class="image-item"
        >
          <el-image style="height: 100px" :src="img.url" fit="cover"></el-image>
          <div class="image-action">
            <i
              :class="{
                'el-icon-star-on': img.is_collected,
                'el-icon-star-off': !img.is_collected,
              }"
              @click="onCollect(img)"
            ></i>
            <i class="el-icon-delete-solid"></i>
          </div>
        </el-col>
      </el-row>
      <!-- /素材列表 -->
      <!-- 数据分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="per_page"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalCount"
      >
      </el-pagination>
    </el-card>
    <el-dialog
      title="上传素材"
      :visible.sync="dialogUploadVisible"
      :append-to-body="true"
    >
      <!-- 请求头：headers -->
      <el-upload
        class="upload-demo"
        drag
        action="http://api-toutiao-web.itheima.net/mp/v1_0/user/images"
        :headers="uploadHeaders"
        name="image"
        multiple
        :show-file-list="false"
        :on-success="onUploadSuccess"
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">
          只能上传jpg/png文件，且不超过500kb
        </div>
      </el-upload>
    </el-dialog>
  </div>
</template>

<script>
import { getImages, collectImage } from '@/api/image'
export default {
  name: 'ImageIndex',
  components: {},
  props: {},
  data() {
    const user = JSON.parse(window.localStorage.getItem('user'))
    return {
      collect: false,
      images: [],
      dialogUploadVisible: false,
      uploadHeaders: {
        Authorization: `Bearer ${user.token}`,
      },
      totalCount: 0,
      pageSize: 10,
      per_page: 1,
    }
  },
  computed: {},
  watch: {},
  created() {
    this.loadImages(1, false)
  },
  mounted() {},
  methods: {
    loadImages(page, per_page, collect = false) {
      getImages({
        collect,
        page,
        per_page: per_page || this.pageSize,
      }).then(({ data }) => {
        this.images = data.data.results
        this.totalCount = data.data.total_count
      })
    },
    onChangeCollect(value) {
      this.loadImages(1, this.pageSize, value)
    },
    onUploadSuccess() {
      this.dialogUploadVisible = false
      this.loadImages(1, 10, false)
      this.$message({
        type: 'success',
        message: '上传成功',
      })
    },
    handleSizeChange(val) {
      console.log('val', val);
      this.loadImages(1, val);
    },

    handleCurrentChange(val) {
      this.loadImages(val)
    },
    onCollect(img) {
      collectImage(img.id, !img.is_collected).then((res) => {
        img.is_collected = !img.is_collected
      })
    },
  },
}
</script>

<style scoped lang="less">
.action-head {
  padding-bottom: 20px;
  display: flex;
  justify-content: space-between;
}
::v-deep .el-dialog {
  width: 40% !important;
}
.upload-demo {
  text-align: center;
}
.image-item {
  position: relative;
}
.image-action {
  height: 40px;
  position: absolute;
  background-color: rgba(204, 204, 204, 0.5);
  bottom: 4px;
  left: 5px;
  right: 5px;
  font-size: 20px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  color: #fff;
}
</style>
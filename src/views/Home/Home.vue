<template>
  <div class="home-container">
    <van-nav-bar title="头条" fixed />
    <!-- 导入注册   使用ArticleInfo组件渲染文章列表数据 -->
    <!-- 绑定属性disabled来控制是否停止下拉刷新 把finished的值给它 这样=true的时候 就会停止下拉刷新的效果 -->
    <van-pull-refresh v-model="isLoading" :disabled="finished" @refresh="onRefresh">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <ArticleInfo
          v-for="item in artlist"
          :key="item.id"
          :title="item.title"
          :author="item.aut_name"
          :cmt-count="item.comm_count"
          :time="item.pubdate"
          :cover="item.cover"
        ></ArticleInfo>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
// 按需导入API接口
import { getArticleListAPI } from '../../api/articleAPI.js'

// 导入子组件
import ArticleInfo from '../../components/Article/ArticleInfo'
export default {
  name: 'Home',
  data() {
    return {
      // 页码值
      page: 1,
      // 每页显示多少条数据
      limit: 10,
      // 把拿到的数据res存到artList中 这样才能供页面使用
      artlist: [],
      // 是否正在加载下一页的数据  如果loading为true 就不会反复触发load事件 这样就可以避免一次性加载太多
      // 每当下一页数据请求回来之后 一定要记得把loading改为false  否则不会触发load事件加载请求回来的下一页数据
      loading: true, // 把初始值改为true这样一进去就不会触发onload事件 要下拉到最底部再触发就行
      // 所有数据是否加载完毕了 如果没有更多的数据  就把finished改为true
      finished: false,
      isLoading: false // 是否正在下拉刷新 为true 就不会反复触发onRefresh事件
    }
  },
  created() {
    this.initArticleList()
  },
  methods: {
    async initArticleList(isRefresh) {
      // 发起Get请求 获取文章的列表数据
      const { data: res } = await getArticleListAPI(this.page, this.limit)
      // 判断是下拉刷新 还是上拉加载更多
      if (isRefresh) {
        // 证明是下拉刷新 新数据在前 旧数据在后
        this.artlist = [...res, ...this.artlist]
        this.isLoading = false
      } else {
        // 如果是上拉加载更多数据 应当采用数据拼接 旧数据在前 新数据在后
        this.artlist = [...this.artlist, ...res]
        // 当第一页数据请求回来后 将loading改为false这样下拉就会触发onload事件
        this.loading = false
      }

      if (res.length === 0) {
        // 证明没有下一页的数据了 直接把finished改为true 表示数据加载完毕
        this.finished = true
      }
    },
    // 只要onLoad事件被调用 就应该请求下一页的数据
    onLoad() {
      console.log('触发了onload事件')
      // 1.让页码值+1
      this.page++
      // 2.重新请求接口数据
      this.initArticleList()
    },
    // 下拉刷新处理函数
    onRefresh() {
      // 让页码值+1
      this.page++
      // 重新请求接口获取数据
      this.initArticleList(true) // 下拉刷新的时候给 isRefresh传一个true过去
    }
  },
  // 注册组件
  components: {
    ArticleInfo
  }
}
</script>

<style lang="less" scoped>
.home-container {
  padding: 46px 0 50px 0;

}
</style>

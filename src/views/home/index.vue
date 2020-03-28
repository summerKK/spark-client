<template>
  <div class="home">
    <Tabs @on-click="tabChange" :value="categoryId">
      <TabPane
        v-for="category in categoryList"
        :label="category.category_name"
        :key="category.category_id"
        v-bind:name="'' + category.category_id">
        <Card v-for="item of list" :key="item.id" :title="item.caption">
          <p>{{ item.content }}</p>
          <p>提问时间：{{ item.create_time }} 提问者：{{ item.author_name }}</p>
        </Card>
      </TabPane>
    </Tabs>
  </div>
</template>

<script>
  export default {
    name: "home",
    data() {
      return {
        list: [],
        categoryId: "1",
        categoryList: [],
      };
    },
    created() {
      this.getCategoryList();
      this.getQuestionList();
    },
    methods: {
      async getCategoryList() {
        let result = await this.$http.get("/api/category/list");
        if (result.data.code === 0) {
          this.categoryList = result.data.data;
        } else {
          this.$Message.error(result.data.msg);
        }
      },
      async getQuestionList() {
        let result = await this.$http.get("/api/question/list", {params: {category_id: this.categoryId}});
        if (result.data.code === 0) {
          this.list = result.data.data
        } else {
          this.$Message.error(result.data.msg);
        }
      },
      async tabChange(categoryId) {
        this.categoryId = categoryId;
        this.getQuestionList();
      },
    },
  };
</script>

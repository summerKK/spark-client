<template>
  <div>
    <Card title="提问">
      <Form label-position="top" :model="form">
        <FormItem prop="title" label="标题">
          <Input type="text" v-model="form.caption" placeholder="请输入标题"/>
        </FormItem>
        <FormItem prop="category" label="类别">
          <Select v-model="form.category_id" placeholder="请选择类别">
            <Option v-for="option in categoryList" :value="option.category_id" :key="option.id">
              {{ option.category_name }}
            </Option>
          </Select>
        </FormItem>
        <FormItem prop="centent" label="内容">
          <Input
            type="textarea"
            v-model="form.content"
            placeholder="请输入内容"
          />
        </FormItem>
        <Button type="primary" @click="submit">提交</Button>
      </Form>
    </Card>
  </div>
</template>

<script>
  export default {
    name: "Ask",
    data() {
      return {
        loading: false,
        form: {
          caption: "",
          category_id: "",
          content: "",
        },
        categoryList: [],
      }
    },
    created() {
      this.getCategoryList();
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
      async submit() {
        let result = await this.$http.post("/api/question/submit", this.form);
        if (result.data.code === 0) {
          this.$Message.success("添加成功");
          await this.$router.push("/");
        } else {
          this.$Message.error(result.data.msg)
        }
      }
    }
  };
</script>

<style lang="scss" scoped></style>

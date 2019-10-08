<template>
  <div class="loadding" v-loading="loading">
    <div class="header">
      <div class="eat-title" v-text="selectedEat"></div>
      <el-button class="button-new-tag" size="small" :type="types" @click="goEat">{{content}}</el-button>
    </div>
    <div class="eat-content">
      <el-input
        class="input-new-tag"
        v-if="inputVisible"
        v-model="inputValue"
        ref="saveTagInput"
        size="small"
        @keyup.enter.native="handleInputConfirm"
        @blur="handleInputConfirm"
        placeholder="新发现"
      ></el-input>
      <!-- <el-button v-else class="button-new-tag" size="small" @click="showInput">添&nbsp;&nbsp;&nbsp;加</el-button> -->
        <!-- closable -->
      <el-tag
        :key="tag"
        v-for="tag in dynamicTags"
        :disable-transitions="false"
        @close="handleClose(tag)"
      >{{tag}}</el-tag>
    </div>
  </div>
</template>

<script>
// var Host = "http://localhost:8888/";
export default {
  name: "HelloWorld",
  data() {
    return {
      dynamicTags: [],
      inputVisible: false,
      inputValue: "",
      loading: true,
      dynamicTagsString: "",
      selectedEat: "",
      clickedNum: 0,
      content: "开吃",
      types: "primary"
    };
  },
  mounted() {
    // this.axios.get(Host + '').then(response => {
    let json = {
      _id: { $oid: "5ccfda6bef2dea56c27d5141" },
      foodName: [
        "联合大厦",
        "丰联负一",
        "华普",
        "真功夫",
        "再来一次",
        "开拓新地方",
        // "太原刀削面",
        // "联合山西面馆",
        // "联合米饭套餐",
        // "老粥铺",
        // "联合驴肉火烧",
        // "饺子",
        // "再来一次"
      ]
    };
    console.log("%c 初始查询表的数据", "color:red", json.foodName);
    this.dynamicTags = json.foodName;
    this.loading = false;
    this.dynamicTagsString = JSON.stringify(this.dynamicTags);
  },
  methods: {
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
      this.change();
    },

    showInput() {
      this.inputVisible = true;
      this.$nextTick(()=> {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.dynamicTags.unshift(inputValue);
      }

      this.inputVisible = false;
      this.inputValue = "";
      this.change();
    },
    // 数据库修改新菜
    change() {
      console.log("%c 修改数据", "color:blue", this.dynamicTagsString, this.dynamicTags);
      this.loading = true;
    },
    goEat() {
      var Arr = this.dynamicTags;
      var n = Math.floor(Math.random() * Arr.length + 1) - 1;
      // console.log(n)
      this.selectedEat = this.dynamicTags[n];
      // console.log(this.dynamicTags,this.selectedEat)
      this.clickedNum++;
      // console.log(this.clickedNum);
      if (this.clickedNum == 3) {
        this.types = "danger";
        this.content = "别点了，就吃这个";
      } else if (this.clickedNum > 3) {
        this.types = "primary";
        this.content = "@.@ 爱吃啥吃啥";
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.loadding {
  width: 100vw;
}

.eat-content {
  padding: 2rem 1.5rem;
}

.el-tag + .el-tag {
  margin: 0.5rem;
}

.button-new-tag {
  min-width: 75px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}

.input-new-tag {
  width: 75px;
  vertical-align: center;
}

body {
  margin: 0;
}
.eat-title {
  margin-top: 1rem;
  margin-bottom: 1rem;
  font-weight: 600;
}
.header {
  border: 1px solid #43fc5c;
  padding-bottom: 1rem;
  width: 70vw;
  margin: 0 auto;
  margin-top: 2rem;
}
</style>

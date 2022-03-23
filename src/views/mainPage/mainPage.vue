
<template>
    <div class="mainPage">
        <layout2></layout2>

    </div>


</template>
<style src="./index.less" lang="less"></style>

<script>
import layout2 from "../../components/layout2/layout2";
  export default {
    name: "mainPage",
      components:{
          layout2,
      },
      data() {
          return {

          };
      },
  }
</script>

<style scoped>
.footer{
    position:absolute;
    background: #EBFFEF;
    bottom:0;
    height:100px;
    line-height:100px;
    text-align:center;
    width: 80%

}



</style>


<template>
    <div class="mainPage">
        <layout></layout>

    </div>

<!--        <a-layout-content class="content" >-->

<!--        </a-layout-content>-->
<!--        <a-layout-footer class="footer">-->
<!--            IRBL ©2022 Created by NJUSE-->
<!--        </a-layout-footer>-->

</template>
<style src="./index.less" lang="less"></style>

<script>
    import layout from '../../components/layout2/layout2'
  export default {
    name: "mainPage",
      components:{
          layout,
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

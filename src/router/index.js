import Vue from 'vue'
import VueRouter from 'vue-router'
// eslint-disable-next-line no-unused-vars
import loginPage from '../views/login/loginPage.vue'
import mainPage from '../views/mainPage/mainPage.vue'
import projectList from "../views/project/projectList/projectList.vue";
import issueList from '../views/issue/issueList/issueList.vue'
import issueDetail from "../views/issue/issueDetail/issueDetail.vue";
import projectDetail from '../views/project/projectDetail/projectDetail.vue';
import userInfo from '../views/user/userInfo';
import issueHistory from '../views/issue/issueHistory/issueHistory'
import createProject from "@/views/project/createProjectPage/createPage";
import createIssue from '../views/issue/components/issueModal'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'loginPage',
    component: loginPage
  },
  {
    path:'/',
    name:'main',
    component:mainPage,

  },
  {
    path:'/projectList',
    name:'projectList',
    component:projectList,
  },
  {
    path:'/issueList',
    name:'issueList',
    component:issueList,
  },
  {
    path: '/projectDetail',
    name: 'projectDetail',
    component: projectDetail,
  },
  {
    path: '/user/info',
    name: 'userInfo',
    component: userInfo,
  },
  {
    path:'/issueDetail',
    name:'issueDetail',
    component:issueDetail,
  },
  {
    path:'/issue/issueHistory',
    name:'issueHistory',
    component:issueHistory,
  },
  {
    path:'/createProject',
    name:'createProject',
    component:createProject,
  },
  {
    path:'/createIssue',
    name:'createIssue',
    component:createIssue,
  },


]

// const router = new VueRouter({
//   routes
// })
const createRouter = () => new VueRouter({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes
})
const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

//解决router报重复的问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}



router.onError((error)=>{
  const pattern=/Loading chunk (\d)+failed/g;
  const isChunkLoadFailed=error.message.match(pattern);
  const targetPath=router.history.pending.fullPath;
  if(isChunkLoadFailed){
    router.replace(targetPath);
  }
});

export default router

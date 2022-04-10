import Vue from 'vue'
import VueRouter from 'vue-router'
// eslint-disable-next-line no-unused-vars
import loginPage from '../views/login/loginPage.vue'
import mainPage from '../views/mainPage/mainPage.vue'
import projectList from "../views/project/projectList/projectList.vue";
import issueList from '../views/issue/issueList/issueList.vue'
import projectDetail from '../views/project/projectDetail/projectDetail.vue';
import userInfo from '../views/user/userInfo';
import issueHistory from '../views/issue/issueHistory/issueHistory'
// import issueDetail from '../views/issue/issueDetail/issueDetail'
// import createIssue from '../views/issue/components/issueModal'
import connectDetail from '../views/connectGraph/connectDetail'
import addProject from "@/views/project/createProject/addProject";
import addProjectFile from '@/views/project/createProject/addProjectFile';
import addProjectUrl from '@/views/project/createProject/addProjectUrl';
import addProjectUrlCommit from "@/views/project/createProject/addProjectUrlCommit";
import createIssue from '@/views/issue/createIssue/createIssue';

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
    path:'/addProject',
    name:'addProject',
    component:addProject,
  },
  {
    path:'/addProjectFile',
    name:'addProjectFile',
    component:addProjectFile,
  },
  {
    path:'/addProjectUrl',
    name:'addProjectUrl',
    component:addProjectUrl,
  },
  {
    path:'/addProjectUrlCommit',
    name:'addProjectUrlCommit',
    component:addProjectUrlCommit,
  },
  // {
  //   path:'/issueDetail',
  //   name:'issueDetail',
  //   component:issueDetail,
  //
  // },

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
    path: '/createIssue',
    name: 'createIssue',
    component: createIssue,
  },
  {
    path: '/user/info',
    name: 'userInfo',
    component: userInfo,
  },
  {
    path:'/issue/issueHistory',
    name:'issueHistory',
    component:issueHistory,
  },
  {
    path:'/connectDetail',
    name:'connectDetail',
    component:connectDetail,
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

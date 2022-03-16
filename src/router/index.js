import Vue from 'vue'
import VueRouter from 'vue-router'
// eslint-disable-next-line no-unused-vars
import loginPage from '../views/loginPage.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'loginPage',
    component: loginPage
  },
  {
    path:'/',
    redirect:'/NJUSE',
    component: () => import(/* webpackChunkName: "about" */ '../views/mainPage.vue')
  },
  {
    path:'/NJUSE',
    name:'layout',
    redirect:'/mainPage',
    // component:()=>import ('@/components/layout2/layout2'),
    component:()=>import ('@/components/layout'),
    children:[
      {
        path:'/mainPage',
        name:'main',
        component:()=>import('@/views/mainPage'),
      },
      {
        path:'/project/projectList',
        name:'projectList',
        component:()=>import('@/views/project/projectList'),
      },
      {
        path: '/project/projectDetail/:projectId',
        name: 'projectDetail',
        component: () => import('@/views/project/projectDetail')
      },
      {
        path: '/user/info/:userId',
        name: 'userInfo',
        component: () => import('@/views/user/userInfo')
      },
      {
        path:'/issue/issueList',
        name:'issueList',
        component:()=>import('@/views/issue/issueList'),
      },
      {
        path:'/issue/issueDetail/:issueId',
        name:'issueDetail',
        component:()=>import('@/views/issue/issueDetail'),
      },
      {
        path:'/issue/issueHistory',
        name:'issueHistory',
        component:()=>import('@/views/issue/issueHistory'),
      },
      {
        path:'/issue/addIssue',
        name:'addIssue',
        component:()=>import('@/views/issue/components/issueModal'),
      },
      {
        path:'/project/createProject',
        name:'createProject',
        component:()=>import('@/views/project/createProjectPage/createPage'),
      },

    ]
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

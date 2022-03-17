

const getters={
    //user
    token: state => state.user.token,
    userId: state => state.user.userId,
    userInfo: state => state.user.userInfo,
    userProjectList: state => state.user.userProjectList,
    visibleLogin:state => state.user.visibleLogin,
    //project
    currentProjectId: state => state.project.currentProjectId,
    projectList: state => state.project.projectList,
    projectListLoading:state => state.project.projectListLoading,
    currentProjectDetail:state => state.project.currentProjectDetail,
    projectModalVisible:state => state.project.projectModalVisible,
    uploadVisible:state => state.project.uploadVisible,
    //issue
    currentIssueId:state => state.issue.currentIssueId,
    issueList: state => state.issue.issueList,
    historyIssueList:state => state.issue.historyIssueList,
    issueListLoading:state => state.issue.issueListLoading,
    currentIssueDetail:state => state.issue.currentIssueDetail,
    issueModalVisible:state => state.issue.issueModalVisible,
    searchResult:state=>state.issue.searchResult,



}
export default getters

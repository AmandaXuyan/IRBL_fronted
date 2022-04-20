

const getters={
    //user
    token: state => state.user.token,
    userId: state => state.user.userId,
    userInfo: state => state.user.userInfo,
    visibleLogin:state => state.user.visibleLogin,
    visiblePop:state => state.user.visiblePop,
    //project
    currentProjectId: state => state.project.currentProjectId,
    projectList: state => state.project.projectList,
    projectListLoading:state => state.project.projectListLoading,
    currentProjectDetail:state => state.project.currentProjectDetail,
    addProjectVisible:state => state.project.addProjectVisible,
    uploadVisible:state => state.project.uploadVisible,
    panelLeftFirst:state => state.project.panelLeftFirst,
    connectResVisible:state=> state.project.connectResVisible,
    tabList:state=> state.project.tabList,
    minSize:state=> state.project.minSize,
    size:state=> state.project.size,
    activePage:state=> state.project.activePage,
    treeData:state=> state.project.treeData,
    issueShowVisible:state=> state.project.issueShowVisible,
    updateProjectPopV:state=> state.project.updateProjectPopV,
    tagList:state=> state.project.tagList,
    //issue
    currentIssueId:state => state.issue.currentIssueId,
    issueList: state => state.issue.issueList,
    gitIssueList:state => state.issue.gitIssueList,
    issueListLoading:state => state.issue.issueListLoading,
    currentIssueDetail:state => state.issue.currentIssueDetail,
    issueDetailVisible:state => state.issue.issueDetailVisible,
    searchResult:state=>state.issue.searchResult,
    issueEditVisible:state => state.issue.issueEditVisible,
    pageName:state => state.issue.pageName,
    bugLocationList:state => state.issue.bugLocationList,
    issueRelations:state => state.issue.issueRelations,
    tableId:state => state.issue.tableId,
    isRetry:state => state.issue.isRetry,
    xdata:state => state.issue.xdata,
    ydata:state => state.issue.ydata,

    //file
    codes:state=>state.file.codes,
    fileLanguage:state=>state.file.fileLanguage,

}
export default getters

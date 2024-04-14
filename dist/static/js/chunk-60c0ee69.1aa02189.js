(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-60c0ee69"],{1322:function(t,e,r){"use strict";r.r(e);var o=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"app-container"},[r("el-form",{directives:[{name:"show",rawName:"v-show",value:t.showSearch,expression:"showSearch"}],ref:"queryForm",attrs:{model:t.queryParams,size:"small",inline:!0,"label-width":"68px"}},[r("el-form-item",{attrs:{label:"所属部门",prop:"deptId"}},[r("el-select",{attrs:{clearable:"",placeholder:"请选择所属部门"},model:{value:t.queryParams.deptId,callback:function(e){t.$set(t.queryParams,"deptId",e)},expression:"queryParams.deptId"}},t._l(t.deptList,(function(t){return r("el-option",{key:t.deptId,attrs:{label:t.deptName,value:t.deptId}})})),1)],1),r("el-form-item",{attrs:{label:"岗位名称",prop:"postName"}},[r("el-input",{attrs:{placeholder:"请输入岗位名称",clearable:""},nativeOn:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.handleQuery(e)}},model:{value:t.queryParams.postName,callback:function(e){t.$set(t.queryParams,"postName",e)},expression:"queryParams.postName"}})],1),r("el-form-item",{attrs:{label:"岗位类别",prop:"postType"}},[r("el-select",{attrs:{placeholder:"岗位类别",clearable:""},model:{value:t.queryParams.postType,callback:function(e){t.$set(t.queryParams,"postType",e)},expression:"queryParams.postType"}},t._l(t.dict.type.sys_post_type,(function(t){return r("el-option",{key:t.value,attrs:{label:t.label,value:t.value}})})),1)],1),r("el-form-item",{attrs:{label:"招聘类型",prop:"recruitType"}},[r("el-select",{attrs:{clearable:"",placeholder:"请选择招聘类型"},model:{value:t.queryParams.recruitType,callback:function(e){t.$set(t.queryParams,"recruitType",e)},expression:"queryParams.recruitType"}},t._l(t.dict.type.post_recruit_type,(function(t){return r("el-option",{key:t.value,attrs:{label:t.label,value:t.value}})})),1)],1),r("el-form-item",{attrs:{label:"招聘时间",prop:"recruitTime"}},[r("el-select",{attrs:{clearable:"",placeholder:"请选择招聘时间"},model:{value:t.queryParams.recruitTime,callback:function(e){t.$set(t.queryParams,"recruitTime",e)},expression:"queryParams.recruitTime"}},t._l(t.dict.type.post_recruit_time,(function(t){return r("el-option",{key:t.value,attrs:{label:t.label,value:t.value}})})),1)],1),r("el-form-item",[r("el-button",{attrs:{type:"primary",icon:"el-icon-search",size:"mini"},on:{click:t.handleQuery}},[t._v("搜索")]),r("el-button",{attrs:{icon:"el-icon-refresh",size:"mini"},on:{click:t.resetQuery}},[t._v("重置")])],1)],1),r("el-row",{staticClass:"mb8",attrs:{gutter:10}},[r("el-col",{attrs:{span:1.5}},[r("el-button",{attrs:{type:"primary",plain:"",icon:"el-icon-plus",size:"mini"},on:{click:t.handleAdd}},[t._v("新增 ")])],1),r("el-col",{attrs:{span:1.5}},[r("el-button",{attrs:{type:"warning",plain:"",icon:"el-icon-download",size:"mini"},on:{click:t.handleExport}},[t._v("导出 ")])],1),r("right-toolbar",{attrs:{showSearch:t.showSearch},on:{"update:showSearch":function(e){t.showSearch=e},"update:show-search":function(e){t.showSearch=e},queryTable:t.getList}})],1),r("el-table",{staticStyle:{width:"100%"},attrs:{data:t.demandList}},[r("el-table-column",{attrs:{type:"expand"},scopedSlots:t._u([{key:"default",fn:function(e){return[r("el-form",{staticClass:"demo-table-expand",attrs:{"label-position":"left",inline:""}},[r("el-form-item",{attrs:{label:"岗位名称"}},[r("span",[t._v(t._s(e.row.postName))])]),r("el-form-item",{attrs:{label:"招聘人数"}},[r("span",[t._v(t._s(e.row.postHc))])]),r("el-form-item",{attrs:{label:"岗位描述"}},[r("span",[t._v(t._s(e.row.postDesc))])]),r("el-divider",{attrs:{direction:"vertical"}}),r("el-form-item",{attrs:{label:"岗位要求"}},[r("span",[t._v(t._s(e.row.postDuty))])])],1)]}}])}),r("el-table-column",{attrs:{label:"所属部门",prop:"deptName"}}),r("el-table-column",{attrs:{label:"岗位名称",prop:"postName"}}),r("el-table-column",{attrs:{label:"岗位类别",prop:"postType"},scopedSlots:t._u([{key:"default",fn:function(e){return[r("dict-tag",{attrs:{options:t.dict.type.sys_post_type,value:e.row.postType}})]}}])}),r("el-table-column",{attrs:{label:"招聘类别",prop:"recruitType"},scopedSlots:t._u([{key:"default",fn:function(e){return[r("dict-tag",{attrs:{options:t.dict.type.post_recruit_type,value:e.row.recruitType}})]}}])}),r("el-table-column",{attrs:{label:"招聘时间",prop:"recruitTime"},scopedSlots:t._u([{key:"default",fn:function(e){return[r("dict-tag",{attrs:{options:t.dict.type.post_recruit_time,value:e.row.recruitTime}})]}}])}),r("el-table-column",{attrs:{label:"招聘人数",prop:"postHc"}}),r("el-table-column",{attrs:{label:"求职人数",prop:"vitaeCount"}}),r("el-table-column",{attrs:{label:"状态",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[r("el-switch",{attrs:{"active-value":"0","inactive-value":"1"},on:{change:function(r){return t.handleStatusChange(e.row)}},model:{value:e.row.recruitStatus,callback:function(r){t.$set(e.row,"recruitStatus",r)},expression:"scope.row.recruitStatus"}})]}}])}),r("el-table-column",{attrs:{label:"操作",align:"center","class-name":"small-padding fixed-width"},scopedSlots:t._u([{key:"default",fn:function(e){return[r("el-button",{attrs:{size:"mini",type:"text",icon:"el-icon-edit"},on:{click:function(r){return t.handleUpdate(e.row)}}},[t._v("修改 ")]),r("el-button",{attrs:{size:"mini",type:"text",icon:"el-icon-view"},on:{click:function(r){return t.handleVitae(e.row)}}},[t._v("详情 ")])]}}])})],1),r("pagination",{directives:[{name:"show",rawName:"v-show",value:t.total>0,expression:"total>0"}],attrs:{total:t.total,page:t.queryParams.pageNum,limit:t.queryParams.pageSize},on:{"update:page":function(e){return t.$set(t.queryParams,"pageNum",e)},"update:limit":function(e){return t.$set(t.queryParams,"pageSize",e)},pagination:t.getList}}),r("el-dialog",{attrs:{title:t.title,visible:t.open,width:"500px","append-to-body":""},on:{"update:visible":function(e){t.open=e}}},[r("el-form",{ref:"form",attrs:{model:t.form,rules:t.rules,"label-width":"80px"}},[r("el-form-item",{attrs:{label:"岗位名称",prop:"postName"}},[r("el-input",{attrs:{disabled:!0,placeholder:"请输入岗位名称"},model:{value:t.form.postName,callback:function(e){t.$set(t.form,"postName",e)},expression:"form.postName"}})],1),r("el-form-item",{attrs:{label:"岗位类别",prop:"postType"}},[r("el-radio-group",{attrs:{disabled:!0},model:{value:t.form.postType,callback:function(e){t.$set(t.form,"postType",e)},expression:"form.postType"}},t._l(t.dict.type.sys_post_type,(function(e){return r("el-radio",{key:e.value,attrs:{label:e.value}},[t._v(t._s(e.label)+" ")])})),1)],1),r("el-form-item",{attrs:{label:"需求人数",prop:"postHc"}},[r("el-input",{attrs:{placeholder:"请输入需求人数",type:"number",min:"1"},model:{value:t.form.postHc,callback:function(e){t.$set(t.form,"postHc",e)},expression:"form.postHc"}})],1),r("el-form-item",{attrs:{label:"岗位描述",prop:"postDesc"}},[r("el-input",{attrs:{placeholder:"请输入岗位描述",type:"textarea"},model:{value:t.form.postDesc,callback:function(e){t.$set(t.form,"postDesc",e)},expression:"form.postDesc"}})],1),r("el-form-item",{attrs:{label:"岗位要求",prop:"postDuty"}},[r("el-input",{attrs:{placeholder:"请输入岗位要求",type:"textarea"},model:{value:t.form.postDuty,callback:function(e){t.$set(t.form,"postDuty",e)},expression:"form.postDuty"}})],1)],1),r("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[r("el-button",{attrs:{type:"primary"},on:{click:t.submitForm}},[t._v("确 定")]),r("el-button",{on:{click:t.cancel}},[t._v("取 消")])],1)],1),r("el-dialog",{attrs:{title:t.title,visible:t.open2,width:"500px","append-to-body":""},on:{"update:visible":function(e){t.open2=e}}},[r("el-form",{ref:"form",attrs:{model:t.form,rules:t.rules,"label-width":"80px"}},[r("el-form-item",{attrs:{label:"审批人",prop:"endUser"}},[r("el-select",{attrs:{placeholder:"请选择审批人"},model:{value:t.form.endUser,callback:function(e){t.$set(t.form,"endUser",e)},expression:"form.endUser"}},t._l(t.userList,(function(t){return r("el-option",{key:t.userId,attrs:{label:t.userName,value:t.userId}})})),1)],1),r("el-form-item",{attrs:{label:"岗位名称",prop:"postId"}},[r("el-select",{attrs:{placeholder:"请选择岗位名称",filterable:""},model:{value:t.form.postId,callback:function(e){t.$set(t.form,"postId",e)},expression:"form.postId"}},t._l(t.noHcPostList,(function(t){return r("el-option",{key:t.postId,attrs:{label:t.postName,value:t.postId}})})),1)],1),r("el-form-item",{attrs:{label:"招聘类型",prop:"recruitType"}},[r("el-select",{attrs:{clearable:"",placeholder:"请选择招聘类型"},model:{value:t.form.recruitType,callback:function(e){t.$set(t.form,"recruitType",e)},expression:"form.recruitType"}},t._l(t.dict.type.post_recruit_type,(function(t){return r("el-option",{key:t.value,attrs:{label:t.label,value:t.value}})})),1)],1),"1"===t.form.recruitType?r("el-form-item",{attrs:{label:"招聘时间",prop:"recruitTime"}},[r("el-select",{attrs:{clearable:"",placeholder:"请选择招聘时间"},model:{value:t.form.recruitTime,callback:function(e){t.$set(t.form,"recruitTime",e)},expression:"form.recruitTime"}},t._l(t.dict.type.post_recruit_time,(function(t){return r("el-option",{key:t.value,attrs:{label:t.label,value:t.value}})})),1)],1):t._e(),r("el-form-item",{attrs:{label:"需求人数",prop:"postHc"}},[r("el-input",{attrs:{placeholder:"请输入需求人数",type:"number",min:"1"},model:{value:t.form.postHc,callback:function(e){t.$set(t.form,"postHc",e)},expression:"form.postHc"}})],1),r("el-form-item",{attrs:{label:"岗位描述",prop:"postDesc"}},[r("el-input",{attrs:{placeholder:"请输入岗位描述",type:"textarea"},model:{value:t.form.postDesc,callback:function(e){t.$set(t.form,"postDesc",e)},expression:"form.postDesc"}})],1),r("el-form-item",{attrs:{label:"岗位要求",prop:"postDuty"}},[r("el-input",{attrs:{placeholder:"请输入岗位要求",type:"textarea"},model:{value:t.form.postDuty,callback:function(e){t.$set(t.form,"postDuty",e)},expression:"form.postDuty"}})],1)],1),r("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[r("el-button",{attrs:{type:"primary"},on:{click:t.submitForm2}},[t._v("确 定")]),r("el-button",{on:{click:t.cancel}},[t._v("取 消")])],1)],1),r("el-drawer",{attrs:{title:t.drawerTitle,visible:t.open3,direction:"rtl",size:"50%"},on:{"update:visible":function(e){t.open3=e}}},[r("el-table",{attrs:{data:t.vitaeList}},[r("el-table-column",{attrs:{label:"手机号",prop:"personPhone"}}),r("el-table-column",{attrs:{sortable:"",label:"年龄",prop:"age"}}),r("el-table-column",{attrs:{sortable:"",label:"一面评价",prop:"score1"}}),r("el-table-column",{attrs:{sortable:"",label:"二面评价",prop:"score2"}}),r("el-table-column",{attrs:{label:"流转类型",align:"center",prop:"flowType"},scopedSlots:t._u([{key:"default",fn:function(e){return[r("dict-tag",{attrs:{options:t.dict.type.flow_recruit_status,value:e.row.flowType}})]}}])})],1)],1)],1)},a=[],n=r("5530"),s=r("81e1"),l=r("a2ca"),i=r("8268"),u=r("fcb7"),c={dicts:["sys_normal_disable","sys_post_type","flow_recruit_status","post_recruit_type","post_recruit_time","sys_normal_disable"],data:function(){return{loading:!0,showSearch:!0,total:0,demandList:[],noHcPostList:[],userList:[],vitaeList:[],drawerTitle:null,title:"",open:!1,open2:!1,open3:!1,queryParams:{pageNum:1,pageSize:10,postName:void 0,postType:void 0,deptId:void 0,status:void 0,recruitType:void 0,recruitTime:void 0},form:{},rules:{endUser:[{required:!0,message:"待办人不能为空",trigger:"blur"}],postId:[{required:!0,message:"需求名称不能为空",trigger:"blur"}],postHc:[{required:!0,message:"需求人数不能为空",trigger:"blur"}],postDesc:[{required:!0,message:"需求描述不能为空",trigger:"blur"}],postDuty:[{required:!0,message:"需求要求不能为空",trigger:"blur"}],recruitType:[{required:!0,message:"招聘类型不能为空",trigger:"blur"}],recruitTime:[{required:!0,message:"招聘时间不能为空",trigger:"blur"}]},deptList:[]}},created:function(){var t=this;this.getList(),Object(u["f"])().then((function(e){t.deptList=e.data}))},methods:{getNoHcPostList:function(){var t=this;Object(s["d"])().then((function(e){t.noHcPostList=e.data}))},getUserList:function(){var t=this;Object(s["f"])().then((function(e){t.userList=e.data}))},getList:function(){var t=this;this.loading=!0,Object(s["c"])(this.queryParams).then((function(e){t.demandList=e.rows,t.total=e.total,t.loading=!1}))},cancel:function(){this.open=!1,this.open2=!1,this.open3=!1,this.reset()},reset:function(){this.form={endUser:void 0,postId:void 0,postName:void 0,postType:"1",postHc:1,postDesc:void 0,postDuty:void 0,status:"0",recruitType:void 0},this.resetForm("form")},handleQuery:function(){this.queryParams.pageNum=1,this.getList()},resetQuery:function(){this.resetForm("queryForm"),this.handleQuery()},handleAdd:function(){this.reset(),this.getNoHcPostList(),this.getUserList(),this.open2=!0,this.title="添加需求"},handleUpdate:function(t){var e=this;this.reset();var r=t.postId||this.ids;Object(s["b"])(r).then((function(t){e.form=t.data,e.open=!0,e.title="修改需求"}))},handleVitae:function(t){var e=this;Object(i["d"])(t.postId).then((function(r){e.vitaeList=r.data,e.drawerTitle=t.postName,e.open3=!0}))},submitForm:function(){var t=this;this.$refs["form"].validate((function(e){e&&void 0!=t.form.postId&&Object(s["g"])(t.form).then((function(e){t.$modal.msgSuccess("修改成功"),t.open=!1,t.getList()}))}))},handleExport:function(){this.download("system/post/export",Object(n["a"])({},this.queryParams),"post_".concat((new Date).getTime(),".xlsx"))},submitForm2:function(){var t=this;this.$refs["form"].validate((function(e){e&&void 0!=t.form.postId&&Object(l["b"])(t.form).then((function(e){t.$modal.msgSuccess("申请成功，等待审批通过"),t.open2=!1,t.getList()}))}))},handleStatusChange:function(t){var e=this,r="0"===t.recruitStatus?"释放":"关闭";this.$modal.confirm('确认要"'+r+'""'+t.postName+'"岗位吗？').then((function(){return Object(s["a"])(t.postId,t.recruitStatus)})).then((function(){e.$modal.msgSuccess(r+"成功")})).catch((function(){}))}}},p=c,d=(r("199c"),r("2877")),m=Object(d["a"])(p,o,a,!1,null,null,null);e["default"]=m.exports},"199c":function(t,e,r){"use strict";r("42df")},"42df":function(t,e,r){},"81e1":function(t,e,r){"use strict";r.d(e,"e",(function(){return a})),r.d(e,"a",(function(){return n})),r.d(e,"c",(function(){return s})),r.d(e,"d",(function(){return l})),r.d(e,"f",(function(){return i})),r.d(e,"b",(function(){return u})),r.d(e,"g",(function(){return c}));var o=r("b775");function a(t){return Object(o["a"])({url:"/recruit/demand/listSeekerDemand",method:"get",params:t})}function n(t,e){var r={postId:t,recruitStatus:e};return Object(o["a"])({url:"/recruit/demand/changeStatus",method:"post",data:r})}function s(t){return Object(o["a"])({url:"/recruit/demand/list",method:"get",params:t})}function l(){return Object(o["a"])({url:"/recruit/demand/getNoHcPostList",method:"get"})}function i(){return Object(o["a"])({url:"/recruit/demand/getListUser",method:"get"})}function u(t){return Object(o["a"])({url:"/recruit/demand/"+t,method:"get"})}function c(t){return Object(o["a"])({url:"/recruit/demand/update",method:"post",data:t})}},8268:function(t,e,r){"use strict";r.d(e,"f",(function(){return a})),r.d(e,"c",(function(){return n})),r.d(e,"e",(function(){return s})),r.d(e,"d",(function(){return l})),r.d(e,"b",(function(){return i})),r.d(e,"a",(function(){return u}));r("99af");var o=r("b775");function a(t,e){return Object(o["a"])({url:"/recruit/vitae/sendVitaeToPost/".concat(t,"/").concat(e),method:"post"})}function n(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"-1";return Object(o["a"])({url:"/recruit/vitae/getVitaeByPhone/".concat(t),method:"get"})}function s(t){return Object(o["a"])({url:"/recruit/vitae/list",method:"get",params:t})}function l(t){return Object(o["a"])({url:"/recruit/vitae/getVitaeListByPostId/".concat(t),method:"get"})}function i(t){return Object(o["a"])({url:"/recruit/vitae/getRecruitUserList/".concat(t),method:"get"})}function u(t){return Object(o["a"])({url:"/recruit/vitae/addVitae",method:"post",data:t})}},a2ca:function(t,e,r){"use strict";r.d(e,"f",(function(){return a})),r.d(e,"e",(function(){return n})),r.d(e,"a",(function(){return s})),r.d(e,"d",(function(){return l})),r.d(e,"b",(function(){return i})),r.d(e,"h",(function(){return u})),r.d(e,"g",(function(){return c}));var o=r("b775");function a(t){return Object(o["a"])({url:"/flow/demand/selfDemand",method:"get",params:t})}function n(t){return Object(o["a"])({url:"/flow/demand/list",method:"get",params:t})}function s(t){return Object(o["a"])({url:"/flow/demand/access/"+t,method:"post"})}function l(t){return Object(o["a"])({url:"/flow/demand/deny/"+t,method:"post"})}function i(t){return Object(o["a"])({url:"/flow/demand/addDemand",method:"post",data:t})}function u(t){return Object(o["a"])({url:"/flow/demand/repeatDemand/"+t,method:"post"})}function c(t){return Object(o["a"])({url:"/flow/demand/recallDemand/"+t,method:"post"})}},fcb7:function(t,e,r){"use strict";r.d(e,"f",(function(){return a})),r.d(e,"d",(function(){return n})),r.d(e,"e",(function(){return s})),r.d(e,"c",(function(){return l})),r.d(e,"a",(function(){return i})),r.d(e,"g",(function(){return u})),r.d(e,"b",(function(){return c}));var o=r("b775");function a(t){return Object(o["a"])({url:"/system/dept/listSub",method:"get",params:t})}function n(t){return Object(o["a"])({url:"/system/dept/list",method:"get",params:t})}function s(t){return Object(o["a"])({url:"/system/dept/list/exclude/"+t,method:"get"})}function l(t){return Object(o["a"])({url:"/system/dept/"+t,method:"get"})}function i(t){return Object(o["a"])({url:"/system/dept",method:"post",data:t})}function u(t){return Object(o["a"])({url:"/system/dept",method:"put",data:t})}function c(t){return Object(o["a"])({url:"/system/dept/"+t,method:"delete"})}}}]);
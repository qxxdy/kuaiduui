(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-190c8636"],{"37ea":function(t,e,r){"use strict";r.r(e);var n=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"app-container"},t._l(t.historys,(function(e){return r("el-card",{staticClass:"box-card"},[r("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[r("span",[r("h3",[t._v(t._s(e.postName))]),t._v(" 岗位类型："),r("dict-tag",{staticStyle:{display:"inline"},attrs:{options:t.dict.type.sys_post_type,value:e.intentionWilljob}}),r("el-divider",{attrs:{direction:"vertical"}}),t._v(" 投递时间："+t._s(e.sendTime)+" ")],1)]),r("el-steps",{attrs:{simple:"",active:t.step,"finish-status":"success"}},[r("el-step",{attrs:{title:"投递简历"}}),r("el-step",{attrs:{title:"HR初筛",status:t.screenStatus}}),r("el-step",{attrs:{title:"面试",status:t.recruitStatus}}),r("el-step",{attrs:{title:"预入职"}})],1)],1)})),1)},u=[],s=r("c0c77"),i=r("8268"),c=r("8fc7"),a={dicts:["sys_post_type"],created:function(){var t,e=this,r={personPhone:void 0};Object(s["g"])().then((function(n){t=n.data.phonenumber,t?(r.personPhone=t,Object(i["e"])(r).then((function(t){e.historys=t.rows,e.setStepAndStatus(t.rows[0])}))):e.$message.error(c["a"])}))},data:function(){return{step:void 0,screenStatus:void 0,recruitStatus:void 0,historys:{}}},methods:{setStepAndStatus:function(t){var e=t.flowType,r=t.initTime,n=t.screenTime,u=t.accTime;if(n)return e!==c["c"]||r?n&&e!==c["c"]&&!u?(this.step=2,void(this.screenStatus=c["d"])):e===c["c"]&&r?(this.step=3,this.recruitStatus=c["b"],void(this.screenStatus=c["d"])):void(this.step=4):(this.step=2,void(this.screenStatus=c["b"]));this.step=1}}},o=a,d=r("2877"),f=Object(d["a"])(o,n,u,!1,null,null,null);e["default"]=f.exports},8268:function(t,e,r){"use strict";r.d(e,"f",(function(){return u})),r.d(e,"c",(function(){return s})),r.d(e,"e",(function(){return i})),r.d(e,"d",(function(){return c})),r.d(e,"b",(function(){return a})),r.d(e,"a",(function(){return o}));r("99af");var n=r("b775");function u(t,e){return Object(n["a"])({url:"/recruit/vitae/sendVitaeToPost/".concat(t,"/").concat(e),method:"post"})}function s(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"-1";return Object(n["a"])({url:"/recruit/vitae/getVitaeByPhone/".concat(t),method:"get"})}function i(t){return Object(n["a"])({url:"/recruit/vitae/list",method:"get",params:t})}function c(t){return Object(n["a"])({url:"/recruit/vitae/getVitaeListByPostId/".concat(t),method:"get"})}function a(t){return Object(n["a"])({url:"/recruit/vitae/getRecruitUserList/".concat(t),method:"get"})}function o(t){return Object(n["a"])({url:"/recruit/vitae/addVitae",method:"post",data:t})}},"8fc7":function(t,e,r){"use strict";r.d(e,"c",(function(){return n})),r.d(e,"d",(function(){return u})),r.d(e,"b",(function(){return s})),r.d(e,"a",(function(){return i}));var n="5",u="success",s="error",i="请先维护个人信息"},c0c77:function(t,e,r){"use strict";r.d(e,"h",(function(){return s})),r.d(e,"f",(function(){return i})),r.d(e,"a",(function(){return c})),r.d(e,"k",(function(){return a})),r.d(e,"c",(function(){return o})),r.d(e,"i",(function(){return d})),r.d(e,"b",(function(){return f})),r.d(e,"g",(function(){return l})),r.d(e,"l",(function(){return p})),r.d(e,"m",(function(){return h})),r.d(e,"n",(function(){return m})),r.d(e,"e",(function(){return b})),r.d(e,"j",(function(){return v})),r.d(e,"d",(function(){return y}));var n=r("b775"),u=r("c38a");function s(t){return Object(n["a"])({url:"/system/user/list",method:"get",params:t})}function i(t){return Object(n["a"])({url:"/system/user/"+Object(u["e"])(t),method:"get"})}function c(t){return Object(n["a"])({url:"/system/user",method:"post",data:t})}function a(t){return Object(n["a"])({url:"/system/user",method:"put",data:t})}function o(t){return Object(n["a"])({url:"/system/user/"+t,method:"delete"})}function d(t,e){var r={userId:t,password:e};return Object(n["a"])({url:"/system/user/resetPwd",method:"put",data:r})}function f(t,e){var r={userId:t,status:e};return Object(n["a"])({url:"/system/user/changeStatus",method:"put",data:r})}function l(){return Object(n["a"])({url:"/system/user/profile",method:"get"})}function p(t){return Object(n["a"])({url:"/system/user/profile",method:"put",data:t})}function h(t,e){var r={oldPassword:t,newPassword:e};return Object(n["a"])({url:"/system/user/profile/updatePwd",method:"put",params:r})}function m(t){return Object(n["a"])({url:"/system/user/profile/avatar",method:"post",data:t})}function b(t){return Object(n["a"])({url:"/system/user/authRole/"+t,method:"get"})}function v(t){return Object(n["a"])({url:"/system/user/authRole",method:"put",params:t})}function y(){return Object(n["a"])({url:"/system/user/deptTree",method:"get"})}}}]);
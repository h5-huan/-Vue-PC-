import axios from 'axios';
import { loginreq, req ,objKeySort} from './axiosFun';

// 登录接口 
export const login = (params) => { return loginreq("post", 'login', params)};
//退出登录
export const logout = (params) => { return req("post", 'logout', params)};
//获取用户信息接口
export const userinfo = (data) => { return req("get", 'info', data)};

//轮播图--轮播图列表
export const banner = (params) => { return req("get", 'banner', params)};
//轮播图--修改轮播图
export const editbanner = (id, params) => { return req("put", 'banner/'+id, params)};
//轮播图--添加轮播图
export const addbanner = (params) => { return req("post", 'banner', params)};
//轮播图--删除轮播图
export const delbanner = (id, params) => { return req("delete", 'banner/'+id, params)};

//教师管理--教师列表
export const teacher = (page,params) => { return req("get", 'teacher?page='+page, params)};
//教师管理--教师下拉列表
export const teacherselect = (params) => { return req("get", 'teacher/teacher_select', params)};
//教师管理--修改教师
export const editteacher = (id, params) => { return req("put", 'teacher/'+id, params)};
//教师管理--添加教师
export const addteacher = (params) => { return req("post", 'teacher', params)};
//教师管理--删除教师
export const delteacher = (id, params) => { return req("delete", 'teacher/'+id, params)};

//课程管理--课程列表
export const lesson = (page,params) => { return req("get", 'lesson?page='+page, params)};
//课程管理--修改课程
export const editlesson = (id, params) => { return req("put", 'lesson/'+id, params)};
//课程管理--添加课程
export const addlesson = (params) => { return req("post", 'lesson', params)};
//课程管理--删除课程
export const dellesson = (id, params) => { return req("delete", 'lesson/'+id, params)};


//用户管理--用户列表
export const user = (page,params) => { return req("get", 'user?page='+page, params)};
//用户管理--所有课程列表
export const getlessonall = (params) => { return req("get", 'lesson/list_all', params)};
//用户管理--绑定用户课程
export const binduserlesson = (params) => { return req("post", 'lesson/user_lesson', params)};
//用户管理--获取用户课程
export const getuserlesson = (user_id,params) => { return req("get", 'lesson/user/'+user_id, params)};
//用户管理--反馈列表
export const feedback = (page,params) => { return req("get", 'feedback?page='+page, params)};
//用户管理--搜索关键词列表
export const search = (page,params) => { return req("get", 'search?page='+page, params)};





//课程节数管理--课程节数列表
export const lesson_list = (page,params) => { return req("get", 'lesson_list?page='+page, params)};
//课程节数管理--修改课程节数
export const editlesson_list = (id, params) => { return req("put", 'lesson_list/'+id, params)};
//课程节数管理--添加课程节数
export const addlesson_list = (params) => { return req("post", 'lesson_list', params)};
//课程节数管理--删除课程节数
export const dellesson_list = (id, params) => { return req("delete", 'lesson_list/'+id, params)};
//课程节数管理--课程下拉列表
export const lessonselect = (params) => { return req("get", 'lesson/lesson_select', params)};


//后台管理--管理列表
export const admin = (page,params) => { return req("get", 'admin?page='+page, params)};
//后台管理--修改管理
export const editadmin = (id, params) => { return req("put", 'admin/'+id, params)};
//后台管理--添加管理
export const addadmin = (params) => { return req("post", 'admin', params)};
//后台管理--删除管理
export const deladmin = (id, params) => { return req("delete", 'admin/'+id, params)};

//统计接口

export const statistics = (year,month,params) => { return req("get", 'statistics/index?year='+year+'&month='+month, params)};




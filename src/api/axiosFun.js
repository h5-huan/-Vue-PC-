import axios from 'axios';
import { baseUrl,loginUrl } from '../utils/global';
import md5 from 'js-md5'
import $ from 'jquery';
import {setStore,getStore} from '../utils/utils';
/**
 * 登录方法
 * @param1 method  String       接口协议
 * @param2 api 	   String       接口
 * @param3 params  Object       参数对象
 */
const loginreq = (method, api, params) => {
	// let url = loginUrl + api +'?from=1&time='+parseInt((new Date()).getTime()/1000)+'&acc='+ params.acc +'&pw='+ params.pw +'&sign=*';
	let url = loginUrl + api;
	console.log(url);
    return axios({
        method: method,
        url: url,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        data: params,
        traditional: true,
        transformRequest: [
            function(data) {
                let ret = ''
                for (let it in data) {
                    ret += encodeURIComponent(it) +'=' + encodeURIComponent(data[it]) + '&'
                }
                return ret
            }
        ]
    }).then(function(res){
		console.log('接口111');
		if(res.headers.authorization){
			setStore("logintoken", res.headers.authorization);
		}
		return res.data;
	});
};
/**
 * 公共登录方法
 * @param1 method  String       接口协议
 * @param2 api 	   String       接口
 * @param3 params  Object       参数对象
 */
const req = (method, api, params) => {
	let url = baseUrl + api;
    return axios({
        method: method,
        url: url,
        headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
			Authorization:localStorage.getItem('logintoken')
            // token: localStorage.getItem('logintoken')
        },
        data: params,
        traditional: true,
        transformRequest: [
            function(data) {
                let ret = ''
                for (let it in data) {
                    ret +=
                        encodeURIComponent(it) +
                        '=' +
                        encodeURIComponent(data[it]) +
                        '&'
                }
                return ret
            }
        ]
	}).then(function(res){
		console.log('接口222');
		console.log(res);
		if(res.headers.authorization){
			setStore("logintoken", res.headers.authorization);
		}
		return res.data;
	})
};

/**
 * 生成url通用方法
 * @param1 api  String       接口协议
 * @param2 arys  Object       参数对象
 * @param3 token String       Token 方法统一调取
 */
const objKeySort = (method,api,arys,postData) => {
	let token = getStore('logintoken');
	let head = baseUrl + api;
	let userData = JSON.parse(getStore('userData'))
	//必须参数
	let must ={
	    'from':1,
	    'uid':userData.uid,
	    'time': parseInt((new Date()).getTime()/1000),
	    'type':userData.type,
	};
	let arysAll =$.extend(must,arys);
	
	let string =String();
	let params =String();
	let url =String();
	let newkey = Object.keys(arysAll).sort();
	let newObj = {};
	for(var i = 0; i < newkey.length; i++) {
	    //遍历newkey数组
	    if(typeof (arysAll[newkey[i]]) == "object"){
	    	arysAll[newkey[i]] = JSON.stringify(arysAll[newkey[i]]).replace(/&/g,'');
	    }else if(typeof (arysAll[newkey[i]]) == "string"){
	    	arysAll[newkey[i]] = arysAll[newkey[i]].replace(/&/g,'');
	    }
	    string += arysAll[newkey[i]];
	    params  +=(newkey[i] + '=' +arysAll[newkey[i]] +'&') ;
		
	}
	console.log(token)
	console.log(string)
	var sign = string + token;
	sign = 'sign=' + md5(sign);
	url = head + params + sign;   //url = 主机名 + 接口协议(与服务器一起来定) + 加密签名（sign） + 所有参数
	console.log(url)
	return axios({
	    method: method,
	    url: url,
	    headers: {
	        'Content-Type': 'application/x-www-form-urlencoded',
	    },
	    data: postData,
	    traditional: true,
	    transformRequest: [
	        function(data) {
	            let ret = ''
	            for (let it in data) {
	                ret += encodeURIComponent(it) +'=' + encodeURIComponent(data[it]) + '&'
	            }
	            return ret
	        }
	    ]
	}).then(res => res.data)
};


//导出
export {
    loginreq,
    req,
	objKeySort
}
/**
 * 时间戳
 * @param {*} timestamp  时间戳
 */
const timestampToTime = (timestamp) => {//精确到秒
    let date = new Date(timestamp) //时间戳为10位需*1000，时间戳为13位的话不需乘1000
    let Y = date.getFullYear() + '-'
    let M =(date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) :date.getMonth() + 1) + '-'
    let D =(date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' '
    let h =(date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':'
    let m =(date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':'
    let s =date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
    return Y + M + D + h + m + s
};
const timestampToTimes = (timestamp) => {//精确到日期
    let date = new Date(timestamp) //时间戳为10位需*1000，时间戳为13位的话不需乘1000
    let Y = date.getFullYear() + '-'
    let M =(date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) :date.getMonth() + 1) + '-'
    let D =(date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' '
    return Y + M + D
};
 //获取七天之前的时间和当天的时间戳 
const getBeforeDate = (n) => {//n为你要传入的参数，当前为0，前一天为-1，后一天为1
    var date = new Date() ;
    var year,month,day ;
    date.setDate(date.getDate()+n);
    year = date.getFullYear();
    month = date.getMonth()+1;
    day = date.getDate() ;
    var s = year + '-' + ( month < 10 ? ( '0' + month ) : month ) + '-' + ( day < 10 ? ( '0' + day ) : day) ;
    return s ;
}
/**
 * 存储localStorage
 */
const setStore = (name, content) => {
    if (!name) return;
    if (typeof content !== 'string') {
        content = JSON.stringify(content);
    }
    window.localStorage.setItem(name, content);
}

/**
 * 获取localStorage
 */
const getStore = name => {
    if (!name) return;
    return window.localStorage.getItem(name);
}

/**
 * 删除localStorage
 */
const removeStore = name => {
    if (!name) return;
    window.localStorage.removeItem(name);
}

/**
 * 设置cookie
 **/
function setCookie(name, value, day) {
    let date = new Date();
    date.setDate(date.getDate() + day);
    document.cookie = name + '=' + value + ';expires=' + date;
};

/**
 * 获取cookie
 **/
function getCookie(name) {
    let reg = RegExp(name + '=([^;]+)');
    let arr = document.cookie.match(reg);
    if (arr) {
        return arr[1];
    } else {
        return '';
    }
};

/**
 * 删除cookie
 **/
function delCookie(name) {
    setCookie(name, null, -1);
};

/**
 * 导出 
 **/
export {
    timestampToTime,
	timestampToTimes,
	getBeforeDate,
    setStore,
    getStore,
    removeStore,
    setCookie,
    getCookie,
    delCookie
}
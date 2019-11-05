<template>
  <div class="home-main">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ name: 'Echart' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>统计图</el-breadcrumb-item>
    </el-breadcrumb>
    <div id="app">
      <div class="block">
        <span class="demonstration">请选择要看的月份</span>
        <el-date-picker
          v-model="monthdata"
          @change="changemonth(monthdata)"
          type="month"
          placeholder="选择月"
        ></el-date-picker>
      </div>
      <div class="allperson">用户总量：{{allperson}}</div>
      <div id="main" style="width:100%;height:400px;"></div>
      <div class="allperson">课程总量：{{alllesson}}</div>
      <div id="addcourse" style="width:100%;height:400px;"></div>
      <div class="allperson">订单总量：{{allorder}}</div>
      <div id="addorder" style="width:100%;height:400px;"></div>
    </div>
  </div>
</template>

<script>
import { statistics } from "../../api/user";
import { loginUrl } from "../../utils/global";
import { timestampToTime } from "../../utils/utils";
export default {
  name: "app",
  data() {
    return {
      yeartime: "",
      monthtime: "",
      host: loginUrl,
      monthdata: "",
      allperson: "",
      alllesson: "",
      allorder: ""
    };
  },
  created() {},
  methods: {
    changemonth(e) {
      var time = timestampToTime(e);
      var year = time.substring(0, 4);
      var month = time.substring(5, 7);
      var monthtype = month.substring(0, 1);
      var newmonth = month.substring(1, 2);
      console.log(month);
      console.log(newmonth);
      this.yeartime = year;
      if (monthtype == 0) {
        this.monthtime = newmonth;
      } else {
        this.monthtime = month;
      }
      this.personChart();
    },
    personChart() {
      // var year = 2019;
      // var month = 6;
      // this.yeartime=2019;
      // this.monthtime=8;
      statistics(this.yeartime, this.monthtime).then(res => {
        console.log("统计列表为");
        this.allperson = res.user_total;
        this.alllesson = res.lesson_total;
        this.allorder = res.order_total;
        var userdata = res.user;
        var lessondata = res.lesson;
        var orderdata = res.order;
        var timedata = [];
        var timevalue = [];
        var coursedata = [];
        var coursevalue = [];
        var listdata = [];
        var listvalue = [];
        for (var key in userdata) {
          var shijian = this.monthtime + "月" + key + "日";
          timedata.push(shijian);
          timevalue.push(userdata[key]);
        }
        for (var key in lessondata) {
          var shijian = this.monthtime + "月" + key + "日";
          coursedata.push(shijian);
          coursevalue.push(lessondata[key]);
        }
        for (var key in orderdata) {
          var shijian = this.monthtime + "月" + key + "日";
          listdata.push(shijian);
          listvalue.push(orderdata[key]);
        }
        // 每日新增用户量
        let myChart = this.$echarts.init(document.getElementById("main"));
        // 每日新增课程数
        let courseChart = this.$echarts.init(
          document.getElementById("addcourse")
        );
        // 每日新增订单数
        let orderChart = this.$echarts.init(
          document.getElementById("addorder")
        );
        // 新增用户量数据
        let option = {
          title: {
            text: "每日新增用户量"
          },
          tooltip: {},
          legend: {
            data: ["新增量"]
          },
          xAxis: {
            data: []
          },
          yAxis: {},
          series: [
            {
              name: "新增量",
              type: "bar",
              data: []
            }
          ]
        };
        // 新增课程数据
        let courseoption = {
          title: {
            text: "每日课程新增数"
          },
          tooltip: {},
          legend: {
            data: ["新增量"]
          },
          xAxis: {
            data: []
          },
          yAxis: {},
          series: [
            {
              name: "新增量",
              type: "bar",
              data: []
            }
          ]
        };
        // 新增订单数据
        let orderoption = {
          title: {
            text: "每日订单新增数"
          },
          tooltip: {},
          legend: {
            data: ["新增量"]
          },
          xAxis: {
            data: []
          },
          yAxis: {},
          series: [
            {
              name: "新增量",
              type: "bar",
              data: []
            }
          ]
        };
        option.xAxis.data = timedata;
        option.series[0].data = timevalue;
        courseoption.xAxis.data = coursedata;
        courseoption.series[0].data = coursevalue;
        orderoption.xAxis.data = listdata;
        orderoption.series[0].data = listvalue;
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
        courseChart.setOption(courseoption);
        orderChart.setOption(orderoption);
      });
    }
  },
  mounted() {
    //获取当前年月
    var that=this;
    var date = new Date();
    var time = timestampToTime(date);
    var year = time.substring(0, 4);
    var month = time.substring(5, 7);
    var monthtype = month.substring(0, 1);
    var newmonth = month.substring(1, 2);
    console.log(year);
    console.log(month);
    console.log(monthtype);
    console.log(newmonth);
    that.monthdata=year+"-"+month;
    that.yeartime = year;
    if (monthtype == 0) {
      that.monthtime = newmonth;
    } else {
      that.monthtime = month;
    }
    that.personChart();
    
  }
};
</script>

<style scoped>

.allperson {
  width: 100%;
  margin: 20px 0;
  color: #333;
  text-align: center;
  font-weight: bold;
  font-size: 20px;
}
#app {
  width: 100%;
  margin: 30px 0 0 0;
}
#main > div {
  width: 100% !important;
}
canvas {
  width: 100% !important;
}
#addcourse {
  margin: 20px 0;
}
.home-main {
  padding: 24px;
}
.el-row {
  margin: 20px 0;
}
.el-row .el-button {
  padding: 10px 15px;
}
.el-button--text {
  padding: 10px;
}
</style>
<style>
.el-input__icon {
  line-height: 33px;
}
</style>

let config = {
    "entity": null,
    "childs": [
        {
            "entity": {
                "id": 1, //id标识
                "title": "首页", //菜单标题
                "icon": "icon_home",//菜单logo
                "url": "/views/HomePage",//菜单路径
            },
        },
        {
            "entity": {
              "id": 2,
              "title": "信息总览",
              "icon": "icon_create",
              "url": "/views/RechargeS/VoucherCenter",
            },
						"childs": [{
						      "entity": {
						        "id": 2-1,
						        "title": "充值中心",
						        "url": "/views/RechargeS/VoucherCenter",
						      }
						    },
						    {
						      "entity": {
						        "id": 2-2,
						        "title": "消费总览",
						        "url": "/views/RechargeS/ConsumptionAll",
						      }
						    },
						    {
						      "entity": {
						        "id": 3-3,
						        "title": "发票管理",
						        "url": "/views/RechargeS/Invoice",
						      }
						    }]
        },
        {
          "entity": {
            "id": 3,
            "title": "考勤记录",
            "icon": "icon_myact",
            "url": "/views/WorkRecord",
          }
        },
        {
            "entity": {
              "id": 4,
              "title": "师生管理",
              "icon": "icon_analyze",
              "url": "/views/TSManagemen",
            }
        },
        {
            "entity": {
              "id": 5,
              "title": "班级管理",
              "icon": "icon_user",
              "url": "/views/ClassManagemen",
            }
        },
				{
				    "entity": {
				      "id": 6,
				      "title": "校区管理",
				      "icon": "icon_user",
				      "url": "/views/CampusManagemen",
				    }
				},
				{
				    "entity": {
				      "id": 7,
				      "title": "教材管理",
				      "icon": "icon_user",
				      "url": "/TextbookS/TextbookL",
				    },
						"childs": [{
						      "entity": {
						        "id": 7-1,
						        "title": "教材库",
						        "url": "/views/RechargeS/VoucherCenter",
						      }
						    },
						    {
						      "entity": {
						        "id": 7-2,
						        "title": "技巧库",
						        "url": "/views/RechargeS/VoucherCenter",
						      }
						    },
						    {
						      "entity": {
						        "id": 7-3,
						        "title": "谱例库",
						        "url": "",
						      }
						    },
								{
								  "entity": {
								    "id": 7-4,
								    "title": "歌曲库",
								    "url": "",
								  }
								}]
				},
    ]
}
export default config

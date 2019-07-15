$(function () {
	 
	 $.ajax({  
         type: 'POST',  
         url: "sys/generator/dblist",                      
         contentType: 'application/json; charset=utf-8',//将json数据以request payload的形式发起请求  
         data: '',  
         success: function (data) {        	
        $("#sel_database").append("<option value='-1' selected='selected'>&nbsp;请选择数据库</option>");
	  $.each(data, function (i, item) {      
      	$("#sel_database").append("<option value='" + item + "'>&nbsp;" + item + "</option>");
      });
	  $("#sel_database").on("change",function(e){
		　　  // e 的话就是一个对象 然后需要什么就 “e.参数” 形式 进行获取 
		var dbname= $("#sel_database").val();		
		$("#jqGrid").jqGrid('setGridParam',{ 
            postData:{'tableName': vm.q.tableName,'dbName':dbname},
            page:1 
        }).trigger("reloadGrid");　
		})
     } 
	 });  
    $("#jqGrid").jqGrid({
        url: 'sys/generator/list',
        datatype: "json",
        colModel: [			
			{ label: '表名', name: 'tableName', width: 100, key: true },
			{ label: 'Engine', name: 'engine', width: 70},
			{ label: '表备注', name: 'tableComment', width: 100 },
			{ label: '创建时间', name: 'createTime', width: 100 }
        ],
		viewrecords: true,
        height: 385,
        rowNum: 10,
		rowList : [10,30,50,100,200],
        rownumbers: true, 
        rownumWidth: 25, 
        autowidth:true,
        multiselect: true,
        pager: "#jqGridPager",
        jsonReader : {
            root: "page.list",
            page: "page.currPage",
            total: "page.totalPage",
            records: "page.totalCount"
        },
        prmNames : {
            page:"page", 
            rows:"limit", 
            order: "order"
        },
        postData:{
        	dbName:'bpaas_idm'
        },
        gridComplete:function(){
        	//隐藏grid底部滚动条
        	$("#jqGrid").closest(".ui-jqgrid-bdiv").css({ "overflow-x" : "hidden" }); 
        }
    });
});

var vm = new Vue({
	el:'#rrapp',
	data:{
		q:{
			tableName: null
		}
	},
	methods: {
		query: function () {
			var dbname= $("#sel_database").val();	
			$("#jqGrid").jqGrid('setGridParam',{ 
                postData:{'tableName': vm.q.tableName,'dbName':dbname},
                page:1 
            }).trigger("reloadGrid");
		},
		generator: function() {
			var tableNames = getSelectedRows();
			if(tableNames == null){
				return ;
			}
			
			var dbname= $("#sel_database").val();
			location.href = "sys/generator/code?tables=" + JSON.stringify(tableNames)+"&dbname="+dbname;
		}
	}
});


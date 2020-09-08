$(function() {
	var writerBox = $(".writerBox");
	var copyArea = $("#copyArea");
	//表情列表
	function listInit() {
		var list = ["热门表情", "表情系列", "人物相关", "花样庆祝", "植物自然", "水果食物", "动物系列", "运动休闲", "物体物件", "房车交通", "生肖星座", "文字系列", "各种标识"];
		var str = "";
		for (i in list) {
			str += '<li>' + list[i] + '</li>'
		}
		$(".tabTitle").append(str);
		$(".tabTitle li").eq(0).addClass("active");
	}
	listInit();
	showIcons(0)
	//显示表情
	$(".tabTitle li").click(function() {
		var ind = $(this).index();
		$(".tabTitle li").removeClass("active");
		$(this).addClass("active");
		 // writerBox.focus(); //解决ff不获取焦点无法定位问题
		 //        var range = window.getSelection();//创建range
		 //        range.selectAllChildren($(writerBox));//range 选择obj下所有子内容
		 //        range.collapseToEnd();//光标移至最后
		showIcons(ind)
	})

	function showIcons(ind) {
		var iconstr = '';
		var url = './json/icon' + ind + '.json';
		console.log(url)
		$.ajax({
			type: 'GET',
			url: url,
			dataType: "json",
			success: function(res) {
				console.log(res)
				if (res) {
					for (i in res) {
						iconstr += '<img src="' + res[i].url + '" data-src="' + res[i].emoji + '" class="icons" alt="' + res[i].emoji +
							'">';
					}
					$(".iconsDiv").empty().append(iconstr);
				}
			},
			error: function(res) {
				console.log(res)
			}
		});
	}

	//清空编辑内容
	$(".btnEmpty").click(function() {
		if (!writerBox.html().length) {
			layui.use('layer', function() {
				var layer = layui.layer;
				layer.msg('文案是空的呦~');
				return false;
			});
		} else {
			layui.use('layer', function() {
				var layer = layui.layer;
				layer.open({
					type: 1,
					offset: "auto",
					title: '提示',
					content: '<div style="padding: 20px 100px;">确定要清空文案吗？</div>',
					btn: ['确定', '取消'],
					btnAlign: 'c' //按钮居中
						,
					shade: 0 //显示遮罩
						,
					yes: function() {
						writerBox.empty();
						$("#copyArea").empty();
						layer.closeAll();
					},
					btn2: function() {
						layer.closeAll();
					}
				});
			});
		}
	})
	//复制编辑内容
	$(".btnCopy").click(function() {
		if (!writerBox.html().length) {
			layui.use('layer', function() {
				var layer = layui.layer;
				layer.msg('内容不能为空哦~');
			});
			return false;
		} else {
			copyArea.html(writerBox.html())
			var len = copyArea.find("img").length;
			for(var i=0;i<len;i++){
				var curImg = copyArea.find("img").eq(i);
				console.log(curImg)
				curImg.after(curImg.attr("data-src"));
				setTimeout(function(){
					copyArea.find("img").remove()
				},10);
			}
			var clipboard = new ClipboardJS('.btnCopy');
			clipboard.on('success', function(e) {
				console.log(e)
				layui.use('layer', function() {
					var layer = layui.layer;
					layer.msg('复制成功');
				});
			});
		}
	})

	//添加表情
	$(".iconsDiv").on("click", ".icons", function() {
		writerBox.focus();
		var src = $(this).attr("src");
		var alt = $(this).attr("alt");
		var datasrc = $(this).attr("data-src");
		var imgUrl = '<img src=' + src + ' alt=' + alt + ' data-src=' + datasrc + ' >';
		insertHtml(imgUrl)
	})
	//光标位置
		var currentRange,_parentElem,supportRange = typeof document.createRange === 'function';
    function getCurrentRange() {
        var selection,
        range,
        txt = $(".writerBox");
        if(supportRange){
            selection = document.getSelection();
            if (selection.getRangeAt && selection.rangeCount) {
                range = document.getSelection().getRangeAt(0);
                _parentElem = range.commonAncestorContainer;
            }
        }else{
            range = document.selection.createRange();
            _parentElem = range.parentElement();
        }

        return range;
    }
    function saveSelection() {
        currentRange = getCurrentRange();
    }
    function restoreSelection() {
        if(!currentRange){
            return;
        }
        var selection,
        range;
        if(supportRange){
            selection = document.getSelection();
            selection.removeAllRanges();
            selection.addRange(currentRange);
        }else{
            range = document.selection.createRange();
            range.setEndPoint('EndToEnd', currentRange);
            if(currentRange.text.length === 0){
                range.collapse(false);
            }else{
                range.setEndPoint('StartToStart', currentRange);
            }
            range.select();
        }
    }
		function insertHtml(html){
      restoreSelection();
      document.execCommand("insertHtml", false,html);
      saveSelection();
    }
		$(".writerBox").mouseup(function(){
			saveSelection();
    });
   $(".writerBox").keyup(function(){
        saveSelection();
    });




	//锁定编辑器中鼠标光标位置
	// function insertImg(str) {
	// 	var selection = window.getSelection ? window.getSelection() : document.selection;
	// 	var range = selection.createRange ? selection.createRange() : selection.getRangeAt(0);
	// 	if (!window.getSelection) {
	// 		writerBox.focus();
	// 		var selection = window.getSelection ? window.getSelection() : document.selection;
	// 		var range = selection.createRange ? selection.createRange() : selection.getRangeAt(0);
	// 		range.pasteHTML(str);
	// 		range.collapse(false);
	// 		range.select();
	// 	} else {
	// 		writerBox.focus();
	// 		range.collapse(false);
	// 		var hasR = range.createContextualFragment(str);
	// 		var hasR_lastChild = hasR.lastChild;
	// 		while (hasR_lastChild && hasR_lastChild.nodeName.toLowerCase() == "br" && hasR_lastChild.previousSibling &&
	// 			hasR_lastChild.previousSibling.nodeName.toLowerCase() == "br") {
	// 			var e = hasR_lastChild;
	// 			hasR_lastChild = hasR_lastChild.previousSibling;
	// 			hasR.removeChild(e)
	// 		}
	// 		range.insertNode(hasR);
	// 		if (hasR_lastChild) {
	// 			range.setEndAfter(hasR_lastChild);
	// 			range.setStartAfter(hasR_lastChild)
	// 		}
	// 		selection.removeAllRanges();

	// 		selection.addRange(range)
	// 	}
	// }

	// jq---end
})

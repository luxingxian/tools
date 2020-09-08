$(function() {

	//选择模板
	$(".modeBox").eq(0).show().addClass("show");
	$(".modeTab .modes").click(function() {
		$(".modeTab .modes").removeClass("active");
		$(this).addClass("active");
		var index = $(this).index();
		$(".modeBox").each(function() {
			$(".modeBox").hide().removeClass("show");
			$(".modeBox").eq(index).show().addClass("show");
		})
		tagPosition();
		littlePosition();
	})
	//营销推广图-选择标签
	$(".tagBox .tagView").eq(0).show().addClass("active");
	$(".style,#TextOne,#TypeTwo,#PriceThree").css({
		"display": "flex"
	});
	$(".tagTab li").click(function() {
		var index = $(this).index();
		$(".tagTab li").removeClass("active");
		$(this).addClass("active");
		$(".tagBox .tagView").hide().removeClass("active");
		$(".tagBox .tagView").eq(index).show().addClass("active");
		$(".tabAd .styleCom").css({
			"display": "none"
		});
		var num = $(this).attr("data-id");
		if (num) {
			var arr = num.split("");
			for (i in arr) {
				$(".tabAd .styleCom").eq(arr[i]).css({
					"display": "flex"
				});
			}
		}
		if (index == 2) {
			littleTag();
			judge($(".tagBox .active .checked"))
		} else if (index == 7) {
			$(".modeTag").empty();
		} else {
			$(".modeTag").empty();
			$(".tagView").eq(index).clone(false).appendTo(".modeTag");
			$(".modeTag .tagView").append('<span class="removeImg">×</span>');
			tagPosition();
		}
		changeStyle();
		tagInitOne();
		if (index !== 7 && index !== 2) {
			judge($(".tagBox .active"));
		}
	})
	//删除标签
	$(".modeTag").on("click", ".removeImg", function() {
		$(".modeTag").empty();
	})
	//删除标签后点击出现
	$(".tagBox .tagView").not(".tagThree,.tagEight").click(function(e){
		e.preventDefault();
		$(".modeTag").empty();
		$(this).clone(false).appendTo(".modeTag");
		$(".modeTag .tagView").append('<span class="removeImg">×</span>');
		tagPosition();
	})
	//自定义标签删除后点击重新出现
	$(".tagBox .tagImg").not(".removeImg").click(function(e){
		e.preventDefault()
		if(e.target.className=="removeImg"){
			return;
		}else {
			$(".modeTag").empty();
			$(this).clone(false).appendTo(".modeTag");
			$(".modeTag .tagView").append('<span class="removeImg">×</span>');
			tagPosition();
		}
	})
	
	//标签位置
	function tagPosition() {
		var modeBoxH = $(".modeBox.show").outerHeight();
		var fristH = $(".modeBox.show").children(":first").outerHeight();
		var tagH = $(".modeTag").outerHeight();
		if (tagH > 80 && $(".modeBox.show").index() !== 3) {
			$(".modeTag").css({
				"bottom": modeBoxH - fristH - tagH / 2 - 2,
				"left": ($("#imgArea").width() - $(".modeTag .active").width()) / 2,
			})
		} else {
			$(".modeTag").css({
				"bottom": modeBoxH - fristH - 2,
				"left": ($("#imgArea").width() - $(".modeTag .active").width()) / 2,
			})
		}
	}
	
	//拖拉元素
	$("body").on("mousedown", ".modeTag", function(ev) {
		var event = window.event || ev;
		// 获取屏幕中可视化的宽高的坐标
		var currentItem = $('.modeTag');
		var dx = event.clientX - currentItem[0].offsetLeft;
		var dy = event.clientY - currentItem[0].offsetTop;
		//实时改变目标元素currentItem的位置
		document.onmousemove = function(ev) {
			var parentHeight = $(".modeDiv").outerHeight(),
				parentWidth = $(".modeDiv").outerWidth(),
				currentItemHeight = currentItem.height(),
				currentItemWidth = currentItem.width(),
				event = window.event || ev,
				numWidth = event.clientX - dx,
				numHeight = event.clientY - dy;
			// 左右拖拉	
			if (numWidth > 0 & numWidth < parentWidth - currentItemWidth) {
				currentItem.css({
					"left": numWidth,
				})
			}
			// 上下拖拉
			if (numHeight > 0 & numHeight < parentHeight - currentItemHeight) {
				currentItem.css({
					"bottom": parentHeight - currentItemHeight - numHeight,
				})
			}
		}
		//抬起停止拖动
		document.onmouseup = function() {
			document.onmousemove = null;
			document.onmouseup = null;
		}
	})

	//上传图片
	function upImg(imgInput) {
		var file = imgInput[0].files[0];
		if (file) {
			var reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = function(e) {
				if(imgInput.parent().next().find("img")){
					imgInput.parent().next().empty();
				}
				imgInput.parent().next().append('<img src="'+e.target.result+'">');
			}
		}
	}
	// 营销图上传图片
	$(".imgInput").change(function() {
		var _this = $(this);
		
		upImg(_this);
	})
	//预告上传图片
	$('.fileInput').change(function() {
		var _this = $(this);
		upImg(_this);
	})
	//删除上传的图片
	// $(".modeBox .removeImg").click(function() {
	// 	$(this).parent().hide();
	// 	$(this).parent().prev().show();
	// })

//轮播
	layui.use('carousel', function(){
		var carousel = layui.carousel;
		carousel.render({
			elem: '#swiper',
			width: '100%', //设置容器宽度
			arrow: 'hover',//始终显示箭头
			 autoplay:false,
			 indicator:'none',
			 height:'13.57em'
		});
	})
	// 列表选中
	$(".bookList").on("click", ".list .rightText", function() {
		$(".list").removeClass("active");
		$(this).parent().addClass("active");
		fastInit();
	})
	//列表数字排序
	function sortNum() {
		$(".tabLeft .list").each(function() {
			var ind = $(this).index();
			$(this).find(".topTip").html(ind);
			$(this).find(".inputText span").html(ind);
			if($(this).parent().hasClass("twoDiv")){
				$(this).find(".fileInput").attr("id","c"+ind);
				$(this).find(".imgView").attr("for","c"+ind);
			}else {
				$(this).find(".fileInput").attr("id","b"+ind);
				$(this).find(".imgView").attr("for","b"+ind);
			}
		})
	}
	sortNum();
	// 添加列表
	$(".addBtn").click(function() {
		var length = $(this).prev().find(".list").length;
		if (length > 20) {
			layui.use('layer', function() {
				var layer = layui.layer;
				layer.msg('不能添加更多了');
			});
		}
		$(this).parent().find("#cloneList").clone(true).attr("id", "").appendTo($(this).prev().find(".bookList"));
		sortNum();
		dragimg()
	})
	//删除列表
	$(".tabLeft .list .removeImg").click(function() {
		$(this).parent().remove();
		sortNum();
	})

	//选择配置项
	$(".tabLeft").eq(0).show().addClass("show");
	$(".tabCenter").eq(0).show().addClass("show");
	$(".configTab a").click(function() {
		$(".configTab a").removeClass("active");
		$(this).addClass("active");
		var index = $(this).index();
		$(".picView img").attr("src", "");
		$(".picView img").attr("data-src", "");
		$(".tabLeft,.tabCenter").hide().removeClass("show");
		$(".tabLeft").eq(index).show().addClass("show");
		$(".tabCenter").eq(index).show().addClass("show");
		if (index != 0) {
			$(".btns").show();
			$(".btns .creatImg").show();
		} else {
			$(".btns").hide();
			tagInitOne();
		}
		fastInit()
	})

	//选择框点击
	$(".styleCom input").click(function() {
		$(".styleCom input").removeClass("active");
		$(this).addClass("active")
		$(this).siblings(".selectBox").slideToggle(100);
		$(this).next().toggleClass("rotate");
	})
	//下拉框选择
	$(".selectBox li").click(function() {
		$(".selectBox li").removeClass("active");
		$(this).addClass("active");
		var value = $(this).html();
		var fontFamily = $(this).attr("id");
		//选择fontfamily
		if (fontFamily) {
			$(this).parent().siblings("input").attr("data-family", fontFamily)
		}
		$(this).parent().siblings("input").val(value);
		var val = $(this).parent().siblings("input").val();
		$(this).parent().siblings("input").attr("value", val)
		$(".selectBox").slideUp();
		$(".iconDown").removeClass("rotate");
	})


	
	//  判断dom长度
	function judge(dom) {
		if (dom.width() > 200) {
			$("#drag").addClass("showWidth");
			return;
		} else {
			$("#drag").removeClass("showWidth");
		}
	}

	function littleTag() {
		$(".modeTag").empty();
		$(".littleTag.checked").clone(false).appendTo(".modeTag");
		$(".modeTag .littleTag").append('<span class="removeImg">×</span>');
		littlePosition();
	}
	//小标签定位
	function littlePosition() {
		var height = $(".modeDiv").outerHeight();
		var tagHeight = $(".modeTag").outerHeight();
		$(".littleTag").parent(".modeTag").css({
			"bottom": height - tagHeight,
			"left": 0
		})
	}
	//小标签切换
	$(".littleBox").click(function() {
		$(".littleBox .littleTag").removeClass("checked");
		$(this).find(".littleTag").addClass("checked");
		littleTag();
	})
	//自定义标签上传及显示
	$(".tagEight .tagimgInput").change(function(e) {
		e.preventDefault()
		var file = $(this)[0].files[0];
		if (file) {
			var reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = function(e) {
				$(".tagImg").show().find("img").attr("src",e.target.result);
			}
		}
		setTimeout(function() {
			$(".modeTag").empty();
			$(".tagEight").clone(false).appendTo(".modeTag");
			tagPosition();
			judge($(".active"));
		}, 100)

	})
	//删除自定义上传图片
	$(".tagEight .removeImg").click(function() {
		$(this).parent().hide();
		$(".modeTag").empty();
	})
	//营销推广图选择风格
	function changeStyle() {
		var tagIndex = $(".show .tagTab li.active").index() + 1;
		var colorId = $(".show .style .selectBox li.active").attr("id");
		$(".tagView").css({
			"background-image": "url(./images/img/tag" + colorId + tagIndex + ".png)"
		});
	}

	$(".show .style .selectBox li").click(function() {
		changeStyle();
	})

	//营销图推广文字内容及样式初始化
	function tagInitOne() {
		$('[data-type]').each(function() {
			var _this = $(this);
			var dataType = _this.attr("data-type");
			var tagName = $(".tagBox .active ." + dataType);
			var tagText = tagName.html();
			var fontNum = tagName.css("font-size");
			var fontFamily = tagName.css("font-family");
			var fontColor = tagName.css("color");
			if (tagText) {
				_this.find(".TextOne").val(tagText);
			}
			if (fontNum) {
				var fontSize = Math.round(fontNum.substring(0, fontNum.length - 2));
				_this.find(".fontSize input").val(fontSize);
				_this.find(".fontSize li").each(function() {
					var liNum = $(this).html();
					if (liNum == fontSize) {
						_this.find(".fontSize li").removeClass("active");
						$(this).addClass("active");
					}
				})
			}
			if (fontFamily) {
				_this.find(".fontFamily input").attr("data-family", fontFamily);
				_this.find(".fontFamily li").each(function() {
					var liNum = $(this).attr("id");
					if (liNum == fontFamily) {
						_this.find(".fontFamily input").val($(this).html());
						_this.find(".fontFamily li").removeClass("active");
						$(this).addClass("active");
					}
				})
			}
			if (fontColor) {
				_this.find(".colorpickerHolder .layui-colorpicker-trigger-span").css({
					"background": fontColor
				})
			}
		})
		var borderColor = $(".tagView.active.link5").css("border-color");
		if (borderColor) {
			$("#borderColor .colorpickerHolder .layui-colorpicker-trigger-span").css({
				"background": borderColor
			})
		}
	}
	tagInitOne();
	//营销图推广文字联动
	$('[data-type]').find(".TextOne").keyup(function() {
		var className = $(this).parents(".styleCom").attr("data-type");
		var text = $(this).val();
		$(".tagView.active ." + className).html(text);
	})
	//字号
	$('[data-type]').find(".fontSize li").click(function() {
		var className = $(this).parents(".styleCom").attr("data-type");
		var fontSize = $(this).html();
		$(".tagView.active ." + className).css({
			"font-size": fontSize / 14 + "em"
		});
	})
	$('[data-type]').find(".fontFamily li").click(function() {
		var className = $(this).parents(".styleCom").attr("data-type");
		var fontFamily = $(this).attr("id");
		$(".tagView.active ." + className).css({
			"font-family": fontFamily
		});
	})
	$('.colorpickerHolder').each(function() {
		var _this = $(this);
		var className = _this.parents(".styleCom").attr("data-type");
		if (className) {
			layui.use('colorpicker', function() {
				var colorpicker = layui.colorpicker;
				colorpicker.render({
					elem: _this,
					done: function(color) {
						if (className == "link3" && $("." + className).hasClass("border")) {
							$(".tagView.active ." + className).css({
								"border-color": color
							});
						}
						if (className == "link5") {
							$(".tagView.active." + className).css({
								"border-color": color
							});
						} else {
							$(".tagView.active ." + className).css({
								"color": color
							});
						}
					}
				});
			});
		}
	})

	//秒杀/爆款文字初始化
	function fastInit() {
		$(".show").find('[data-about]').each(function() {
			var _this = $(this);
			var dataAbout = _this.attr("data-about");
			var tagName = $(".show .active ." + dataAbout);
			var tagText = tagName.html();
			var fontNum = tagName.css("font-size");
			var fontSize = Math.round(fontNum.substring(0, fontNum.length - 2));
			var fontColor = tagName.css("color");
			_this.find(".TextOne").val(tagText);
			_this.find(".fontSize input").val(fontSize);
			_this.find(".fontSize li").each(function() {
				var liNum = $(this).html();
				if (liNum == fontSize) {
					_this.find(".fontSize li").removeClass("active");
					$(this).addClass("active");
				}
			})
			_this.find(".colorpickerHolder .layui-colorpicker-trigger-span").css({
				"background": fontColor
			});
		})
	}
	//秒杀/爆款文字联动
	$('[data-about]').find(".TextOne").keyup(function() {
		var className = $(this).parents(".styleCom").attr("data-about");
		var text = $(this).val();
		$(".show .active ." + className).html(text);
	})
	$('[data-about]').find(".fontSize li").click(function() {
		var className = $(this).parents(".styleCom").attr("data-about");
		var fontSize = $(this).html();
		$(".show .active ." + className).css({
			"font-size": fontSize + "px"
		});
	})

	$('.colorpickerHolder').each(function() {
		var _this = $(this);
		var className = _this.parents(".styleCom").attr("data-about");
		if (className) {
			layui.use('colorpicker', function() {
				var colorpicker = layui.colorpicker;
				colorpicker.render({
					elem: _this,
					done: function(color) {
						// if(className=="about4"){
						// 	$(".show .active .oldPrice").css({"color":color});
						// 	$(".show .active ."+className).css({"color":color});
						// }else if(className=="about5"){
						// 	//bug  del排除不掉
						// 	$(".show .active .salesPrice").not("del.about4").css({"color":color});
						// }else {
						// 	$(".show .active ."+className).css({"color":color});
						// }

						$(".show .active ." + className).css({
							"color": color
						});
					}
				});
			});
		}

	})
	// 合成图片
	
	function toImg(imgDIv) {
			var w = imgDIv[0].offsetWidth;
			var h =imgDIv[0].offsetHeight;
			var canvas = document.createElement("canvas");
			var scale =2;
			canvas.width=w*scale;
			canvas.height=h*scale;
			var context = canvas.getContext("2d");
			context.translate(0,0)
			html2canvas(imgDIv[0], {
				dpi: window.devicePixelRatio,
				width: w,
				height: h,
				scale:scale,
				canvas:canvas,
				useCORS: true, //是否跨域,
				logging: true, 
	      tainttest:true //检测每张图片都已经加载完成
			}).then(function(canvas) {
				var dataUrl = canvas.toDataURL("image/jpeg", 1);
				$(".picView img").attr("src", dataUrl);
				layui.use('layer', function() {
					var layer = layui.layer;
					layer.msg('合成成功');
				});
				upLoad(dataUrl);
			});
		}

	//营销图生成
	$(".imgBtn").click(function() {
		toImg($("#imgArea"))
		$(".btns").show();
		$(".btns .creatImg").hide();
	})
	$(".creatImg").click(function() {
		toImg($(".show .imgAreadiv"));
	})
	
	//上传图片到服务器base64转jpg
	function upLoad(dataUrl){
		$.post('https://img.70e.com/upload',{'t':1,'file':dataUrl,'directory':"temps"},function(result){
			console.log(result)
			if(result.code == 200){
				$(".picView img").attr("src", result.data.filename);
			}else{
				console.log('上传失败');
			}
		});
		$(".picView img").attr("data-src",dataUrl);
	}
	//复制图片
	$(".copyImg").click(function(){
		if(!$(".picView img").attr("src")){
			layui.use('layer', function() {
				var layer = layui.layer;
				layer.msg('没有已合成的图片');
			});
			return;
		}
	})
		var imgCopy = new ClipboardJS('.copyImg');
			imgCopy.on('success', function(e) {
				layer.msg('已复制');
				e.clearSelection();
			});
			imgCopy.on('error', function(e) {
				layer.msg('复制失败 请手动保存');
			});

	//保存图片到本地
	$(".saveImg").click(function() {
		if(!$(".picView img").attr("src")){
			layui.use('layer', function() {
				var layer = layui.layer;
				layer.msg('没有已合成的图片');
			});
		}else {
			$(this).attr({
				"href": $(".picView img").attr("data-src"),
				"download": (new Date()).getTime() + '.jpg'
			});
		}
	})

	//点击查看图片
	$(".picView").click(function() {
		$(".toast img").attr("src", $(".picView img").attr("src"));
		$(".toast").fadeIn();
	})
	$(".toast").click(function() {
		$(".toast").fadeOut();
	})

	//秒杀主题风格
	$("#theme li").click(function() {
		$(".tabLeft.show").attr("id", $(this).attr("data-id"));
	})
	//秒杀排版风格
	$("#titleStyle li").click(function() {
		if ($(this).index() == 1) {
			$(".tabLeft.show .rightText").addClass("double");
		} else {
			$(".tabLeft.show .rightText").removeClass("double");
		}
	})
	//爆款汇总主题风格
	$("#hotTheme li").click(function() {
		$(".tabLeft.show").attr("id", $(this).attr("data-id"));
	})

	//点击显示二维码验证--商品链接-登录-授权
	$(".showQRcode input").click(function(e) {
		var authority = true;
		if ($(this).is(':checked')) {
			if ($(".picBox li>img").length == 0) {
				layui.use('layer', function() {
					var layer = layui.layer;
					layer.msg('请先输入淘宝链接获取素材');
				});
				e.preventDefault();
			} else if (!authority) {
				layui.use('layer', function() {
					var layer = layui.layer;
					layer.msg('请先授权');
				});
				e.preventDefault();
			} else {
				//生成二维码并显示在img中
				$(".ewCode").css({
					'display': 'flex'
				});
			}
		} else {
			$(".ewCode").css({
				'display': 'none'
			});
		}
	})

	//截取商品ID
	function getUrlParam(s) {
		var urlRegExp =
			/^((https|http|ftp|rtsp|mms)?:\/\/)+[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$/;
		if (urlRegExp.test(s)) {
			var query = s.split('?');
			var vars = query[1].split("&");
			for (var i = 0; i < vars.length; i++) {
				var pair = vars[i].split("=");
				if (pair[0] == 'id') {
					return pair[1];
					break;
				}
			}
		} else {
			layui.use('layer', function() {
				var layer = layui.layer;
				layer.msg('获取失败，链接无效');
			});
		}
	}
	//获取主图
	$(".getImg").click(function() {
		var log = true;
		var linkTaobao = $(".link").val();
		if (!linkTaobao) {
			layui.use('layer', function() {
				var layer = layui.layer;
				layer.msg('请输入淘宝商品链接');
			});
		} else if (!log) {
			layui.use('layer', function() {
				var layer = layui.layer;
				layer.msg('请先登录');
			});
		} else {
			var goodsId = getUrlParam(linkTaobao);
			var link = 'https://acs.m.taobao.com/h5/mtop.taobao.detail.getdetail/6.0/?data=%7B%22itemNumId%22%3A%22' +
				goodsId + '%22%7D';
			$.ajax({
				type: 'GET',
				url: link,
				dataType: "jsonp",
				success: function(res) {
					if (res.data.item) {
						var images = res.data.item.images;
						var str = "";
						for (i in images) {
							str += '<li><img class="imgDrag" id="'+i+'" src="' + images[i] + '" alt="" draggable="true"></li>';
						}
						$(".picBox li").remove();
						$(".picBox").append(str);
						layui.use('layer', function() {
							var layer = layui.layer;
							layer.msg('获取成功');
						});
						imgevent();
					} else {
						layui.use('layer', function() {
							var layer = layui.layer;
							layer.msg('获取失败，链接无效');
						});
					}
				},
				error: function(res) {
					layui.use('layer', function() {
						var layer = layui.layer;
						layer.msg('获取失败，链接无效');
					});
				}
			})
		}
	})

	//实拍图--暂时不用
	$(".picBtn").click(function() {
		$(".imgToast").fadeIn();
	});
	$(".close").click(function() {
		$(".imgToast").fadeOut();
	})
})

//图片拖放
//图片放置元素绑定事件
function dragimg(){
		var box = document.getElementsByClassName("dragBox");
		for (var i = 0; i < box.length; i++) {
			box[i].addEventListener('drop', function(event) {
				drop(event)
			})
			box[i].addEventListener('dragover', function(event) {
				allowDrop(event)
			})
		}
}
dragimg();
//图片拖动绑定事件
function imgevent(){
	var imgDrag = document.getElementsByClassName("imgDrag");
		for (var i = 0; i < imgDrag.length; i++) {
			imgDrag[i].addEventListener('dragstart', function(event) {
				drag(event)
			})
		}
}

	function allowDrop(ev) {
		ev.preventDefault();
	}

	function drag(ev) {
		ev.dataTransfer.setData("Text", ev.target.id);
	}

	function drop(ev) {
		ev.preventDefault();
		var data = ev.dataTransfer.getData("Text");
		var newNode = document.getElementById(data).cloneNode(true);
		if (ev.target.parentNode.children[1]) {
			if(ev.target.hasChildNodes()){
				ev.target.removeChild(ev.target.children[0]);
				ev.target.append(newNode)
			}else {
				ev.target.append(newNode);
			}
		} else {
			ev.target.parentNode.append(newNode);
			ev.target.remove();
		}
	}

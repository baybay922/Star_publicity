(function(){
	var ua = navigator.userAgent.toLowerCase(); 
	 if (/iphone|ipad|ipod/.test(ua)) {
	      //alert("iphone");  
	      $(".download").find("a").attr("href","http://www.baidu.com")
	 } else if (/android/.test(ua)) {
	      alert("android");
	       $(".download").find("a").attr("href","http://www.baidu.com");
	 }

	//页面初步加载
	var overscroll = function(el) {//阻止浏览量默认滚动
		el.addEventListener('touchstart', function() {
			var top = el.scrollTop, 
				totalScroll = el.scrollHeight,
				currentScroll = top + el.offsetHeight;
			if(top === 0) {
				el.scrollTop = 1;
			} else if(currentScroll === totalScroll) {
				el.scrollTop = top - 1;
			}
		})
		el.addEventListener('touchmove', function(evt) {
			if(el.offsetHeight < el.scrollHeight)
				evt._isScroller = true;
			})
		}
		overscroll(document.querySelector('.l_NewScroll'));
		document.body.addEventListener('touchmove', function(evt) {
			if(!evt._isScroller) {
				evt.preventDefault();
			}
		})
		$(".record,.video,.music,.pictrues").on("touchmove",function(e){
			e.stopPropagation();
		})
		
	var falg = true;
	var imgHTML = "";
	var AllEventsBegin = {
		_init: function(){
			$("#play_music").on("click",AllEventsBegin.clickPlay);
			$("#fixed_list").on("click","li",AllEventsBegin.ListSwitching);
			$("#close_btn").on("click",AllEventsBegin.closeSuspension);
			$("#Catalog").on("click",AllEventsBegin.showSuspension);
			$("#img_box").on("click",AllEventsBegin.LoomingUpAndDown);

			$(".img_box").animate({/* 首页背景图显示 */
				"opacity":1
			},1500,function(){
				$(".header").animate({
					"top":0
				},500);
				$(".footer").animate({
					"bottom":0
				},500);
				$(".follow").animate({
					"bottom":7+"rem"
				});
				$(".likes").animate({
					"bottom":2+"rem"
				});
			});
			setTimeout(function(){
				$("#loading").hide();
			},2000);

			$(".short").each(function(){
				var videos = $(this).find("li").length;
				//没有视频的时候，这个显示
				if(videos == 0){
					$(".noviode").show();
				}
				if(videos == 1){
					$(this).find("li").css({
						"width":95+"%",
						"margin-left":2.5+"%"
					})
				}
			})
		},
		clickPlay: function(){
			var self = $(this);
			var audio = document.getElementById('audios');
			 if(audio!==null){           
				  if(audio.paused){  
				  	   self.removeClass("stop")        
				      audio.play();//audio.play();// 这个就是播放
				      $("#play_music").animate({
				      	"right":1+"rem"
				      },300)
				  }else{
				  	self.addClass("stop")   
				   audio.pause();// 这个就是暂停
				   $("#play_music").animate({
				      	"right":-1+"rem"
				    },300)
				  }
			} 
		},
		ListSwitching: function(){
			var self = $(this),
				click_ind = $(this).index(),
				page = $(".pages").find("div.page")
			self.addClass("list_check").siblings().removeClass("list_check");
			if(click_ind == 1 || click_ind == 2 || click_ind == 3 || click_ind == 5){
				$(".Catalog").css({
					"bottom":-.4+"rem"
				})
			}else{
				$(".Catalog").css({
					"bottom":10+"rem"
				})
			}
			if(click_ind == 1){
				$(".info_list li").each(function(i){
					$(this).animate({
						"margin": ".5rem auto",
						"opacity":1
					},1000)
				})
			}

			page.eq(click_ind).animate({
				"left" : 0,
				"z-index":11				
			},300,function(){
				$(this).siblings().animate({
					"left" : 100+"%",
					"z-index":10				
				},300)
			});
			AllEventsBegin.closeSuspension();
		},
		closeSuspension: function(){//列表隐藏
			$("#fixed_list li").find("a").css({
				"-webkit-animation" : "none"
			});

			$("#fixed_list").animate({
				"left": -50+"%"
			},300);
		},
		showSuspension: function(){//列表显示
			var fixed_list = $("#fixed_list");
			AllEventsBegin.slideAnimation();
			fixed_list.animate({
				"left": 0+"%"
			},300)

		},
		slideAnimation: function(){
			$("#fixed_list li").each(function(i){
				$(this).find("a").css({
					"-webkit-animation" : "slipping 0."+i+"s ."+i+"s ease-in-out"
				})
				$(this).find("a").animate({
					"opacity":1
				},300)
			});
		
		},
		LoomingUpAndDown: function(){
			var header = $(".header"),
				footer = $(".footer"),
				head_height = header.height(),
				foot_height = footer.height();
			if(falg){
				header.animate({
					"top":-head_height+"px"
				},300);
				footer.animate({
					"bottom":-foot_height+"px",
					"overflow":"hidden"
				},300);
				
				$("#likes").animate({
					"bottom":-10+"rem"
				})
				$("#follow").animate({
					"bottom":-10+"rem"
				},300)
				falg = false;

			}else{
				header.animate({
					"top":0
				},300);
				footer.animate({
					"bottom":0,
					"overflow":"audio"
				},300);
				$("#likes").animate({
					"bottom":2+"rem"
				})
				$("#follow").animate({
					"bottom":7+"rem"
				},300)
				falg = true;

			}
			AllEventsBegin.closeSuspension();
		}

	}
	AllEventsBegin._init();
	var startx, starty; ///判断是不是上滑，显示列表
	    //获得角度
	    function getAngle(angx, angy) {
	        return Math.atan2(angy, angx) * 180 / Math.PI;
	    };
	 
	    //根据起点终点返回方向 1向上 2向下 3向左 4向右 0未滑动
	    function getDirection(startx, starty, endx, endy) {
	        var angx = endx - startx;
	        var angy = endy - starty;
	        var result = 0;
	 
	        //如果滑动距离太短
	        if (Math.abs(angx) < 2 && Math.abs(angy) < 2) {
	            return result;
	        }
	 
	        var angle = getAngle(angx, angy);
	        if (angle >= -135 && angle <= -45) {
	            result = 1;
	        } else if (angle > 45 && angle < 135) {
	            result = 2;
	        } else if ((angle >= 135 && angle <= 180) || (angle >= -180 && angle < -135)) {
	            result = 3;
	        } else if (angle >= -45 && angle <= 45) {
	            result = 4;
	        }
	 
	        return result;
	    }
	    //手指接触屏幕
	    document.getElementById("img_box").addEventListener("touchstart", function(e) {
	    	e.stopPropagation();
	        startx = e.touches[0].pageX;
	        starty = e.touches[0].pageY;
	    }, false);
	    //手指离开屏幕
	    document.getElementById("img_box").addEventListener("touchend", function(e) {
	    	e.stopPropagation();
	        var endx, endy;
	        endx = e.changedTouches[0].pageX;
	        endy = e.changedTouches[0].pageY;
	        var direction = getDirection(startx, starty, endx, endy);
	        switch (direction) {
	            case 1:
	                AllEventsBegin.showSuspension();
	                break;
	            default:
	        }
	    }, false);

	    var swiper = new Swiper('.representative', {
	            pagination: '.swiper-pagination',
	            effect: 'coverflow',
	            grabCursor: true,
	            centeredSlides: true,
	            slidesPerView: 'auto',
	            coverflow: {
	                rotate: 50,
	                stretch: 0,
	                depth: 100,
	                modifier: 1,
	                slideShadows : true
	            },
	            onTouchStart: function(swiper,even){
	            	even.stopPropagation();
	            },
	            onTouchMove: function(swiper,even){
	            	even.stopPropagation();
	            },
	            onTouchEnd: function(swiper,even){
	            	even.stopPropagation();
	            }
	        });
	    /* 点赞 */
	    var follow = true,
	    	like  = true;
	    $("#follow").on("click",function(){	    	
	    	if(follow){
	    		$(this).addClass("follow_cur");
	    		follow = false;
	    	}else{
	    		$(this).removeClass("follow_cur");
	    		follow = true;
	    	}
	    });
	    $("#likes").on("click",function(){
	    	if(like){
	    		$(this).addClass("likes_cur");
	    		$(this).find("p").animate({
	    			"top":-1+"rem",
	    			"opacity":1
	    		},500,function(){
	    			$("p.thumbs").animate({
	    				"opacity":0
	    			},500,function(){
	    				$("p.thumbs").css({
	    					"top":3+"rem"
	    				})
	    			})
	    		})
	    		like = false;
	    	}else{
	    		$(this).find("p").html("取消点赞").animate({
	    			"top":-1+"rem",
	    			"left":-.5+"rem",
	    			"opacity":1
	    		},500,function(){
	    			$("p.thumbs").animate({
	    				"opacity":0
	    			},500,function(){
	    				$("p.thumbs").css({
	    					"top":3+"rem"
	    				})
	    			})
	    		})
	    		$(this).removeClass("likes_cur");
	    		like = true;
	    	}
	    })
})();
$(function() {
	var Accordion = function(el, multiple) {
		this.el = el || {};
		this.multiple = multiple || false;

		// Variables privadas
		var links = this.el.find('.link');
		// Evento
		links.on('click', {el: this.el, multiple: this.multiple}, this.dropdown)
	}

	Accordion.prototype.dropdown = function(e) {
		var $el = e.data.el;
			$this = $(this),
			$next = $this.next();

		$next.slideToggle();
		$this.find("i.rotateBtn").toggleClass("rotate_arr");

		// if($("i.rotateBtn").hasClass("rotate_arr")){
		// 	$(".record").on("scroll",function(){
		// 	scrollTops = $(this).scrollTop();
		// 	console.log(offsetTop+"...."+scrollTops)
		// 	if($(".rotateBtn").hasClass("rotate_arr")){
		// 		if(offsetTop == scrollTops){
		// 			$(".rotateBtn").parent().css({
		// 				"position":"fixed",
		// 				"top":0
		// 			})
		// 		}
		// 	}
		// })
		// }else{
		// 	true false;
		// }
		if (!e.data.multiple) {
			$el.find('.submenu').not($next).slideUp().parent().removeClass('open');
		};
	}	

	var accordion = new Accordion($('#accordion'), false);

	$(".array").on("click",function(){
		$(this).toggleClass("array_cur");
		if($(this).hasClass("array_cur")){
			$(this).parent().next("ul.pictrue_list").addClass("transverse");
			//$(".pictrue_list").addClass("transverse");
		}else{
			$(this).parent().next("ul.pictrue_list").removeClass("transverse");
		}
	})

	$(".pictrue_list").on("click","li",function(){
		$(this).parent().next("div.img_listBox").show(300);
		$(this).parent().prev("h2").find("i.returnBtn").css({
			"display":"block"
		})
	})
	$(".returnBtn").on("click",function(){
		$(this).parent().siblings("div.img_listBox").hide(300);
		$(this).hide();
	})


	var imgLen = $(".ThuBox").find("div.swiper-slide").length;
	$(".aggregate").html(imgLen);
	var swiper = new Swiper('.Thumbnail', {
	    pagination: '.swiper-pagination',
	    paginationClickable: true,
	    onSlideChangeEnd:function(swiper){ //切换结束的时候   	
			$(".w_curCount").html(swiper.activeIndex+1);			
		},
	    onClick:function(swiper){
	    	$("#fullscreen_imgBox").css({
				"z-index":"-99999"
			})
	    }
	});
	
	$(".img_list").on("click","li",function(){
		$("#fullscreen_imgBox").css({
			"z-index":"99999"
		})
	})
	$('div.pinch-zoom').each(function () {
	    new RTP.PinchZoom($(this), {});
	});
	


// $.ajax({
//      type:"get",
//      datatype:"json",
//      url : "http://192.168.0.121:8080/share/shareH5Data?name=c3ca00de3c1c4226b01a53d6e6430214&from=singlemessage&isappinstalled=1",
//      success:function(data){
     
     
//      }

//     });


	// 视频播放
 	$(".short").on("click","li",function(){
 		var videoUrl = $(this).attr("videoUrl");
 		$(".video_container").show();
 		$(".Fullscreenplay").attr("src",videoUrl);
 	});
 	$(".close_video_btn").on("click",function(){
 		$(".video_container").hide();
 		$(".Fullscreenplay").attr("src","");
 	});


 	//音乐
 	$(".music_list").on("click","li",function(){  //获取当前音乐的src，并复制在audio上
 		var audio = document.getElementById('audios');
	 		audio.pause();// 这个就是暂停
		    $("#play_music").animate({
		      	"right":-1+"rem"
		    },300).removeClass("stop");
		var musicsrc  = $(this).attr("datasrc"),
			mtv_cur = $(this).find("span.mtv");
		$(this).find("p.musci_name").addClass("musci_name_cur").parent().siblings().find("p.musci_name").removeClass("musci_name_cur");

		if(mtv_cur.length > 0){
			$(".mtvBox").show();
			$(".music_box").hide();
			$(".mtv").attr("src",musicsrc);
			$(".audioplay").attr("src","");
		}else{
			$(".music_box").show();
			$(".mtvBox").hide();
			$(".audioplay").attr("src",musicsrc);
			$(".mtv").attr("src","");
		}
	});




});
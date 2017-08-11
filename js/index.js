//主体的Swiper
var swiper0 = new Swiper('#swiper0', {
	direction: 'vertical',
	watchSlidesProgress: true,
	pagination: '#swiper0>.swiper-pagination',
	paginationType: 'bullets',
	paginationClickable: true,
	paginationBulletRender: function(swiper, index, className) {
		var slide = swiper.slides.eq(index);
		var dataInter = {
			className: className,
			name: slide.data('name'),
			icon: slide.data('icon'),
		};
		var interText = doT.template($("#template-pagination").text());
		//					console.log(interText(dataInter));
		return interText(dataInter);
	},
	mousewheelControl: true,
	keyboardControl: true,
	onKeyPress: function(swiper, event) {
		//绑定按键
		//					console.log(event);
		switch(event) {
			case 33: //PGUP
				swiper.slidePrev();
				break;
			case 34: //EGDN
				swiper.slideNext();
				break;
			case 35: //END
				swiper.slideTo(swiper.slides.length - 1);
				break;
			case 36: //HOME
				swiper.slideTo(0);
				break;
			default:
				break;
		};
	},
	setWrapperSize: true,
	onInit: function(swiper) { //初始化完成
		swiperAnimateCache(swiper); //隐藏动画元素 
		swiperAnimate(swiper); //初始化完成开始动画
	},
	onSlideChangeEnd: function(swiper) {
		swiper.bullets.eq(swiper.activeIndex).trigger('mouseover'); //切换时显示导航标签
		swiperAnimate(swiper); //每个slide切换结束时也运行当前slide动画
		if(swiper.activeIndex == 0) { //切换到其他页关闭首页背景轮播以优化性能
			jQuery('#wowslider-container1').get(0).wsRestart();
		} else {
			jQuery('#wowslider-container1').get(0).wsStop();
		};
	},
});

//作品集的Swiper
var experienceSwiper = new Swiper('#experience-swiper', {
	effect: 'coverflow',
	pagination: '#experience-swiper>.swiper-pagination',
	//				paginationClickable: true,
	centeredSlides: true,
	loop: true,
	grabCursor: true,
	slidesPerView: 5,
	slideToClickedSlide: true,
	coverflow: {
		rotate: 25,
		stretch: 0,
		depth: 100,
		modifier: 1,
		slideShadows: true
	},
	breakpoints: { //响应式
		768: {
			slidesPerView: 1,
			coverflow: {
				rotate: 10,
				stretch: 0,
				depth: 100,
				modifier: 1,
				slideShadows: true
			},
		},
		992: {
			slidesPerView: 3,
			coverflow: {
				rotate: 50,
				stretch: 0,
				depth: 100,
				modifier: 1,
				slideShadows: true
			},
		},
		1200: {
			slidesPerView: 5,
			coverflow: {
				rotate: 25,
				stretch: 0,
				depth: 100,
				modifier: 1,
				slideShadows: true
			},
		},
	},

});

//模拟hover避免移动端一直点击后一直处于hover伪类状态，改使用.hover类名控制。
//navigator.userAgent.match(/AppleWebKit.*Mobile.*/)
$(document).on('mouseenter', '.onhover', function() {
	setTimeout(function() {
		$(this).addClass('hover');
		$(this).data('removehover', setTimeout(function() {
			//1秒后移除hover
			$(this).removeClass('hover');
		}.bind(this), 2000));
	}.bind(this), 0);
}).on('mouseleave', '.onhover', function(event) {
	clearTimeout($(this).data('removehover'));
	$(this).removeClass('hover');
});

//			if(navigator.userAgent.match(/AppleWebKit.*Mobile.*/)) {

$(document).on('click', '.onhover', function() {
	$(this).trigger('mouseenter');
})

//			}
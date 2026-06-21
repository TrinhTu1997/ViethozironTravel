(function($) {
  	"use strict";
  	var GaviasTheme = {
		init: function(){
			this.handleWindow();
			this.initResponsive();
			this.initCarousel();
			this.menuMobile();
			this.postMasonry();
			this.scrollTop();
			this.stickyMenu();
			this.user();
			this.booking();
			this.other();
		},

		handleWindow: function(){
	 		var body = document.querySelector('body');
        if (window.innerWidth > body.clientWidth + 6) {
            body.classList.add('has-scrollbar');
            body.setAttribute('style', '--scroll-bar: ' + (window.innerWidth - body.clientWidth) + 'px');
        } else {
            body.classList.remove('has-scrollbar');
        }

        	setTimeout(function(){
          	if($('body').hasClass('gowilds-body-loading')){
              $('body').removeClass('gowilds-body-loading');
              $('.gowilds-page-loading').fadeOut(50);
          	}
      	}, 360);
	 	},
	 	
	 	initResponsive: function(){
		  	var _event = $.event,
		  	$special, resizeTimeout;
		  	$special = _event.special.debouncedresize = {
				setup: function () {
					$(this).on("resize", $special.handler);
				},
			 	teardown: function () {
					$(this).off("resize", $special.handler);
			 	},
			 	handler: function (event, execAsap) {
					var context = this,
				  		args = arguments,
				  		dispatch = function () {
					 		event.type = "debouncedresize";
					 		_event.dispatch.apply(context, args);
				  		};
				  	if (resizeTimeout) {
					 	clearTimeout(resizeTimeout);
				  	}
					execAsap ? dispatch() : resizeTimeout = setTimeout(dispatch, $special.threshold);
			 	},
		  		threshold: 150
			};
	 	},

	 	initCarousel: function(){
			var _default = {
				items: 3, 
				items_lg: 3,
				items_md: 2,
				items_sm: 2,
				items_xs: 1,
				items_xx: 1,
				space_between: 30,
				effect: 'slide',
				loop: 1,
				speed: 600,
				autoplay: 1,
				autoplay_delay: 6000,
				autoplay_hover: 0,
				navigation: 1,
				pagination: 1,
				pagination_type: 'bullets',
				dynamic_bullets: 0
			};

			$('.init-carousel-swiper-theme').each(function(){
				var $target = $(this);
				var settings = $target.data('carousel');

				settings = $.extend(!0, _default, settings);
				
				//-- Autoplay
				var _autoplay = false;
				if(settings.autoplay){
					_autoplay = {
						delay: settings.autoplay_delay,
						disableOnInteraction: false,
						pauseOnMouseEnter: settings.autoplay_hover,
					}
				}
				//-- Pagination 
				var _pagination = false;
				if(settings.pagination){
					_pagination = {
						el: $target.parent().find('.swiper-pagination')[0],
					   type: settings.pagination_type,
					   clickable: true,
					  	dynamicBullets: false
					}
				}
				//-- Navigation
				var _navigation = false;
				if(settings.navigation){
					_navigation = {
						nextEl: $target.parents('.swiper-slider-wrapper').find('.swiper-nav-next')[0],
				    	prevEl: $target.parents('.swiper-slider-wrapper').find('.swiper-nav-prev')[0],
				    	hiddenClass: 'hidden'
					}
				}
				console.log($target[0]);
				var swiper = new Swiper($target[0], {
				  	loop: settings.loop,
				  	spaceBetween: 30,
				  	autoplay: _autoplay,
				  	speed: settings.speed,
				  	grabCursor: true,
				  	breakpoints: {
				  		0: {
				  			slidesPerView: 1
				  		},
				  		390: {
					      slidesPerView: settings.items_xx
					   },
					   640: {
					   	slidesPerView: settings.items_xs
					   },
					   768: {
					      slidesPerView: settings.items_sm
					   },
					   1024: {
					      slidesPerView: settings.items_md
					   },
					   1200: { // when window width is >= 1200px
					      slidesPerView: settings.items_lg,
					   },
					   1400: { // when window width is >= 1200px
					      slidesPerView: settings.items,
					   }
				  	},
				  	pagination: _pagination,
				  	navigation: _navigation,
				   observer: true,  
		       	observeParents: true,
				});

				if(settings.autoplay_hover && settings.autoplay){
					$target.hover(function() {
			 			swiper.autoplay.stop();
					}, function() {
					   swiper.autoplay.start();
					});
				}
			})
		},

	 	menuMobile: function(){
			$('.gva-offcanvas-content ul.gva-mobile-menu > li:has(ul)').addClass("has-sub");
			$('.gva-offcanvas-content ul.gva-mobile-menu > li:has(ul) > a').after('<span class="caret"></span>');
			$( document ).on('click', '.gva-offcanvas-content ul.gva-mobile-menu > li > .caret', function(e){
			  	e.preventDefault();
			  	var checkElement = $(this).next();
			  	$('.gva-offcanvas-content ul.gva-mobile-menu > li').removeClass('menu-active');
			  	$(this).closest('li').addClass('menu-active'); 
			  
			  	if((checkElement.is('.submenu-inner')) && (checkElement.is(':visible'))){
				 	$(this).closest('li').removeClass('menu-active');
				 	checkElement.slideUp('normal');
			  	}
		  		if((checkElement.is('.submenu-inner')) && (!checkElement.is(':visible'))){
			 		$('.gva-offcanvas-content ul.gva-mobile-menu .submenu-inner:visible').slideUp('normal');
			 		checkElement.slideDown('normal');
		  		}
		  		if (checkElement.is('.submenu-inner')){
			 		return false;
		  		} else {
			 		return true;  
		  		}   
			})

			$( document ).on( 'click', '.canvas-menu.gva-offcanvas > a.dropdown-toggle', function(e){
		  		e.preventDefault();
		  		var $style = $(this).data('canvas');
			  	if($('.gva-offcanvas-content' + $style).hasClass('open')){
				 	$('.gva-offcanvas-content' + $style).removeClass('open');
				 	$('#gva-overlay').removeClass('open');
				 	$('#wp-main-content').removeClass('blur');
			  	}else{
				 	$('.gva-offcanvas-content' + $style).addClass('open');
				 	$('#gva-overlay').addClass('open');
				 	$('#wp-main-content').addClass('blur');
			  	}
			});

			$( document ).on( 'click', '#gva-overlay, .top-canvas a.control-close-mm', function(e){
			  	e.preventDefault();
			  	$(this).removeClass('open');
			  	$('#gva-overlay').removeClass('open');
			  	$('.gva-offcanvas-content').removeClass('open');
			  	$('#wp-main-content').removeClass('blur');
			})
			$( document ).on( 'click', '.close-canvas', function(e) {
			  	e.preventDefault();
			  	$('.gva-offcanvas-content').removeClass('open');
			  	$('#gva-overlay').removeClass('open');
			  	$('#wp-main-content').removeClass('blur');
			})

    		if( ('ontouchstart' in window) || (navigator.msMaxTouchPoints > 0) || (navigator.MaxTouchPoints > 0) ) {
		      var link_id = '';
		      $('.gva-nav-menu .menu-item > a').on('click', function(e) {
		        e.preventDefault();
		        if ($(this).parent().find('.submenu-inner').length == 0) {   
		          	window.location.href = $(this).attr('href');
		          	return;
		        	}
		        	if ($(this).attr('data-link_id') == link_id) {         
		          	window.location.href = $(this).attr('href');
		          	return;
		        	}
		        	if($(window).width() < 1024){
		          	$('.gva-offcanvas-content ul.gva-mobile-menu > li').removeClass('menu-active');
		          	$('.gva-offcanvas-content ul.gva-mobile-menu .submenu-inner:visible').slideUp('normal');
		          	$(this).parent().find('> .submenu-inner').slideDown();
		          	$(this).closest('li').addClass('menu-active');
		        	}
		        	link_id = $(this).attr('data-link_id');
		        	e.preventDefault();
		        	return;
		      });
		   }
	 	},

	 	postMasonry: function(){
			var $container = $('.post-masonry-style');
			$container.imagesLoaded( function(){
		  		$container.masonry({
			 		itemSelector : '.item-masory',
			 		gutterWidth: 0,
			 		columnWidth: 1,
		  		}); 
			});
	 	},

		scrollTop: function(){
			var offset = 300;
			var duration = 500;

			jQuery(window).scroll(function() {
			  	if (jQuery(this).scrollTop() > offset) {
				 	jQuery('.return-top').fadeIn(duration);
			  	} else {
				 	jQuery('.return-top').fadeOut(duration);
			  	}
			});

			$( document ).on('click', '.return-top', function(event){
			  	event.preventDefault();
			  	jQuery('html, body').animate({scrollTop: 0}, duration);
			  	return false;
			});
		},

	 	stickyMenu: function(){
			if( $('.gv-sticky-menu').length > 0 ){
				$( ".gv-sticky-menu" ).wrap( "<div class='gv-sticky-wrapper'></div>" );

		      var headerHeight = $('.gv-sticky-menu').height();
		      var menu = $('.gv-sticky-wrapper');

		      $(window).on('scroll', function () {
		         if ($(window).scrollTop() > menu.offset().top) {
		            menu.addClass('is-fixed');
		            menu.css('height', headerHeight);
		         } else {
		            menu.removeClass('is-fixed');
		            menu.css('height', 'auto');
		         }
		      });
		   }
	 	},

	 	progress_animation: function(){
	 		$("[data-progress-animation]").each(function() {
	        var $this = $(this);
	        $this.appear(function() {
	          var delay = ($this.attr("data-appear-animation-delay") ? $this.attr("data-appear-animation-delay") : 1);
	          if(delay > 1) $this.css("animation-delay", delay + "ms");
	          setTimeout(function() { $this.animate({width: $this.attr("data-progress-animation")}, 800);}, delay);
	        }, {accX: 0, accY: -50});
	      });
	 	},

	 	user: function(){
	 		$('.user-one__login-account').on('click', function(){
			  	if($(this).hasClass('open')){
				 	$(this).removeClass('open');
			  	}else{
				 	$(this).addClass('open');
			  	}
			})
	 	},

	 	booking: function(){
	 		$('.my_account_page_nav_wrapper').mCustomScrollbar();
			$('#checkout_form_block > *:eq(2), #checkout_form_block > *:eq(3), #checkout_form_block > *:eq(4)').wrapAll('<div class="checkout-information"></div>');
			$('#checkout_form_block > *:eq(0), #checkout_form_block > *:eq(1)').wrapAll('<div class="checkout-items"></div>');
	 	},

		other: function(){
			$('.popup-video').magnificPopup({
			  	type: 'iframe',
			  	fixedContentPos: false
			});

			$( document ).on( 'click', '.yith-wcwl-add-button.show a', function() {
			  $(this).addClass('loading');
			});

			$(document).on('click', '.gva-search > a.control-search', function(){
				let _btn = $(this);
			  	if(_btn.hasClass('search-open')){
				 	_btn.parents('.gva-search').removeClass('open');
				 	_btn.removeClass('search-open');
			  	}else{
				 	_btn.parents('.gva-search').addClass('open');
				 	_btn.addClass('search-open');
				 	setTimeout(function(){ 
		            _btn.parent('.main-search').find('.gva-search input.input-search').first().focus(); 
		         }, 100);
			  	}
			});

			$(document).on('click', '.mini-cart-header .mini-cart', function(e){
				e.preventDefault();
				$(this).parent('.mini-cart-inner').addClass('open');
			});
			$(document).on('click', '.mini-cart-header .minicart-overlay', function(e){
				e.preventDefault();
				$(this).parent('.mini-cart-inner').removeClass('open');
			});

			$('.scroll-link[href*="#"]:not([href="#"])').click(function() {
		      if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
		        var target = $(this.hash);
		        target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
		        if (target.length) {
		          $('html, body').animate({
		            scrollTop: target.offset().top - 100
		          }, 1500);
		          return false;
		        }
		      }
		   });

			$('.gowilds-post-share.style-2 .btn-control-share').on('click', function(e){
				e.preventDefault();
				var wrapper = $(this).parents('.gowilds-post-share');
				if(wrapper.hasClass('open')){
					wrapper.removeClass('open');
				}else{
					wrapper.addClass('open');
				}
			});

			$('.gva-portfolio-grid .portfolio-filter').each(function(){
				$(this).find('.btn-filter').each(function(){
					let _btn = $(this);
					let filter = _btn.attr('data-filter');
					let items = _btn.parents('.gva-portfolio-grid').find('.isotope-items').first();
					_btn.find('.count').first().html('[' + items.find('> ' + filter).length + ']');
				});
			});

			var scrollToTop = function() {
		      var scrollTo = $('#wp-main-content').offset().top - 100;
		      $('html, body').stop().animate({
		         scrollTop: scrollTo
		      }, 400);
		   };

		   $('.gva_widget_recent_give .give-block .give__progress-bar, .content-single-give-form .give-progress-information .give__progress-bar').each(function(){
        		var $progressbar = $(this);
        		$progressbar.css('width', $progressbar.data('progress-max'));
      	});

		   if(!$('.gowilds-gva_ba_item_steps').html()){
      		$('.title-for-step').addClass('hidden');
      	};
			if(!$('#block_faqs').length){
				$('.elementor-widget-babe-item-faqs .babe_post_content_title').addClass('hidden');
			}
		}
	}

	$(window).on('load', function(){
      $(document).on('click', '.minicart-close', function(e){
         e.preventDefault();
         $(this).parents('.cart').removeClass('open');
      })

		if($('.product-single-inner .flex-control-nav').length){
			$('.product-single-inner .flex-control-nav').wrap('<div class="swiper-container product-thumbnail-swiper"></div>');
			$('.product-single-inner .flex-control-nav').after('<div class="swiper-nav-next"></div><div class="swiper-nav-prev"></div>');
			$('.product-single-inner .flex-control-nav').addClass('swiper-wrapper');
			$('.product-single-inner .flex-control-nav > li').addClass('swiper-slide');
			var swiper = new Swiper('.product-single-inner .product-thumbnail-swiper', {
	        	pagination: '.swiper-pagination',
	        	slidesPerView: 'auto',
	        	paginationClickable: true,
	        	spaceBetween: 10,
	        	navigation: {
	        		nextEl: '.swiper-nav-next',
				   prevEl: '.swiper-nav-prev'
				},
	        	breakpoints: {
			  		0: {
			  			slidesPerView: 2
			  		},
			  		390: {
				      slidesPerView: 2
				   },
				   640: {
				   	slidesPerView: 3
				   },
				   768: {
				      slidesPerView: 4
				   },
				   1024: {
				      slidesPerView: 4
				   },
				   1400: { 
				      slidesPerView: 4,
				   }
			  	}
	    	});
		};
	});

  	$(document).ready(function(){
	 	GaviasTheme.init();
  	})

})(jQuery);

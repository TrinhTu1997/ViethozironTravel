(function ($) {
	"use strict";
  	var GaviasElements = {
	 	init: function(){     
			GaviasElements.initDebouncedresize();
			elementorFrontend.hooks.addAction('frontend/element_ready/gva-testimonials.default', GaviasElements.elementTestimonial);
			elementorFrontend.hooks.addAction('frontend/element_ready/gva-posts.default', GaviasElements.elementPosts);
			elementorFrontend.hooks.addAction('frontend/element_ready/gva-portfolio.default', GaviasElements.elementPortfolio);
			elementorFrontend.hooks.addAction('frontend/element_ready/gva-gallery.default', GaviasElements.elementGallery);
			elementorFrontend.hooks.addAction('frontend/element_ready/gva-events.default', GaviasElements.elementEvents);
			elementorFrontend.hooks.addAction('frontend/element_ready/gva-brand.default', GaviasElements.elementBrand);
			elementorFrontend.hooks.addAction('frontend/element_ready/gva_counter_group.default', GaviasElements.elementCounter);
			elementorFrontend.hooks.addAction('frontend/element_ready/gva-services.default', GaviasElements.elementServices);
			elementorFrontend.hooks.addAction('frontend/element_ready/gva-countdown.default', GaviasElements.elementCountDown);
			elementorFrontend.hooks.addAction('frontend/element_ready/gva-user.default', GaviasElements.elementUser);
			elementorFrontend.hooks.addAction('frontend/element_ready/gva-circle-progress.default', GaviasElements.elementCircleProgress);
			
			elementorFrontend.hooks.addAction('frontend/element_ready/gva_icon_box_group.default', GaviasElements.elementInitCarousel);
			elementorFrontend.hooks.addAction('frontend/element_ready/gva-content-carousel.default', GaviasElements.elementInitCarousel);
			
			elementorFrontend.hooks.addAction('frontend/element_ready/gva-team.default', GaviasElements.elementInitCarousel);
			
			elementorFrontend.hooks.addAction('frontend/element_ready/gva-products.default', GaviasElements.elementInitCarousel);
			
			elementorFrontend.hooks.addAction('frontend/element_ready/gva-product-item-related.default', GaviasElements.elementProductItemRelated);
			
			elementorFrontend.hooks.addAction('frontend/element_ready/gva-tab-contact-form.default', GaviasElements.elementTabsContactForm);
			
			elementorFrontend.hooks.addAction('frontend/element_ready/gva-banners.default', GaviasElements.elementBanners);

			elementorFrontend.hooks.addAction('frontend/element_ready/gva_ba_booking.default', GaviasElements.elementInitCarousel);
			elementorFrontend.hooks.addAction('frontend/element_ready/gva_ba_item_gallery.default', GaviasElements.elementInitCarousel);
			elementorFrontend.hooks.addAction('frontend/element_ready/gva_ba_search_form.default', GaviasElements.elementBookingSearchForm);
			elementorFrontend.hooks.addAction('frontend/element_ready/gva_ba_item_booking_form.default', GaviasElements.elementItemBookingForm);
			elementorFrontend.hooks.addAction('frontend/element_ready/gva_ba_item_rating_criteria.default', GaviasElements.elementItemRatingCriteria);
			elementorFrontend.hooks.addAction('frontend/element_ready/gva_ba_item_comment.default', GaviasElements.elementItemRating);
			elementorFrontend.hooks.addAction('frontend/element_ready/gva_ba_item_related.default', GaviasElements.elementInitCarousel);
			elementorFrontend.hooks.addAction('frontend/element_ready/gva-team.default', GaviasElements.elementInitCarousel);

			elementorFrontend.hooks.addAction('frontend/element_ready/column', GaviasElements.elementColumn);

			elementorFrontend.hooks.addAction('frontend/element_ready/section', GaviasElements.elementRow);

	 	},
	 	backend: function(){
	 		elementor.settings.page.addChangeCallback( 'gowilds_post_preview', GaviasElements.handlePostPreview);
	 	},
	 	handlePostPreview: function(doc_preview_post_id){
		 	elementor.saver.update({
	         onSuccess: function onSuccess() {
	            window.location.reload();
	         }
	      });
      	window.location.reload();
		},

	 	initDebouncedresize: function(){
		 	var $event = $.event,
		  	$special, resizeTimeout;
		  	$special = $event.special.debouncedresize = {
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
					 	$event.dispatch.apply(context, args);
				  	};

				  	if (resizeTimeout) {
					 	clearTimeout(resizeTimeout);
				  	}

					execAsap ? dispatch() : resizeTimeout = setTimeout(dispatch, $special.threshold);
			 	},
		  		threshold: 150
			};
		},

		elementColumn: function($scope){

			if(($scope).hasClass('gv-sidebar-offcanvas')){
				var html = '<div class="control-mobile">';
		         	html += '<a class="control-mobile-link" href="#"><i class="las la-bars"></i>Show Sidebar<a>';
		         html += '</div>';
				$scope.append(html);

				html = '<span class="filter-top"><a href="#" class="btn-close-filter"><i class="fas fa-times"></i></a></span>';
				$scope.children('.elementor-column-wrap, .elementor-widget-wrap').children('.elementor-widget-wrap').prepend(html);
			}
			
			var _body = $('body');
			var _sidebar = $scope;
			
			$($scope).find('.control-mobile, .btn-close-filter').on('click', function(e){
				e.preventDefault();
				if(_body.hasClass('open-el-sidebar-offcanvas')){
					_sidebar.removeClass('open');
					setTimeout(function(){
						_body.removeClass('open-el-sidebar-offcanvas');
					 }, 200);
				}else{
					_sidebar.addClass('open');
					_body.addClass('open-el-sidebar-offcanvas');
				}
			});
		},

		elementPostArchive: function($scope){
		
			var $container = $scope.find('.post-masonry-style');
			$container.imagesLoaded( function(){
		  		$container.masonry({
			 		itemSelector : '.item-masory',
			 		gutterWidth: 0,
			 		columnWidth: 1,
		  		}); 
			});
		},

		elementTestimonial: function($scope){
			var $carousel = $scope.find('.init-carousel-swiper');
			GaviasElements.initCarousel($carousel);
		},


		elementPosts: function($scope){
			var $carousel = $scope.find('.init-carousel-swiper');
			GaviasElements.initCarousel($carousel);
		},


		elementServices: function($scope){
			var $carousel = $scope.find('.init-carousel-swiper');
			GaviasElements.initCarousel($carousel);
		},

		elementPortfolio: function($scope){
			var $carousel = $scope.find('.init-carousel-swiper');
			GaviasElements.initCarousel($carousel);
			if( $.fn.isotope ){
			  	if($('.isotope-items').length){
				 	$( '.isotope-items' ).each(function() {
						var $el = $( this ),
						$filter = $( '.portfolio-filter a'),
						$loop =  $( this );

						$loop.isotope();
					
						$(window).load(function() {
					  		$loop.isotope( 'layout' );
						});
				 
						if ( $filter.length > 0 ) {
					  	$filter.on( 'click', function( e ) {
						 	e.preventDefault();
						 	var $a = $(this);
						 	$filter.removeClass( 'active' );
						 	$a.addClass( 'active' );
						 	$loop.isotope({ filter: $a.data( 'filter' ) });
					  	});
					};
				 });
			  }
			};
		},

		elementGallery: function($scope){
			var $carousel = $scope.find('.init-carousel-swiper');
			GaviasElements.initCarousel($carousel);
		},

	 	elementEvents: function($scope){
			var $carousel = $scope.find('.init-carousel-swiper');
			GaviasElements.initCarousel($carousel);
	 	},

	 	elementBrand: function($scope){
			var $carousel = $scope.find('.init-carousel-swiper');
			GaviasElements.initCarousel($carousel);
	 	},

	 	elementCounter: function($scope){
		 	var $carousel = $scope.find('.init-carousel-swiper');
			GaviasElements.initCarousel($carousel);

			$scope.find('.milestone-block').each(function(){
				var block = $(this);
				block.appear(function() {
				  	var $endNum = parseInt(block.find('.milestone-number').text());
				  	block.find('.milestone-number').countTo({
					 	from: 0,
					 	to: $endNum,
					 	speed: 4000,
					 	refreshInterval: 60,
					 	formatter: function (value, options) {
							value = value.toFixed(options.decimals);
							value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
							return value;
					 	}
				  	});
				},{accX: 0, accY: 0});
			})
	 	},

	 	elementCountDown: function($scope){
			$('[data-countdown="countdown"]').each(function(index, el) {
			  var $this = $(this);
			  var $date = $this.data('date').split("-");
			  $this.gvaCountDown({
				 	TargetDate:$date[0]+"/"+$date[1]+"/"+$date[2]+" "+$date[3]+":"+$date[4]+":"+$date[5],
				 	DisplayFormat:"<div class=\"countdown-times\"><div class=\"day\">%%D%% <span class=\"label\">Days</span> </div><div class=\"hours\">%%H%% <span class=\"label\">Hours</span> </div><div class=\"minutes\">%%M%% <span class=\"label\">Minutes</span> </div><div class=\"seconds\">%%S%% <span class=\"label\">Seconds</span></div></div>",
				 	FinishMessage: "Expired"
			  });
			});
	 	},

		elementInitCarousel: function($scope){
			var $carousel = $scope.find('.init-carousel-swiper');
			GaviasElements.initCarousel($carousel);
		},

		elementProductItemRelated: function($scope){
			var $carousel = $scope.find('.init-carousel-swiper-theme');
			GaviasElements.initCarousel($carousel);
		},

		elementBanners: function($scope){
			var $carousel = $scope.find('.init-carousel-swiper');
			GaviasElements.initCarousel($carousel);
		},

		elementCircleProgress: function($scope){
			$scope.find(".circle-progress").appear(function () {
		      $scope.find(".circle-progress").each(function () {
		         let progress = $(this);
		         let progressOptions = progress.data("options");
		         progress.circleProgress({
		         	startAngle: -Math.PI / 2
		         }).on('circle-animation-progress', function(event, progress, stepValue) {
					   $(this).find('strong').html(Math.round(stepValue.toFixed(2) * 100) + '<i>%</i>');
					});
		      });
		   });
		},

		elementTabsContactForm: function($scope){
	      $scope.find(".get-insurance__range").each(function () {
	      	let range = $(this);
	      	let show = range.find('.get-insurance__balance span');
	      	let input = range.find('.get-insurance__balance-input');
	      	range.find('.balance-range-slider').ionRangeSlider({
       		 	onStart: function (data) {
                  show.html(data.from);
                  input.prop("value", data.from);
              },
              onChange: function (data) {
                  show.html(data.from);
                  input.prop("value", data.from);
              }
        		});
	      });

		},

		//Booking Elements
		elementItemBookingForm: function($scope){
			var _form = $scope.find('form#booking_form').first();
			_form.find('.booking_services_inner .list_service .list_service_title').each(function(){
				var _this = $(this);
				var value = _this.find('input').val();
				var title = _this.find('h4').html();
				_this.find('input').attr('id', 'input_' + value).unwrap();
				_this.find('h4').html('<label for=input_' + value + '>' + title + '</label>');
				_this.find('label').unwrap();
			});
		},

		elementBookingSearchForm: function($scope){
			var _form = $scope.find('form.babe-search-form').first();
			
			var data_hidden = $scope.find('.data-hidden').first().data('hidden-tax');
			for (let i = 0; i < data_hidden.length; ++i){
				_form.find('.input-group > div[data-tax="' + data_hidden[i] + '"]').remove();
			}

			var count = _form.find('.input-group > .is-active:not(.search_advanced_field):not(.input_select_field_time_from):not(.input_select_field_time_to)').length;

			_form.addClass('form-col-' + count);

			$scope.find('.search-keyword-block.is-active').each(function(){
				var input = $(this);
				var title = $scope.find('.form-fields-title .search_box_title').text();
				$(input).find('> i').wrap('<div class="icon"></div>');
				input.find('.search-keyword').wrap('<div class="field-content"></div>');
				input.find('.field-content').prepend('<div class="title-field">' + title + '</div>');
			});	

			$scope.find('.search_date_wrapper_date_from.is-active').each(function(){
				var input = $(this);
				var title = $scope.find('.form-fields-title .date_from_title').text();
				$(input).find('> i').wrap('<div class="icon"></div>');
				input.find('#date_from').wrap('<div class="field-content"></div>');
				input.find('.field-content').prepend('<label class="title-field" for="date_from">' + title + '</label>');
			});

			$scope.find('.search_date_wrapper_date_to.is-active').each(function(){
				var input = $(this);
				var title = $scope.find('.form-fields-title .date_to_title').text();
				$(input).find('> i').wrap('<div class="icon"></div>');
				input.find('#date_to').wrap('<div class="field-content"></div>');
				input.find('.field-content').prepend('<label class="title-field" for="date_to">' + title + '</label>');

			});

			$scope.find('.search_guests_field.is-active').each(function(){
				var input = $(this);
				$(input).find('> i').wrap('<div class="icon"></div>');
				input.find('> div:not(.icon)').addClass('field-content');
			});
			 
			$scope.find('.add_input_field.is-active').each(function(){
				var input = $(this);
				var tax = $(this).attr('data-tax');
				var title = $scope.find('.form-fields-title .' + tax + '_title').text();
				$(input).find('> i').wrap('<div class="icon"></div>');
				input.find('.add_ids_title').wrap('<div class="field-content"></div>');
				input.find('.field-content').prepend('<div class="title-field">' + title + '</div>');
			});

			$scope.find('.is-active:not(.search_advanced_field)').each(function(){
				$(this).find('> div').wrapAll( "<div class='field-group-content'></div>");
			});

			$scope.find('.search_advanced_field .advanced-header').each(function(){
				var html = $(this).html();
				$(this).html(html.replace("All ", ""));
			});

			setTimeout(function(){
	         $scope.find('.gowilds-search-form-wrap').addClass('show');
	   	}, 360);

		},

		elementItemSingleIncludeExclude: function($scope){
			var icon = $scope.find('.icon_list').first();
			icon.parents('.content-inner').find('ul li').each(function(){
				$(this).wrapInner('<span class="list-text"></span>');
				$(this).prepend(icon.html());
			});
		},

		elementItemRatingCriteria: function($scope){
			$("[data-progress-animation]").each(function() {
	        var $this = $(this);
	        $this.appear(function() {
	          var delay = ($this.attr("data-appear-animation-delay") ? $this.attr("data-appear-animation-delay") : 1);
	          if(delay > 1) $this.css("animation-delay", delay + "ms");
	          setTimeout(function() { $this.animate({width: $this.attr("data-progress-animation")}, 1000);}, delay);
	        }, {accX: 0, accY: -50});
	      });
		},

		elementItemRating: function($scope){
			var count = 0;
			var total = 0;
			var avg_html = $scope.find('.avg-total-tmp').html();
			$scope.find('form.comment-form .comment-form-rating-ul').after('<div class="avg-review">' + avg_html + '</div>');
			$scope.find('.comment-form-rating-ul').find('.fa-star').removeClass('fa').addClass('fas');
			$scope.find('input.rating_hidden_input').val(5);
			
			$('.comment-form-rating-stars').on('click', '.star', function(event){
			  	var count = 0;
			  	var total = 0;
			  	$scope.find('input.rating_hidden_input').each(function(){
				 	var val = $(this).val();
				 	if(val){
						val = parseInt(val);
						if(Number.isInteger(val)){
					  		total += val;
					  		count ++;
						}  
				 	}
			  	});
			  	var avg = total/count;
				$scope.find('.avg-review .value').html(avg.toFixed(2));
			});
		},

		initCarousel: function($target){
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
					el: $target.parents('.swiper-slider-wrapper').find('.swiper-pagination')[0],
				   type: settings.pagination_type,
				   clickable: true,
				  	dynamicBullets: settings.dynamic_bullets
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

			const swiper = new Swiper($target[0], {
			  	loop: settings.loop,
			  	spaceBetween: settings.space_between,
			  	autoplay: _autoplay,
			  	speed: settings.speed,
			  	grabCursor: false,
			  	centeredSlides: false,
			  	centeredSlidesBounds: true,
			  	effect: settings.effect,
			  	breakpoints: {
			  		0: {
			  			slidesPerView: 1
			  		},
			  		560: {
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
				      slidesPerView: settings.items
				   }
			  	},
			  	pagination: _pagination,
			  	navigation: _navigation,
			   observer: true,  
	       	observeParents: true,
	       	slideVisibleClass: 'item-active',
	       	watchSlidesVisibility: true,
	       	on: {
	       		progress: function(){
	       			var total = $target.find('.swiper-slide.item-active').length;
	       			
						$target.find('.swiper-slide').removeClass('first');
						$target.find('.swiper-slide').removeClass('last');
						$target.find('.swiper-slide').removeClass('center');
						
						var start = 0;
						if(total == 5){start = 1;}

						$target.find('.swiper-slide.item-active').each(function(index){
							if(index === start) {
								$(this).addClass('first')
							}
							if(index === start + 1){
								$(this).addClass('center')
							}
							if( index === total - (start + 1) && total > (start + 1) ) {
								$(this).addClass('last')
							}
						})
	       		},
		      }
			});

			if(settings.autoplay_hover && settings.autoplay){
				$target.hover(function() {
		 			swiper.autoplay.stop();
				}, function() {
				   swiper.autoplay.start();
				});
			}
		}
  };
  
  $(window).on('elementor/frontend/init', GaviasElements.init);   

}(jQuery));

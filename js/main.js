/* global window, document, setTimeout, Packery, jQuery, $, console, Snap, Util, Bond */

var global = {};

(function ($) {

    $(document).ready(function () {

        global.$window = $(window);
        global.$document = $(document);

        all();
        menu();
        archiveExhibition();
        singleExhibition();
        page();
        home();
        kalender();
        undervisning();
        klubbrandts();
        ipad_signup();
        bottomFixed();

        $(".break").fitVids();
    });
    function undervisning() {
        if (!$("body.page-template-page-undervisning-php").length) return;

        //check if odd numbers of .undervisning divs
		if ($('.undervisning').length % 2 ) {
			$('.undervisning:first-child').addClass('odd-first-child');
		}

        var current;
        var $filter = $('.js-filter');
        var $filterButtons = $('.js-filterButton');
        $filter.isotope({
            itemSelector: '.js-filterItem',
            layoutMode: 'fitRows'
        });

        var height = $('.bottom-fixed-content').height() - $('.undervisning-filter').height()
        $filter.css('min-height', height);

        $filterButtons.click(function(e){
            var $current = $(e.currentTarget);
            var filterValue = $current.data('filter');

            $filterButtons.each(function(i,el){
                $(el).removeClass('is-active');
            });

            if(current === e.currentTarget){
                $filter.isotope({filter: "*"});
                $current.removeClass('is-active');
                current = undefined;
            }else{
                $filter.isotope({filter: "." + filterValue});
                $current.addClass('is-active');
                current = e.currentTarget;
            }

            
        });

	}

    function bottomFixed() {
		var $divs = $('.bottom-fixed'),
    		$lowestDiv,
    		lowestDivHeight = 999999999; //Higher than highest div ever

		// if .bottom-fixed exists
		if(!$divs.length) return;

		var initializeBottomFixed = function() {

			if(typeof $lowestDiv != "undefined") $lowestDiv.removeClass('bottom-fixed-div');
			if($('.bottom-fixed-active').length) $('.bottom-fixed-active').removeClass('bottom-fixed-active');

			lowestDivHeight = 999999999; //Higher than highest div ever

			$divs.each(function() {
				var $this = $(this),
				thisHeight = $this.children('.bottom-fixed-content').outerHeight();

				// Saving the lowest div
				if(thisHeight < lowestDivHeight) {
					$lowestDiv = $this;
					lowestDivHeight = thisHeight;
				}
			})

			$lowestDiv.addClass('bottom-fixed-div');
		}

	    $(window).scroll(function () {

			if(lowestDivHeight + 80 - window.innerHeight <= $(window).scrollTop()) {
	        	$lowestDiv.addClass('bottom-fixed-active');
	        } else {
		        $lowestDiv.removeClass('bottom-fixed-active');
	        }
	    });


	    initializeBottomFixed();

      	$(window).on('resize', function() {
        	initializeBottomFixed();
        });
    }


    $(document).bind('gform_post_render', gravityForms);

    function gravityForms(){

        $('.gform_wrapper .gform_body .gfield ').each(function() {
            var $label = $(".gfield_label", this);
            var $input = $("input", this);

            if($label.length){
                $input.attr('placeholder',$label.text());
                $label.remove();
            }

        });
    }

    function klubbrandts(){
        if (!$("body.page-template-page-klub-brandts-php").length) return;

        var initialize = function() {
            signUpForm();
            selectMembership();
            handleSubmit();
        };

        var currentStep = 1,
            signUpForm = function() {
            $('.button[data-personal]').click(function(e) {
                e.preventDefault();
								var is_valid = stepPersonalValid();
								if (is_valid) {
									currentStep ++;
									$('.form-container').attr('data-step', currentStep);
								}
            });

            $('.btn-back').click(function(e) {
							e.preventDefault();
							currentStep --;
							$('.form-container').attr('data-step', currentStep);
            });
        },

				selectMembership = function() {
					var btns = $('.step.membership .membership-type');
					btns.click(function(ev) {
						ev.preventDefault();
						btns.removeClass('checked');
						$(this).addClass('checked');
						$('input[type=hidden][name=membertype]').val($(this).data('value'));
						$('button[data-finalsubmit]').removeClass('hide');
					});
				},

				handleSubmit = function() {
					var form = $('.form-container form');
					form.submit(function(ev) {
						ev.preventDefault();
						currentStep++;
						$('.form-container').attr('data-step', currentStep);

						// submit via ajax
						$.post(location.pathname+'?create_reciept', form.serialize(), function(res) {
							if (res.redirect) {
								window.location = res.redirect;
							}
						}, 'json');
					});
				},

				stepPersonalValid = function() {
					var fieldError = function(field, msg) {
						if (field.hasClass('invalid')) return false;
						field.
							addClass('invalid').
							tooltip('destroy').
							tooltip({ title: msg, 'trigger': 'manual', 'placement': 'bottom' }).
							tooltip('show').
							one('focus', function() {
								$(this).tooltip('hide').removeClass('invalid');
							});

						return false;
					};

					// validate the personal information form
					var outer = $('#personalForm');

					// all fields are required
					var missingRequired = false;
					outer.find('input[type=text]').each(function() {
						if($.trim($(this).val()).length == 0) {
							missingRequired = true;
							fieldError($(this), 'Feltet skal udfyldes.');
						}
					});
					if (missingRequired) return false;

					// validate e-mail
					var rule = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
					if (!rule.test($('#email').val())) return fieldError($('#email'), 'E-mail\'en er ugyldig.');

					return true;
				};

        initialize();
    }

    function ipad_signup(){
        if (!$("body.page-template-page-ipad-landing-php").length) return;

        var currentStep = 1;

        var rule = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        var initialize = function() {
            initForm();
            addEventListenerToDetailsButton();
            addListenerToLookupField();
            formCheckboxes();
        };

        var action = "";
        var formContainer = $('.form-container');

        var setCurrentStep = function(direction) {
            if( ! direction ) {
                currentStep--;
            } else {
                currentStep++;
            }

            formContainer.attr('data-step', currentStep);
        }

        var addEventListenerToDetailsButton = function () {
            $('button[data-personal]').click(function () {
                if( formContainer.hasClass('existing') ) {
                    if( rule.test( $('#lookup_email').val() ) )
                        setCurrentStep(true);
                } else {
                    var is_valid = stepPersonalValid();
                    if (is_valid)
                        setCurrentStep(true);
                }
            });
        }

        var addListenerToLookupField = function () {
            $(':input#lookup_email').on('keyup', function (e) {
                if( ! rule.test( $(this).val() ) )
                    return;

                var $wrapper = $(this).closest('.show-on-existing');
                var $infoContainer = $('.client-information', $wrapper);

                if( typeof jqXhr !== 'undefined' )
                    jqXhr.abort();

                var jqXhr = $.post('/wp-admin/admin-ajax.php', {action:'lookup_email', email: $(this).val()});

                jqXhr.always(function (data) {
                    $infoContainer.html(data.html);
                });
            });
        }

        var initForm = function () {
            var steps = $('.step', formContainer);

            formContainer.css('width', (steps.length * 100).toString() + '%');
            steps.css('width', (100 / steps.length).toString() + '%');

            $('form', formContainer).on('submit', function (e) {
                e.preventDefault();

                if( typeof jqXhr !== 'undefined' )
                    jqXhr.abort();

                var jqXhr = $.post('/wp-admin/admin-ajax.php', $(this).serialize()+'&action=ipad_register_user');

                jqXhr.always(function (data) {
                    if( data.error ) {
                        alert('Der skete en fejl. PrÃ¸v venligst igen, eller kontakt personalet.');
                        return;
                    }

                    setCurrentStep(true);

                    setTimeout(function() {
                        location.reload();
                    }, 15000);
                });
            });

            $('button[type="button"]:not([data-value], [data-personal])', formContainer).click(function (e) {
                e.preventDefault();
                setCurrentStep( !$(this).hasClass('back') );
            });
        };

        var formCheckboxes = function () {
            $('.choose_action button[data-value]').click(function (e) {
                e.preventDefault();

                $('.form-container').removeClass(action).addClass($(this).attr("data-value"));
                action = $(this).attr("data-value");
            });

            $(document).on('click', 'button[data-value]', function (e) {
                e.preventDefault();
                var $parent = $(this).parent();

                $('button[data-value]', $parent).removeClass('checked');
                $(this).addClass('checked');

                $('input[type="hidden"]', $parent).val( $(this).attr('data-value') );

                $parent.closest('.step').find('.button.hide').removeClass('hide');
            });
        };

        var stepPersonalValid = function() {
            var fieldError = function(field, msg) {
                if (field.hasClass('invalid')) return false;
                field.
                    addClass('invalid').
                    tooltip('destroy').
                    tooltip({ title: msg, 'trigger': 'manual', 'placement': 'bottom' }).
                    tooltip('show').
                    one('focus', function() {
                        $(this).tooltip('hide').removeClass('invalid');
                    });

                return false;
            };

            // validate the personal information form
            var outer = $('#personalForm');

            // all fields are required
            var missingRequired = false;
            outer.find('input[type=text]').each(function() {
                if($.trim($(this).val()).length == 0) {
                    missingRequired = true;
                    fieldError($(this), 'Feltet skal udfyldes.');
                }
            });
            if (missingRequired) return false;

            // validate e-mail
            var rule = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (!rule.test($('#email').val())) return fieldError($('#email'), 'E-mail\'en er ugyldig.');

            return true;
        };

        initialize();
    }

    function all(){

        // Gallery
        $(".fancybox").fancybox({
            padding:0,
            openEffect: 'fade',
            closeEffect: 'fade',
            helpers : {
                title: {
                    type: 'outside'
                }
            }
        });

        // Typography

		$('.flowtype').flowtype({
           minFont: 12,
           maxFont : 18
        });


        var i = 0;
        var interval = setInterval(function(){
           $(window).resize();
            if (i++>10) clearInterval(interval);
        }, 50);


        if ($(".description p").length) {
        	$(".description p").addClass("break");
		}

        // Wordbreak
        Hyphenator.config({
            classname: "break",
            donthyphenateclassname: "normal",
            minwordlength: 6
        });

        Hyphenator.run();

    }

    function page(){
        if (!$("body.page").length) return;
    }

    function home(){
        if (!$("body.home").length) return;

        var $slidenav = $('.slide-nav'),
        	$innerWrapper = $('.slide-nav-wrapper'),
			$pictureLinks = $('.picture a');

		$slidenav.mouseover(function(){
			var slideIndex = $slidenav.index($(this));

			$('#carousel-home').carousel(slideIndex);
			$('#carousel-home').carousel('pause');
		})

		$slidenav.mouseout(function(){
			$('#carousel-home').carousel('cycle');
		})

		$pictureLinks.click(function(e){
			window.location.href = $(this).attr('href');
		})

        $('#carousel-home').on('slide.bs.carousel', function (e) {
            var $target = $(e.relatedTarget);
            var slide = $target.attr('data-slide');
            var color = $target.attr('data-slide-color');

            $slidenav.each(function(i,el){
                var $el = $(el),
                    slideId = 'slide-'+slide;

                $innerWrapper.css({
                    "background-color": color
                })

                if($el.hasClass(slideId)){
                    $el.addClass("active");
                }else{
                    $el.removeClass("active");
                }
            })
        })
    }

    function singleExhibition(){
        if (!$("body.single-exhibition").length) return;

		$('.carousel').carousel({
			interval: 3000
		});

		function carouselNormalization() {
			var items = $('#reviews .item'), //grab all slides
			    heights = [], //create empty array to store height values
			    tallest; //create variable to make note of the tallest slide

			if (items.length) {
			    function normalizeHeights() {
			        items.each(function() { //add heights to array
			            heights.push($(this).height());
			        });
			        tallest = Math.max.apply(null, heights); //cache largest value
			        items.each(function() {
			            $(this).css('min-height',tallest + 'px');
			        });
			    };
			    normalizeHeights();

			    $(window).on('resize orientationchange', function () {
			        tallest = 0, heights.length = 0; //reset vars
			        items.each(function() {
			            $(this).css('min-height','0'); //reset min-height
			        });
			        normalizeHeights(); //run it again
			    });
			}
		}

		carouselNormalization();

    }


    function archiveExhibition() {
        if (!$("body.post-type-archive-exhibition").length) return;
        //flowtype();

        if(Modernizr.touch) return;

        var $exhibitionTeaser = $('.exhibition-archive-content');
        var $exhibitionArchive = $('.exhibition-archive');
        var scrollQueue = [];

        var winHeight = global.$window.height(),
            docHeight = global.$document.outerHeight();


        global.$window.resize(function () {
            winHeight = global.$window.height();
            docHeight = global.$document.outerHeight();
        });

        global.$window.scroll(function () {
            parallaxHandle();
        });

        global.bond = new Bond();
        //global.bond.report = true;
        global.bond.spyon([
            {
                victim: $exhibitionTeaser,
                extra: {
                    name: "parallax"
                },
                missionData: {
                    animation: {
                        in : function (e) {
                            if (e.parallax === undefined) e.parallax = {};
                            e.parallax.active = true;
                        },
                        out: function (e) {
                            e.parallax.active = false;
                        }
                    }
                }
            },
            {
                victim: $exhibitionTeaser,
                missionData:{
                    visibility:{
                        top:0,
                        bottom:200
                    },
                    animation:{
                        cssClass: "rotate-in",
                        once: true,
                    }
                }
            }
        ]).start();

        var i, l = global.bond.victims.length;
        for (i = 0; i < l; i++) {
            var item = global.bond.victims[i];
            if (item.extra.name === "parallax") {
                if (item.parallax === undefined) item.parallax = {
                    active: false
                };
                scrollQueue.push(item)
            }
        }

        parallaxHandle();

        function parallaxHandle() {

            var i, l = scrollQueue.length;
            var scroll = global.$window.scrollTop() + winHeight;
            if (scroll < 0) scroll = 0;

            for (i = 0; i < l; i++) {
                var item = scrollQueue[i];
                if (itemHeight === undefined) var itemHeight = item.$victim.height();

                if (item.parallax.active) {
                    if (item.parallax.$child === undefined) item.parallax.$child = item.$victim.find(".background-image");
                    var s = scroll - item.location;
                    var h = winHeight + itemHeight;
                    var pct = Math.floor((s / h) * 100) * 2;

                    item.parallax.$child.css({
                        '-webkit-transform': 'translate3d(0,' + pct + 'px,0)',
                        '-moz-transform': 'translate3d(0,' + pct + 'px,0)',
                        '-ms-transform': 'translate3d(0,' + pct + 'px,0)',
                        '-o-transform': 'translate3d(0,' + pct + 'px,0)',
                        'transform': 'translate3d(0,' + pct + 'px,0)',
                        'zoom': 1
                    });
                }
            }
        }
    }

     function kalender() {
        if (!$("body.page-template-page-kalender-php").length) return;

        $events = $('.kalender-anchor.event');
        $infoboxes = $('.kalender-item-info');

        $events.click(function (e) {
            e.preventDefault();
            $this = $(this);

            $infoboxes.each(function (i, el) {
                $el = $(el);
                if ($el.parents('.kalender-item-wrapper').hasClass('active')) $el.parents('.kalender-item-wrapper').removeClass("active");
            })

            $infobox = $('.kalender-item-info', $this.parents('.kalender-item'));
            $close = $('.close-btn', $infobox);

            $infobox.css({
                "background-color": $this.attr('data-color')
            });
            $('.kalender-item-info-date', $infobox).html($this.attr('data-time-start') + " - " + $this.attr('data-time-end'));
            $('.kalender-item-info-header', $infobox).html($this.attr('data-title'));
            $('.kalender-item-info-content', $infobox).html($this.attr('data-description'));

            $infobox.parents('.kalender-item-wrapper').addClass("active");
            $close.click(function () {
                $infobox.parents('.kalender-item-wrapper').removeClass("active");
            })
        })
    }

    function menu() {
        var $menu = $(".main-menu");
        var $menubar = $(".main-menu .menubar, .menu-label");
        var $content = $("#main");

        var $menuClose = $(".main-menu .close-sub");
        var $menuUl = $("ul.menu");
        var $submenuUl = $("ul.menu>li");
        var $menuItem = $("ul.menu>li.menu-item-has-children>a");
        var to;

        $menuClose.bind('click', function (e) {
            e.preventDefault();
            $menuUl.removeClass("active");
            $submenuUl.removeClass("active");
            $menuClose.removeClass("active");
        });

        $menuItem.bind('click', function (e) {
            e.preventDefault();
            $(this).parent().addClass("active");
            $(this).parent().parent().addClass("active");
            $menuClose.addClass("active");
        });

        menuHandler.toggle = true;

        $menubar.bind("click", function (e) {
            e.preventDefault();
            menuHandler();
        });

        function menuHandler() {
            if (menuHandler.toggle) {
                $menu.attr('class', 'main-menu active');
                //$('body').css('overflow','hidden');
                checkOutOfBounds();
            } else {
                $menu.attr('class', 'main-menu deactive');
                //$('body').css('overflow','scroll');
                clearTimeout(to);
                menuFixed();
            }
            menuHandler.toggle = !menuHandler.toggle;
        }

        function checkOutOfBounds(){
            var menuHeight = $menuUl.outerHeight() + $menuUl.position().top;
            if(menuHeight > global.$window.height()){
                to = setTimeout(function(){
                    global.$window.scrollTop(0);
                    menuAbs();
                }, 500)
            }
        }

        function menuAbs(){
            $menu.css({
                "position":"absolute",
                "height": global.$document.outerHeight() + "px"
            })
        }

        function menuFixed(){
            $menu.css({
                "position":"fixed",
            })
        }

        /* LOCAL STORAGE MENU
		if (localStorage.getItem('visit') === null) {
			$('.menu-label').addClass('active');

			$('.menu-item:not(.menu-item-has-children)').click(function() {
				$('.menu-label').removeClass('active');
				localStorage.setItem('visit', 'true');
			})
		}
		*/

    }

}(jQuery));




(function () {

    var Util = {};

    Util.limitTo = function (val, limit) {
        return (val < limit) ? val : limit;
    };

    Util.resizeTo = function (target, container, scaleto) {
        var width = container.width(),
            height = container.height(),
            scale = scaleto,
            whdiff = Util.limitTo((width / height) + 0.14, 1),
            hwdiff = (height / width),
            dim = (width > height) ? width * scale * hwdiff : height * scale * whdiff;
        target.width(dim).height(dim);
    };

    window.Util = Util;

}());

;(function ($) {
  $('.notification').addClass('show');

  $(document).on('click', '.notification div', function (e) {
    e.preventDefault();
    $(this).parent().removeClass('show');
  });
})(jQuery);
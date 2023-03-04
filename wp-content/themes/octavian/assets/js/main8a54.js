;(function($) {
    'use strict';

    // PreLoader
    var preLoader = function() {
        if ( $().animsition ) {             
            $('.animsition').animsition({
                inClass: 'fade-in',
                outClass: 'fade-out',
                inDuration: 1500,
                outDuration: 800,
                loading: true,
                loadingParentElement: 'body',
                loadingClass: 'animsition-loading',
                timeout: false,
                timeoutCountdown: 5000,
                onLoadEvent: true,
                browser: [
                    '-webkit-animation-duration',
                    '-moz-animation-duration',
                    'animation-duration'
                    ],
                overlay: false,
                overlayClass: 'animsition-overlay-slide',
                overlayParentElement: 'body',
                transition: function(url){ window.location.href = url; }
            });
        }
    };

    // Menu Search Icon
    var searchIcon = function() {
        var search_wrap = $('.search-style-fullscreen');
        var search_trigger = $('.header-search-trigger');
        var search_field = search_wrap.find('.search-field');

        search_trigger.on('click', function(e) {
            if ( ! search_wrap.hasClass('search-opened') ) {
                search_wrap.addClass('search-opened');
                search_field.get(0).focus();

            } else if (search_field.val() == '') {
                if ( search_wrap.hasClass('search-opened') )
                    search_wrap.removeClass('search-opened');
                else search_field.get(0).focus();

            } else {
                 search_wrap.find('form').get(0).submit();
            }

            $('html').addClass( 'disable-scroll' );
            e.preventDefault();
            return false;
        });

        search_wrap.find('.search-close').on('click', function(e) {
            search_wrap.removeClass('search-opened');
            $('html').removeClass( 'disable-scroll' );
            e.preventDefault();
            return false;
        });
    };

    // Mobile Navigation
    var mobileNav = function() {

        var menuType = 'desktop';

        $(window).on('load resize', function() {
            var
            mode = 'desktop',
            wrapMenu = $('.site-header-inner .wrap-inner'),
            navExtw = $('.mobi-nav-extra'),
            navExt = $('.mobi-nav-extra').children('.ext').filter(':not(".menu-logo")'),
            navLogo = $('.mobi-nav-extra').children('.menu-logo');

            if ( matchMedia( 'only screen and (max-width: 991px)' ).matches )
                mode = 'mobile';

            if ( mode != menuType ) {
                menuType = mode;

                if ( mode == 'mobile' ) {
                    if ( $('#main-nav').length ) {
                        $('.mobile-button').show();

                        $('#main-nav').attr('id', 'main-nav-mobi')
                            .appendTo('body')
                            .children('.menu').prepend(navLogo).append(navExt)
                                .find('li:has(ul)')
                                .children('ul')
                                    .removeAttr('style')
                                    .hide()
                                    .before('<span class="arrow"></span>');
                    }
                } else {

                    $('.mobile-button').removeClass('hide');
                    $('html').removeClass( 'disable-scroll' );
                    $( '.mobi-overlay' ).removeClass('show');
                    $('.mobile-button').hide();

                    $('#main-nav-mobi').attr('id', 'main-nav')
                        .removeAttr('style')
                        .prependTo(wrapMenu)
                            .find('.ext').appendTo(navExtw)
                        .parent().siblings('#site-header')
                            .find('#main-nav .sub-menu')
                                .removeAttr('style')
                            .prev().remove();
                }
            }
        });

        $('.mobi-overlay').on('click', function() {
            $('.mobile-button').removeClass('hide');
            $(this).removeClass('show');
            $("#main-nav-mobi").animate({ left: "-300px" }, 300, 'easeInOutExpo')
            $('html').removeClass( 'disable-scroll' );
        } );

        $(document).on('click', '.mobile-button', function() {
            $('.mobile-button').addClass('hide');
            $( '.mobi-overlay' ).addClass('show');
            $('html').addClass( 'disable-scroll' );
            $("#main-nav-mobi").animate({ left: "0"}, 300, 'easeInOutExpo')
        })

        $(document).on('click', '#main-nav-mobi .arrow', function() {
            $(this).toggleClass('active').next().stop().slideToggle();
        })
    };

    var fixNav = function() {
        var
        nav = $('#main-nav'),
        wNav = $('.widget_nav_menu'),
        docW = $(window).width(),
        c = $('.site-header-inner'),
        cl = c.offset().left,
        cw = c.width();

        if ( nav )
            nav.find('.sub-menu').each(function() {
            var
            off = $(this).offset(),
            l = off.left,
            w = $(this).width(),
            il = l - cl,
            over = ( il + w >= cw );

            if ( over )
                $(this).addClass('left');
            });

        if ( wNav.length != 0 )
            wNav.find('a:empty')
                .closest('li').remove();
    };

    // One Page
    var onePage = function() {
        $('#menu-one-page li').filter(':first').addClass('current-menu-item');

        $('#menu-one-page li a').on('click',function() {
            var anchor = $(this).attr('href').split('#')[1];

            if ( anchor ) {
                if ( $('#'+anchor).length > 0 ) {
                    var headerHeight = 0;

                    //if ( $('body').hasClass('header-fixed') )
                    //    headerHeight = $('#site-header').height();

                    var target = $('#' + anchor).offset().top - headerHeight;

                    $('html,body').animate({scrollTop: target}, 1000, 'easeInOutExpo');
               }
            }
            return false;
        });

        $(window).on("scroll", function() {
            var scrollPos = $(window).scrollTop();

            if ( $('body').hasClass('header-fixed') ) {
                var headerHeight = $('#site-header').height();
                scrollPos = scrollPos + headerHeight;
            }

            $('#menu-one-page .menu-item a').each(function () {
                var link = $(this);
                var block = $( link.attr("href") );

                if ( block.offset().top <= scrollPos 
                    && block.offset().top + block.height() > scrollPos ) {
                    $('#menu-one-page li').removeClass("current-menu-item");
                    link.parent().addClass("current-menu-item");
                } else {
                    link.parent().removeClass("current-menu-item");
                }
            });
        });
    };

    // Responsive Videos
    var responsiveVideos = function() {
        if ( $().fitVids ) {
            $('.octavian-container').fitVids();
        }
    };

    // Header Fixed
    var headerFixed = function() {
        if ( $('body').hasClass('header-fixed') ) {
            var nav = $('#site-header');

            if ( nav.length ) {
                var
                offsetTop = nav.offset().top,
                headerHeight = nav.height();

                if ( $('body').is('.header-style-2') ) {
                    headerHeight = 0;
                }

                var injectSpace = $('<div />', {
                    height: headerHeight
                }).insertAfter(nav);

                $(window).on('load scroll', function(){
                    if ( $(window).scrollTop() > offsetTop ) {
                        nav.addClass('fixed-hide');
                        if ( ! $('body').is('.header-style-2') ) {
                            injectSpace.show();
                        }
                    } else {
                        nav.removeClass('fixed-hide');
                        injectSpace.hide();
                    }

                    if ( $(window).scrollTop() > 500 ) {
                        nav.addClass('fixed-show');
                    } else {
                        nav.removeClass('fixed-show');
                    }
                })
            }
        }     
    };

    // Scroll to Top
    var scrollToTop = function() {
        $(window).on('scroll', function() {
            if ( $(this).scrollTop() > 800 ) {
                $('#scroll-top').addClass('show');
            } else {
                $('#scroll-top').removeClass('show');
            }
        });

        $('#scroll-top').on('click', function() {
            var rocket = $(this);
            $(this).addClass('flyout');
            //setTimeout(function(){ rocket.addClass('flyout'); }, 1500);
            setTimeout(function(){ $('html, body').animate({ scrollTop: 0 }, 1000 , 'easeInOutExpo'); }, 750);
            //rocket.removeClass('flyout');
            //$('html, body').animate({ scrollTop: 0 }, 1000 , 'easeInOutExpo');
        return false;
        });
    };

    // Featured Media
    var featuredMedia = function() {
        if ( $().slick ) {
            $('.blog-gallery').slick({
                arrows: false,
                dots: true,
                infinite: true,
                speed: 300,
                fade: true,
                cssEase: 'linear'
            });
        }
    };

    // Related Post
    var relatedPost = function() {
        if ( $().slick ) {
            $('.related-post').slick({
                dots: false,
                arrows: false,
                infinite: false,
                speed: 300,
                slidesToShow: 2,
                slidesToScroll: 2,
                responsive: [
                {
                  breakpoint: 1024,
                  settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                  }
                },
                {
                  breakpoint: 600,
                  settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                  }
                },
                {
                  breakpoint: 480,
                  settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                  }
                }
                ]
            });
        }
    };

    // Widget Spacer
    var widgetSpacer = function() {
        $(window).on('load resize', function() {
            var mode = 'desktop';

            if ( matchMedia( 'only screen and (max-width: 991px)' ).matches )
                mode = 'mobile';

            $('.spacer').each(function(){
                if ( mode == 'mobile' ) {
                    $(this).attr('style', 'height:' + $(this).data('mobi') + 'px')
                } else {
                    $(this).attr('style', 'height:' + $(this).data('desktop') + 'px')
                }
            })
        });
    };

    // logoWidget
    var logoWidget = function() {
        var footer = $('#footer'),
            logo = footer.attr('class');

        if ( logo && footer.attr('class') != 'green' ) {
            footer.find( '.'+logo ).show().siblings().hide();

        }
    };

    // Quantity Button
    var quantityButton = function() {
        $('.woocommerce-grouped-product-list-item__quantity .quantity .qty').each(function() {
            if ( !$(this).val() ) {
                $(this).val(0);
            }
        })

        if ( ! String.prototype.getDecimals ) {
            String.prototype.getDecimals = function() {
                var num = this,
                    match = ('' + num).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);
                if ( ! match ) {
                    return 0;
                }
                return Math.max( 0, ( match[1] ? match[1].length : 0 ) - ( match[2] ? +match[2] : 0 ) );
            }
        }
        // Quantity "plus" and "minus" buttons
        $( document.body ).on( 'click', '.plus, .minus', function() {
            var $qty        = $( this ).closest( '.quantity' ).find( '.qty'),
                currentVal  = parseFloat( $qty.val() ),
                max         = parseFloat( $qty.attr( 'max' ) ),
                min         = parseFloat( $qty.attr( 'min' ) ),
                step        = $qty.attr( 'step' );

            // Format values
            if ( ! currentVal || currentVal === '' || currentVal === 'NaN' ) currentVal = 0;
            if ( max === '' || max === 'NaN' ) max = '';
            if ( min === '' || min === 'NaN' ) min = 0;
            if ( step === 'any' || step === '' || step === undefined || parseFloat( step ) === 'NaN' ) step = 1;

            // Change the value
            if ( $( this ).is( '.plus' ) ) {
                if ( max && ( currentVal >= max ) ) {
                    $qty.val( max );
                } else {
                    $qty.val( ( currentVal + parseFloat( step )).toFixed( step.getDecimals() ) );
                }
            } else {
                if ( min && ( currentVal <= min ) ) {
                    $qty.val( min );
                } else if ( currentVal > 0 ) {
                    $qty.val( ( currentVal - parseFloat( step )).toFixed( step.getDecimals() ) );
                }
            }

            // Trigger change event
            $qty.trigger( 'change' );
        });
    };

    // Secondary Menu
    var secondMenu = function() {
        if ( $('#secondary-menu').length ) {
            $('#secondary-menu .menu-item-has-children').children('ul').before('<span class="arrow"></span>');

            $(document).on('click', '#secondary-menu .menu-item-has-children > .arrow', function() {
                $(this).parent().toggleClass("active").siblings().removeClass("active");
                      $(this).next("ul").slideToggle();
                      $(this).parent().siblings().find("ul").slideUp();
                      return false;
                })

        }
        if ( $('#secondary-menu .menu-item').length ) {
            $('.secondary-menu-overlay').on('click', function() {
                $('.second-menu-button').removeClass('hide');
                $(this).removeClass('show');
                $("#secondary-menu").animate({ right: "-600px" }, 300, 'easeInOutExpo')
                $('html').removeClass( 'disable-scroll' );
            } );

            $('.close-menu').on('click', function() {
                $('.second-menu-button').removeClass('hide');
                $('.secondary-menu-overlay').removeClass('show');
                $("#secondary-menu").animate({ right: "-600px" }, 300, 'easeInOutExpo')
                $('html').removeClass( 'disable-scroll' );
            } );

            $(document).on('click', '.second-menu-button', function() {
                $('.second-menu-button').addClass('hide');
                $( '.secondary-menu-overlay' ).addClass('show');
                $('html').addClass( 'disable-scroll' );
                $("#secondary-menu").animate({ right: "0"}, 300, 'easeInOutExpo')
            })    
        }          
    };

    mobileNav();
    headerFixed();
    scrollToTop();
    widgetSpacer();
    onePage();

    // Dom Ready
    $(function() {

        preLoader();
        searchIcon();
        fixNav();
        featuredMedia();
        relatedPost();
        responsiveVideos();
        logoWidget();
        quantityButton(); 
        secondMenu();   

    });
})(jQuery);


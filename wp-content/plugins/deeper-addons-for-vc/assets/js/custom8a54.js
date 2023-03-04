(function( $, window, document, undefined ) {
    'use strict';

    var halfBackground = function() {
        $(window).on('load resize', function() {
            $('.half-background').each(function() {
                var $this = $(this),
                    screenw = $(window).width(),
                    containerw = $this.parent().width(),
                    col = $this.find('.vc-row-half-bg'),
                    index = $this.index(),
                    elm = 0;

                elm = ( screenw - containerw ) / 2;

                if ( elm > 0 ) {
                    col.css({ position: 'absolute', top: 0, height: '100%' });

                    if ( matchMedia( 'only screen and (max-width: 991px)' ).matches ) {
                        col.css({ left: '-30px', right: '-30px' });
                    } else {
                        if ( index == 0 ) {
                            col.css({ left: -elm + 'px', right: 0 });
                        } else {
                            col.css({ right: -elm + 'px', left: 0 });
                        }
                    }  
                }
            } )
        } )
    }

    var accordions = function() {
        $('.deeper-accordions').each( function() {
            var args = {easing:'easeOutExpo', duration:300};

            $(this).children('.item.active').children('.content').show();

            $(this).children('.item').find('.heading').on( 'click', function() {
                if ( !$(this).parent().is('.active') ) {
                    $(this).parent().toggleClass('active')
                        .children('.content').slideToggle(args)
                    .parent().siblings('.active').removeClass('active')
                        .children('.content').slideToggle(args);
                } else {
                    $(this).parent().toggleClass('active');
                    $(this).next().slideToggle(args);
                }
            } )
        } )
    }

    var advtabs =  function() {
        $('.deeper-adv-tabs').each(function(){
            var 
            list = '',
            title = $(this).find('.item-title').remove(),
            titleWrap = $(this).children('.tab-title') ;

            title.each(function() {
                list += "<div class= 'item-title'>" + $(this).html() + "</div>";
            });

            titleWrap.append(list);

            var first = $(this).find('.tab-title > div').filter(':first').addClass('active').find('.image-icon');
                first.attr('src', first.data('hover-src') );

            $(this).find('.tab-content-wrap').children().hide().filter(':first').show();

            $(this).find('.tab-title > div').on('click', function(e) {
                var
                idx = $(this).index(),
                content = $(this).closest('.deeper-adv-tabs').find('.tab-content-wrap').children().eq(idx),
                imgSibs = $(this).siblings('.item-title').find('.image-icon');

                $(this).addClass('active').siblings().removeClass('active');
                content.fadeIn('slow').siblings().hide();

                $.each(imgSibs, function() {
                    $(this).attr('src', $(this).data('origin-src') );
                });

                e.preventDefault();
            });
        });

        $(document).on('mouseover', '.anchor-link', function() {
            if ( ! $(this).parent('div').hasClass('active') ) {
                var hover_src = $(this).find('.image-icon').data( 'hover-src' );
                if ( '' !== hover_src ) {
                    $(this).find('.image-icon').attr( 'src', hover_src );
                }
            }
        })

        $(document).on('mouseleave', '.anchor-link', function() {
            if ( ! $(this).parent('div').hasClass('active') ) {
                var origin_src = $(this).find('.image-icon').data( 'origin-src' );
                $(this).find('.image-icon').attr( 'src', origin_src );
            }
        })
    };

    var imagePopup = function() {
        if ( $().magnificPopup ) {
           $('.deeper-portfolio, .deeper-galleries, .owl-carousel').each(function () {
                $(this).find('.image-popup').magnificPopup({
                    disableOn: 700,
                    type: 'image',
                    gallery:{
                        enabled: true
                    },
                    mainClass: 'mfp-fade',
                    removalDelay: 160,
                    preloader: false,
                    fixedContentPos: true
                });
            });
        };
    };

    var videoPopup = function() {
        if ( $().magnificPopup ) {
            $('.popup-video').magnificPopup({
                disableOn: 700,
                type: 'iframe',
                iframe: {
                    patterns: {
                        youtube: {
                            index: 'youtube.com/', 
                            id: function(url) {        
                                var m = url.match(/[\\?\\&]v=([^\\?\\&]+)/);
                                if ( !m || !m[1] ) return null;
                                return m[1];
                            },
                            src: 'https://www.youtube.com/embed/%id%?autoplay=1&rel=0'
                        },
                    },
                },
                mainClass: 'mfp-fade',
                removalDelay: 160,
                preloader: false,
                fixedContentPos: true
            });
        };
    };

    var inViewport =  function() {
        if ( $().appear ) {
            $('[data-inviewport="yes"]').appear(function() {
                var $this = $(this);

                $this.addClass('is-in-view');

                if ( $this.hasClass("deeper-fancy-image") ) {
                    $this.addClass('animated');
                }      
            },{ accY: -200 });

            $('.project-reveal').appear(function() {
                var $this = $(this);

                $this.addClass('is-in-view');    
            },{ accY: -200 });
        }
    };

    var progressBar = function() {
        if ( $().appear ) {
            $('.deeper-progress').appear( function() {
            
                function init() {
                    var bar = $('.progress-animate'),
                        bar_width = $(this);
                    $(function(){
                        $(bar).each( function() {
                            bar_width = $(this).data('valuenow');
                            $(this).width(bar_width);

                            $(this).parents('.deeper-progress').find('.perc').addClass('show');
                        });
                    });
                }

                init();
            },{ accY: -200 } );
        }
    };

     var progressCircle = function() {
        //if ( isMobile.any() == null ) {
            // For gradient color
            if ( ! $('#piechart-gradient').length ) {
                $('.deeper-piechart:first').append('<svg width="0" height="0" style="display:block;"><linearGradient id="piechart-gradient" gradientTransform="rotate(90)"><stop class="start-color" offset="0"/><stop class="end-color" offset="1"/></linearGradient></svg>');
            }
            
            $('.piechart').each(function () {
                var $this = $(this);
                var value = Number($this.data("value")) / 100;
                var option;

                option = {
                    strokeWidth: 7.5,
                    trailWidth: 7.5,
                    duration: 1500,
                    text: {
                        value: '0%'
                    },
                    step: function (state, bar) {
                        bar.setText((bar.value() * 100).toFixed(0) + "%");
                    }
                }

                var circle = new ProgressBar.Circle($(this)[0], option);

                $this.appear( function(direction) {
                    circle.animate(value);
                },{ accY: -200 } )
            });
        //}
    };

    var counter = function() {
        if ( $().countTo ) {
            $('.deeper-counter, .deeper-progress').appear( function() {
                var $this = $(this);
                function init() {
                    $this.find('.number').each(function() {
                        var to = $(this).data('to'),
                            speed = $(this).data('speed'),
                            format = $(this).data('format');

                        switch ( format ) {
                            case 'ts':
                                $(this).countTo({
                                    to: to,
                                    speed: speed,
                                    formatter: function (value, options) {
                                        value.toLocaleString(undefined, {maximumFractionDigits:2});
                                        return value;
                                    }
                                });
                                break;
                            case 'd1':
                                $(this).countTo({
                                    to: to,
                                    speed: speed,
                                    formatter: function (value, options) {
                                        value = value.toFixed(1);
                                        return value;
                                    }
                                });
                                break;
                            case 'd2':
                                $(this).countTo({
                                    to: to,
                                    speed: speed,
                                    formatter: function (value, options) {
                                        value = value.toFixed(2);
                                        return value;
                                    }
                                });
                                break;
                            default: 
                                $(this).countTo({
                                    to: to,
                                    speed: speed
                                });
                        }
                        
                    });
                }

                init();
            });
        }
    };

    var animation = function() {
        $('.wow').each( function() {
            new WOW().init();
        });
    };

    var parallaxImages =  function() {
        var parallaxBox = $('.deeper-parallax-box');

        if ( parallaxBox.length ) {

            $(window).on('load resize', function() {
                parallaxBox.each(function() {
                    var
                    wrap = $(this).find('.parallax-wrap'),
                    height = [];
  
                    $(this).waitForImages(function() {
                        $(this).find('.deeper-parallax-item').each(function() {
                            height.push( parseInt($(this).css('marginTop')) + $(this).height() );
                        });

                        wrap.css('height', Math.max.apply(null, height));
                    });
                });
            });
        }
    };

    var canvasParallax =  function() {
        var parallaxBox = $('.deeper-canvas');

        if ( parallaxBox.length ) {

            $(window).on('load resize', function() {
                parallaxBox.each(function() {
  					var
                    wrap = $(this).find('.parallax-wrap'),
                    height = [];
  
                    $(this).waitForImages(function() {

                        $(this).find('.canvas-item').each(function() {

                            height.push( parseInt($(this).css('marginTop')) + $(this).height() );
                        });

                        wrap.css('height', Math.max.apply(null, height));
                    });
                });
            });
        }
    };

    var fancyTexts =  function() {
        if ( $('.deeper-fancy-text').is('.scroll') ) {
            $('.deeper-fancy-text.scroll').each(function() {
                var
                $this = $(this),
                current = 1,
                height = $this.height(),
                numberDivs = $this.children().length,
                first = $this.children('.heading:nth-child(1)');

                setInterval(function() {
                    var number = current * -height;
                    
                    first.css('margin-top', number + 'px');
                    if ( current === numberDivs ) {
                        first.css('margin-top', '0px');
                        current = 1;
                    } else current++;
                }, 2500);
            });
        }

        if ( $('.deeper-fancy-text').is('.typed') ) {
            if ( $().typed ) {
                $('.deeper-fancy-text.typed').each(function() {
                    var
                    $this = $(this),
                    texts = $this.data('fancy').split(',');

                    $this.find('.text').typed({
                        strings: texts,
                        typeSpeed: 30,
                        loop: true,
                        backDelay: 4000
                    });
                });
            }
        }

        if ( $('.deeper-fancy-text').is('.zoom') ) {
            if ( $().animatedHeadline ) {
                $('.deeper-fancy-text.zoom').animatedHeadline({
                    animationType: 'zoom'
                });
            }
        }
    }

    var revSlider = function() {
        $('.rev-item').css('opacity' , '0');

        var revlp = jQuery('rs-module');
        revlp.one('revolution.slide.onloaded', function() {    
        });

        revlp.on('revolution.slide.layeraction', function(event, data) {
            if ( data.eventtype == 'enterstage' ) {
                $('.rev-item').css('opacity' , '1').addClass('loaded');
            }
            /*
                enterstage:   The moment the Layer begins to animate into view
                enteredstage: The moment the Layer's initial animation has completed
                leavestage:   The moment the Layer begins to animate out of view
                leftstage:    The moment the Layer has finished animating out of view
            */
            // data.eventtype     = Animation state: 'enterstage', 'enteredstage', 'leavestage', 'leftstage'
         
            // data.layertype     = Layer Type (image, video, html)
            // data.layersettings = Default Settings for Layer
            // data.layer         = Layer as jQuery Object
         
        });
    }

    var waterRipples = function() {
        $('.deeper-water-ripples').each( function() {
            try {
                $('.deeper-water-ripples').ripples({
                    resolution: 256,
                    perturbance: 0.04
                });
            }
            catch (e) {
                //$('.error').show().text(e);
            }

            $(window).ready( function() {
                var $el = $( '.deeper-water-ripples.ripples' );
                $el.siblings().each( function() {
                    if ( ! $(this).hasClass('deeper-canvas') ) {
                        $(this).addClass( 'position-relative' );
                    }
                })
                
                $el.append( $el.siblings() ).addClass( 'position-relative' );
            })         
        })   
    }

    var particles = function() {
        $('#particles-js').each( function() {
            $(this).parent().addClass('position-relative');
            particlesJS("particles-js", {
                particles: {
                    number: { value: 60, density: { enable: false, value_area: 800 } },
                    color: { value: [ "fff", "fff", "#a833ba" ] },
                    shape: { type: ["circle"], stroke: { width: 0, color: "#000000" }, polygon: { nb_sides: 5 }, 
                        image: { src: directory_uri + "img/circle.svg", width: 100, height: 100, replace_color: true }, 
                        image2: { src: directory_uri + "img/circle.svg", width: 100, height: 100, replace_color: true } },
                    opacity: { value: 0.4, random: true, anim: { enable: true, speed: 1, opacity_min: 0.1, sync: false } },
                    size: { value: 5, random: true, anim: { enable: false, speed: 4, size_min: 3, sync: false } },
                    line_linked: { enable: false, distance: 150, color: "#ffffff", opacity: 0.4, width: 1 },
                    move: { enable: true, speed: 1, direction: "none", random: true, straight: false, out_mode: "out", bounce: false, attract: { enable: false, rotateX: 600, rotateY: 600 } },
                },
                interactivity: {
                    detect_on: "canvas",
                    events: { onhover: { enable: false, mode: "repulse" }, onclick: { enable: false, mode: "repulse" }, resize: true },
                    modes: {
                        grab: { distance: 400, line_linked: { opacity: 1 } },
                        bubble: { distance: 250, size: 0, duration: 2, opacity: 0, speed: 3 },
                        repulse: { distance: 200, duration: 0.4 },
                        push: { particles_nb: 4 },
                        remove: { particles_nb: 2 },
                    },
                },
                retina_detect: true,
            });
        })
    }

    var canvas = function() {
        $('.deeper-canvas').each(function() {
            if ( ! $(this).parent().hasClass('position-relative') ) {
                $(this).parent().addClass('position-relative');
                $(this).siblings().each( function() {
                    if ( ! $(this).hasClass('deeper-canvas') ) {
                        $(this).addClass('position-relative index1');
                    }
                })
            }
        })
    }

    var customBG = function() {
        $('.deeper-background.row').siblings().each(function() {
            if ( $(this).hasClass('vc_column_container') ) {
                $(this).css({ 'position' : 'relative', 'z-index' : 1 });
            }
        })
    }

    var buttonHover = function() {
        $('.deeper-button').each(function() {

            $(this).mouseenter(function(e) {
               var parentOffset = $(this).offset(); 
              
               var relX = e.pageX - parentOffset.left;
               var relY = e.pageY - parentOffset.top;
               $(this).find('.hover-effect').css({"left": relX, "top": relY });
            });

            $(this).mouseleave(function(e) {

                 var parentOffset = $(this).offset(); 

                 var relX = e.pageX - parentOffset.left;
                 var relY = e.pageY - parentOffset.top;
                 $(this).find('.hover-effect').css({"left": relX, "top": relY });
            });
        })
    }

    $('.deeper-spacer').deeperSpacer();
    $('.deeper-content-box').deeperContentBox();
    halfBackground();
    parallaxImages();
    canvasParallax();

	$(function() {

        $('.deeper-button').deeperButton();
        $('.deeper-link').deeperLink();
        $('.deeper-slick-slider').deeperSlick();
        $('.deeper-icon').deeperIcon();
        $('.deeper-svg').deeperSVG();
        $('.deeper-socials').deeperSocials();
        $('.deeper-gridbox').deeperGrixBox();
        $('.deeper-fancy-image.stretch').deeperFancyImage();

        accordions();
        fancyTexts();
        progressBar();
	    progressCircle();
        advtabs();
        imagePopup();
        videoPopup();       
        counter();
        animation();
        waterRipples(); 
        canvas();
        customBG();
        buttonHover();
        revSlider(); 
        $('.deeper-carousel-box').deeperCarousel();       
    });

    $(window).on('load', function() { 
        $('.deeper-cubeportfolio').deeperCubePortfolio();       
        inViewport();
        particles();           
    });

}( jQuery, window, document ));
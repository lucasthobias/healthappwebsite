var parseOpts = function( data ) {
    if ( typeof( data ) == "object" ) {
        return data;

    } else if ( typeof( data ) == "string" ) {
        try {
            return JSON.parse( data.replace( /'/g, '"' ).replace( ';', '' ) );
        } catch( e ) {
            return {};
        }

    } else {
        return {};
    }
};

// Spacer
(function( $, window, document, undefined ) {
    'use strict';

    var deeperSpacer = function( elm, opts ) {
        this.elm = elm;
        this.$elm = $(elm);
        this.opts = opts;
        this.config = parseOpts( this.$elm.data( 'config' ) );
    };

    deeperSpacer.prototype = {
        defaults: {
        },

        init: function() {
            this.args = $.extend( {}, this.defaults, this.opts, this.config );

            var t = this;
            $(window).on('load resize', function() {
                var mode = 'desktop';

                if ( matchMedia( 'only screen and (max-width: 1024px)' ).matches )
                    mode = 'mobile';

                if ( matchMedia( 'only screen and (max-width: 767px)' ).matches )
                    mode = 'smobile';

                if ( isNaN(t.args.desktop) ) t.args.desktop = 0;
                if ( isNaN(t.args.mobile) ) t.args.mobile = 0;
                if ( isNaN(t.args.smobile) ) t.args.smobile = 0;

                if ( 'desktop' == mode ) t.$elm.attr( 'style', 'height:' + t.args.desktop + 'px' )
                if ( 'mobile' == mode ) t.$elm.attr( 'style', 'height:' + t.args.mobile + 'px' )
                if ( 'smobile'== mode ) t.$elm.attr( 'style', 'height:' + t.args.smobile + 'px' )
            });
        },
    };

    $.fn.deeperSpacer = function( opts ) {
        return this.each( function() {
            new deeperSpacer( this, opts ).init();
        } );
    };
}( jQuery, window, document ));

// Content Box
(function( $, window, document, undefined ) {
    'use strict';

    var deeperContentBox = function( elm, opts ) {
        this.elm = elm;
        this.$elm = $(elm);
        this.opts = opts;
        this.config = parseOpts( this.$elm.data( 'config' ) );
    };

    deeperContentBox.prototype = {
        defaults: {
            padding: '0',
            mobipadding: '0',
            margin: '0',
            mobimargin: '0',
        },

        init: function() {
            this.args = $.extend( {}, this.defaults, this.opts, this.config );

            var t = this;
            $(window).on('load resize', function() {
                var mode = 'desktop';

                if ( matchMedia( 'only screen and (max-width: 991px)' ).matches )
                    mode = 'mobile';

                if ( 'desktop' == mode ) 
                    t.$elm.css( 'margin', t.args.margin )
                        .children('.inner').css( 'padding', t.args.padding );

                if ( 'mobile' == mode ) 
                    t.$elm.css( 'margin', t.args.mobiMargin )
                        .children('.inner').css( 'padding', t.args.mobiPadding );
            });

            var
            t = this,
            bg, r, b, s, bgh, rh, bch, bwh, bsh, txh, tyh, sh,
            css = '', cls = '',
            a = t.$elm.attr( 'class' ).split( ' ' );

            $(a).each( function( i, e ) { cls += '.' + e; } );

            bg = t.args.bg ? 'background-color:' + t.args.bg + ' !important;' : '';
            r = t.args.round ? 'border-radius:' + t.args.round + ' !important;' : '';
            b = t.args.border ? 'border:' + t.args.border + ' !important;' : '';
            s = t.args.shadow ? 'box-shadow:' + t.args.shadow + ' !important;' : '';

            bgh = t.args.bgHover ? 'background-color:' + t.args.bgHover + ' !important;' : '';
            rh = t.args.roundHover ? 'border-radius:' + t.args.roundHover + ' !important;' : '';
            bch = t.args.borderColorHover ? 'border-color:' + t.args.borderColorHover + ' !important;' : '';
            bwh = t.args.borderWidthHover ? 'border-width:' + t.args.borderWidthHover + ' !important;' : '';
            bsh = t.args.borderStyleHover ? 'border-style:' + t.args.borderStyleHover + ' !important;' : '';
            txh = t.args.TranslateXHover ? 'transform:translateX(' + t.args.TranslateXHover + 'px) !important;' : '';
            tyh = t.args.TranslateYHover ? 'transform:translateY(' + t.args.TranslateYHover + 'px) !important;' : '';
            sh = t.args.shadowHover ? 'box-shadow:' + t.args.shadowHover + ' !important;' : '';

            if ( bg || r || b || s )
                css += cls + ' .inner {' + bg + r + b + s + '}\n';

            if ( bgh || rh || bch || bwh || bsh || txh || tyh || sh )
                css += cls + ':hover .inner {' + bgh + rh + bch + bwh + bsh + txh + tyh + sh + '}\n';

            css && $("#deeper-dynamic").length 
                ? $("#deeper-dynamic").append( css ) 
                : $("head").append( '<style type="text/css" id="deeper-dynamic">' + css + '</style>' );
        },
    };

    $.fn.deeperContentBox = function( opts ) {
        return this.each(function() {
            new deeperContentBox( this, opts ).init();
        });
    };
}( jQuery, window, document ));

// Button
(function( $, window, document, undefined ) {
    'use strict';

    var deeperButton = function( elm, opts ) {
        this.elm = elm;
        this.$elm = $(elm);
        this.opts = opts;
        this.config = parseOpts( this.$elm.data( 'config' ) );
    };

    deeperButton.prototype = {
        defaults: {
        },

        init: function() {
            this.args = $.extend( {}, this.defaults, this.opts, this.config );

            if ( ! jQuery.isEmptyObject(this.args) ) {
                var
                t = this,
                css = '', cls = '',
                c, g, b, s, ch, gh, bh, sh, p, m, r, h,
                a = t.$elm.attr( 'class' ).split( ' ' );       

                $(a).each( function( i, e ) { cls += '.' + e; } );

                p = t.args.padding ? 'padding:' + t.args.padding + ' !important;' : '';
                m = t.args.margin ? 'margin:' + t.args.margin + ' !important;' : '';
                r = t.args.rounded ? 'border-radius:' + t.args.rounded + ' !important;' : '';

                c = t.args.color ? 'color:' + t.args.color + ' !important;' : '';
                g = t.args.bg ? 'background-color:' + t.args.bg + ' !important;' : '';
                b = t.args.border ? 'border:' + t.args.border + ' !important;' : '';
                s = t.args.shadow ? 'box-shadow:' + t.args.shadow + ' !important;' : '';

                ch = t.args.colorHover ? 'color:' + t.args.colorHover + ' !important;' : '';
                gh = t.args.bgHover ? 'background-color:' + t.args.bgHover + ' !important;' : '';
                bh = t.args.borderHover ? 'border:' + t.args.borderHover + ' !important;' : '';
                sh = t.args.shadowHover ? 'box-shadow:' + t.args.shadowHover + ' !important;' : '';

                css += cls + ' {' + c + g + b + p + m + r + s + '}\n';

                css += ( h = t.args.parentHover )
                    ? '.' + h + ':hover ' + cls + ' {' + ch + gh + bh + sh + '}\n' 
                    : cls + ':hover {' + ch + gh + bh + sh + '}\n';

                if ( css )
                    css && $("#deeper-dynamic").length 
                        ? $("#deeper-dynamic").append( css ) 
                        : $("head").append( '<style type="text/css" id="deeper-dynamic">' + css + '</style>' );
            }
            
        },
    };

    $.fn.deeperButton = function( opts ) {
        return this.each(function() {
            new deeperButton( this, opts ).init();
        });
    };
}( jQuery, window, document ));


// Link
(function( $, window, document, undefined ) {
    'use strict';

    var deeperLink = function( elm, opts ) {
        this.elm = elm;
        this.$elm = $(elm);
        this.opts = opts;
        this.config = parseOpts( this.$elm.data( 'config' ) );
    };

    deeperLink.prototype = {
        defaults: {
        },

        init: function() {
            this.args = $.extend( {}, this.defaults, this.opts, this.config );

            if ( ! jQuery.isEmptyObject(this.args) ) {
                var
                t = this,
                css = '', cls = '',
                c, lc, ic, hc, hlc, hic, ph,
                a = t.$elm.attr( 'class' ).split( ' ' );

                $(a).each( function( i, e ) { cls += '.' + e; } );

                if ( c = t.args.color ) c = 'color:' + t.args.color + ' !important;';
                if ( lc = t.args.lineColor ) lc = 'background-color:' + t.args.lineColor + ' !important;';
                if ( ic = t.args.iconColor ) ic = 'color:' + t.args.lineColor + ' !important;';

                if ( hc = t.args.hoverColor ) hc = 'color:' + t.args.hoverColor + ' !important;';
                if ( hlc = t.args.hoverLineColor ) hlc = 'background-color:' + t.args.hoverLineColor + ' !important;';
                if ( hic = t.args.hoverIconColor ) hic = 'color:' + t.args.hoverIconColor + ' !important;';

                if ( c ) css += cls + ' {' + c + '}\n';
                if ( lc ) css += cls + ' .line {' + lc + '}\n';
                if ( ic ) css += cls + ' .icon {' + ic + '}\n';

                if ( ph = t.args.parentHover ) {
                    if ( hc ) css += '.' + ph + ':hover ' + cls + ' {' + hc + '}\n';
                    if ( hlc ) css += '.' + ph + ':hover ' + cls + ' .line {' + hlc + '}\n';
                    if ( hic ) css += '.' + ph + ':hover ' + cls + ' .icon {' + hic + '}\n';
                } else {
                    if ( hc ) css += cls + ':hover {' + hc + '}\n';
                    if ( hlc ) css += cls + ':hover .line {' + hlc + '}\n';
                    if ( hic ) css += cls + ':hover .icon {' + hic + '}\n';
                }

                css && $("#deeper-dynamic").length 
                    ? $("#deeper-dynamic").append( css ) 
                    : $("head").append( '<style type="text/css" id="deeper-dynamic">' + css + '</style>' );
            }
            
        },
    };

    $.fn.deeperLink = function( opts ) {
        return this.each(function() {
            new deeperLink( this, opts ).init();
        });
    };
}( jQuery, window, document ));

// Carousel
(function( $, window, document, undefined ) {
    'use strict';

    var deeperCarousel = function( elm, opts ) {
        this.elm = elm;
        this.$elm = $(elm);
        this.opts = opts;
        this.config = parseOpts( this.$elm.data( 'config' ) );
    };

    deeperCarousel.prototype = {
        defaults: {
            contain: !1,
            imagesLoaded: !0,
            percentPosition: !0,
            prevNextButtons: !1,
            pageDots: !1,
            adaptiveHeight: !0,
            cellAlign: "left",
            groupCells: !0,
            dragThreshold: 20,
            wrapAround: !1,
            autoPlay: !1,
            fullAside: !0,
            navArrow: 1,
            filters: !1,
            equalHeightCells: !1,
            randomVerOffset: !1,
            buttonsAppendTo: null,
        },

        init: function() {
            var
            svg = this.config.arrowShapeStyle ;

            this.$elm.children().wrap('<div class="item-flickity">');
            
            switch (svg) {
                case "svg1":
                    svg = 'M97.5,47.5H98c-0.1,0-0.2,0-0.2,0h-89L24.3,32c1-1,1-2.6,0-3.5c-1-1-2.6-1-3.5,0L0.9,48.2c-1,1-1,2.6,0,3.5l0,0l0,0l19.8,19.8c1,1,2.6,1,3.5,0c1-1,1-2.6,0-3.5L8.7,52.5h14.6c0.1,0,0.2,0,0.2,0h74c1.4,0,2.5-1.1,2.5-2.5C100,48.6,98.9,47.5,97.5,47.5z';
                    break;
                case "svg2":
                    svg = 'M10,50c0,2,1,3,2,4l34.5,34.5c2,2,5,2,7,0s2-5,0-7L27,55h58c3,0,5-2,5-5s-2-5-5-5H27l26.5-26.5c2-2,2-5,0-7c-1-1-2-1.5-3.5-1.5s-2.5,0.5-3.5,1.5L12,46C11,47,10,48,10,50z';
                    break;
                case "svg3":
                    svg = 'M32.4,50L75.8,6.6c1.5-1.5,1.5-3.9,0-5.4s-3.9-1.5-5.4,0L24.2,47.3c-1.5,1.5-1.5,3.9,0,5.4l46.2,46.2c1.5,1.5,4,1.4,5.4-0.1s1.4-3.9,0-5.3L32.4,50z';
                    break;
                default:
                    svg = 'M97.5,47.5H98c-0.1,0-0.2,0-0.2,0h-89L24.3,32c1-1,1-2.6,0-3.5c-1-1-2.6-1-3.5,0L0.9,48.2c-1,1-1,2.6,0,3.5l0,0l0,0l19.8,19.8c1,1,2.6,1,3.5,0c1-1,1-2.6,0-3.5L8.7,52.5h14.6c0.1,0,0.2,0,0.2,0h74c1.4,0,2.5-1.1,2.5-2.5C100,48.6,98.9,47.5,97.5,47.5z';
                    break;
            }

            this.config.arrowShape = svg;

            this.args = $.extend( {}, this.defaults, this.opts, this.config );

            this.initFlickity();
            this.event();
        },
        initFlickity: function() {
            var t = this;
            
            t.$elm.waitForImages( function() {
                t.$elm.flickity( t.args ); 
                t.flickityData = $(t.elm).data( 'flickity' );
                t.args.adaptiveHeight && $(".flickity-viewport", t.$elm).css( 'transition', 'height 0.2s' );
                t.fullAside();
            } );
        },
        fullAside: function() {

            if ( this.args.fullAside ) {
                var
                t = this,
                v = $(t.flickityData.viewport),
                w = t.flickityData.size.width,
                s = window.innerWidth - (w + v.offset().left),
                i = $('<div class="flickity-aside-wrap" />');
                
                v.wrap( i ).css( 'overflow', 'visible' )
                .parent()
                .css({
                    'padding-right': s,
                    'margin-right': -s,
                    'overflow': 'hidden'
                });
            }
        },
        event: function() {
            // Update Status
            if ( this.$elm.hasClass('has-status') ) {
                var carouselStatus = $('.carousel-status');
            
                this.$elm.on( 'select.flickity', function( event, index ) {
                    var total = $(this).find('.item-flickity'),
                        current = $(this).find('.item-flickity.is-selected');

                    var text = current.index() + 1;

                    carouselStatus.text( text + '/' + total.length);             
                });
            }

            // Center class
            if ( this.config.cellAlign == 'center' ) {
                var selected = this.$elm.find('.item-flickity.is-selected'),
                    item = this.$elm.find('.item-flickity');

                // Init
                if ( selected.length > 1 ) {
                    var column = selected.length,
                        centerIndex = selected.index() + Math.floor(column/2);
                    item.removeClass('center');
                    item.eq(centerIndex).addClass('center');
                } else {
                    item.removeClass('center');
                    selected.addClass('center');
                }

                // Selected change
                this.$elm.on( 'select.flickity', function( event, index ) {
                    var selected = $(this).find('.item-flickity.is-selected'),
                        item = $(this).find('.item-flickity');

                    if ( selected.length > 1 ) {
                        var column = selected.length,
                        centerIndex = selected.index() + Math.floor(column/2);
                        item.removeClass('center');
                        item.eq(centerIndex).addClass('center');
                    } else {
                        $(item).removeClass('center');
                        $(selected).addClass('center');
                    }                    
                });
            }

            // App View
            if ( this.$elm.hasClass('app-carousel') ) {
                var selected = this.$elm.find('.item-flickity.is-selected'),
                    item = this.$elm.find('.item-flickity');

                // Init
                if ( selected.length > 1 ) {
                    var centerIndex = selected.index();
                    item.removeClass('selected');
                    item.eq(centerIndex).addClass('selected');
                    item.eq(centerIndex + 1).addClass('selected');
                    item.eq(centerIndex - 1).addClass('selected');
                    item.eq(centerIndex + 2).addClass('selected');
                    item.eq(centerIndex - 2).addClass('selected');
                } 

                // Selected change
                this.$elm.on( 'select.flickity', function( event, index ) {
                    var selected = $(this).find('.item-flickity.is-selected'),
                        item = $(this).find('.item-flickity');

                    var centerIndex = selected.index();
                    item.removeClass('selected');
                    item.eq(centerIndex).addClass('selected');
                    item.eq(centerIndex + 1).addClass('selected');
                    item.eq(centerIndex - 1).addClass('selected');  
                    item.eq(centerIndex + 2).addClass('selected');
                    item.eq(centerIndex - 2).addClass('selected');                
                });
            }           
        }
    };

    $.fn.deeperCarousel = function( opts ) {
        return this.each( function() {
            new deeperCarousel( this, opts ).init();
        } );
    };
}( jQuery, window, document ));

// Slick Slider
(function( $, window, document, undefined ) {
    'use strict';

    var deeperSlick = function( elm, opts ) {
        this.elm = elm;
        this.$elm = $(elm);
        this.opts = opts;
        this.config = parseOpts( this.$elm.data( 'config' ) );
    };

    deeperSlick.prototype = {
        defaults: {
        },

        init: function() {
            $('.deeper-slick-slider').each(function () {
                var slickNav = $(this).find('.slick-slider-nav'),
                    slickContent = $(this).find('.slick-content-item');

                if ( slickContent.length ) {        
                    var navItem = slickContent.find('.slick-nav-item').remove();
                    navItem.appendTo(slickNav);
                }

            });

            var $containers = $('.slick-container');

            if (!$containers.length) return;

            var defaults = {
                speed: 700,
                infinite: true,
                focusOnSelect: true,
            };

            $containers.each(function() {
                var $container = $(this);
                var $sliders = $container.find('.slick-slider, .slick-slider-nav');

                $(this).on('init', function(event, slick, currentSlide, nextSlide){
                    var nav = $(this).find('.slick-slider-nav .slick-nav-item'),
                        number = nav.length;
                    nav.eq(0).addClass('slick0');
                    nav.eq(1).addClass('slick1');
                    nav.eq(2).addClass('slick2');
                    nav.eq(3).addClass('slick3');
                    nav.eq(4).addClass('slick4');
                });

                $sliders.each(function() {
                    var $slider = $(this);
                    var options = $slider.data('slick');
                    if (options === undefined || options === null) options = {};
                    options = $.extend({}, defaults, options);
                    if ($slider.data('navTarget') !== undefined && $slider.data('navTarget').length) {
                        options.asNavFor = $($slider.data('navTarget'));
                    }
                    var instance = $slider.slick(options);

                    //////
                    // Adding slider instance to object
                    //////
                    if (this.unifato === undefined) this.unifato = {};
                    this.unifato.slick = {};
                    this.unifato.slick.instance = instance;
                });

                $(this).on('beforeChange', function(event, slick, currentSlide, nextSlide){
                    var nav = $(this).siblings().find('.slick-slider-nav .slick-nav-item');
                    nav.removeClass('show hide').addClass('hide');
                });

                $(this).on('afterChange', function(event, slick, currentSlide, nextSlide){
                    var current = currentSlide,
                        nav1 = current + 1, 
                        nav2 = current + 2, 
                        nav3 = current + 3, 
                        nav4 = current + 4;
                    var nav = $(this).siblings().find('.slick-slider-nav .slick-nav-item'),
                        number = nav.length;

                    nav.removeClass('slick0 slick1 slick2 slick3 slick4 hide');
                    ( nav1 < number ) ? nav1 = current + 1 : nav1 = nav1 - number;
                    ( nav2 < number ) ? nav2 = current + 2 : nav2 = nav2 - number;
                    ( nav3 < number ) ? nav3 = current + 3 : nav3 = nav3 - number;
                    ( nav4 < number ) ? nav4 = current + 4 : nav4 = nav4 - number;
                    nav.eq(current).addClass('slick0 show');
                    nav.eq(nav1).addClass('slick1 show');
                    nav.eq(nav2).addClass('slick2 show');
                    nav.eq(nav3).addClass('slick3 show');
                    nav.eq(nav4).addClass('slick4 show');
                });
            });
        },
    };

    $.fn.deeperSlick = function( opts ) {
        return this.each( function() {
            new deeperSlick( this, opts ).init();
        } );
    };
}( jQuery, window, document ));

// Icon
(function( $, window, document, undefined ) {
    'use strict';

    var deeperIcon = function( elm, opts ) {
        this.elm = elm;
        this.$elm = $(elm);
        this.opts = opts;
        this.config = parseOpts( this.$elm.data( 'config' ) );
    };

    deeperIcon.prototype = {
        defaults: {
        },

        init: function() {
            this.args = $.extend( {}, this.defaults, this.opts, this.config );

            if ( ! jQuery.isEmptyObject(this.args) ) {
                var
                t = this,
                css = '', cls = '',
                c, bg, fs, w, h, lh, r, s, m, b,
                ch, bgh, sh, ph, bh,
                a = t.$elm.attr( 'class' ).split( ' ' );

                $(a).each( function( i, e ) { cls += '.' + e; } );

                m = t.args.margin ? 'margin:' + t.args.margin + ' !important;' : '';
                w = t.args.width ? 'width:' + t.args.width + ' !important;' : '';
                h = t.args.height ? 'height:' + t.args.height + ' !important;' : '';
                r = t.args.rounded ? 'border-radius:' + t.args.rounded + ' !important;' : '';

                c = t.args.color ? 'color:' + t.args.color +' !important;' : '';
                bg = t.args.bg ? 'background-color:' + t.args.bg + ' !important;' : '';
                b = t.args.border ? 'border:' + t.args.border + ' !important;' : '';
                s = t.args.shadow ? 'box-shadow:' + t.args.shadow + ' !important;' : '';
                fs = t.args.fontSize ? 'font-size:' + t.args.fontSize + ' !important;' : '';
                lh = t.args.lineHeight ? 'line-height:' + t.args.lineHeight + ' !important;' : '';

                ch = t.args.colorHover ? 'color:' + t.args.colorHover + ' !important;' : '';
                bh = t.args.borderHover ? 'border:' + t.args.borderHover + ' !important;' : '';
                bgh = t.args.bgHover ? 'background-color:' + t.args.bgHover + ' !important;' : '';
                sh = t.args.borderHover ? 'border:' + t.args.borderHover + ' !important;' : '';

                css += cls + ' .icon-wrap {' + m + w + h + r + c + bg + b + s + fs + lh + '}\n';

                if ( ch || bgh || bh || sh )
                    css += ( h = t.args.parentHover )
                        ? '.' + h + ':hover ' + cls + ' .icon-wrap {' + ch + bgh + bh + sh + '}\n' 
                        : cls + ':hover .icon-wrap {' + ch + bgh + bh + sh + '}\n';

                css && $("#deeper-dynamic").length 
                    ? $("#deeper-dynamic").append( css ) 
                    : $("head").append( '<style type="text/css" id="deeper-dynamic">' + css + '</style>' );
            }
        },
    };

    $.fn.deeperIcon = function( opts ) {
        return this.each( function() {
            new deeperIcon( this, opts ).init();
        } );
    };
}( jQuery, window, document ));

// Grix Box
(function( $, window, document, undefined ) {
    'use strict';

    var deeperGrixBox = function( elm, opts ) {
        this.elm = elm;
        this.$elm = $(elm);
        this.opts = opts;
    };

    deeperGrixBox.prototype = {

        init: function() {
            
            var column = $(this.elm).data('column');
     
            $(this.elm).children('div').wrap('<div class="grid-item">');

            var item = $(this.elm).children('.grid-item');

            for(var i = 0; i < item.length; i += column) {
                item.slice(i, i + column).wrapAll("<div class='grid-row clearfix'></div>");
            }
        },
    };

    $.fn.deeperGrixBox = function( opts ) {
        return this.each( function() {
            new deeperGrixBox( this, opts ).init();
        } );
    };
}( jQuery, window, document ));

// Spacer
(function( $, window, document, undefined ) {
    'use strict';

    var deeperFancyImage = function( elm, opts ) {
        this.elm = elm;
        this.$elm = $(elm);
        this.opts = opts;
        this.config = parseOpts( this.$elm.data( 'config' ) );
    };

    deeperFancyImage.prototype = {
        defaults: {
        },

        init: function() {
            this.args = $.extend( {}, this.defaults, this.opts, this.config );

            if ( ! jQuery.isEmptyObject(this.args) ) {
                var
                t = this,
                css = '', cls = '',
                sl, sr,
                a = t.$elm.attr( 'class' ).split( ' ' );


                $(a).each( function( i, e ) { 
                    if( e.trim() )
                        cls += '.' + e; 
                } );

                sl = t.args.stretchLeft ? 'margin-left:' + t.args.stretchLeft + ' !important;' : '';
                sr = t.args.stretchRight ? 'margin-right:' + t.args.stretchRight + ' !important;' : '';

                if ( sl || sr ) 
                    css += '@media (min-width: 1025px) {'+ cls +' {' + sl + sr + '}}\n';

                css && $("#deeper-dynamic").length 
                    ? $("#deeper-dynamic").append( css ) 
                    : $("head").append( '<style type="text/css" id="deeper-dynamic">' + css + '</style>' );
            }
        },
    };

    $.fn.deeperFancyImage = function( opts ) {
        return this.each( function() {
            new deeperFancyImage( this, opts ).init();
        } );
    };
}( jQuery, window, document ));

// SVG
(function( $, window, document, undefined ) {
    'use strict';

    var deeperSVG = function( elm, opts ) {
        this.elm = elm;
        this.$elm = $(elm);
        this.opts = opts;
        this.config = parseOpts( this.$elm.data( 'config' ) );
    };

    deeperSVG.prototype = {
        defaults: {
        },

        init: function() {
            var t = this;
            this.args = $.extend( {}, this.defaults, this.opts, this.config );

            if ( ! jQuery.isEmptyObject(this.args) ) {
                var
                t = this,
                css = '', cls = '',
                c, bg, fs, w, h, lh, r, s, m, b,
                ch, bgh, sh, ph, bh, gc, 
                a = t.$elm.attr( 'class' ).split( ' ' );

                $(a).each( function( i, e ) { cls += '.' + e; } );

                m = t.args.margin ? 'margin:' + t.args.margin + ' !important;' : '';
                r = t.args.rounded ? 'border-radius:' + t.args.rounded + ' !important;' : '';
                bg = t.args.bg ? 'background-color:' + t.args.bg + ' !important;' : '';
                b = t.args.border ? 'border:' + t.args.border + ' !important;' : '';
                s = t.args.shadow ? 'box-shadow:' + t.args.shadow + ' !important;' : '';
                c = t.args.color ? 'stroke:' + t.args.color +';' : ''; 

                ch = t.args.colorHover ? 'stroke:' + t.args.colorHover + ' !important;' : '';
                bh = t.args.borderHover ? 'border:' + t.args.borderHover + ' !important;' : '';
                bgh = t.args.bgHover ? 'background-color:' + t.args.bgHover + ' !important;' : '';
                sh = t.args.borderHover ? 'border:' + t.args.borderHover + ' !important;' : '';

                gc = t.args.gradientID ? 'stroke:url(#' + t.args.gradientID +') ' + t.args.color1 + ' !important;' : '';

                css += cls + ' .svg-wrap {' + m + r + c + bg + b + s + gc + '}\n';

                if ( ch || bgh || bh || sh )
                    css += ( h = t.args.parentHover )
                        ? '.' + h + ':hover ' + cls + ' .svg-wrap {' + ch + bgh + bh + sh + '}\n' 
                        : cls + ':hover .svg-wrap {' + ch + bgh + bh + sh + '}\n';

                css && $("#deeper-dynamic").length 
                    ? $("#deeper-dynamic").append( css ) 
                    : $("head").append( '<style type="text/css" id="deeper-dynamic">' + css + '</style>' );

                if ( t.args.hoverDraw ) {
                    t.$elm.parents( '.' + t.args.hoverDraw ).addClass( 'hover-draw' );
                }
            }

            if ( $().appear ) {
                t.$elm.appear(function() {
                    t.draw( t.$elm );
                });
            }

            $('.hover-draw').each(function() {
                $(this).hover(function() {                  
                    anime({
                        targets: this.querySelectorAll('.deeper-path'),
                        strokeDashoffset: [anime.setDashoffset, 0],
                        easing: 'easeInOutSine',
                        duration: 1500,
                        direction: 'alternate',
                        loop: false
                    });
                })
            })
        },
        draw: function( t ) {
            var el = t[0];
            if ( ! (document.documentMode || /Edge/.test(navigator.userAgent))) {
                anime({
                    targets: el.querySelectorAll('.deeper-path'),
                    strokeDashoffset: [anime.setDashoffset, 0],
                    easing: 'easeInOutSine',
                    duration: 1500,
                    direction: 'alternate',
                    loop: false
                });
            }
                
        }
    };

    $.fn.deeperSVG = function( opts ) {
        return this.each( function() {
            new deeperSVG( this, opts ).init();
        } );
    };
}( jQuery, window, document ));

// Cube Portfolio
(function( $, window, document, undefined ) {
    'use strict';

    var deeperCubePortfolio = function( elm, opts ) {
        this.elm = elm;
        this.$elm = $(elm);
        this.opts = opts;
        this.config = parseOpts( this.$elm.data( 'config' ) );
    };

    deeperCubePortfolio.prototype = {
        defaults: {
            filters: '#filter',
            defaultFilter: '*',
            layoutMode: 'grid',
            animationType: 'quicksand',
            gapHorizontal: 0,
            gapVertical: 0,
            showNavigation: true,
            showPagination: true,
            gridAdjustment: 'responsive',
            rewindNav: false,
            auto: false,
            mediaQueries: [{
                width: 1500,
                cols: 3
            }, {
                width: 923,
                cols: 3
            }, {
                width: 878,
                cols: 3,
                options: {
                    caption: '',
                    gapHorizontal: 0,
                    gapVertical: 0
                }
            }, {
                width: 675,
                cols: 2,
                options: {
                    caption: '',
                    gapHorizontal: 0,
                    gapVertical: 0
                }
            }, {
                width: 502,
                cols: 1,
                options: {
                    caption: '',
                    gapHorizontal: 0,
                    gapVertical: 0
                }
            }],
            caption: '',
            displayType: 'sequentially',
            displayTypeSpeed: 100
        },

        init: function() {
            this.args = $.extend( {}, this.defaults, this.opts, this.config );
            this.initCubePortfolio();
        },
        initCubePortfolio: function() {
            var t = this;

            if ( t.args.layoutMode == 'mosaic' && matchMedia( 'only screen and (max-width: 1300px)' ).matches ) {
                t.args.gridAdjustment = 'responsive';
                t.args.sortToPreventGaps = true;
            }
            t.$elm.waitForImages( function() {
                t.$elm.find('.cube-galleries').cubeportfolio( t.args ); 
            } );
        },
    };

    $.fn.deeperCubePortfolio = function( opts ) {
        return this.each( function() {
            new deeperCubePortfolio( this, opts ).init();
        } );
    };
}( jQuery, window, document ));

// Socials
(function( $, window, document, undefined ) {
    'use strict';

    var deeperSocials = function( elm, opts ) {
        this.elm = elm;
        this.$elm = $(elm);
        this.opts = opts;
        this.config = parseOpts( this.$elm.data( 'config' ) );
    };

    deeperSocials.prototype = {
        defaults: {
        },

        init: function() {
            var t = this;
            this.args = $.extend( {}, this.defaults, this.opts, this.config );

            if ( ! jQuery.isEmptyObject(this.args) ) {
                var
                t = this,
                css = '', cls = '',
                hc, hg, hb, 
                a = t.$elm.attr( 'class' ).split( ' ' );

                $(a).each( function( i, e ) { cls += '.' + e; } );

                hc = t.args.hoverColor ? 'color:' + t.args.hoverColor + ' !important;' : '';
                hg = t.args.hoverBg ? 'background-color:' + t.args.hoverBg + ' !important;' : '';
                hb = t.args.hoverBorder ? 'border-color:' + t.args.hoverBorder + ' !important;' : '';

                if ( hc || hg || hb )
                    css += cls + ' a:hover {' + hc + hg + hb + '}\n';

                css && $("#deeper-dynamic").length 
                    ? $("#deeper-dynamic").append( css ) 
                    : $("head").append( '<style type="text/css" id="deeper-dynamic">' + css + '</style>' );
            }
        },
    };

    $.fn.deeperSocials = function( opts ) {
        return this.each( function() {
            new deeperSocials( this, opts ).init();
        } );
    };
}( jQuery, window, document ));
jQuery( function($) {
	var page = 1;

	$('.project-loadmore').on( 'click', function() {
        var 
        $this = $(this),
        wrap = $this.prev( '.deeper-cubeportfolio' ),
        container = $this.prev( '.deeper-cubeportfolio' ).find( '.cube-galleries' ),
        query = $this.attr( 'data-query' );

		$.ajax({
			type: 'POST',
			url: ajax_params.ajaxurl,
			data: {
				'action': 'loadmore',
				'query': query,
				'page': page,
				'nonce': ajax_params.nonce
			},
			beforeSend: function( xhr ) {
				$this.addClass( 'loading' ).find('.loadmore-btn').text( 'Loading...' );
			},
			success: function( data ) {
				if ( data ) {
					//$(data).hide().appendTo( wrap ).fadeIn();
					$(container).cubeportfolio( 'appendItems', data );

					$this.removeClass( 'loading' ).find('.loadmore-btn').text( 'More Posts' );
 					page++;
				} else {
					$this.removeClass( 'loading' ).find('.loadmore-btn').text( 'No More Posts' );
				}
			}
		});

	} );
} );
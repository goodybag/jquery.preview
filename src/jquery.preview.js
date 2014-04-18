(function(factory){
  if ( typeof define === 'function' && define.amd ){
    // AMD. Register as an anonymous module.
    define( ['jquery'], factory );
  } else {
    // Browser globals
    factory(jQuery);
  }
}(function( $ ){
  'use strict';

  var cid = 1;

  $.fn.preview = function( options ){
    var $this = this;
    var $body = $( document.body );

    var defaults = {
      // Initial width of iframe before scaling
      width:        1024
      // Initial height of iframe before scaling
    , height:       900
      // Factor to pass into the scale function
    , scaleFactor:  0.5
      // Offset from the target element
    , targetOffset: 12
      // Prefix of the iframe element ID
    , idPrefix:     'iframe-preview-'
      // The event that shows the iframe
    , triggerShow:  'mouseenter'
      // The event that hides the iframe
    , triggerHide:  'mouseleave'
      // Classname of the iframe
    , className:    'iframe-preview'
      // z-index of the iframe
    , zIndex:       100
    };

    options = $.extend( {}, defaults, options );

    var createIframe = function( src, pos ){
      var $iframe = $('<iframe />');
      $iframe.attr( 'src', src );
      $iframe.attr( 'id', options.idPrefix + cid++ );
      $iframe.addClass( options.className );

      $iframe.css({
        position:   'absolute'
      , left:       pos.x + 'px'
      , top:        pos.y + 'px'
      , width:      options.width + 'px'
      , height:     options.height + 'px'
      , zIndex:     options.zIndex
      , overflow:   'scroll'
      , transformOrigin: [ 'top', 'right' ].join(' ')
      , transform:  [
          [ 'scale(', options.scaleFactor, ')' ].join('')
        // , [ 'translate(', pos.x, 'px, ', pos.y, 'px)' ].join('')
        ].join(' ')
      });

      return $iframe;
    };

    $this[ options.triggerShow ]( function( e ){
      var $el     = $(this);
      var offset  = $el.offset();
      var $iframe = createIframe( $el.attr('href'), {
        y: offset.top - ((options.height * options.scaleFactor) / 2)
      , x: (offset.left - options.width) - options.targetOffset
      });

      $body.prepend( $iframe );

      var onHide = function(){
        $iframe.remove();
        $el.off( options.triggerHide, onHide );
      };

      $el[ options.triggerHide ]( onHide );
    });
  };
}));
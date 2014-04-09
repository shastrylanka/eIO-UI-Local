/*
 * Ads & Data Bootstrap
 * Growl component written by jasonmit@yahoo-inc.com
 *
 * usage: $.growl('The request has timed out.', { typ: 'error' })
*/

;(function ($) {
  var tmpl = "<div class=\"growler\">" + 
                "<div class=\"closer\"><button type=\"button\" class=\"close\">×</button></div>" +
                "<div class=\"icon\"></div>" + 
                "<div class=\"inner\">" +
                  "<div class=\"typ-title\">{{typ}}:</div>" +  
                  "{{content}}" + 
                "</div>" + 
              "</div>",
      defaults = {
        typ: 'warn',            // 'error', 'warn', 'success' (className)
        timeout: 5000,          // how long for the growl to stay visible
        top: 70,                // start position
        right: 20,              // how many pixels to the right of the screen
        spacing: 10,            // bottom margin (spacing between growls)  
        transitionSpeed:  400
      };

  $.growl = function(msg, opts) {
    var offsetY = 0,
      $growler,
      $growlers = $('.growler'),
      timer, removeGrowl, cancelTimer, $last;

    opts = $.extend({}, defaults, opts);
    offsetY += opts.top;
    $growler = $(tmpl.replace('{{content}}', msg).replace('{{typ}}', opts.typ));

    removeGrowl = function() {
      if(!$growler) return;

      $growler.fadeOut(opts.transitionSpeed, function() {
        $(this).remove();
      });
    };
    
    cancelTimer = function() { if(timer) { clearTimeout(timer); } };

    $growler.on('click.growl.close', function(e) { 
      if($(e.target).hasClass('close')) {
        removeGrowl();
      }
    });

    // finds the lowest growl on the screen
    if($growlers && ($growlers.hasOwnProperty('length') && $growlers.length)) {
      $growlers.each(function() {
        var $this = $(this);

        if($this.offset().top > offsetY) {
          offsetY = $this.position().top;
          $last = $this;
        }
      });

      if('undefined' !== typeof $last) {
        offsetY += $last.outerHeight(true);
      }
    }   

    // position and append growl notification
    $growler.addClass(opts.typ).css({
      top: (offsetY + opts.spacing) || 0,
      right: (opts.right || 0)
    }).appendTo('body').fadeIn(opts.transitionSpeed);

    // setup timer to remove itself after N (opts.timeout) ms
    timer = setTimeout(function() {
      removeGrowl();
    }, opts.timeout);

    // expose some methods and properties
    return {
      destroy: removeGrowl,
      stick: cancelTimer,
      $element: $growler
    }
  };
}(window.jQuery));
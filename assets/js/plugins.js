// Avoid `console` errors in browsers that lack a console.
(function() {
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());

// Place any jQuery/helper plugins in here.
/*!
 * classie - class helper functions
 * from bonzo https://github.com/ded/bonzo
 * 
 * classie.has( elem, 'my-class' ) -> true/false
 * classie.add( elem, 'my-new-class' )
 * classie.remove( elem, 'my-unwanted-class' )
 * classie.toggle( elem, 'my-class' )
 */

/*jshint browser: true, strict: true, undef: true */

( function( window ) {

'use strict';

// class helper functions from bonzo https://github.com/ded/bonzo

function classReg( className ) {
  return new RegExp("(^|\\s+)" + className + "(\\s+|$)");
}

// classList support for class management
// altho to be fair, the api sucks because it won't accept multiple classes at once
var hasClass, addClass, removeClass;

if ( 'classList' in document.documentElement ) {
  hasClass = function( elem, c ) {
    return elem.classList.contains( c );
  };
  addClass = function( elem, c ) {
    elem.classList.add( c );
  };
  removeClass = function( elem, c ) {
    elem.classList.remove( c );
  };
}
else {
  hasClass = function( elem, c ) {
    return classReg( c ).test( elem.className );
  };
  addClass = function( elem, c ) {
    if ( !hasClass( elem, c ) ) {
      elem.className = elem.className + ' ' + c;
    }
  };
  removeClass = function( elem, c ) {
    elem.className = elem.className.replace( classReg( c ), ' ' );
  };
}

function toggleClass( elem, c ) {
  var fn = hasClass( elem, c ) ? removeClass : addClass;
  fn( elem, c );
}

window.classie = {
  // full names
  hasClass: hasClass,
  addClass: addClass,
  removeClass: removeClass,
  toggleClass: toggleClass,
  // short names
  has: hasClass,
  add: addClass,
  remove: removeClass,
  toggle: toggleClass
};

})( window );

function linkify(string, buildHashtagUrl, includeW3, target, noFollow) {
  relNoFollow = "";
  if (noFollow) {
    relNoFollow = " rel=\"nofollow\"";
  }
  
  string = string.replace(/((http|https|ftp)\:\/\/|\bw{3}\.)[a-z0-9\-\.]+\.[a-z]{2,3}(:[a-z0-9]*)?\/?([a-z\u00C0-\u017F0-9\-\._\?\,\'\/\\\+&amp;%\$#\=~])*/gi, function(captured) {
    var uri;
    if (captured.toLowerCase().indexOf("www.") == 0) {
      if (!includeW3) {
        return captured;
      }
      uri = "http://" + captured;
    } else {
      uri = captured;
    }
    return "<a href=\"" + uri+ "\" target=\"" + target + "\"" + relNoFollow + ">" + captured + "</a>";
  });
  
  if (buildHashtagUrl) {
    string = string.replace(/\B#(\w+)/g, "<a href=" + buildHashtagUrl("$1") +" target=\"" + target + "\"" + relNoFollow + ">#$1</a>");
  }
  return string;
}

(function($) {
  $.fn.linkify = function(opts) {
    return this.each(function() {
      var $this = $(this);
      var buildHashtagUrl;
      var includeW3 = true;
      var target = '_self';
      var noFollow = true;
      if (opts) {
        if (typeof opts  == "function") {
          buildHashtagUrl = opts;
        } else {
          if (typeof opts.hashtagUrlBuilder == "function") {
            buildHashtagUrl = opts.hashtagUrlBuilder;
          }
          if (typeof opts.includeW3 == "boolean") {
            includeW3 = opts.includeW3;
          }
          if (typeof opts.target == "string") {
            target = opts.target;
          }
          if (typeof opts.noFollow == "boolean") {
            noFollow = opts.noFollow;
          }
        }
      }
      $this.html(
          $.map(
            $this.contents(),
            function(n, i) {
                if (n.nodeType == 3) {
                    return linkify(n.data, buildHashtagUrl, includeW3, target, noFollow);
                } else {
                    return n.outerHTML;
                }
            }
        ).join("")
      );
    });
  }
})(jQuery);

/*
Name: jqSocialSharer
Type: jQuery Plugin
Version: 2.1
Author: Tirumal
Website: www.code-tricks.com
Plugin URL: http://code-tricks.com/customized-jquery-social-sharing-pop-up-window/
Description: jQuery Social Sharer Plugin
License: GNU GENERAL PUBLIC LICENSE V2.0
*/

;(function($){
  $.fn.jqSocialSharer = function(options){
    
    //settings
    var settings = $.extend({
      "popUpWidth" : 550,               /*Width of the Pop-Up Window*/
      "popUpHeight": 450,               /*Height of the Pop-Up Window*/
      "popUpTop"   : 100,               /*Top value for Pop-Up Window*/
      "useCurrentLocation" : false      /*Whether or not use current location for sharing*/
    }, options);
    
    /*Attach this plugin to each element in the DOM selected by jQuery Selector and retain statement chaining*/
    return this.each(function(index, value){
      
      /*Respond to click event*/
      $(this).bind("click", function(evt){
        
        evt.preventDefault();
        
        /*Define*/
        var social = $(this).data('social'),
            width=settings.popUpWidth,
            height=settings.popUpHeight,
            sHeight=screen.height, 
            sWidth=screen.width, 
            left=Math.round((sWidth/2)-(width/2)), 
            top=settings.popUpTop, 
            url,
            useCurrentLoc = settings.useCurrentLocation,
            socialURL = (useCurrentLoc) ? window.location : encodeURIComponent(social.url),
            socialText = social.text,
            socialImage = encodeURIComponent(social.image);
        
        switch(social.type){
            case 'facebook':
                url = 'https://www.facebook.com/sharer/sharer.php?s=100&p[url]='+socialURL+'&p[images][0]='+socialImage+'&p[title]='+socialText+'&p[summary]';
                break;
            case 'twitter':
                url = 'http://twitter.com/share?url='+ socialURL + '&text=' + socialText;
                break;
            case 'plusone':
                url = 'https://plusone.google.com/_/+1/confirm?hl=en&url=' + socialURL;
                break;
            case 'pinterest':
                url = 'http://pinterest.com/pin/create/button/?url=' + socialURL + '&media=' + socialImage + '&description=' + socialText ;
                break;
        }
   
        /*Finally fire the Pop-up*/    
        window.open(url, '', 'left='+left+' , top='+top+', width='+width+', height='+height+', personalbar=0, toolbar=0, scrollbars=1, resizable=1');         
      });
    });
  };
}(jQuery));

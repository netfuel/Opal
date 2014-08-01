/*
 Bones Scripts File
 Author: Eddie Machado

 This file should contain any js scripts you want to add to the site.
 Instead of calling it in the header or throwing it inside wp_head()
 this file will be called automatically in the footer so as not to
 slow the page load.

 */

// IE8 ployfill for GetComputed Style (for Responsive Script below)
if (!window.getComputedStyle) {
    window.getComputedStyle = function(el, pseudo) {
        this.el = el;
        this.getPropertyValue = function(prop) {
            var re = /(\-([a-z]){1})/g;
            if (prop == 'float') prop = 'styleFloat';
            if (re.test(prop)) {
                prop = prop.replace(re, function () {
                    return arguments[2].toUpperCase();
                });
            }
            return el.currentStyle[prop] ? el.currentStyle[prop] : null;
        }
        return this;
    }
}

// as the page loads, call these scripts
jQuery(document).ready(function($) {
    
    /*
     Responsive jQuery is a tricky thing.
     There's a bunch of different ways to handle
     it, so be sure to research and find the one
     that works for you best.
     */

    /* getting viewport width */
    var responsive_viewport = $(window).width();

    /* if is below 481px */
    if (responsive_viewport < 481) {

        $(window).on("resize", function () {
          $('.banner, #content').css('height', 400);
        }).resize();

    } /* end smallest screen */

    /* if is larger than 481px */
    if (responsive_viewport > 481) {

        $(window).on("resize", function () {
          $('.banner, #content').css('height', window.innerHeight / 2);
        }).resize();

    } /* end larger than 481px */

    /* if is above or equal to 768px */
    if (responsive_viewport >= 769) {

        /* load gravatars */
        $('.comment img[data-gravatar]').each(function(){
            $(this).attr('src',$(this).attr('data-gravatar'));
        });

        //Make the banner the full screen size.


        //Make the banner fullscreen
        $(window).on("resize", function () {
          $('.banner, #content').css('height', window.innerHeight);
        }).resize();   

    }

    /* off the bat large screen actions */
    if (responsive_viewport > 1030) {

    }

    //This guy hides the about section on the home page till everything is nice and loaded
    setTimeout(function() {
        $('.home-template #about, .archive-template #about').show();
    }, 500);

    //If an image in a post is less than 901px then it doesnt apply the full screen effect.
    $("#content img").each(function(i, el)
    {
        var img = $(el);
        var width = img.width();
        if (width < 400)
            img.addClass('small');
        else if (width < 800)
            img.addClass('medium');
        else if (width < 1200)
            img.addClass('large');
    });

}); /* end of as page load scripts */

//Load those nav li's sequrntially for purdyness
window.onload = function() {
  var cars = document.querySelectorAll("#content article"), i = 1;
    Array.prototype.forEach.call(cars, function(car) { 
    setTimeout(function(){ car.classList.add("visible") }, 200*i)
    i++;
  })
};

//get rid of the p tag in the post content sections. ghost ew.
$('.entry-content p > img').unwrap();

$(document).ready(function(){

    //Share some stuff
    $("#share a").jqSocialSharer();

    //Activate the about section on the homepage
    var menuLeft = document.getElementById( '#about' ),
        showLeftPush = document.getElementById( 'showLeftPush'),
        hideLeftPush = document.getElementById( 'about'),
        body = document.body;

    showLeftPush.onclick = function() {
        classie.toggle( this, 'active' );
        classie.toggle( body, 'push-open' );
        classie.toggle( about, 'open' );
    };

    hideLeftPush.onclick = function() {
        classie.toggle( this, 'active' );
        classie.toggle( body, 'push-open' );
        classie.toggle( about, 'open' );
    }; 

});

/*! A fix for the iOS orientationchange zoom bug.
 Script by @scottjehl, rebound by @wilto.
 MIT License.
 */
(function(w){
    // This fix addresses an iOS bug, so return early if the UA claims it's something else.
    if( !( /iPhone|iPad|iPod/.test( navigator.platform ) && navigator.userAgent.indexOf( "AppleWebKit" ) > -1 ) ){ return; }
    var doc = w.document;
    if( !doc.querySelector ){ return; }
    var meta = doc.querySelector( "meta[name=viewport]" ),
        initialContent = meta && meta.getAttribute( "content" ),
        disabledZoom = initialContent + ",maximum-scale=1",
        enabledZoom = initialContent + ",maximum-scale=10",
        enabled = true,
        x, y, z, aig;
    if( !meta ){ return; }
    function restoreZoom(){
        meta.setAttribute( "content", enabledZoom );
        enabled = true; }
    function disableZoom(){
        meta.setAttribute( "content", disabledZoom );
        enabled = false; }
    function checkTilt( e ){
        aig = e.accelerationIncludingGravity;
        x = Math.abs( aig.x );
        y = Math.abs( aig.y );
        z = Math.abs( aig.z );
        // If portrait orientation and in one of the danger zones
        if( !w.orientation && ( x > 7 || ( ( z > 6 && y < 8 || z < 8 && y > 6 ) && x > 5 ) ) ){
            if( enabled ){ disableZoom(); } }
        else if( !enabled ){ restoreZoom(); } }
    w.addEventListener( "orientationchange", restoreZoom, false );
    w.addEventListener( "devicemotion", checkTilt, false );
})( this );
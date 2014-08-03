Opal
===============

A clean responsive Ghost theme. 
Working Demo: http://www.mattladner.com

Browser Support: Firefox 5+, IE 10+, Chrome, Safari 4+, Opera 12+

## Installing
* Upload the root theme folder to /content/themes in your Ghost folder
* Restart NPM
* Activate theme in the Ghost settings panel

## Setup
###Activate your comments using discuss
  By Default, this theme supports comments supplied by [Disqus](http://disqus.com). You will need to activate the comment module by editing /clean-joe-green/partials/comments.hbs. For assistance in setting up your own Disqus account and customizing it for your needs, please see the [Disqus QuickStart Guide](http://help.disqus.com/customer/portal/articles/466182-quick-start-guide).

### Cover images
* Square works best
* Try to use an image over 900px x 900px.
* We are working on support for multi-sized cover images for a better mobile experience.

### Images in posts
Images dynamically adjust in a post depending on the images size. You can control the layout of the images by re-sizing them as follows:
* Images over 1100px wide fill the content area in a post.
* Images between 800 and 500px wide center to a content area. 
* Images below 400px float left of the content.

These settings can be adjusted in /assets/js/scrips.js under //CONTENT IMAGES.

### Display Settings
The theme's default color, font and other fun variables can be changed in the sass config file located in /scss/config.scss. After you update the settings you will need to recompile the sass using your preferred method. Editing the CSS files is not recommended.

### Additional features
Youtube and Vimeo embeds can be made to fill the content area by not including a width when you use their embed codes. Otherwise they will center align.

## Credits
Ghost is built by the lovely people at [Ghost](https://ghost.org). This theme is built on the amazing [Linnen Framework](http://themespectre.com/linen/) built by the guys at [Theme Spectre](http://themespectre.com). The front-end code was hand crafted by [Matt Ladner](http://www.mattladner.com) who can be found at [@netfuel](http://www.twitter.com/netfuel). A front-end sandbox of the theme can be found [here](http://codepen.io/netfuel/).

Joe also uses jqSocialSharer by Tirumal and  Classie from Bonzo. Cheers fellas!

## Support
Theme support for now is limited to tweeting [@netfuel](http://www.twitter.com/netfuel). Ghost support can be found on [their support forum](https://ghost.org/forum/)
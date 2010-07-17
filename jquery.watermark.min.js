/*
 * jQuery Watermark plugin
 * Version 1.1 (29-JUN-2010) CUSTOM
 * @requires jQuery v1.2.3 or later
 *
 * Examples at: http://mario.ec/static/jq-watermark/
 * Copyright (c) 2010 Mario Estrada
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/mit-license.php
 *
 */
(function(a){var k=a.browser.msie&&a.browser.version<8;a.watermarker=function(){};a.extend(a.watermarker,{defaults:{color:"#999",left:0,top:0,fallback:false},setDefaults:function(e){a.extend(a.watermarker.defaults,e)},checkVal:function(e,d){e==""?a(d).show():a(d).hide()},html5_support:function(){return"placeholder"in document.createElement("input")}});a.fn.watermark=function(e,d){var i;d=a.extend(a.watermarker.defaults,d);i=this.filter("input[type=text], input[type=password], input[type=email], input[type=url], input[type=search], textarea");
if(!(d.fallback&&a.watermarker.html5_support())){i.each(function(){var b,f,j,g,c,h=0;b=a(this);if(b.attr("data-jq-watermark")!="processed"){f=b.attr("placeholder")!=undefined&&b.attr("placeholder")!=""?"placeholder":"title";j=e===undefined||e===""?a(this).attr(f):e;g=a('<span class="watermark_container"></span>');c=a('<span class="watermark">'+j+"</span>");f=="placeholder"&&b.removeAttr("placeholder");g.css({display:"inline-block",position:"relative"});k&&g.css({zoom:1,display:"inline"});b.wrap(g).attr("data-jq-watermark",
"processed");if(this.nodeName.toLowerCase()=="textarea"){e_height=b.css("line-height");e_height=e_height==="normal"?parseInt(b.css("font-size")):e_height;h=b.css("padding-top")!="auto"?parseInt(b.css("padding-top")):0;h+=b.css("margin-top")!="auto"?parseInt(b.css("margin-top")):0}else e_height=b.outerHeight();f=b.css("margin-left")!="auto"?parseInt(b.css("margin-left")):0;f+=b.css("padding-left")!="auto"?parseInt(b.css("padding-left")):0;a.watermarker.checkVal(b.val(),c);c.css({position:"absolute",
display:"block",fontFamily:b.css("font-family"),fontSize:b.css("font-size"),color:d.color,left:4+d.left+f,top:d.top+h,height:e_height,lineHeight:e_height+"px",textAlign:"left"}).data("jq_watermark_element",b);c.click(function(){a(a(this).data("jq_watermark_element")).focus()});b.before(c).focus(function(){a.watermarker.checkVal(a(this).val(),c);c.animate({opacity:0.7},250)}).blur(function(){a.watermarker.checkVal(a(this).val(),c);c.animate({opacity:1},250)}).keydown(function(){a(c).hide()})}});return this}};
a(document).ready(function(){a(".jq_watermark").watermark()})})(jQuery);
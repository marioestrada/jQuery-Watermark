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

(function($)
{
    var old_ie = $.browser.msie && $.browser.version < 8;
    var hard_left = 4
	$.watermarker = function(){};	
	$.extend($.watermarker, {
		defaults: {
			color : '#999',
			left: 0,
			top: 0,
			fallback: false
		},
		setDefaults: function(settings)
		{
			$.extend( $.watermarker.defaults, settings );
		},
		checkVal: function(val, label)
		{
			if(val == '') 
				$(label).show();
			else 
				$(label).hide();
		},
		html5_support: function() {
            var i = document.createElement('input');
            return 'placeholder' in i;
        }
	});
	
	$.fn.watermark = function(text, options){
		var options, elems;
		options = $.extend($.watermarker.defaults, options);
		elems = this.filter('input[type=text], input[type=password], input[type=email], input[type=url], input[type=search], textarea');
		
		if(options.fallback && $.watermarker.html5_support())
		    return;
		
		elems.each(function()
		{
			var $elem, attr_name, label_text, watermark_container, watermark_label;
			var e_margin_left, e_margin_top, pos, e_top = 0, height, line_height;
			
			$elem = $(this);
			if($elem.attr('data-jq-watermark') == 'processed')
			    return;
			
			attr_name = $elem.attr('placeholder') != undefined && $elem.attr('placeholder') != '' ? 'placeholder' : 'title';
			label_text = text === undefined || text === '' ? $(this).attr(attr_name) : text;
			watermark_container = $('<span class="watermark_container"></span>');
			watermark_label = $('<span class="watermark">' + label_text + '</span>');
			
			// If used, remove the placeholder attribute to prevent conflicts
 			if(attr_name == 'placeholder')
				$elem.removeAttr('placeholder');
			
			watermark_container.css({
				display: 'inline-block',
				position: 'relative'
			});
			
			if(old_ie)
			{
			    watermark_container.css({
			       zoom: 1,
			       display: 'inline' 
			    });
			}
			
			$elem.wrap(watermark_container).attr('data-jq-watermark', 'processed');
			if(this.nodeName.toLowerCase() == 'textarea')
			{
			    e_height = $elem.css('line-height');
				e_height = e_height === 'normal' ? parseInt($elem.css('font-size')) : e_height;
			    e_top = ($elem.css('padding-top') != 'auto' ? parseInt($elem.css('padding-top')):0);
			    e_top += ($elem.css('margin-top') != 'auto' ? parseInt($elem.css('margin-top')):0);
		    }else{
		        e_height = $elem.outerHeight();
		    }
			
			e_margin_left = $elem.css('margin-left') != 'auto' ? parseInt($elem.css('margin-left')) : 0;
			e_margin_left += $elem.css('padding-left') != 'auto' ? parseInt($elem.css('padding-left')) : 0;
			
			$.watermarker.checkVal($elem.val(), watermark_label);
			
			watermark_label.css({
				position: 'absolute',
				display: 'block',
	            fontFamily: $elem.css('font-family'),
	            fontSize: $elem.css('font-size'),
	            color: options.color,
	            left: hard_left + options.left + e_margin_left,
	            top: options.top + e_top,
	            height: e_height,
	            lineHeight: e_height + 'px',
	            textAlign: 'left'
			}).data('jq_watermark_element', $elem);
			
			watermark_label.click(function()
			{
				$($(this).data('jq_watermark_element')).focus();
			});
			
			$elem.before(watermark_label)
			.focus(function()
			{
				$.watermarker.checkVal($(this).val(), watermark_label);
				watermark_label.animate({ opacity : 0.7}, 250);
			})
			.blur(function()
			{
				$.watermarker.checkVal($(this).val(), watermark_label);
				watermark_label.animate({ opacity : 1}, 250);
			})
			.keydown(function(e)
			{
				$(watermark_label).hide();
			});
		});
		
		return this;
	};
	
	$(document).ready(function()
	{
		$('.jq_watermark').watermark();
	});
})(jQuery);
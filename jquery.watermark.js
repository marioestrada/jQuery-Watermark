/*
 * jQuery Watermark plugin
 * Version 1.0.4 (7-DIC-2009)
 * @requires jQuery v1.2.3 or later
 *
 * Examples at: http://mario.ec/static/jq-watermark/
 * Copyright (c) 2009 Mario Estrada
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/mit-license.php
 *
 */

(function($)
{
	$.watermarker = function(){};	
	$.extend($.watermarker, {
		defaults: {
			color : '#999',
			left: 4			
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
		}
	});
	
	$.fn.watermark = function(text, css_options){
		var css, elems;
		css = $.extend($.watermarker.defaults, css_options);
		 elems = this.filter('input[type=text], input[type=password], textarea');
		
		elems.each(function()
		{
			var $elem, attr_name, label_text, watermark_container, watermark_label;
			var e_margin_left, e_margin_top, pos, top, height, line_height;
			
			$elem = $(this);
			attr_name = $elem.attr('placeholder') != undefined && $elem.attr('placeholder') != '' ? 'placeholder' : 'title';
			label_text = text === undefined || text === '' ? $(this).attr(attr_name) : text;
			watermark_container = $('<span class="watermark_container"></span>');
			watermark_label = $('<span class="watermark">' + label_text + '</span>');
			
			
			// If used, remove the placeholder attribute to prevent conflicts
 			if(attr_name == 'placeholder')
				$elem.removeAttr('placeholder');
			
			watermark_container.css({
				'float': $elem.css('float'),
				'position': 'relative'
			});
			
			$elem.wrap(watermark_container);
			if(this.nodeName.toLowerCase() != 'textarea')
			{
				height = $elem.outerHeight();
				top = '50%';
				line_height = height + 'px';
			}else{
                pos = $elem.position();
				e_margin_top = $elem.css('margin-top') !== 'auto' ? parseInt($elem.css('margin-top')) : 0;
                top = pos.top + parseInt($elem.css('padding-top')) + e_margin_top + parseInt($elem.css('border-top-width'));
                line_height = $elem.css('line-height');
				height = line_height === 'normal' ? parseInt($elem.css('font-size')) : line_height;
			}
			
			e_margin_left = $elem.css('margin-left') !== 'auto' ? parseInt($elem.css('margin-left')) : '0';
			
			$.watermarker.checkVal($elem.val(), watermark_label);
			
			watermark_label.css({
            	position: 'absolute',
	            fontFamily: $elem.css('font-family'),
	            fontSize: $elem.css('font-size'),
	            color: css.color,
	            left: css.left,
	            right: 0,
	            bottom: 0,
	            top: top,
	            height: height + 'px',
	            lineHeight: line_height,
	            marginTop: '-' + (height / 2) + 'px',
	            marginLeft: e_margin_left + parseInt($elem.css('padding-left'))
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
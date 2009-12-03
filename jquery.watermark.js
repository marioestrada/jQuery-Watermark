/*
 * jQuery Watermark plugin
 * Version 1.0.2 (30-NOV-2009)
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
			var $elem, attr_name, label_text, watermark_container, watermark_label, pos, top, height;
			$elem = $(this);
			attr_name = $elem.attr('placeholder') != undefined && $elem.attr('placeholder') != '' ? 'placeholder' : 'title';
			label_text = text === undefined ? $(this).attr(attr_name) : text;
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
			
			if(this.nodeName != 'TEXTAREA')
			{
				height = $elem.outerHeight();
				top = '50%';
			}else{
				pos = $elem.position();
				top = pos.top + parseInt($elem.css('padding-top')) + parseInt($elem.css('margin-top')) + parseInt($elem.css('border-top-width'));
				height = $elem.css('line-height');
			}
			
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
				lineHeight: height + 'px',
				marginTop: '-' + (height / 2) + 'px',
				marginLeft: parseInt($elem.css('margin-left')) + parseInt($elem.css('padding-left'))
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
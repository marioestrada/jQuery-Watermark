/*
 * jQuery Watermark plugin
 * Version 1.0 (14-SEP-2009)
 * @requires jQuery v1.2.3 or later
 *
 * Examples at: http://mario.ec/projects/jqwatermark/
 * Copyright (c) 2009 Mario Estrada
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/mit-license.php
 *
 */

(function($)
{
	$.fn.watermark = function(text, css_options){
		css = $.extend({
			color : '#999',
			left: 4
		}, css_options);
		
		return this.each(function()
		{
			var input_marked = $(this);
			var label_text = text === undefined ? $(this).attr('title') : title;
			var watermark_container = $('<span class="watermark_container" style="position: relative"></span>');
			var watermark_label = $('<span class="watermark">' + label_text + '</span>');
			
			watermark_container.css({
				float: input_marked.css('float')
			});
			
			$(this).wrap(watermark_container);
			
			var height = $(this).outerHeight();

			checkVal($(this).val(), watermark_label);
			
			watermark_label.css({
				position: 'absolute',
				fontFamily: $(this).css('font-family'),
				fontSize: $(this).css('font-size'),
				color: css.color,
				left: (parseInt($(this).css('padding-left')) + css.left) + 'px',
				top: '50%',
				height: height + 'px',
				lineHeight: height + 'px',
				marginTop: '-' + (height / 2) + 'px'
			});
			
			watermark_label.click(function()
			{
				$(this).next().focus();
			})

			$(this).before(watermark_label)
			.focus(function()
			{
				checkVal($(this).val(), watermark_label);
				watermark_label.animate({ opacity : 0.7}, 250);
			})
			.blur(function()
			{
				checkVal($(this).val(), watermark_label);
				watermark_label.animate({ opacity : 1}, 250);
			})
			.keydown(function(e)
			{
				$(watermark_label).hide();
			});
		});
	};
	
	checkVal = function(val, elem)
	{
		if(val == '') 
			$(elem).show();
		else 
			$(elem).hide();
	};
	
	$(document).ready(function()
	{
		$('input.jq_watermark[type=text], textarea.jq_watermark, input[type=password].jq_watermark,').each(function(){
			$(this).watermark();
		});
	});
})(jQuery);
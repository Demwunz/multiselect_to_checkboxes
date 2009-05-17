var AL = {
	selectToCheckbox: function(){
		//ignore replace so it doesnt clash with reflection field
		jQuery('select[multiple]').not('.replace').each(function(i, select) {
			//vars
			var title = jQuery(select).parent('label').css("marginBottom","0.2em");
			var name = jQuery(select).attr('name');
			var vals = jQuery(select).val();
			var scroll = jQuery('<div class="checkbox-scroll"></div>');
			var unorderedList = jQuery('<ul/>');
			var zebra = 0;
			//funcs
			jQuery.fn.extend({
			    toggleState: function(){
					if(jQuery(this).is(':checked')){ 
						return jQuery(this).attr('checked', false).parent().removeClass('checked');						
					}else{
						return jQuery(this).attr('checked', true).parent().addClass('checked');
					}
				}
			});
			//get values from options and create list items
			jQuery('option', select).each(function(index, option) {
				if(jQuery(option).val() == '') return;
				//clone the element, in case it gets modified later with events etc
				var listItem = 	jQuery('<li><input type="checkbox"/><label/></li>');
				var value = jQuery(option).val();
				var labeltxt = jQuery(option).text();
				var id = name.replace(/\[|\]/g, '')+index;
				//check it?
				jQuery(option).is(":selected") ? jQuery('input', listItem).toggleState() : null;
				//zebra stripes
				(zebra++ % 2 == 0) ? listItem.addClass("odd") : null;
				//populate values
				jQuery('input', listItem).attr({'id': id, 'value': value, 'name': name});
				jQuery('label', listItem).attr({'for': id}).text(labeltxt);
				//attach it to the list
				unorderedList.append(listItem);
			});		
			//bind one click event to save memory again in case there are lots of elements
			unorderedList.bind('click', function(event) {
				var clicked = jQuery(event.target);
				var clickedObject = clicked[0];
				var j = jQuery('li', unorderedList).length;
				//check for the correct clicked object
				while (j--) {
					if (clickedObject == jQuery('label', this)[j]) {
							jQuery(clickedObject).siblings('input').toggleState();
						break;						
					};
				};
				//reactivate the buttons because something must have changed
				jQuery.each(['checkbox-selectall-','checkbox-deselectall-','checkbox-reset-'], function() {
				  	jQuery("#"+this+i).removeClass('inactive');
				});
				event.preventDefault();				
			}).appendTo(scroll);
			//if its long add a scrollbar
			jQuery('li',unorderedList).length > 7 ? scroll.css({height: '150px', overflow: 'auto'}) : null;			
			//extra options			
			var buttons = jQuery('<div class="checkbox-buttons clear"/>');
			buttons.html('<a id="checkbox-selectall-'+i+'">Select all</a><a id="checkbox-deselectall-'+i+'">Deselect all</a><a class="inactive" id="checkbox-reset-'+i+'">Reset</a>');
			buttons.bind('click', function(event) {
				var clicked = jQuery(event.target);
				var clickedObject = clicked[0];
				var j = 3;//3 buttons
				//check for the correct clicked object
				while (j--) {
					if (clickedObject == jQuery('a', this)[j]) {
							if(jQuery(clickedObject).hasClass('inactive')) return;
							if(clickedObject.id == 'checkbox-selectall-'+i){
								jQuery('input:not(:checked)', unorderedList).toggleState();
							} else if(clickedObject.id == 'checkbox-deselectall-'+i){
								jQuery('input:checked', unorderedList).toggleState();
							}else{
								//must be the reset
								jQuery("input:checked", unorderedList).toggleState();
								jQuery.each(vals, function(index, val) {
								  jQuery("input[value='"+val+"']", unorderedList).toggleState();
								});
							}
							jQuery(clickedObject).addClass('inactive').siblings().removeClass('inactive');
						break;						
					};
				};
				event.preventDefault();
			});
			//attach them to the page
			jQuery([scroll,buttons]).insertAfter(title);
			//remove the select
			jQuery(select).remove();
		});	
	}
}
jQuery(function() {
	if(jQuery('select[multiple]').length){AL.selectToCheckbox();}
});

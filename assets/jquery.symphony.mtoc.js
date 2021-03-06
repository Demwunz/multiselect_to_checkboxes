Symphony.Language.add({
	"Reset": false,
	"Select all": false,
	"Deselect all": false
});

var Sym = {
	selectToCheckbox: function(o){
		//funcs
		jQuery.fn.toggleState = function(){
		  var checked;
		  return this.each(function(){
		    checked = jQuery(this).is(':checked');
		    jQuery(this).attr('checked', !checked).parent().toggleClass('checked', !checked);
		  })
		};
		//ignore replace so it doesnt clash with reflection field
		jQuery('select[multiple]').not(o.ignore).each(function(i, sel) {
			//vars
			var select = jQuery(sel),
			 title = select.parent('label').css("marginBottom","0.2em"),
			 name = select.attr('name'),
			 vals = select.val(),
			 scroll = jQuery('<div class="checkbox-scroll"/>'),
			 unorderedList = jQuery('<ul/>'),
			 zebra = 0;
			
			if (jQuery('optgroup', select).length > 1) {
				optgroups = true;
				unorderedList = jQuery('<div/>');
				jQuery('optgroup', select).each(function(index, opt) {
					var optgroup = jQuery('<ul></ul>');
					addListItemFromOption(jQuery('option', this), optgroup);
					var optgroup_container = jQuery('<div class="optgroup"/>');
					jQuery('<h3>' + jQuery(opt).attr('label') + '<span></span></h3>').appendTo(optgroup_container);
					optgroup.appendTo(optgroup_container);
					optgroup_container.appendTo(unorderedList);
				});
			} else {
				addListItemFromOption(jQuery('option', select), unorderedList);
			}
			
			//get values from options and create list items
			function addListItemFromOption(options, append_to) {
				options.each(function(index, opt) {
					var option = jQuery(opt);
					if(option.val() === '') return;
					//clone the element, in case it gets modified later with events etc
					var listItem = 	jQuery('<li><input type="checkbox" /><label/></li>'),
					 value = option.val(),
					 labeltxt = option.text(),
					 id = name.replace(/\[|\]/g, '')+index;
					//check it?
					option.is(":selected") ? jQuery('input:checkbox', listItem).toggleState() : null;
					//zebra stripes
					(zebra++ % 2 === 0) ? listItem.addClass("odd") : null;
					//populate values
					jQuery('input:checkbox', listItem).attr({'id': id, 'value': value, 'name': name});
					jQuery('label', listItem).attr({'for': id}).text(labeltxt);
					//attach it to the list
					append_to.append(listItem);
				});
			}		
			//bind one click event to save memory again in case there are lots of elements
			unorderedList.bind('click', function(event) {				
				var clickedObject = jQuery(event.target)[0];
				var j = jQuery('li', unorderedList).length;
				//check for the correct clicked object
				while (j--) {
					if (clickedObject == jQuery('label', this)[j]) {
						jQuery(clickedObject).siblings('input').toggleState();
						break;						
					}
					// Fix bug in IE:
					if (clickedObject == jQuery('input', this)[j]) {
						checked = jQuery(clickedObject).is(':checked');
						jQuery(clickedObject).parent().toggleClass('checked', checked);
						return;
						break;						
					}
				}
				var j = jQuery('h3', unorderedList).length;
				//check for the correct clicked object
				while (j--) {
					if (clickedObject == jQuery('h3', this)[j]) {
						jQuery(clickedObject).parent().toggleClass('collapse').find('ul').slideToggle('fast');
						break;						
					}
				}
				//reactivate the buttons because something must have changed
				var buttons_arr = ['checkbox-selectall-'+i,'checkbox-deselectall-'+i,'checkbox-reset-'+i];
				for (var x in buttons_arr) {
					if (buttons_arr.hasOwnProperty(x)){
				  		jQuery("#"+buttons_arr[x]).removeClass('inactive');
					}
				}
				event.preventDefault();				
			}).appendTo(scroll);
			
			//if its long add a scrollbar
			jQuery('li',unorderedList).length > 7 ? scroll.css({height: '150px', overflow: 'auto'}) : null;			
			//extra options			
			var buttons = jQuery('<div class="checkbox-buttons clear"><a id="checkbox-selectall-'+i+'">' + Symphony.Language.get("Select all") + '</a><a id="checkbox-deselectall-'+i+'">' + Symphony.Language.get("Deselect all") + '</a><a class="inactive" id="checkbox-reset-'+i+'">' + Symphony.Language.get("Reset") + '</a></div>');
			buttons.bind('click', function(event) {
				var clickedObject = jQuery(event.target)[0];
				var j = 3;//3 buttons
				//check for the correct clicked object
				while (j--) {
					if (clickedObject == jQuery('a', this)[j]) {
							if(jQuery(clickedObject).hasClass('inactive')) return;
							if(clickedObject.id == 'checkbox-selectall-'+i){
								jQuery('input:checkbox:not(:checked)', unorderedList).toggleState();
							} else if(clickedObject.id == 'checkbox-deselectall-'+i){
								jQuery('input:checked', unorderedList).toggleState();
							}else{
								//must be the reset
								jQuery("input:checkbox:checked", unorderedList).toggleState();
								if(!vals) return;
								for(var v in vals){
									if (vals.hasOwnProperty(v)){
							  			jQuery("input:checkbox[value='"+vals[v]+"']", unorderedList).toggleState();
									}
								}
							}
							jQuery(clickedObject).addClass('inactive').siblings().removeClass('inactive');
						break;						
					}
				}
				event.preventDefault();
			});
			//attach them to the page
			jQuery(buttons).insertAfter(title);
			jQuery(scroll).insertAfter(title);
			//remove the select
			select.remove();
		});	
	}
};
jQuery(function() {
	if(jQuery('select').length){
		Sym.selectToCheckbox({
			ignore : ".replace, .source, .field-mediathek select, .field-subsectionmanager select"
		});
	}
});
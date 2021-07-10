(function($) {
	var Event = function(text, className) {
		this.text = text;
		this.className = className;
	};
	
	$.fn.datepickerWithEvent = function(options) {
		if (!options || !options.eventDates) {
			console.error("Property \"eventDates\" is required.");
			return;
		}
		if (options.beforeShowDay) {
			options.beforeShowDay = undefined;
			console.warn("Property \"beforeShowDay\" is invalid.");
		}
		
		var eventDates = options.eventDates;
		var dateFormat = options.dateFormat ? options.dateFormat : "mm/dd/yy";
		var events = {};
		for (var i = 0; i < eventDates.length; i++) {
			events[$.datepicker.parseDate(dateFormat, eventDates[i])] = new Event("", "has-event");
		}
		options.beforeShowDay = function(date) {
	        var event = events[date];
	        if (event) {
	            return [true, event.className, event.text];
	        } else {
	            return [true, '', ''];
	        }
	    }

	    if (options.onSelectWithEvent) {
	    	var onSelectWithEvent = options.onSelectWithEvent;
	    	var onSelect = options.onSelect;
	    	options.onSelect = function(dateText, inst) {
	    		if (events[$.datepicker.parseDate(dateFormat, dateText)]) {
	    			onSelectWithEvent.apply((inst.input ? inst.input[0] : null), [dateText, inst]);
	    		}
	    		if (onSelect) {
	    			onSelect.apply((inst.input ? inst.input[0] : null), [dateText, inst]);
	    		}
	    	}
	    }
	    options.eventDates = undefined;
	    options.onSelectWithEvent = undefined;
		$(this).datepicker(options);
	}
}) (jQuery);
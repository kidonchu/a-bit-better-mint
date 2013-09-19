$(document).ready(function(){
	var options = {
		showButtonPanel: true,
		showOn: "button",
		buttonImage: "img/calendar.gif",
		buttonImageOnly: true,
		changeMonth: true,
		changeYear: true,
		yearRange: '-70:+0',
		numberOfMonths: 1
	};
	$.extend($.datepicker,{_checkOffset:function(inst,offset,isFixed){offset.top = 5; offset.left=0; return offset;}});

	// apply datepicker to dates
	options.onClose = function(selectedDate){$("#abbm_end_date").datepicker("option", "minDate", selectedDate);};
	$("#abbm_start_date").datepicker(options);
	options.onClose = function(selectedDate){$("#abbm_start_date").datepicker( "option", "maxDate", selectedDate );};
	$("#abbm_end_date").datepicker(options);

	// set default date
	var today = new Date();
	var this_year = today.getFullYear();
	var this_month = today.getMonth() + 1; // months are zero based
	var last_date;
	if ($.inArray(this_month, [1,3,5,7,8,10,12]) > -1){last_date = 31;}
	else if (this_month == 2){last_date = 28;}
	else {last_date = 30;}
	$("#abbm_start_date").datepicker('setDate', this_month + '/01/' + this_year);
	$("#abbm_end_date").datepicker('setDate', this_month + '/' + last_date + '/' + this_year);

	// reload with submitted info
	$("#abbm_reload").on('click', function(){
		chrome.tabs.getSelected(null, function (tab)
		{
			var url = tab.url;
			var start = $("#abbm_start_date").val();
			var end = $("#abbm_end_date").val();

			// check if dates are correct
			var date_reg = /^(0?[1-9]|1[012])[\/](0?[1-9]|[12][0-9]|3[01])[\/]\d{4}$/;
			if (start.match(date_reg) === null || end.match(date_reg) === null)
			{
				return false;
			}

			// reload tab
			var reload_url = "https://wwws.mint.com/transaction.event?startDate="+start+"&endDate="+end;
			chrome.tabs.update(tab.id, {url: reload_url});
			window.close();
		});
	});
});
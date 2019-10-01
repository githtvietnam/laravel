$(document).ready(function(){
	var updateOutput1 = function (e) {
	var list = e.length ? e : $(e.target),
		output = list.data('output');
		if (window.JSON) {
			let json = window.JSON.stringify(list.nestable('serialize'));
			let formUrl = 'navigation/ajax/navigation/drag';
			let catalogueid = $('#nestable2').attr('data-catalogueid');
			$.post(formUrl, {
				post: json,catalogueid:catalogueid},
				function(data){
					console.log(data);
				});
		} else {
			output.val('JSON browser support required for this demo.');
		}
	};
	
	 // activate Nestable for list 2
	 $('#nestable2').nestable({
		 group: 1
	 }).on('change', updateOutput1);
	 
	 
	var updateOutput2 = function (e) {
		var list = e.length ? e : $(e.target),
			output = list.data('output');
			if (window.JSON) {
				let json = window.JSON.stringify(list.nestable('serialize'));
				let formUrl = 'navigation/ajax/navigation/drag';
				let catalogueid = $('#nestable3').attr('data-catalogueid');
				$.post(formUrl, {
					post: json,catalogueid:catalogueid},
					function(data){
						console.log(data);
					});
			} else {
				output.val('JSON browser support required for this demo.');
			}
		};
	 
	$('#nestable3').nestable({
		group: 1
	}).on('change', updateOutput2);
	
	var updateOutput4 = function (e) {
		var list = e.length ? e : $(e.target),
			output = list.data('output');
			if (window.JSON) {
				let json = window.JSON.stringify(list.nestable('serialize'));
				let formUrl = 'navigation/ajax/navigation/drag';
				let catalogueid = $('#nestable4').attr('data-catalogueid');
				$.post(formUrl, {
					post: json,catalogueid:catalogueid},
					function(data){
						console.log(data);
					});
			} else {
				output.val('JSON browser support required for this demo.');
			}
		};
	 
	$('#nestable4').nestable({
		group: 1
	}).on('change', updateOutput4);

	
});
 
 

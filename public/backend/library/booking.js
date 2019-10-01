$(document).ready(function(){
	// $(document).on('click','.fc-corner-left, .fc-corner-right', function(){
	// 	let month = $("#calendar").fullCalendar('getDate').month();
	// 	let year = $("#calendar").fullCalendar('getDate').year();
 //  		month = sum(month,1);
 //  		// lấy dữ liệu tháng hiện tại
 //  		console.log(month);
 //  		console.log(year);
	// 	let ajaxUrl = 'booking/ajax/booking/get_data_month';
	// 	$.post(ajaxUrl, {
	// 		month: month, year: year},
	// 		function(data){
	// 			let events = '['+data+']';
	// 			// console.log(events)
	// 			$('#calendar').fullCalendar('refetchEvents');
	// 			$('#calendar').fullCalendar({
	// 			    events: function (start, end, tz, callback) {
	// 			        console.log(1);
	// 			        callback(events);
	// 			    }
	// 			});
				
	// 		});
 //  		return false;
	// });
	
	// ++++++++++++++++tạo các khung giờ ở trang tạo mới vào update++++++++++++++++
	$(document).on('click','.js_render_time', function(){
		let _this = $(this);
		let post_time_start = $("input[name=post_time_start]").val();
		let post_time_end = $("input[name=post_time_end]").val();
		let step = parseFloat($("input[name=step]").val());
		let minus_start = sum(mul(post_time_start.substr(0,2), 60), post_time_start.substr(3,5) )
		let minus_end = sum(mul(post_time_end.substr(0,2), 60), post_time_end.substr(3,5) )
		
		var time = [];
		var html = '';
		for (i = minus_start; i <= minus_end; i = sum(i,step)) { 
			let hour = 0;
			let minus = 0;
			for (k = 0; k <= i; k = k + 60) {
				if( (i - k) >= 60 ){
					hour++;
				}
				if( (i - k) < 60 ){
					minus = i - k;
				}
			}
			if(hour.toString().length == 1){
				hour = '0'+hour;
			}
			if(minus.toString().length == 1){
				minus = '0'+minus;
			}
			time.push(hour+':'+minus);
		}
		if(sub(i,step) != minus_end){
			time.push(post_time_end);
		}
		time.forEach(function(item, index, array) {
			if( typeof time[index+1] != 'undefined'){
				html = html+'<div class="col-sm-3">';
					html = html+'<div class="btn-time">';
	                	html = html+'Từ '+item+' đến '+time[index+1];
	                	html = html+'<div class="overlay"></div>';
	                	html = html+'<div class="delete-image">';
	                    	html = html+'<i class="fa fa-trash" aria-hidden="true"></i>';
	                    html = html+'</div>';
	                html = html+'</div>';
	                html = html+'<input class="hidden" name="input_time_start[]" value="'+item+'">';
	                html = html+'<input class="hidden" name="input_time_end[]" value="'+time[index+1]+'">';
				html = html+'</div>';
			}
		});

		$('.list-time').html('<div class="col-sm-12 m-b-sm"><h3>Danh sách lịch hẹn trong ngày</h3></div>'+html);
	});
	//++++++++++++++++++++++++++ Xóa khung giờ++++++++++++++++++++++++++
	$(document).on('click','.delete-image', function(){
		let _this = $(this);
		_this.parents('.col-sm-3').remove('');
	});


	// ++++++++++++++++++++++Xóa tất cả dòng được chọn++++++++++++++++++++++
	$(document).on('click','.ajax_delete_booking_all',function(){
		let _this = $(this);
		let id_checked = []; // Lấy id bản ghi
		$('table .checkbox-item:checked').each(function() {
		   id_checked.push($(this).val());
		});
		let param = {
			'title' : _this.attr('data-title'),
			'id_checked'	: id_checked,
		}
		if(id_checked.length <= 0){
			sweet_error_alert('Có vấn đề xảy ra','Bạn phải chọn ít nhất 1 bản ghi để thực hiện chức năng này');
			return false;
		}
		
		swal({
			title: "Hãy chắc chắn rằng bạn muốn thực hiện thao tác này?",
			text: param.title,
			type: "warning",
			showCancelButton: true,
			confirmButtonColor: "#DD6B55",
			confirmButtonText: "Thực hiện!",
			cancelButtonText: "Hủy bỏ!",
			closeOnConfirm: false,
			closeOnCancel: false },
			function (isConfirm) {
				if (isConfirm) {
					let ajax_url = 'booking/ajax/catalogue/ajax_delete_booking_all';
						$.post(ajax_url, {
							post: param},
							function(data){
								if(data == 0){
									sweet_error_alert('Có vấn đề xảy ra','Vui lòng thử lại')
								}else{
									$('table .checkbox-item:checked').each(function() {
									   $(this).parents('tr').hide().remove()	
									});
									swal("Xóa thành công!", "Các bản ghi đã được xóa khỏi danh sách.", "success");
								}
							});

				} else {
					swal("Hủy bỏ", "Thao tác bị hủy bỏ", "error");
				}
			});
	});
	//++++++++++++++++++++++++++++++ Xóa dòng++++++++++++++++++++++++++++++
	$(document).on('click','.ajax_delete_booking',function(){
		let _this = $(this);
		let param = {
			'title' : _this.attr('data-title'),
			'id'    : _this.attr('data-id'),
		}
		swal({
			title: "Hãy chắc chắn rằng bạn muốn thực hiện thao tác này?",
			text: param.title,
			type: "warning",
			showCancelButton: true,
			confirmButtonColor: "#DD6B55",
			confirmButtonText: "Thực hiện!",
			cancelButtonText: "Hủy bỏ!",
			closeOnConfirm: false,
			closeOnCancel: false },
			function (isConfirm) {
				
				if (isConfirm) {
					let ajax_url = 'booking/ajax/catalogue/ajax_delete_booking';
						$.post(ajax_url, {
							id: param.id },
							function(data){
								if(data == 0){
									sweet_error_alert('Có vấn đề xảy ra','Vui lòng thử lại')
								}else{
									_this.parents('tr').hide().remove();
									swal("Xóa thành công!", "Hạng mục đã được xóa khỏi danh sách.", "success");
								}
							});

				} else {
					swal("Hủy bỏ", "Thao tác bị hủy bỏ", "error");
				}
			});
	});
	//+++++++++++++++++++++ Cập nhật nhanh trạng thái+++++++++++++++++++++
	$(document).on('change','.publish',function(){
		let _this = $(this);
		let objectid = _this.attr('data-id');
		let formURL = 'booking/ajax/catalogue/status';
			$.post(formURL, {
				objectid: objectid},
				function(data){
					
				});
	});

	$(document).on('click','.pagination li a', function(){
		let _this = $(this);
		let page = _this.attr('data-ci-pagination-page');
		let keyword = $('.keyword').val();
		let perpage = $('.perpage').val();
		let object = {
			'keyword' : keyword,
			'perpage' : perpage,
			'page'    : page,
		}
		
		clearTimeout(time);
		if(keyword.length > 2){
			time = setTimeout(function(){
				get_list_object(object);
			},500);
		}else{
			time = setTimeout(function(){
				get_list_object(object);
			},500);
		}
		return false;
	});
	
	var time;
	$(document).on('keyup change','.filter', function(){
		let keyword = $('.keyword').val();
		let perpage = $('.perpage').val();
		let catalogueid = $('.catalogueid').val();
		let object = {
			'keyword' : keyword,
			'perpage' : perpage,
			'page'    : 1,
		}
		keyword = keyword.trim();
		clearTimeout(time);
		if(keyword.length > 2){
			time = setTimeout(function(){
				get_list_object(object);
			},500);
		}else{
			time = setTimeout(function(){
				get_list_object(object);
			},500);
		}
	});
	
});

function get_list_object(param){
	let ajaxUrl = 'booking/ajax/booking/bookingList';
	$.get(ajaxUrl, {
		perpage: param.perpage, keyword: param.keyword, page: param.page},
		function(data){
			let json = JSON.parse(data);
			$('#ajax-content').html(json.html);
			$('#pagination').html(json.pagination);
			$('#total_row').html(json.total_row);
		});
}

function fullCalendar(temp){
    /* initialize the external events
     -----------------------------------------------------------------*/
  console.log(temp);
    /* initialize the calendar
     -----------------------------------------------------------------*/
    $('#calendar').fullCalendar({
        events: [
           temp
        ]
    });
}
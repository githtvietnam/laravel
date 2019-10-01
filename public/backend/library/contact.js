$(document).ready(function(){

	// PHAN TRANG
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

	// TRANG THAI ON OFF
	$(document).on('change','.publish',function(){
		let _this = $(this);
		let objectid = _this.attr('data-id');
		let formURL = 'contact/ajax/contact/status';
		$.post(formURL, {
			objectid: objectid},
			function(data){

			});
	});

	// TIM KIEM
	var time;
	$(document).on('keyup change','.filter', function(){
		let keyword = $('.keyword').val();
		let perpage = $('.perpage').val();
		let catalogueid = $('.catalogueid').val();

		console.log(catalogueid);
		let object = {
			'keyword' : keyword,
			'perpage' : perpage,
			'page'    : 1,
			'catalogueid' : catalogueid,

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

	/* XÓA RECORD */
	$(document).on('click','.ajax-delete',function(){
		let _this = $(this);
		let param = {
			'title' : _this.attr('data-title'),
			'name'  : _this.attr('data-name'),
			'module': _this.attr('data-module'),
			'id'    : _this.attr('data-id'),
			'child'  : _this.attr('data-child')
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
					let ajax_url = 'contact/ajax/contact/ajax_delete';
					$.post(ajax_url, {
						module: param.module, id: param.id, child: param.child},
						function(data){
							if(data == 0){
								sweet_error_alert('Có vấn đề xảy ra','Vui lòng thử lại');
							}else{
								_this.parent().parent().hide().remove();
							}
							swal("Xóa thành công!", "Hạng mục đã được xóa khỏi danh sách.", "success");
						});
				} else {
					swal("Hủy bỏ", "Thao tác bị hủy bỏ", "error");
				}
				// var reloadPage = function(){
					// location.reload()};
					// setTimeout(reloadPage, 2000);
				});
	});

	/* XÓA  NHIEU RECORD */
	$(document).on('click','.ajax-group-delete',function(){
		let _this = $(this);
		let idCheck = [];
		$('.checkbox-item:checked').each(function(){
			idCheck.push($(this).val());
		});
		if(idCheck.length <= 0){
			sweet_error_alert('Có vấn đề xảy ra','Bạn phải chọn ít nhất 1 bản ghi để thực hiện chức năng này');
			return false;
		}
		let param = {
			'title' : _this.attr('data-title'),
			'name'  : _this.attr('data-name'),
			'module': _this.attr('data-module'),
			'list'	: idCheck,
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
					let ajax_url = 'contact/ajax/contact/ajax_group_delete';
					$.post(ajax_url, {
						param: param },
						function(data){
							let json = JSON.parse(data);
							if(json.error.flag == 1){
								sweet_error_alert('Có vấn đề xảy ra',json.error.message);
							}else{
								$('#ajax-content tr.bg-active').each(function(){
									$(this).hide('slow').remove();
								});
								swal("Xóa thành công!", "Danh mục đã được xóa khỏi danh sách.", "success");
							}
						});
				} else {
					swal("Hủy bỏ", "Thao tác bị hủy bỏ", "error");
				}
			});
	});

	//BOOKMARKS
	$(document).on('click', '.gradeX .fa-star',function(){
		let _this = $(this);
		_this.toggleClass('text-yellow');
		// _this.parents('.gradeX').find('.title-1').toggleClass('text-blue');
		// _this.parents('.gradeX').find('.subtitle-1').toggleClass('text-blue-1');

		let id= _this.attr('data-id');
		let bookmark = _this.attr('data-bookmark');
		let ajaxUrl = 'contact/ajax/contact/bookmark';
		$.post(ajaxUrl, {
			idContact: id, bookmark: bookmark},
			function(data){
				let json = JSON.parse(data);
			});
	});

	// VIEWED
	$(document).on('click', '.gradeX .detail-contact',function(e){
		e.preventDefault();
		let _this = $(this);
		let id = _this.attr('data-id');
		let viewed = _this.attr('data-viewed');
		let ajaxUrl = 'contact/ajax/contact/viewed';
		$.post(ajaxUrl, {
			id: id, viewed: viewed},
			function(data){
				window.location.href = BASE_URL + 'contact/backend/contact/viewDetail/'+id+'.html';
			});
	});


});

function get_list_object(param){
	let ajaxUrl = 'contact/ajax/contact/listContact';
	$.get(ajaxUrl, {
		perpage: param.perpage, keyword: param.keyword, page: param.page, catalogueid: param.catalogueid},
		function(data){
			let json = JSON.parse(data);
			$('#ajax-content').html(json.html);
			$('#pagination').html(json.pagination);
			$('#total_row').html(json.total_row);
		});
}

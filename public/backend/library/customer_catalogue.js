$(document).ready(function(){
	
	/* XÓA RECORD */
	$(document).on('click','.ajax-group-delete',function(){
		//xóa nhiều: 
		// 		+ lấy hết giá trị trong all ô đc tích => lưu vào mảng
		//		+ gửi đi controller để xử lý
		let _this = $(this);
		let idCheck = []; //khai báo mảng
		
		//quét qua toàn bộ input đang checked
		$('.checkbox-item:checked').each(function(){
			idCheck.push($(this).val()); //lưu giá trị của input vào mảng
		});
		
		//nếu không có bản ghi nào đc check thì show lỗi và thoát
		if(idCheck.length <= 0){
			sweet_error_alert('Có vấn đề xảy ra','Bạn phải chọn ít nhất 1 bản ghi để thực hiện chức năng này');
			return false;
		}
		
		
		let param = {
			'title' : _this.attr('data-title'),
			'name'  : _this.attr('data-name'),
			'module': _this.attr('data-module'),
			'list'	: idCheck, //lưu toàn bộ id vào mảng
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
					let ajax_url = 'customer/ajax/catalogue/ajax_group_delete';
						$.post(ajax_url, {
							param: param },
							function(data){
								let json = JSON.parse(data);
								if(json.error.flag == 1){
									sweet_error_alert('Có vấn đề xảy ra',json.error.message);
								}else{
									$('#listCatalogue tr.bg-active').each(function(){
										$(this).hide('slow').remove();
									});
									swal("Xóa thành công!", "Hạng mục đã được xóa khỏi danh sách.", "success");
								}
							});

				} else {
					swal("Hủy bỏ", "Thao tác bị hủy bỏ", "error");
				}
			});
	});
	
	/* XÓA RECORD */
	$(document).on('click','.ajax-delete',function(){
		let _this = $(this);
		let param = {
			'title' : _this.attr('data-title'),
			'name'  : _this.attr('data-name'),
			'module': _this.attr('data-module'),
			'id'    : _this.attr('data-id'),
			'child' : _this.attr('data-child'),
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
					let ajax_url = 'customer/ajax/catalogue/ajax_delete';
						$.post(ajax_url, {
							module: param.module, id: param.id},
							function(data){
								let json = JSON.parse(data);
								if(json.error.flag == 1){
									sweet_error_alert('Có vấn đề xảy ra',json.error.message);
								}else{
									_this.parents('tr').hide('slow').remove();
									swal("Xóa thành công!", "Hạng mục đã được xóa khỏi danh sách.", "success");
								}
							});

				} else {
					swal("Hủy bỏ", "Thao tác bị hủy bỏ", "error");
				}
			});
	});
	
	$(document).on('keyup change' ,'.filter',function(){
		let param = {
			'keyword' : $('#keyword').val().trim(),
			'perpage' : $('#perpage').val(),
			'page'	  : 1,
		};
		let ajaxUrl = 'customer/ajax/catalogue/view';
		$.get(ajaxUrl, {
			param: param},
			function(data){
				// console.log(data);return false;
				let json = JSON.parse(data);
				$('#listCatalogue').html(json.listCatalogue);
				$('#pagination').html(json.paginationList);
			});
	});
	
	$(document).on('click' , '#pagination ul>li>a[data-ci-pagination-page]', function(){
		let _this = $(this);
		let page = _this.attr("data-ci-pagination-page");
		let param = {
			'keyword' : $('#keyword').val().trim(),
			'perpage' : $('#perpage').val(),
			'page'	  : page,
		};
		let ajaxUrl = 'customer/ajax/catalogue/view';
		$.get(ajaxUrl, {
			param: param},
			function(data){
				let json = JSON.parse(data);
				$('#listCatalogue').html(json.listCatalogue);
				$('#pagination').html(json.paginationList);
		});
		return false;
	});
	
});
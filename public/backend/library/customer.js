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
					let ajax_url = 'customer/ajax/customer/ajax_group_delete';
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
			'id'    : _this.attr('data-id')
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
					let ajax_url = 'customer/ajax/customer/ajax_delete';
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
	

	/* LẤY LIST DANH SÁCH THEO customer */
	$(document).on('change','.customer-catalogue',function(){
		let _this = $(this);
		let keyword = $('.keyword').val();
		keyword = $.trim(keyword);
		let catalogueid = _this.val();
		get_list_customer({'keyword' : keyword,'catalogueid' : catalogueid, 'page': 1});
	});
	
	
	
	/* RESET MẬT KHẨU */
	$(document).on('click','.p-reset',function(){
		let _this = $(this);
		let customerID = _this.attr('data-customerid');
		if(customerID == 0){
			sweet_error_alert('Có vấn đề xảy ra','Bạn phải chọn thành viên để thực hiện thao tác này');
		}else{
			swal({
				title: "Hãy chắc chắn rằng bạn muốn thực hiện thao tác này?",
				text: "Mật khẩu sẽ được cài về giá trị mặc định là : 123456xyz sau thao tác này",
				type: "warning",
				showCancelButton: true,
				confirmButtonColor: "#DD6B55",
				confirmButtonText: "Thực hiện!",
				cancelButtonText: "Hủy bỏ!",
				closeOnConfirm: false,
				closeOnCancel: false },
				function (isConfirm){
					if (isConfirm) {
						let ajaxUrl = 'customer/ajax/customer/reset_password';
						$.post(ajaxUrl, {
							customerID: customerID},
							function(data){
								let json = JSON.parse(data);
								if(json.flag == 1){
									sweet_error_alert('Có vấn đề xảy ra',json.message);
								}else{
									swal("Cập nhật thành công!", "Reset mật khẩu thành công.", "success");
								}
							});
						
					} else {
						swal("Hủy bỏ", "Thao tác bị hủy bỏ", "error");
					}
				});
		}
	});
	
	/*TÌM KIẾM AJAX */
	$(document).on('keyup change' , '.filter' ,function(){
		//khai báo 1 object chứa all biến gửi đi
		let param = {
			'keyword' : $('#keyword').val().trim(),
			'perpage' : $('#perpage').val(),
			'page' : 1,
		};
		
		
		//cấu trúc ajax
		let ajaxUrl = 'customer/ajax/customer/view';
		$.get(ajaxUrl, {
			param: param},
			function(data){
				let json = JSON.parse(data);
				$('#listCustomer').html(json.listCustomer);
				$('#paginationList').html(json.paginationList);
			});
		
		
	});
	
	
	/* CLICK VÀO THÀNH VIÊN*/
	$(document).on('click','.choose',function(){
		let _this = $(this);
		$('.choose').removeClass('bg-choose'); //remove all trong các thẻ có class = choose
		_this.toggleClass('bg-choose');
		let data  = _this.attr('data-info');
		data = window.atob(data); //decode base64
		let json = JSON.parse(data);
		setTimeout(function(){
			$('.loader').hide();
			$('.p-reset').attr('data-customerid',json.id);
			$('.fullname').html('').html(json.fullname);
			$('#image').attr('src', json.avatar);
			$('.phone').html('').html(json.phone);
			$('.gender').html('').html((json.gender == 1)?'Nam':'Nữ');
			$('.email').html('').html(json.email);
			$('.address').html('').html(json.address);
			$('.updated').html('').html(json.updated);
			$('.catalogue-title').html('').html(json.catalogue_title);
		}, 100); //sau 100ms thì mới thực hiện
	});
	/* END customer */
	
});

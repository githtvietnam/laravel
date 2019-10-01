$(document).ready(function(){
	
	/* XÓA RECORD */
	$(document).on('click','.ajax-group-delete',function(){
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
					let ajax_url = 'user/ajax/catalogue/ajax_delete';
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
	
});
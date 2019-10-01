$(document).ready(function(){
    $(document).ready(function () {
        $('.i-checks').iCheck({
            checkboxClass: 'icheckbox_square-green',
            radioClass: 'iradio_square-green',
        });
    });

	//xử lí block ship
	$(document).on('ifChanged','input[name="ship_choose_local"]', function(){
		if ($(this).is(':checked')) {
			let _this = $(this);
			let local = _this.val();
			if(local == 'city'){
				$('.ship_district').hide();
				$('.ship_city').show();
				$('select[name="district[]"]').val('');
			}else{
				$('.ship_district').show();
				$('.ship_city').hide();
				$('select[name="city[]"]').val('');
			}
			selectMultipe($('select[name="district[]"]'), 'name');
			selectMultipe($('select[name="city[]"]'), 'name');
		}
	});




	// cập nhật nhanh trạng thái nôt bật
	$(document).on('click','.hightlight', function(){
		let _this = $(this);
		let id = _this.attr('data-id');
		let status = _this.find('img').attr('data-status');
		let ajax_url = 'promotional/ajax/promotional/update_hightlight';
			$.post(ajax_url, {
				id: id, status: status},
				function(data){
					$('.hightlight').html('<img src="template/acore/image/publish-deny.png"  data-status="0" >')
					if(status == 0){
						_this.html('<img src="template/acore/image/publish-check.png"  data-status="1" >')
					}
			});
	});	

	if(typeof condition_value !='undefined'  &&  condition_value !='null' ){
		let time1='';
		clearTimeout(time1);
		time1 = setTimeout(function(){
			pre_selectMultipe($('select[name="condition_value[]"]'),condition_value)
		},80);
	}
	if(typeof city !='undefined' &&  city !='null' ){
		let time2='';
		clearTimeout(time2);
		time2 = setTimeout(function(){
			let object = $('select[name="city[]"]');
			pre_selectMultipe(object, city, 'name' );
		},90);
	}
	if(typeof discount_moduleid !='undefined' &&  discount_moduleid !='null' ){
		let time4='';
		clearTimeout(time4);
		time4 = setTimeout(function(){
			pre_selectMultipe($('.discount_moduleid select[name="discount_moduleid[]"]'),discount_moduleid);
		},90);
	}
	//===================album ảnh===================
	//đoạn js này để kéo thả ảnh
	$( function() {
		$( "#sortable" ).sortable();
		$( "#sortable" ).disableSelection();
	});
	
	if(typeof(layoutid) != 'undefined' && layoutid != ''){
		let type = media_loading(layoutid, 'post');
	}
	
	$(document).on('change','.layout', function(){
		let _this = $(this);
		let catid = _this.val();
		media_loading(catid);
		return false;
	});	
	$(document).on('click','.delete-image', function(){
		let _this = $(this);
		_this.parents('li').remove();
		if($('.upload-list li').length <= 0){
			$('.click-to-upload').show();
			$('.upload-list').hide();
		}
		return false;
	});
	//chọn loại chương trình KM
	$(document).on('change','select[name=catalogue]', function(){
		let _this = $(this);
		let catalogue = _this.val();
		if(catalogue == 'KM'){
			$('.coupon').hide();
			$('.block_condition_1').show();
		}else{
			$('.block_condition_1').hide();
			$('.coupon').show();
		}
	});
	// chọn loại điều kiện áp dụng
	$(document).on('change','select[name=condition_type]', function(){
		let _this = $(this);
		
	});
	// chọn loại đối tượng áp dụng
	$(document).on('change','select[name="module"]', function(){
		let module = $(this).val();
		let condition_type = $('select[name=condition_type]').val();
		let discount_type = $('select[name=discount_type]').val();
		if(condition_type == 'condition_module_catalogue'){
			$('select[name="condition_value[]"]').attr('data-module', module+'_catalogue');
			selectMultipe($('select[name="condition_value[]"]'));
			$('.list-moduleid').hide();
		}
		if(condition_type == 'condition_moduleid'){
			$('select[name="condition_value[]"]').attr('data-module', module);
			selectMultipe($('select[name="condition_value[]"]'));
			$('.list-moduleid').hide();
		}
		if(discount_type == 'object'){
			$('select[name="discount_moduleid[]"]').attr('data-module', module);
			selectMultipe($('select[name="discount_moduleid[]"]'));
			$('.list_discount_moduleid').hide();
		}
		$('select[name="condition_value[]"]').val(null).trigger("change");
		$('select[name="discount_moduleid[]"]').val(null).trigger("change");
	});
	// tạo mã khuyến mại coupon
	$(document).on('click','.render_code', function(){
		let _this = $(this);
		_this.parents('.row').find('input[name="code"]').val(readerCode());
	});
	$(document).on('click','.limmit_code button', function(){
		let _this = $(this);
		clickInputCheckbox(_this)
		if(_this.find('.checkbox-item:checked').length > 0) {
			_this.parents('.limmit_code').find('input[name="limmit_code"]').val('').attr('readonly', true);
		}else{
			_this.parents('.limmit_code').find('input[name="limmit_code"]').val('').removeAttr('readonly');
		}
	});
	$(document).on('click',' .use_common', function(){
		let _this = $(this);
		clickInputCheckbox(_this)
	});

	// Chọn loại giảm giá
	$(document).on('change','select[name=discount_type]', function(){
		let _this = $(this);
		let discount_type = _this.val();
		$('.discount_block').show();
		$('.choose_freeship').hide();
		$('.freeship').hide();
		$('input[name="freeship"]').prop('checked', false);
		$('input[name="freeshipAll"]').prop('checked', false);
		$('input[name="freeship"]').parents('div').find('.label-checkboxitem').removeClass('checked');
		$('input[name="freeshipAll"]').parents('div').find('.label-checkboxitem').removeClass('checked');
		$('select[name="city[]"]').val(null).trigger("change");
		$('input[name="discount_value"]').removeAttr('readonly');
		$('input[name="discount_value"]').val('0');
		$('input[name="discount_value"]').attr('placeholder','Nhập số tiền');
		$('.extend').html('VNĐ');
		$('.extend2').html('Giảm');
		
		$('.discount_moduleid').hide();
		$('.list_discount_moduleid').hide();

		if(discount_type == 'same'){
			$('.extend2').html('Đồng giá');
		}

		if(discount_type == 'percent'){
			$('input[name="discount_value"]').attr('placeholder','Nhập số phần trăm');
			$('.extend').html('%');
		}
		if(discount_type == 'ship'){
			$('.choose_freeship').show();
			$('.freeship').show();
			selectMultipe($('select[name="city[]"]'), 'name');
		}
		if(discount_type == 'object'){
			$('.extend').html('%');
			$('.discount_moduleid').show();
			$('.list_discount_moduleid').show();
			let module = $('select[name=module]').val();
			$('select[name="discount_moduleid[]"]').attr('data-module', module);
			selectMultipe($('select[name="discount_moduleid[]"]'));
		}
	});
	$(document).on('click',' .choose_freeship', function(){
		let _this = $(this);
		if(_this.find('.checkbox-item:checked').length > 0) {
			$('input[name="discount_value"]').val('').removeAttr('readonly');
			// $('.freeship').hide();
		}else{
			$('input[name="discount_value"]').val('').attr('readonly', true);
			// $('.freeship').show();
		}
		
		clickInputCheckbox(_this)
	});
	$(document).on('click',' .freeshipAll', function(){
		let _this = $(this);
		if(_this.find('.checkbox-item:checked').length > 0) {
			$('select[name="city[]"]').val('').prop("disabled", false);
		}else{
			$('select[name="city[]"]').val('').val(null).trigger("change").prop("disabled", true);
		}
		clickInputCheckbox(_this)
	});
	// khi chọn sản phẩm tặng khuyến mại
	$(document).on('select2:select', 'select[name="discount_moduleid[]"]', function(){
		if($('select[name="discount_type"]').val() == 'object'){
			let _this = $(this);
			let id = _this.val();
			let module = $('select[name=module]').val();
			let discount_value = $('input[name=discount_value]').val();
			$('.list_discount_moduleid').show();
			let formURL = 'promotional/ajax/promotional/get_moduleid';
				$.get(formURL, {
					id: id, module:module, discount_value:discount_value},
					function(data){
						json = JSON.parse(data);
						$('.list_discount_moduleid').html('<div class="col-lg-12"><div class="m-b-sm">Các đối tượng đã chọn</div><div class="form-row">'+json.html+'</div></div>');
					});
		}
	});
	$(document).on('select2:unselect', 'select[name="discount_moduleid[]"]', function(){
		if($('select[name="discount_type"]').val() == 'object'){
			let _this = $(this);
			let id = _this.val();
			if(id != ''){
				let module = $('select[name=module]').val();
				$('.list_discount_moduleid').show();
				let discount_value = $('input[name=discount_value]').val();
				let formURL = 'promotional/ajax/promotional/get_moduleid';
					$.get(formURL, {
						id: id, module:module, discount_value: discount_value},
						function(data){
							json = JSON.parse(data);
							console.log(json);
							$('.list_discount_moduleid').html('<div class="col-lg-12"><div class="m-b-sm">Các đối tượng đã chọn</div><div class="form-row">'+json.html+'</div></div>');
						});
			}
			$('.list_discount_moduleid').hide();
		}
	});
	$(document).on('click', '.list_discount_moduleid .del', function(){
		let _this = $(this);
		let id = _this.attr('data-id');
		var $select = $('select[name="discount_moduleid[]"]');
		var idToRemove = id;
		var values = $select.val();
		if (values) {
		    var i = values.indexOf(idToRemove);
		    if (i >= 0) {
		        values.splice(i, 1);
		        $select.val(values).change();
		    }
		}
		_this.parents('.list_discount_moduleid .choose-moduleid').remove();
		if($('.list_discount_moduleid .choose-moduleid').length == 0){
			$('.list_discount_moduleid').hide();
		}
	});

	// chọn loại điều kiện áp dụng
	$(document).on('change','select[name=condition_type]', function(){
		let _this = $(this);
		let condition_type = _this.val();
		$('.condition').show();
		let module = $('select[name="module"]').val();
		if(condition_type == 'condition_cartAll'){
			$('.condition_value').hide();
			$('.list-moduleid').hide();
		}
		if(condition_type == 'condition_module_catalogue'){
			$('.condition_value').show();
			$('select[name="condition_value[]"]').attr('data-module', module+'_catalogue');
			selectMultipe($('select[name="condition_value[]"]'));
			$('.list-moduleid').hide();
		}
		if(condition_type == 'condition_moduleid'){
			$('.condition_value').show();
			$('select[name="condition_value[]"]').attr('data-module', module);
			selectMultipe($('select[name="condition_value[]"]'));
			$('.list-moduleid').find('.form-row').html('');
		}
		$('select[name="condition_value[]"]').val(null).trigger("change");
	});

	// khi chọn sản phẩm
	$(document).on('select2:select', 'select[name="condition_value[]"]', function(){
		if($('select[name="condition_type"]').val() == 'condition_moduleid'){
			let _this = $(this);
			let id = _this.val();
			let module = $('select[name=module]').val();
			$('.list-moduleid').show();
			let discount_value = $('input[name=discount_value]').val();
			let formURL = 'promotional/ajax/promotional/get_moduleid';
				$.get(formURL, {
					id: id, module:module, discount_value:discount_value},
					function(data){
						json = JSON.parse(data);
						$('.list-moduleid').html('<div class="col-lg-12"><div class="m-b-sm">Các đối tượng đã chọn</div><div class="form-row">'+json.html+'</div></div>');
					});
		}
		
	});
	$(document).on('select2:unselect', 'select[name="condition_value[]"]', function(){
		if($('select[name="condition_type"]').val() == 'condition_moduleid'){
			let _this = $(this);
			let id = _this.val();
			if(id != ''){
				let module = $('select[name=module]').val();
				$('.list-moduleid').show();
				let discount_value = $('input[name=discount_value]').val();
				let formURL = 'promotional/ajax/promotional/get_moduleid';
					$.get(formURL, {
						id: id, module:module, discount_value:discount_value},
						function(data){
							json = JSON.parse(data);
							$('.list-moduleid').html('<div class="col-lg-12"><div class="m-b-sm">Các đối tượng đã chọn</div><div class="form-row">'+json.html+'</div></div>');
						});
			}
			$('.list-moduleid').hide();
		}
	});
	$(document).on('click', '.list-moduleid .del', function(){
		let _this = $(this);
		let id = _this.attr('data-id');
		var $select = $('select[name="condition_value[]"]');
		var idToRemove = id;
		var values = $select.val();
		if (values) {
		    var i = values.indexOf(idToRemove);
		    if (i >= 0) {
		        values.splice(i, 1);
		        $select.val(values).change();
		    }
		}
		_this.parents('.choose-moduleid').remove();
		if($('.choose-moduleid').length == 0){
			$('.list-moduleid').hide();
		}
	});

	// xử lí thời gian
	$(document).on('click','.choose_date', function(){
		let _this = $(this);
		clickInputCheckbox(_this);
		if(_this.find('.checkbox-item:checked').length > 0) {
			$('input[name="start_date"]').val('').attr('readonly', true);
			$('input[name="end_date"]').val('').attr('readonly', true);
		}else{
			$('input[name="start_date"]').val('').removeAttr('readonly');
			$('input[name="end_date"]').val('').removeAttr('readonly');
		}

	});

	// Cập nhật trạng thái
	$(document).on('click','.pagination li a', function(){
		let _this = $(this);
		let page = _this.attr('data-ci-pagination-page');
		let keyword = $('.keyword').val();
		let perpage = $('.perpage').val();
		let catalogue = $('select[name="catalogue"]').val();
		let publish = $('select[name="publish"]').val();
		let action = $('select[name="action"]').val();
		let object = {
			'keyword' : keyword,
			'perpage' : perpage,
			'page'    : page,
			'catalogue' : catalogue,
			'publish' : publish,
			'action' : action,
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
		let _this = $(this);
		let page = _this.attr('data-ci-pagination-page');
		let keyword = $('.keyword').val();
		let perpage = $('.perpage').val();
		let catalogue = $('select[name="catalogue"]').val();
		let publish = $('select[name="publish"]').val();
		let action = $('select[name="action"]').val();
		let object = {
			'keyword' : keyword,
			'perpage' : perpage,
			'page'    : page,
			'catalogue' : catalogue,
			'publish' : publish,
			'action' : action,
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
	});
	$(document).on('click','.ajax_delete_promotional_all',function(){
		let _this = $(this);
		let id_checked = []; // Lấy id bản ghi
		let router = []; // Lấy id bản ghi
		$('table .checkbox-item:checked').each(function() {
		   id_checked.push($(this).val());
		   router.push($(this).attr('data-router'));
		});
		let param = {
			'title' : _this.attr('data-title'),
			'id_checked'	: id_checked,
			'router'	: router,
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
					let ajax_url = 'promotional/ajax/promotional/ajax_delete_promotional_all';
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

	$(document).on('click' ,'.ajax_delete_promotional' ,function(){
		let _this = $(this);
		let data = [];
		let title = '';
		let id = _this.attr('data-id');
		title = _this.attr('data-title');
		let router = _this.attr('data-router');
		let module = _this.attr('data-module');
		swal({
			title: "Bạn chắc chắn muốn thực hiện thao tác này",
			text: title,
			type: "warning",
			showCancelButton: true,
			confirmButtonColor: "#DD6B55",
			confirmButtonText: "Thực hiện!",
			cancelButtonText: "Hủy bỏ!",
			closeOnConfirm: false,
			closeOnCancel: false },
		function (isConfirm) {
			if (isConfirm) {
				let ajaxUrl = 'promotional/ajax/promotional/ajax_delete_promotional';
				$.post(ajaxUrl, {
					id: id , router: router, module: module},
					function(data){
						if(data==1){
							swal("Đã xóa thành công!", "Đã xóa giá thành công", "success");
							_this.parents('tr').remove();
						}else{
							swal("Đã xảy ra lỗi!", "Vui lòng thử lại", "warning");
						}
				});
			}else {
				swal("Hủy bỏ", "Thao tác bị hủy bỏ", "error");
			}
		})
	})
});

function get_list_object(param){
	let ajaxUrl = 'promotional/ajax/promotional/listpromotional';
	$.get(ajaxUrl, {
		perpage: param.perpage, keyword: param.keyword, page: param.page, catalogue: param.catalogue,
		 publish: param.publish, action: param.action},
		function(data){
			let json = JSON.parse(data);
			$('#ajax-content').html(json.html);
			$('#pagination').html(json.pagination);
			$('#total_row').html(json.total_row);
		});
}
function clickInputCheckbox(object){
	if(object.find('.checkbox-item:checked').length > 0) {
		object.find('.checkbox-item').prop('checked', false);
		object.find('.label-checkboxitem').removeClass('checked');
	}else{
		object.find('.checkbox-item').prop('checked', true);
		object.find('.label-checkboxitem').addClass('checked');
	}
}
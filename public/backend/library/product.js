$(document).ready(function(){
	// chọn nhiều ảnh cho từng phiên bản
	$(document).on('click','.js_choose_album',function(){
		let _this = $(this)
		window.KCFinder = {
			callBackMultiple: function(files) {
				window.KCFinder = null;
				let html = '';
				let valInput = '';
				for (var i = 0; i < files.length; i++){
					valInput = valInput + ',"' +files[i]+'"';
					html = html + '<img src="'+files[i]+'" class="m-r" alt="">';
				}
				valInput = valInput.substr(1,valInput.length);
				valInput = '['+ valInput + ']';
				valInput = btoa(valInput);
				_this.parents('tr').find("input[name='image_version[]']").val(valInput);
				html = '<tr class="js_album_extend"><td colspan=100>'+html+'</td></tr>';
				if(_this.parents('tr').next().hasClass('js_album_extend')){
					_this.parents('tr').next().remove();
				}
				_this.parents('tr').after(html);
			}
		};
		window.open(BASE_URL + 'plugin/kcfinder-3.12/browse.php?type=images&dir=images/public', 'kcfinder_image',
	        'status=0, toolbar=0, location=0, menubar=0, directories=0, ' +
	        'resizable=1, scrollbars=0, width=1080, height=800'
	    );
	});
	var x = 0;

	$(document).on('click','#update_attr select[name="attribute_catalogue"]',function(){
		let catalogueid = $(this).val();
		if(catalogueid != 0){
			let condition = 'AND catalogueid = '+ catalogueid;
			$('#update_attr .attribute').html('<select name="attribute[]" data-condition="'+condition+'" data-json="" class="form-control selectMultipe" multiple="multiple" data-title="Nhập 2 kí tự để tìm kiếm.." data-module="attribute"  style="width: 100%;">');
			$('.selectMultipe').each(function(key, index){
				selectMultipe($(this));
			});
		}
	});
	//thêm mới thuộc tính vào danh sách ở trang view
	$(document).on('submit','#form_update_attr',function(e){
		e.stopPropagation();
		let id_checked = [];
		$('table .checkbox-item:checked').each(function() {
		   id_checked.push($(this).val());
		});
		if(id_checked.length <= 0){
			sweet_error_alert('Có vấn đề xảy ra','Bạn phải chọn ít nhất 1 sản phẩm để thêm thuộc tính');
			return false;
		}

		let attrCata = $('#update_attr select[name="attribute_catalogue"]').val();
		let attr = $('#update_attr select[name="attribute[]"]').val();
		if(attr.length <= 0){
			sweet_error_alert('Có vấn đề xảy ra','Bạn phải chọn ít nhất 1 thuộc tính');
			return false;
		}
		let param = {
			'id_checked' :id_checked,
			'attrCata' :attrCata,
			'attr' :attr,
		}
		let ajaxUrl = 'product/ajax/product/update_attr';
		$.post(ajaxUrl, {
			param: param},
			function(data){
				if(data=='true'){
					swal("Thêm mới thành công!", "Thêm mới thuộc tính thành công.", "success");
					$('.modal-footer .btn-white').trigger("click");
					$("#update_attr .error").addClass('hidden');
				}else{
					swal("Có lỗi xảy ra!", "Vui lòng thử lại.", "error");
					$("#update_attr .error").removeClass('hidden');
                	$("#update_attr .error .alert").html(data);
				}
			});
		return false;
	}); 


	//thêm mới nhóm danh mục phụ ở trang view
	$(document).on('submit','#form_update_catalogue',function(e){
		e.stopPropagation();
		let id_checked = [];
		$('table .checkbox-item:checked').each(function() {
		   id_checked.push($(this).val());
		});
		if(id_checked.length <= 0){
			sweet_error_alert('Có vấn đề xảy ra','Bạn phải chọn ít nhất 1 sản phẩm để danh mục phụ');
			return false;
		}

		let catalogue = $('#update_catalogue select[name="catalogue"]').val();
		let ajaxUrl = 'product/ajax/product/update_catalogue';
		$.post(ajaxUrl, {
			id_checked: id_checked, catalogue:catalogue},
			function(data){
				if(data=='true'){
					swal("Thêm mới thành công!", "Thêm mới danh mục phụ thành công.", "success");
					$('.modal-footer .btn-white').trigger("click");
					$("#update_catalogue .error").addClass('hidden');
				}else{
					swal("Có lỗi xảy ra!", "Vui lòng thử lại.", "error");
					$("#update_catalogue .error").removeClass('hidden');
                	$("#update_catalogue .error .alert").html(data);
				}
			});
		return false;
	});


	$(document).on('click','.add-attr',function(){
		let _this = $(this);
		render_attr();
	})

	$(document).on('click','.delete-attr',function(){
		let _this = $(this);
		_this.parents('.desc-more').remove();
		
	});
	function render_attr(){
		let html ='';
		var microtime = (Date.now() % 1000) / 1000;
		var editorId = 'editor_' + microtime;
		html = html + '<div class="col-lg-12 m-b desc-more">'
		html = html + '<div class="row m-b">'
		html = html + '<div class="col-lg-8">'
		html = html + '<input type="text" name="content[title][]" class="form-control" placeholder="Tiêu đề">'
		html = html + '<input type="text"  value='+microtime+' name="content[microtime][]" class="hidden" >'
		html = html + '</div>'
		html = html + '<div class="col-lg-4">'
		html = html + '<div class="uk-flex uk-flex-middle uk-flex-space-between">'
		html = html + '<a href="" title="" data-id_editor="" class="uploadMultiImage" onclick="openKCFinderDescExtend(\'' + editorId + '\');return false;">Upload hình ảnh</a>'
		html = html + '<button class="btn btn-danger delete-attr" type="button"><i class="fa fa-trash"></i></button>'
		html = html + '</div>'
		html = html + '</div>'
		html = html + '</div>'
		html = html + '<div class="row">'
		html = html + '<div class="col-lg-12" >'
		html = html + '<textarea name="content[description][]" class="form-control ck-editor" id="'+editorId+'" placeholder="Mô tả"></textarea>'
		html = html + '</div>'
		html = html + '</div>'
		html = html + '</div>';
		$('.attr-more').prepend(html);
		CKEDITOR.replace(editorId, { height: 277 });
		 //text box increment
	}


	var time;
	$(document).on('keyup change','.filter', function(){
		let page = $('.pagination .active a').text();
		time = setTimeout(function(){
			get_list_object(page);
		},500);
		return false;
	});
	$(document).on('click','.pagination li a', function(){
		let _this = $(this);
		let page = _this.attr('data-ci-pagination-page');
		time = setTimeout(function(){
			get_list_object(page);
		},500);
		return false;
	});
	// tìm kiếm nâng cao
	$(document).on('click','.full-search',function(){
		$('.filter-more').toggleClass('hidden');
		if($('.filter-more').hasClass('filter-more-open')){
			$('.full-search').html('Bỏ tìm kiếm nâng cao <i class="fa fa-search-minus" style="font-weight:normal;font-size:13px;"></i>');
		}else {
			$('.full-search').html('Tìm kiếm nâng cao  <i class="fa fa-search" style="font-weight:normal;font-size:13px;"></i>');
			$('.filter-more').find('input').trigger('change');
			$('.filter-more').find('select').trigger('change');
		}
	})
	$(document).on('click','.ajax_delete_product_all',function(){
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
					let ajax_url = 'product/ajax/product/ajax_delete_product_all';
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
	// xóa sp
	$(document).on('click','.ajax_delete_product',function(){
		let _this = $(this);
		let param = {
			'title' : _this.attr('data-title'),
			'id'    : _this.attr('data-id'),
			'router' : _this.attr('data-router'),
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
					let ajax_url = 'product/ajax/product/ajax_delete_product';
						$.post(ajax_url, {
							id: param.id, router: param.router, },
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

	if($('#product_catalogue').length){
		select2($('#product_catalogue'));
	}
	if(typeof catalogueid !='undefined'  ){
		pre_select2('product_catalogue',catalogueid);
	}
	if($('#tag').length){
		select2($('#tag'));
	}
	if(typeof tag !='undefined'  ){
		clearTimeout(time);
		time = setTimeout(function(){
			pre_select2('tag',tag)
		},100);
	}
	
	// +++++++++++xử lí cập nhật giá ở trang danh sách+++++++++++
	$(document).on('click' ,'.price' ,function(){
		let _this = $(this);
		_this.find('span').hide();
		_this.find('input').show();
		_this.parents('tr').find('input[name="checkbox[]"]').prop('checked', true);
		_this.parents('tr').find('.label-checkboxitem').addClass('checked');
		change_background(_this);
	})
	$(document).on('click' ,'#update_price_product' ,function(){
		let data = [];
		let title = '';
		$('#ajax-content tr td .checkbox-item:checked').each(function() {
			let _this = $(this);
			console.log(1);
			title = 'Cập nhật giá sản phẩm được chọn';
			let id = _this.parents('td').find('input[name="checkbox[]"]').val();
			console.log(id);
			let price = replace(_this.parents('tr').find('input[name="price"]').val());
			let field = _this.parents('tr').find('input[name="price"]').attr('data-field');
			data[id] = [price, field] ;
		})
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
				let ajaxUrl = 'product/ajax/product/update_price_product';
				$.post(ajaxUrl, {
					data:JSON.stringify(data)},
					function(data){
						if(data==1){
							swal("Cập nhật thành công!", "Cập nhật giá thành công", "success");
						}else{
							swal("Đã xảy ra lỗi!", "Vui lòng thử lại", "warning");
						}
				});
			}else {
				swal("Hủy bỏ", "Thao tác bị hủy bỏ", "error");
			}
		})
	})
	// ++++++++++++++++++++++++++++xử lí bộ lọc++++++++++++++++++++++++++++
	// xử lí khaongr giá
	$(document).on('click' ,'#filter_price div:eq(0)' ,function(){
		console.log(1);
		let _this = $(this);
		$('#filter_price').find('div:eq(1)').show();
	})
	$(document).mouseup(function(e){
		let start_price = $('#filter_price').find('input[name="start_price"]').val();
		let end_price = $('#filter_price').find('input[name="end_price"]').val();
		if(start_price==0 && end_price==0){
			let container = $("#filter_price div:eq(1)");
		    if (!container.is(e.target) && container.has(e.target).length === 0){
		        container.hide();
		    }
		}
		start_price =  replace(start_price);
		end_price =  replace(end_price);
		if(parseFloat(start_price)  < parseFloat(end_price) ){
			let container = $("#filter_price div:eq(1)");
		    if (!container.is(e.target) && container.has(e.target).length === 0){
		        container.hide();
		    }
		}
	});
	$(document).on('change','input[name="start_price"], input[name="end_price"]' , function(){
		let _this = $(this);
		let start_price = _this.parent('div').find('input[name="start_price"]').val();
		let end_price = _this.parent('div').find('input[name="end_price"]').val();
		start_price =  replace(start_price);
		end_price =  replace(end_price);
		if(end_price !=0){
			if(parseFloat(start_price)  >= parseFloat(end_price) ){
				toastr.warning('Giá bắt đầu không thể nhỏ hơn giá kết thúc','');
			}else{
				_this.parents('#filter_price').find('div:eq(0)').html('Giá từ <b>'+addCommas(start_price)+'</b> đ đến <b>'+addCommas(end_price)+'</b> đ');
				_this.find('div:eq(1)').slideToggle();
			}
		}
		
	})
	// xử lí bộ lọc thuộc tính
	$(document).on('select2:select','select[name="catalogueid"]', function(e){
		let _this = $(this);
		let catalogueid = _this.val();
		let ajax_url = 'product/ajax/product/get_attrid';
		$.post(ajax_url, {
			catalogueid: catalogueid},
			function(data){
				let json = JSON.parse(data);
				let html = '';
				let attribute_catalogue1 = json.attribute_catalogue;
				if( attribute_catalogue1 == ''){
					html = '<li> Danh mục không có thuộc tính</li>';
				}else{
					html = attribute_catalogue1;
				}	
		        $('.list_attr_catalogue').html('').html(html);
			});
	});
	$(document).on('click','.attr' , function(){
		if($(this).find('input[name="attr[]"]:checked').length){
			$(this).find('input[name="attr[]"]').prop('checked', false);
			$(this).find('.label-checkboxitem').removeClass('checked');
		}else{
			$(this).find('input[name="attr[]"]').prop('checked', true);
			$(this).find('.label-checkboxitem').addClass('checked');
		}
		
		let attr = '';
		$('#choose_attr').find('.form-control').html('');
		$('input[name="attr[]"]:checked').each(function(key, index){
			let id= $(this).val();
			let text= $(this).parent('div').text();
			let attr_id= $(this).parents('li').attr('data-keyword');
			attr = attr + attr_id + ';' + id + ';';
			$('#choose_attr').find('.form-control').append('<label>'+text+'<span class="del" data-id="'+id+'">x</span></label>');
		});
		if(attr == ''){
			$('#choose_attr').find('.form-control').html('<span>Chọn thuộc tính</span>');
		}
		$('#choose_attr > input').val(attr).change();
	})
	$(document).on('click','#choose_attr .del' , function(){
		let _this = $(this);
		let id = _this.attr('data-id');
		let attr  = '';
		$('input[name="attr[]"]:checked').each(function(key, index){
			let id_check= $(this).val();
			if(id== id_check){
				$(this).prop('checked', false);
				$(this).parent('div').find('label').removeClass('checked');
				_this.parents('label').remove();
			}else{
				let text= $(this).parent('div').text();
				let attr_id= $(this).parents('li').attr('data-keyword');
				attr = attr + attr_id + ';' + id_check + ';';
			}
		});
		$('#choose_attr > input').val(attr).change();
	})
	$(document).on('click','#choose_attr' , function(){
		if($('input[name="attr[]"]:checked').length == 0){
			$('#choose_attr').find('.form-control').html('<span>Chọn thuộc tính</span>');
		}
		$('#choose_attr').find('.list_attr_catalogue').show();
	})
	$(document).mouseup(function(e){
	    let container = $("#choose_attr .list_attr_catalogue");
	    if (!container.is(e.target) && container.has(e.target).length === 0){
	        container.hide();
	    }
	});
	// xử lí có quản lí kho không
	$(document).on('click','select[name=inventory]', function(){
		let _this = $(this);
		if(_this.val()==1){
			$('.block-inventory').show();
		}else{
			$('.block-inventory').hide();
		}
	});
	//======================xử lí khối thêm phiên bản======================
	$(document).on('click','.block-version .show-version', function(){
		let _this = $(this);
		_this.parent('div').find('.hide-version').show();
		_this.hide();
		_this.parents('.block-version').find('.ibox-content').show();
	});
	$(document).on('click','.block-version .hide-version a', function(){
		let _this = $(this);
		_this.parents('.block-version').find('.show-version').show();
		_this.parents('.block-version').find('.hide-version').hide();
		_this.parents('.block-version').find('.ibox-content').hide();
	});
	//thuộc tính
	$(document).on('click','.block-attribute .delete-attribute', function(){
		let _this = $(this);
		_this.parents('tr').remove();
		let val= _this.parents('tr').find('select[name="attribute_catalogue[]"] option:checked').val();
		$('.block-attribute select[name="attribute_catalogue[]"]').find("option[value="+val+ "]").prop('disabled',false);
		$('.block-attribute select[name="attribute_catalogue[]"]').select2("destroy").select2();
		get_vesion();
		check_attribute();
		let pos = attribute_catalogue.indexOf(val);
		attribute_catalogue.splice(pos, 1);

		$countAttr = $('.block-attribute table tbody').find('tr').length;
		$countattribute_catalogue = $('.block-version').attr('data-countattribute_catalogue');
		if(parseFloat($countAttr) >= parseFloat($countattribute_catalogue)){
			$('.add-attribute').hide()
		}else{
			$('.add-attribute').show()
		}
		
	});
	$(document).on('click','.add-attribute', function(){
		let _this = $(this);
		let attr = _this.attr('data-attribute');
		$('.block-attribute').find('table tbody').append(render_attribute(attr,attribute_catalogue));
		check_attribute();
		$('.select3').each(function(key, index){
			$(this).select2();
		});
		$countAttr = $('.block-attribute table tbody').find('tr').length;
		$countattribute_catalogue = $('.block-version').attr('data-countattribute_catalogue');
		if(parseFloat($countAttr) >= parseFloat($countattribute_catalogue)){
			$('.add-attribute').hide()
		}else{
			$('.add-attribute').show()
		}
	});
	var attribute_catalogue=[];

	$(document).on('select2:select','.block-attribute tbody tr select ', function(){
			console.log(1);	
		let _this = $(this);
		let catalogueid = _this.parents('tr').find('select[name="attribute_catalogue[]"]').val();
		if(catalogueid == 2){
			let text = _this.text();
			attribute = [];
			attributeid = [];
			let index = _this.parents('tr').find('td:first').attr('data-index');
			
			_this.parents('tr').find('select[name="attribute['+index+'][]"] option:selected').each(function (){
				attribute.push($(this).text());
				attributeid.push($(this).val());
			});
			$('.block-color').show();
			$('.block-color .row').html('').html(html_block_color(attributeid, attribute));
		}
	});
	$(document).on('change','select[name="attribute_catalogue[]"]', function(){
		let _this = $(this);
		check_attribute(_this);
		let catalogueid = _this.val();

		if(catalogueid != 0){
			let index=_this.parents('tr').find('td:first').attr('data-index');
			_this.parents('tr').find('td:eq(2)').html(render_select2(' AND catalogueid = '+catalogueid,  index));
		}else{
			_this.parents('tr').find('td:eq(2)').html('<input type="text" class="form-control" disabled="disabled">');
		}
		$('.selectMultipe').each(function(key, index){
			selectMultipe($(this));
		});
	});
	$(document).on('click','input[name="checkbox[]"]', function(){
		let val = $(this).parents('td').find('input[name="checkbox_val[]"]').val();
		if(val==1){
		    $(this).parents('td').find('input[name="checkbox_val[]"]').val(0);
		}else{
		    $(this).parents('td').find('input[name="checkbox_val[]"]').val(1);
		}
	});
	$(document).on('change','.block-attribute input[name="checkbox[]"]', function(){
	    let check = $('input[name="checkbox[]"]:checked').length;
		if(check > 2){
			toastr.warning('Chọn nhiều nhất 2 thuộc tính để tạo phiên bản','');
			$(this).prop('checked', false);
			$(this).parents('td').html('<input type="checkbox" name="checkbox[]" value="" class="checkbox-item"><div for="" class="label-checkboxitem"></div>');
		}
		get_vesion()
	});
	$(document).on('select2:select','.block-attribute select', function(e){
		get_vesion();
	});
	$(document).on('select2:unselect','.block-attribute select', function(e){
		get_vesion();
	});
	//thêm mới thuộc tính
	$(document).on('submit','#form_create_attribute',function(e){
		e.stopPropagation();
		let title = $('#create_attribute input[name="title"]').val();
		let catalogueid = $('#create_attribute input[name="catalogueid"]').val();
		let data = $(this).serializeArray();
		let ajaxUrl = 'product/ajax/product/create_attribute';
		$.post(ajaxUrl, {
			data: data, title:title},
			function(data){
				if(data=='true'){
					swal("Thêm mới thành công!", "Thêm mới thuộc tính thành công.", "success");
					$('.modal-footer .btn-white').trigger("click");
					$("#create_attribute .error").addClass('hidden');
				}else{
					$("#create_attribute .error").removeClass('hidden');
                	$("#create_attribute .error .alert").html(data);
				}
			});
		return false;
	});
	//Bán buôn/sỉ
	$(document).on('click','.add-wholesale', function(){
		let _this = $(this);
		$('.block-wholesale table').show();
		let value='';
		let length = parseFloat($('.block-wholesale table tbody tr').length);
		if(length == 0){
			$('.block-wholesale table tbody').append(wholesale('1'));
		}else{
			quantity_end = parseFloat($('.block-wholesale table tbody tr:last').find('input[name="quantity_end[]"]').val())
			if(isNaN(quantity_end)){
				$('.block-wholesale table tbody tr:last input[name="quantity_end[]"]').css("border-color",'#fab1a0');
				toastr.warning('Chọn phải điền số lượng sản phẩm cuối trước','');
			}else{
				$('.block-wholesale table tbody tr:last input[name="quantity_end[]"]').css("border-color",'#c4cdd5');
				$('.block-wholesale table tbody').append(wholesale(quantity_end+1));
			}
		}
		let price = $('input[name="price"]').val();
		$('.block-wholesale table tbody tr:last').find('input[name="wholesale-price[]"]').val(price);
		// console.log(value);
	});
	$(document).on('click','.block-wholesale .del_row', function(){
		let _this = $(this);
		_this.parents('tr').remove();
	});
	
	
	$(document).on('change','.publish',function(){
		let _this = $(this);
		let objectid = _this.attr('data-id');
		let formURL = 'product/ajax/product/status';
			$.post(formURL, {
				objectid: objectid},
				function(data){
					
				});
	});
	
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
});
function get_vesion(){
	let price = $('input[name="price"]').val();
	let code_main = $('input[name="code"]').val();
	let attribute =new Array();
	let attributeid =new Array();
	$('.block-attribute table tbody tr').each(function (key, value){
		if($(this).find('select[name="attribute_catalogue[]"]').length){
			if($(this).find('input[name="checkbox[]"]:checked').length){
				let index = $(this).find('td:first').attr('data-index');
				if($(this).find('select[name="attribute['+index+'][]"] option:selected').length){
					attribute[key] = new Array();
					attributeid[key] = new Array();
				}
				$(this).find('select[name="attribute['+index+'][]"] option:selected').each(function (){
					attribute[key].push($(this).text());
					attributeid[key].push($(this).val());
				});
			}
		}
	});
	let attribute1 = [];
	let attributeid1 = [];
	attribute.forEach(function(item, index, array) {
	  	if(typeof item != "undefined" ){
	  		attribute1.push(item);
	  		attributeid1.push(attributeid[index]);
		}
	});
	$('.block-version .ibox-content>table tbody').html('');
	$('.block-attribute').siblings('table').hide();
	let index=1;
	for (var i in attribute1[0]){
		if(typeof attribute1[1] != "undefined"){
			for(var j in attribute1[1]){
		    	let title= attribute1[0][i]+'/'+attribute1[1][j];
		    	code= code_main+'-'+index;
		    	index = index +1;
		    	$('.block-version .ibox-content>table tbody').append(render_version(title, price, code,attributeid1[0][i], attributeid1[1][j] ));
				$('.block-version .ibox-content table').show();
		    }
		}else{
			let title= attribute1[0][i];
		    code= code_main+'-'+index;
		    index = index +1;
	    	$('.block-version .ibox-content>table tbody').append(render_version(title, price,code,attributeid1[0][i],'' ));
			$('.block-version .ibox-content table').show();
		}
	}
}
function disabled(_this){
	_this.prop('disabled', !_this.prop('disabled'));
}
function check_attribute(_this=''){
	attribute_catalogue=new Array();
	$('.block-attribute select[name="attribute_catalogue[]"]').each(function() {
		let val = $(this).find('option:selected').val();
		if(val != 0){
			attribute_catalogue.push(val);
		}
	});
	console.log(attribute_catalogue);
	// xóa hết disable đi
	$('.block-attribute select[name="attribute_catalogue[]"]').find("option").removeAttr("disabled");
	for(let i = 0; i < attribute_catalogue.length; i++) {
		// thêm disable ở những cái nào trong mảng
		$('.block-attribute select[name="attribute_catalogue[]"]').find("option[value="+ attribute_catalogue[i] + "]").prop('disabled', !$('#one').prop('disabled'));
    	$('.block-attribute select[name="attribute_catalogue[]"]').select2();
    }
	// // nếu cái option nào được chọn thì xóa disable cua nó đi
	$('.block-attribute select[name="attribute_catalogue[]"]').find("option:selected").removeAttr("disabled");
	
}
function render_attribute(attr,attribute_catalogue){
	let index = $('.block-attribute tbody tr').length;
	attr = JSON.parse(window.atob(attr));
	let key = Object.keys(attr);
	let value = Object.values(attr);
	let html = '<tr>';
		html = html+'<td data-index="'+index+'">';
			html = html+'<input type="checkbox" name="checkbox[]" value="1" class="checkbox-item">';
			html = html+'<input type="text" name="checkbox_val[]" value="0" class="hidden">';
			html = html+'<div for="" class="label-checkboxitem"></div>';
		html = html+'</td>';
		html = html+'<td>';
			html = html+'<select name="attribute_catalogue[]" class="form-control select3" style="width:100%" >';
			let pos='';
			for(let i = 0; i < key.length; i++) {
				pos = attribute_catalogue.indexOf(key[i]);
				if(pos == -1){
				    html = html+'<option value="'+key[i]+'">'+value[i]+'</option>';
				}else{
				    html = html+'<option disabled="disabled" value="'+key[i]+'">'+value[i]+'</option>';
				}
			}
			html = html+'</select>';
		html = html+'</td>';
		html = html+'<td>';
			html = html+'<input type="text" class="form-control" disabled="disabled">';
		html = html+'</td>';
		html = html+'<td>';
			html = html+'<a type="button" class="btn btn-default delete-attribute"  data-id="" ><i class="fa fa-trash"></i></a>';
		html = html+'</td>';
	html = html+'</tr>';
	return html;
}
function render_select2(condition='', index=''){
	html = '<select name="attribute['+index+'][]" data-condition="'+condition+'" data-json="" class="form-control selectMultipe" multiple="multiple" data-title="Nhập 2 kí tự để tìm kiếm.." data-module="attribute"  style="width: 100%;">';
	html = html+'</select>';
	return html;
}
function wholesale(value=''){
	let price = $('input[name="price"]').val();
	let html = '<tr>';
			html = html+'<td>';
				html = html+'<input type="text" name="quantity_start[]" value="'+value+'" class="float form-control" placeholder="Từ (sản phẩm)" autocomplete="off" style="width:120px">';
			html = html+'</td>';
			html = html+'<td>';
				html = html+'<input type="text" name="quantity_end[]" value="" class="float form-control" placeholder="Đến (sản phẩm)" autocomplete="off" style="width:120px">';
			html = html+'</td>';
			html = html+'<td>';
				html = html+'<input type="text" name="price_wholesale[]" value="'+price+'" class="form-control int text-right" placeholder="0" autocomplete="off">';
			html = html+'</td>';
			html = html+'<td class="del_row">';
				html = html+'<i class="fa fa-trash"></i>';
			html = html+'</td>';
		html = html+'</tr>';
	return html;
}
function render_version(title='', price ='',code='', attribute1='', attribute2=''){
	let html = '<tr>';
		html = html+'<td>';
			html = html+'<input type="text" name="attribute1[]" value="'+attribute1+'" class="hidden">';
			html = html+'<input type="text" name="attribute2[]" value="'+attribute2+'" class="hidden">';
			html = html+'<div class="uk-flex uk-flex-middle">';
				html = html+'<div class="image mr5">';
					html = html+'<div style="cursor: pointer;">';
						html = html+'<img src="template/not-found.png" class="js_choose_album" alt="">';
					html = html+'</div>';
					html = html+'<input type="text" name="image_version[]" value="" class="hidden" >';
				html = html+'</div>';
			html = html+'</div>';
		html = html+'</td>';

		html = html+'<td><input type="text" name="title_version[]" readonly value="'+title+'" class="form-control"  autocomplete="off" ></td>';

		html = html+'<td><input type="text" name="price_version[]" value="'+addCommas(price)+'" class="form-control int"  autocomplete="off" ></td>';
		
		html = html+'<td><input type="text" name="code_version[]" value="'+code+'" class="form-control"  autocomplete="off" ></td>';
		html = html+'<td><input type="text" name="barcode_version[]" value="" class="form-control"  autocomplete="off" ></td>';
	html = html+'</tr>';
	return html;
}
	
function get_list_object(page = 1){

	let keyword = $('.keyword').val();
	let perpage = $('select[name="perpage"]').val();
	let catalogueid = $('.catalogueid').val();
	let catalogue = $('select[name="catalogue[]"]').val();
	let brand = $('select[name="brandid"]').val();
	let publish = $('select[name="publish"]').val();
	let tag = $('select[name="tag[]"]').val();
	let start_price = $('input[name="start_price"]').val();
	let end_price = $('input[name="end_price"]').val();
	let attr = $('input[name="attr"]').val();

	
	let param = {
		'page'    : page,
		'keyword' : keyword,
		'perpage' : perpage,
		'catalogueid' : catalogueid,
		'catalogue' : catalogue,
		'brand' : brand,
		'publish' : publish,
		'tag' : tag,
		'start_price' : start_price,
		'end_price' : end_price,
		'attr' : attr,
		'page'    : page,
	}
	console.log(param)
	let ajaxUrl = 'product/ajax/product/listproduct';
	$.get(ajaxUrl, {
		perpage: param.perpage, 
		keyword: param.keyword, 
		page: param.page,
		catalogueid: param.catalogueid,
		catalogue: param.catalogue, 
		brand: param.brand,
		publish: param.publish,
		tag: param.tag,
		attr: param.attr,
		start_price: param.start_price,
		end_price: param.end_price},
		function(data){
			let json = JSON.parse(data);
			$('#ajax-content').html(json.html);
			$('#pagination').html(json.pagination);
			$('#total_row').html(json.total_row);
		});
}
function render_filter_price(){
	min_price = $('#min-price').val();
	max_price = $('#max-price').val();
	filter_price =''
	if(min_price == '' && max_price != ''){
		filter_price = 'dưới ' + $('#label-max-price').html();
		$('#label-min-price').show().html('0');
	}
	if(min_price != '' && max_price == ''){
		filter_price = 'trên '+ $('#label-min-price').html();
		$('#label-max-price').show().html('0');
	}
	if(min_price != '' && max_price != ''){
		filter_price = $('#label-min-price').html() + '  -  ' + $('#label-max-price').html() ;		
	};
	if(min_price == '' && max_price == ''){
		filter_price = 'Chọn mức giá';		
	};
	$('#filter_total').html(filter_price);
};
function html_block_color(colorid, colortext){
	html='';
	colorid.forEach(function(item, index, array) {
		html = html+'<div class="col-lg-3">';
			html = html+'<div class="image_color m-b-xs" style="cursor: pointer;">';
				html = html+'<div class="image_small" style="">';
					html = html+'<img src="/template/not-found.png" alt="">';
				html = html+'</div>';
				html = html+'<input type="text" name="image_color['+item+']" value="'+item+'" class="hidden" onclick="openKCFinder(this)" >';
			html = html+'</div>';
			html = html+'<div class="title_color text-center">'+colortext[index];
				
			html = html+'</div>';
		html = html+'</div>';
	});
	return html;
}
/* UPLOAD ẢNH */
	$(document).on('click', '.image_small', function(){
		openKCFinderAlbum($(this).find('img'));
	});
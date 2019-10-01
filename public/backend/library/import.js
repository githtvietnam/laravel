$(document).ready(function(){
	// số lượng hàng trả lại không vượt quá hàng nhập
	$(document).on('change','.undo input[name="product[quantity][]"]',function(){	
		let _this = $(this);
		let quantity_import = _this.attr('data-quantity');
		let quantity_new = _this.val();
		console.log(quantity_import);
		console.log(quantity_new);
		if(sub(quantity_new, quantity_import) > 0){
			toastr.warning('Số lượng trả không thể lớn hơn số lượng nhập','');
			_this.val('0');
		}
	});
	total_money_import();
	$(document).on('change keyup','input[name="product[quantity][]"],input[name="product[price][]"],input[name="product[vat][]"]',function(){
		let _this = $(this);
		let price = _this.parents('tr').find('input[name="product[price][]"]').val();
		let quantity = _this.parents('tr').find('input[name="product[quantity][]"]').val();
		let vat = _this.parents('tr').find('input[name="product[vat][]"]').val();
		price = replace(price);
		money =  Math.round( div(mul(sub(100, vat), quantity, price),100) );
		_this.parents('tr').find('input[name="product[money][]"]').removeAttr('readonly');
		_this.parents('tr').find('input[name="product[money][]"]').val( addCommas(money));
		_this.parents('tr').find('input[name="product[money][]"]').attr('readonly', true);
		total_money_import();
	});
	//------------------------------------------SUPPLIER------------------------------------------
	// nhà cung cấp phải chọn không được đánh kí tự
	$(document).on('change','#supplier',function(){	
		$('.supplierid').val('');
	});
	// lấy ra danh sách nhà cung cấp thảo mãn đk
	$(document).on('click keyup','#supplier',function(){
		let _this = $(this);
		let keyword = _this.val();
		keyword = $.trim(keyword);
		if(keyword.length > 1){
			setTimeout(function() {
				get_list_supplier({'keyword' : keyword});
			}, 200);
		}
	});
	// khi chọn vào 1 ncc trong danh sách
	$(document).on('click','#list-supplier .supplier',function(){	
		let _this = $(this);
		//lấy info của ncc
		let data = _this.attr('data-info');
		data = window.atob(data);
		let json = JSON.parse(data);
		$('.supplierid').val(json.id);
		$('#supplier').val(json.title);
		$('input[name=phone]').val(json.phone);
		//ẩn bảng danh sách ncc
		$('#list-supplier').html('');
	});
	$(document).mouseup(function(e){
	    let container = $("#list-supplier li");
	    if (!container.is(e.target) && container.has(e.target).length === 0){
	        container.hide();
	    }
	});
	//khi click ra chỗ khác thì sẽ ẩn danh sách khách hàng đi
	$(document).mouseup(function(e){
	    let container = $("<div id='list-product'> </div> li");
	    if (!container.is(e.target) && container.has(e.target).length === 0){
	        container.hide();
	    }
	});
	//--------------------------------------------PRODUCT--------------------------------------------
	// lấy ra danh sách sản phẩm thảo mãn đk
	$(document).on('click keyup','#input_product',function(){
		let _this = $(this);
		let keyword = _this.val();
		keyword = $.trim(keyword);
		var productid=[];
		if(keyword.length > 1){
			$('#table_product tr').each(function (){
	        	productid.push($(this).find('input[name="product[id][]"]').val());//gán giá trị id vào mảng ids
			});
			setTimeout(function() {
				get_list_product({'keyword' : keyword, 'productid':productid});
			}, 200);
		}
		$('#list-product').html('');
	});
	// khi chọn vào 1 sp trong danh sách
	$(document).on('click','#list-product li',function(){
		let _this = $(this);
		//lấy info của sp
		let data = _this.attr('data-info');
		data = window.atob(data);
		$('#list-product').html('');
		$('#product').val('');
		// thêm mới sản phẩm vào bảng
		let html= html_product(data);
		$('#table_product').append(html);
		total_money_import();
	});
	// xóa sp trong bảng
	$(document).on('click','.trash',function(){
		let _this = $(this);
		swal({
			title: "Hãy chắc chắn rằng bạn muốn thực hiện thao tác này?",
			text: '',
			type: "warning",
			showCancelButton: true,
			confirmButtonColor: "#DD6B55",
			confirmButtonText: "Thực hiện!",
			cancelButtonText: "Hủy bỏ!",
			closeOnConfirm: false,
			closeOnCancel: false },
		function (isConfirm) {
			if (isConfirm) {
				_this.parents('tr').remove();
				total_money_import();
				swal("Xóa thành công!", "Sản phẩm đã được xóa khỏi danh sách.", "success");
			} else {
				swal("Hủy bỏ", "Thao tác bị hủy bỏ", "error");
			}
		});
		total_money_import();
	});



	$(document).on('click','.ajax_recycle_import_all',function(){
		let _this = $(this);
		let title = _this.attr('data-title');

		swal({
			title: "Hãy chắc chắn rằng bạn muốn thực hiện thao tác này?",
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
				let supplierid = [];
				$('.checkbox-item:checked').each(function() {
					supplierid.push($(this).parents('tr').find('.ajax_recycle_import').attr('data-supplireid'));
				});
				id_checked = object_checked();
				let ajax_url = 'import/ajax/import/ajax_recycle_import_all';
				$.post(ajax_url, {
					id: id_checked, supplierid:supplierid},
					function(data){
						if(data == 0){
							sweet_error_alert('Có vấn đề xảy ra','Vui lòng thử lại')
						}else{
							$('.checkbox-item:checked').parents('tr').hide();
							swal("Xóa thành công!", "Các đơn nhập đã được xóa khỏi danh sách.", "success");
						}
					});
			} else {
				swal("Hủy bỏ", "Thao tác bị hủy bỏ", "error");
			}
		});
	});
	$(document).on('click','.ajax_recycle_import',function(){
		let _this = $(this);
		let title = _this.attr('data-title');
		let module = _this.attr('data-module');
		let code = _this.attr('data-code');
		let supplierid = _this.attr('data-supplierid');
		let stockid = _this.attr('data-stockid');
		let id = _this.attr('data-id');
		swal({
			title: "Hãy chắc chắn rằng bạn muốn thực hiện thao tác này?",
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
				let ajax_url = 'import/ajax/import/ajax_recycle_import';
				$.post(ajax_url, {
					module: module,code: code, id: id, supplierid:supplierid, stockid:stockid},
					function(data){
						if(data == 0){
							sweet_error_alert('Có vấn đề xảy ra','Vui lòng thử lại')
						}else{
							_this.parents('tr').hide('slow').remove();
							swal("Xóa thành công!", "Đơn nhập đã được xóa khỏi danh sách.", "success");
						}
					});
			} else {
				swal("Hủy bỏ", "Thao tác bị hủy bỏ", "error");
			}
		});
	});
});

function total_money_import(){
	let total_money = 0;
	$('#table_product tr').each(function (){
		let _this = $(this);
		let price = _this.find('input[name="product[price][]"]').val();
		let quantity = _this.find('input[name="product[quantity][]"]').val();
		let vat = _this.find('input[name="product[vat][]"]').val();
		
		price = replace(price);
		quantity = replace(quantity);
 
		total_money =  total_money + Math.round( div(mul(sub(100, vat), quantity, price),100) );
	});
	if($('.total_money').length){
	 	$("input[name=total_money]").val(addCommas(total_money));
	 	$(".total_money").text(addCommas(total_money));
	}
}
// thêm html sản phẩm vào bảng
function html_product(data){
	let json = JSON.parse(data);
	html='';
	html= html+ '<tr>';
        html= html+ '<td>'+ json.code +'</td>';
        html= html+ '<td>'+ cutnchar(json.title ,70) ;
        	html=html+ '<input type="text"  name="product[id][]" value="'+json.id+'" class="hidden">'
        html= html+ ' </td>';

        html= html+ ' <td>';
        	html= html+ '<div class="input-group">';
        		html= html+ '<input type="text" autocomplete="off" style="height: 25px" name="product[quantity][]" value="1" class="float text-right form-control">';
            html= html+ '</div>';
        html= html+ '</td>';


        html= html+ '<td class="text-center">';
        	html= html+ json.measure;
        html= html+ ' </td>';

        html= html+ '<td>';
       		html= html+ '<div class="input-group">';
        		html= html+ '<input type="text" autocomplete="off" name="product[price][]" style="height: 25px" value="'+addCommas(json.price)+'" class="int text-right form-control">';
        	html= html+ '</div>';
        html= html+ '</td>';

        html= html+ '<td>';
       		html= html+ '<div class="input-group">';
        		html= html+ '<input type="text" autocomplete="off" name="product[vat][]" style="height: 25px" value="0" class="float text-right form-control">';
        	html= html+ '</div>';
        html= html+ '</td>';

        html= html+ '<td class="text-right"><input type="text" autocomplete="off" name="product[money][]" style="height: 25px" value="'+addCommas(json.price)+'" class="int text-right form-control"  readonly></td>';
       
        html= html+ '<td class="trash text-danger" style="width:20px;"><i class="fa fa-trash" aria-hidden="true"></i></td>';
    html= html+ '</tr>';
    return html;
}
function get_list_product(param){
	let ajaxUrl = 'dashboard/ajax/dashboard/listProduct';
	$.get(ajaxUrl, {
		keyword: param.keyword,id_product: param.id_product,supplierid: param.supplierid},
		function(data){
			let json = JSON.parse(data);
			$('#list-product').html(json.html);
		});
}
function get_list_supplier(param){
	let ajaxUrl = 'import/ajax/import/listSupplier';
	$.get(ajaxUrl, {
		keyword: param.keyword},
		function(data){
			let json = JSON.parse(data);
			$('#list-supplier').html(json.html);
		});
}
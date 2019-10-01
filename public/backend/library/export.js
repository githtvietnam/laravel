$(document).ready(function(){
	//set value select2 cho thợ
	if(typeof worker !='undefined' ){
		pre_select2('user',worker, 'fullname');
	}
	if($('#user').length){
		select2($('#user'), 'fullname', ' AND catalogueid = 13');
	}
	// thêm điều kiện tìm kiếm
	$(document).on('change','#supplier',function(){
		$('#form').trigger('submit');
	});
	$(document).on('change','#stock',function(){
		$('#form').trigger('submit');
	});
	$('.multi').select2({});
	$(document).on('change','input[name="product[quantity][]"], input[name="product[quantity_paid][]"] , input[name="product[quantity_error][]"]',function(){
		let _this = $(this);
		let price = _this.parents('tr').find('input[name="product[price][]"]').val();
		let quantity = _this.parents('tr').find('input[name="product[quantity][]"]').val();
		let quantity_error = _this.parents('tr').find('input[name="product[quantity_error][]"]').val();
		let quantity_paid = _this.parents('tr').find('input[name="product[quantity_paid][]"]').val();
		let quantity_in_stock = _this.parents('tr').find('input[name="product[quantity_in_stock][]"]').val();
		let quantity_old = _this.parents('tr').find('input[name="product[quantity_old][]"]').val();
		if(sub(quantity, sum(quantity_in_stock, quantity_old)) > 0){
			toastr.error('Vui lòng nhập lại','Số lượng trong kho không đủ');
			_this.val('');
		} 
		if(quantity < sum(quantity_paid,quantity_error)){
			toastr.error('Vui lòng nhập lại','Số lượng trả và hỏng không thể lớn hơn số lượng nhập');
			_this.val('');
		}else{
			money(_this);
			total_money();
		}
	});
	$(document).on('change keyup','input[name="prd_out[quantity][]"]',function(){
		let _this = $(this);
		let price = _this.parents('tr').find('input[name="prd_out[price][]"]').val();
		let quantity = _this.parents('tr').find('input[name="prd_out[quantity][]"]').val();
		price = is0(price);
		quantity = is0(quantity);
		price = price.replace(/\./gi, "");
		money =  Math.round(mul(quantity , price));
		money = addCommas(money);
		_this.parents('tr').find('.money').html(money);

		let total_money = 0;
		$('#table_prd_out tr').each(function (){
			let _this = $(this);
			let price = _this.find('input[name="prd_out[price][]"]').val();
			let quantity = _this.find('input[name="prd_out[quantity][]"]').val();
			
			price = is0(price);
			quantity = is0(quantity);
			price = price.replace(/\./gi, "");
	 
			total_money =  total_money + Math.round(mul(quantity, price));
		});
		$('.total_money').html(addCommas(total_money));
	 	$("input[name=total_money]").val(total_money);
	});
});

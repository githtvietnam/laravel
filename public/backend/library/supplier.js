$(document).ready(function(){
	$(document).on('click','.choose',function(){
		let _this = $(this);
		$('.choose').removeClass('bg-choose');
		_this.toggleClass('bg-choose');
		let data  = _this.attr('data-info');
		data = window.atob(data);
		let json = JSON.parse(data);
		$('.loader').show();
		setTimeout(function(){
			$('.loader').hide();
			$('.title').html('').html(json.title);
			$('.phone').html('').html(json.phone);
			$('.email').html('').html(json.email);
			$('.address').html('').html(json.address);
			$('.website').html('').html(json.website);
			$('.fax').html('').html(json.fax);
			$('.bank').html('').html(json.bank);
			$('.mst').html('').html(json.mst);
			$('.note').html('').html(json.note);
			$('.userid_created').html('').html(json.userid_created);
			$('.user_charge').html('').html(json.user_charge);
		}, 100);
	});

	$(document).on('click','.supplier_info',function(){
		let _this = $(this);
		let data  = _this.attr('data-info');
		let title =_this.find('td:eq(1)').text();
		$('.title').html('').html(title);
		$('.supplier_info').removeClass('bg-choose');
		_this.toggleClass('bg-choose');
		$('.supplier-detail').find('ul').html(render_history(data));
	});
});

function get_list_supplier(param){
	let ajaxUrl = 'supplier/ajax/supplier/listSupplier';
	$.get(ajaxUrl, {
		keyword: param.keyword},
		function(data){
			let json = JSON.parse(data);
			$('#listSupplier').html(json.html);
			$('#total_row').html(json.total);
		});
}
// thêm html sản phẩm vào bảng
function render_history(data){
    let html='';
	data = window.atob(data);
	let json = JSON.parse(data);
	for (var j = 0; j <json.length; j++){
		if(json[j]['importid'] == 0){
            html= html+ '<li class="success uk-flexright">';
                html= html+ '<div class="text-right">';
					html= html+ 'Đã thanh toán <a href="http://ketoan.thegioiweb.org/cash/backend/cash/view.html">'+json[j]['cash']['detail']+'</a> : '+addCommas(json[j]['money_paid']) + 'đ';
                html= html+ '</div>';
                html= html+ '<div class="text-right">';
	                html= html+ '<i class="fa fa-clock-o"></i> '+json[j]['created'];
                html= html+ '</div>';
            html= html+ '</li>';
		}else{
            html= html+ '<li class="warning">';
                html= html+ '<div>';
					html= html+ 'Đã nhập đơn hàng <a href="http://ketoan.thegioiweb.org/import/backend/import/update/'+json[j]['importid']+'.html">'+json[j]['import']['code']+'</a> có tổng tiền: '+addCommas(json[j]['money_liabilities']) + 'đ';
                html= html+ '</div>';
                html= html+ '<i class="fa fa-clock-o"></i> '+json[j]['created'];
            html= html+ '</li>';
		}
    }
    return html;
}
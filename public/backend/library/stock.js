$(document).ready(function(){
	/* CLICK VÀO THÀNH VIÊN*/
	$(document).on('click','.choose',function(){
		let _this = $(this);
		$('.choose').removeClass('bg-choose');
		_this.toggleClass('bg-choose');
		let data  = _this.attr('data-info');
		data = window.atob(data);
		let json = JSON.parse(data);
		setTimeout(function(){
			$('.loader').hide();
			$('.p-reset').attr('data-userid',json.id);
			$('.fullname').html('').html(json.title);
			$('.phone').html('').html(json.phone);
			$('.email').html('').html(json.email);
			$('.address').html('').html(json.address);
		}, 100);
	});
	/* END USER */
	
});

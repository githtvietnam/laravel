$(document).ready(function () {
	
	$('.alert').hide();
	let otpForm = $('#myModal6');
	
	// Đặt id cho form là recoveryForm
	let recovery  = $('#recoveryForm');
	
	
	$(document).on('submit','.recovery-form',function(){ 
		$('.otp-email .bg-loader').show();
		let _this = $(this);
		let data = _this.serializeArray();
		let email = _this.find('.email').val();
		let formUrl = 'user/ajax/auth/get_otp_code';
		$.post(formUrl, {
			data: data, email: email},
			function(data){
				let json = JSON.parse(data);
				if(json.error.flag == 1){
					$('.otp-email .alert').html(json.error.message).show(); 
				}else{
					$('.userid').val(json.id);
					otpForm.modal('show');
					$('.otp-email .alert').hide();
				}
				$('.otp-email .bg-loader').hide();
			});
		return false;
	});
	
	
	$(document).on('submit','.otp-form', function(){
		let _this = $(this);
		let otpNumber = new Array(); 
		_this.find('.otp-number').each(function(){
			let _otp = $(this);
			otpNumber.push(_otp.val());
		});
		let formUrl = 'user/ajax/auth/validate_otp_code';
		$('.otp-form .bg-loader').show();
		$.post(formUrl, {
			otpNumber: otpNumber, userid: $('.userid').val()},
			function(data){
				//
				let json = JSON.parse(data);
				if(json.error.flag == 1){
					$('#myModal6 .alert').html(json.error.message).show(); 
				}else{
					//Ẩn form khi nhập mã OTP thành công.
					otpForm.modal('hide');
					//Bat form thay doi mat khau khi dien dung OTP
					recovery.modal('show');
					$('.otp-form .alert').hide();
				}
				$('.otp-form .bg-loader').hide();
			});
		return false;
	});
	
	/*
		Bắt sự kiện khi form thay đổi mật khẩu được submit
	*/
	
	$(document).on('submit','#recoveryForm form',function(){
		//Bật trạng thái loading
		$('#recoveryForm .bg-loader').show();
		let _this = $(this);
		let password = _this.find('input[name=password]').val(); // Lấy ra mật khẩu mới
		let re_password = _this.find('input[name=re_password]').val(); // Lấy ra nhập lại ật khẩu mới
		let formUrl = 'user/ajax/auth/change_password';
		
		$.post(formUrl, {
			password: password, re_password: re_password,userid: $('.userid').val()},
			function(data){
				let json = JSON.parse(data);
				if(json.error.flag == 1){
					$('#recoveryForm .alert').html(json.error.message).show(); 
				}else{
					//Ẩn form khi nhập mã OTP thành công.
					otpForm.modal('hide');
					$('#recoveryForm .alert').hide();
					
					//Test lại toàn bộ qui trình như sau.
					location.reload(); // Reload lại trang sau khi thay đổi mật khẩu thành công.
				}
				$('#recoveryForm .bg-loader').hide();
				
			});
		
		return false; // để ko chuyển trang
	});
	
	
	$(document).on('keyup','.otp-number',function(e){
		let _this = $(this);
		if(e.keyCode != 8){
			_this.parent().next('.form-row').find('input').focus();
		}
	});
	
});


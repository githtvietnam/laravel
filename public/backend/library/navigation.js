$(document).ready(function(){
	$(document).on('click', '.add-menu', function(){
		let navigation = navigation_render();
		$('.menu-list').append(navigation);
		$('.menu-list').find('.menu-notification').remove();
		
		return false;
	});
	
	$(document).on('click', '.delete-menu', function(){
		let _this = $(this);
		let node = _this.attr('data-node');
		if(typeof(node) != 'undefined' && node == 0){
			_this.parent().parent().parent().remove();
		}else{
			let formUrl = 'navigation/ajax/navigation/delete';
			let id = _this.attr('data-id');
			$.post(formUrl, {
				id: id},
				function(data){
					console.log(data);
				});
		}
		if($('.delete-menu').length <= 0){
			$('.menu-list').html('<div class="menu-notification" style="text-align:center;"><h4 style="font-weight:500;font-size:16px;color:#000">Danh sách liên kết này chưa có bất kì đường dẫn nào.</h4><p style="color:#555;margin-top:10px;">Hãy nhấn vào <span style="color:blue;">"Thêm đường dẫn"</span> để băt đầu thêm.</p></div>');
		}else{
			$('.menu-list').find('.menu-notification').remove();
		}
	});
	
});
 
 function navigation_render(){
	let html = '';
	html = html + '<div class="row mb15">';
		html = html + '<div class="col-lg-4">';
			html = html + '<div class="form-row">';	
				html = html + '<input type="text" placeholder="" name="menu[title][]" class="form-control" >';
			html = html + '</div>';
		html = html + '</div>';
		html = html + '<div class="col-lg-4">';
			html = html + '<div class="form-row">';
				html = html + '<input type="text" placeholder="" name="menu[link][]" class="form-control" >';
				
			html = html + '</div>';
		html = html + '</div>';
		html = html + '<div class="col-lg-2">';
			html = html + '<div class="form-row">';
				html = html + '<input type="text" placeholder="" value="0" style="text-align:right;" name="menu[order][]" class="form-control" >';
			html = html + '</div>';
		html = html + '</div>';
		html = html + '<div class="col-lg-2">';
			html = html + '<div class="form-row" style="text-align:right;margin-top:10px;">';
				html = html + '<a class="delete-menu image img-scaledown" data-node="0" style="height:12px;"><img src="template/close.png" /></a>';
			html = html + '</div>';
		html = html + '</div>';
	html = html + '</div>';
	return html;
} 
 
$(document).ready(function(){
	
	var time;
	$(document).on('click', '.add-layout', function(){
		let _this = $(this);
		let item = _this.attr('data-item');
		let layout = layout_render(item);
		item = parseInt(item) + 1;
		_this.attr('data-item', item);
		$('.layout-list').append(layout);
		$('.select3').select2();
		$('.layout-list').find('.layout-notification').remove();
		
		return false;
	});
	
	
	$( function() {
		$( "#sortable" ).sortable();
		$( "#sortable" ).disableSelection();
	});
	
	$(document).on('click', '.delete-layout', function(){
		let _this = $(this);
		_this.parent().parent().parent().parent().parent().remove();
		if($('.delete-layout').length <= 0){
			$('.layout-list').html('<div class="layout-notification" style="text-align:center;"><h4 style="font-weight:500;font-size:16px;color:#000">Danh sách liên kết này chưa có bất kì đường dẫn nào.</h4><p style="color:#555;margin-top:10px;">Hãy nhấn vào <span style="color:blue;">"Thêm đường dẫn"</span> để băt đầu thêm.</p></div>');
		}else{
			$('.layout-list').find('.layout-notification').remove();
		}
	});
	
	
	$(document).on('change','.choose-module', function(){
		let _this = $(this);
		let item = _this.attr('data-item');
		let module = _this.val();
		let selectMultipeHtml = select2_render(module, item);
		_this.parent().parent().parent().parent().siblings('.ibox-content').find('.form-row').html(selectMultipeHtml);
		$('.selectMultipe').each(function() {
		   selectMultipe($(this));
		});
	});
	
});


function select2_render(module, item){
	let html = '';
	html = html + '<select name="layout[object]['+item+']['+module+'][]" class="form-control selectMultipe" multiple="multiple" data-module="'+module+'" data-title="Nhập 2 kí tự để tìm kiếm.." style="width: 100%;" >';
	
		
	html = html + '</select>';
	
	return html;
}

function layout_render(item){
	let html = '';
	html = html + '<li class="ui-state-default ui-sortable-handle" style="margin-bottom:15px;">';
		html = html + '<div class="ibox m0">';
			html = html + '<div class="ibox-title">';
				html = html + '<div class="row">';
					html = html + '<div class="col-lg-6">';
						html = html + '<div class="form-row">';
							html = html + '<input type="text" name="layout[title][]" value="" class="form-control title" style="font-weight:normal;" placeholder="Nhập Tiêu đề Block" id="title" autocomplete="off">';
						html = html + '</div>';
					html = html + '</div>';
					html = html + '<div class="col-lg-6">';
						html = html + '<div class="form-row">';
							html = html + select_render(module, item);
						html = html + '</div>';
					html = html + '</div>';
				html = html + '</div>';
			html = html + '</div>';
			html = html + '<div class="ibox-content">';
				html = html + '<div class="row">';
					html = html + '<div class="col-lg-12">';
						html = html + '<div class="form-row">';
							
						html = html + '</div>';
					html = html + '</div>';
					html = html + '<div class="col-sm-2">';
						html = html + '<a class="delete-layout" style="margin-top:10px;color:red;display:inline-block;">Xóa Khối</a>';
					html = html + '</div>'
				html = html + '</div>';
			html = html + '</div>';
		html = html + '</div>';
	html = html + '</li>';
	return html;
} 
 
 
 function select_render(data, item){
	let html = '';
	let json = JSON.parse(data);
	html = html + '<select name="layout[module][]" data-item="'+item+'" class="select3 choose-module" style="fot-weight:normal;">';
	for (let key in json){
		html = html + '<option value="'+key+'">'+json[key]+'</option>';
	}
	html = html + '</select>';
	
	return html;
}
function select3(){
	$('.select3').select2();
}
 
$(document).ready(function(){
	//===================album ảnh===================
	//đoạn js này để kéo thả ảnh
	$( function() {
		$( "#sortable" ).sortable();
		$( "#sortable" ).disableSelection();
	});
	
	$(document).on('click','.delete-image', function(){
		console.log(1);
		let _this = $(this);
		_this.parents('li').remove();
		if($('.upload-list li').length <= 0){
		console.log(2);
			$('.click-to-upload').removeClass('hidden');
			$('.upload-list').addClass('hidden');
		}
		return false;
	});

	// Cập nhật trạng thái
	
	$(document).on('click','.pagination li a', function(){
		let _this = $(this);
		let page = _this.attr('data-ci-pagination-page');
		let keyword = $('.keyword').val();
		let perpage = $('.perpage').val();
		let object = {
			'keyword' : keyword,
			'perpage' : perpage,
			'page'    : page,
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
	
	$(document).on('change','.publish',function(){
		let _this = $(this);
		let objectid = _this.attr('data-id');
		let formURL = 'article/ajax/catalogue/status';
			$.post(formURL, {
				objectid: objectid},
				function(data){
					
				});
	});
	var time;
	$(document).on('keyup change','.filter', function(){
		let keyword = $('.keyword').val();
		let perpage = $('.perpage').val();
		let object = {
			'keyword' : keyword,
			'perpage' : perpage,
			'page'    : 1,
		}
		keyword = keyword.trim();
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
	
	
	
});

function get_list_object(param){
	let ajaxUrl = 'product/ajax/brand/listCatalogue';
	$.get(ajaxUrl, {
		perpage: param.perpage, keyword: param.keyword, page: param.page},
		function(data){
			let json = JSON.parse(data);
			$('#ajax-content').html(json.html);
			$('#pagination').html(json.pagination);
			$('#total_row').html(json.total_row);
		});
}

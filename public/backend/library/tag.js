$(document).ready(function(){
	if($('#tag_catalogue').length){
		select2($('#tag_catalogue'));
	}
	if(typeof catalogueid !='undefined'  ){
		pre_select2('tag_catalogue',catalogueid);
	}
	
	// Cập nhật trạng thái
	
	$(document).on('click','.pagination li a', function(){
		let _this = $(this);
		let page = _this.attr('data-ci-pagination-page');
		let keyword = $('.keyword').val();
		let perpage = $('.perpage').val();
		let catalogueid = $('.catalogueid').val();
		let object = {
			'keyword' : keyword,
			'perpage' : perpage,
			'page'    : page,
			'catalogueid' : catalogueid,
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
		let formURL = 'tag/ajax/tag/status';
			$.post(formURL, {
				objectid: objectid},
				function(data){
					
				});
	});
	var time;
	$(document).on('keyup change','.filter', function(){
		let keyword = $('.keyword').val();
		let perpage = $('.perpage').val();
		let catalogueid = $('.catalogueid').val();
		let object = {
			'keyword' : keyword,
			'perpage' : perpage,
			'catalogueid' : catalogueid,
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
	let ajaxUrl = 'tag/ajax/tag/listTag';
	$.get(ajaxUrl, {
		perpage: param.perpage, keyword: param.keyword, page: param.page, catalogueid: param.catalogueid},
		function(data){
			let json = JSON.parse(data);
			$('#ajax-content').html(json.html);
			$('#pagination').html(json.pagination);
			$('#total_row').html(json.total_row);
		});
}
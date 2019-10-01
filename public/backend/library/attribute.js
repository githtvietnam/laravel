$(document).ready(function(){
	//===================album ảnh===================
	if($('.colorpicker-element').length){
		console.log(1);
		$('.demo1').colorpicker();
		var divStyle = $('#demo_apidemo')[0].style;
		$('.demo1').colorpicker({
		    color: divStyle.backgroundColor
		}).on('changeColor', function(ev) {
		    divStyle.backgroundColor = ev.color.toHex();
		});
		$('.clockpicker').clockpicker();
	}
	$(document).on('change','.catalogueid', function(){
		let _this = $(this);
		let id=_this.val();
		if(id==2){
			$('.color').show();
		}else{
			$('.color').hide();
		}

		if(id==7){
			$('.price_range').show();
		}else{
			$('.price_range').hide();
		}
		
	});
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
			'catalogueid' : catalogueid,
			'page'    : 1,
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
		let catalogueid = $('.catalogueid').val();
		let object = {
			'keyword' : keyword,
			'perpage' : perpage,
			'page'    : 1,
			'catalogueid':catalogueid,
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
	let ajaxUrl = 'attribute/ajax/attribute/listAttribute';
	$.get(ajaxUrl, {
		perpage: param.perpage, keyword: param.keyword, page: param.page, catalogueid: param.catalogueid},
		function(data){
			let json = JSON.parse(data);
			$('#ajax-content').html(json.html);
			$('#pagination').html(json.pagination);
			$('#total_row').html(json.total_row);
		});
}

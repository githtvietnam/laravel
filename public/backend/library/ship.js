$(document).ready(function(){
	$(document).ready(function () {
        $('.i-checks').iCheck({
            checkboxClass: 'icheckbox_square-green',
            radioClass: 'iradio_square-green',
        });
    });
	$(document).on('click',' .shipAll', function(){
		let _this = $(this);
		if(_this.find('.checkbox-item:checked').length > 0) {
			$('select[name="city[]"]').val('').prop("disabled", false);
		}else{
			$('select[name="city[]"]').val('').val(null).trigger("change").prop("disabled", true);
		}
		clickInputCheckbox(_this)
	});

	//xử lí block ship
	$(document).on('ifChanged','input[name="ship_choose_local"]', function(){
		if ($(this).is(':checked')) {
			let _this = $(this);
			let local = _this.val();
			$('input[name="shipAll"]').prop("checked", false);
			$('select[name="city[]"]').val('').prop("disabled", false);
			$('.shipAll').find('.label-checkboxitem').removeClass('checked')
			if(local == 'city'){
				$('.ship_district').hide();
				$('.ship_city').show();
				$('select[name="district[]"]').val('');
			}else{
				$('.ship_district').show();
				$('.ship_city').hide();
				$('select[name="city[]"]').val('');
			}
			selectMultipe($('select[name="district[]"]'), 'name');
			selectMultipe($('select[name="city[]"]'), 'name');
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
		let formURL = 'article/ajax/article/status';
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
	let ajaxUrl = 'article/ajax/article/listArticle';
	$.get(ajaxUrl, {
		perpage: param.perpage, keyword: param.keyword, page: param.page, catalogueid: param.catalogueid},
		function(data){
			let json = JSON.parse(data);
			$('#ajax-content').html(json.html);
			$('#pagination').html(json.pagination);
			$('#total_row').html(json.total_row);
		});
}

function clickInputCheckbox(object){
	if(object.find('.checkbox-item:checked').length > 0) {
		object.find('.checkbox-item').prop('checked', false);
		object.find('.label-checkboxitem').removeClass('checked');
	}else{
		object.find('.checkbox-item').prop('checked', true);
		object.find('.label-checkboxitem').addClass('checked');
	}
}
$(document).ready(function(){
	if($('#media_catalogue').length){
		select2($('#media_catalogue'));
	}
	if(typeof catalogueid !='undefined'  ){
		pre_select2('media_catalogue',catalogueid);
	}
	
	
	if($('#tag').length){
		select2($('#tag'));
	}
	if(typeof tag !='undefined'  ){
		clearTimeout(time);
		time = setTimeout(function(){
			pre_select2('tag',tag)
		},100);
	}
	$( function() {
		$( "#sortable" ).sortable();
		$( "#sortable" ).disableSelection();
	});
	
	

	if(typeof(layoutid) != 'undefined' && layoutid != ''){
		let type = media_loading(layoutid, 'post');
	}
	
	$(document).on('change','.layout', function(){
		let _this = $(this);
		let catid = _this.val();
		media_loading(catid);
		return false;
	});
	
	$(document).on('click','.delete-image', function(){
		let _this = $(this);
		_this.parents('li').remove();
		if($('.upload-list li').length <= 0){
			$('.click-to-upload').show();
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
		let formURL = 'media/ajax/media/status';
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
	
	$(document).on('click', '.choose_video_type', function(){
		let _this = $(this);
		let value = _this.val();
		if(value == 1){
			console.log(123);
			$('#video-link').attr('disabled', 'disabled').val('');
			$('#video-iframe').removeAttr('disabled');
		}else if(value == 0){
			console.log(3);
			$('#video-iframe').attr('disabled', 'disabled').val('');
			$('#video-link').removeAttr('disabled');
		}
		
		
	});
	
});

function get_list_object(param){
	let ajaxUrl = 'media/ajax/media/listmedia';
	$.get(ajaxUrl, {
		perpage: param.perpage, keyword: param.keyword, page: param.page, catalogueid: param.catalogueid},
	function(data){
			let json = JSON.parse(data);
			$('#ajax-content').html(json.html);
			$('#pagination').html(json.pagination);
			$('#total_row').html(json.total_row);
	});
}
function openKCFinderImage(button) {
	window.KCFinder = {
		callBackMultiple: function(files) {
			window.KCFinder = null;
			for (var i = 0; i < files.length; i++){
				$('.upload-list .row #sortable').prepend(image_render(files[i]));
				$('.click-to-upload ').hide();
				$('.upload-list').removeClass('hidden');
			}
		}
	};
	window.open(BASE_URL + 'plugin/kcfinder-3.12/browse.php?type=images&dir=images/public', 'kcfinder_image',
        'status=0, toolbar=0, location=0, menubar=0, directories=0, ' +
        'resizable=1, scrollbars=0, width=1080, height=800'
    );
}

function image_render(src = ''){
	let html ='<li class="ui-state-default">';
		html = html+ '<div class="thumb">';
			html = html+ '<span class="image img-scaledown">';
				html = html+ '<img src="'+src+'" alt="" /> <input type="hidden" value="'+src+'" name="album[]" />';
			html = html+ '</span>';
			html = html+ '<div class="overlay"></div>';
			html = html+ '<div class="delete-image"><i class="fa fa-trash" aria-hidden="true"></i></div>';
		html = html+ '</div>';
	html = html+ '</li>';
	return html;
}


function openKCFinderMedia(field, type) {
    window.KCFinder = {
		callBack: function(url) {
			field.value = url;
			window.KCFinder = null;
		}
	
    };
	if(typeof(type) == 'undefined'){
		type = 'images';
	}
	
    window.open(BASE_URL + 'plugin/kcfinder-3.12/browse.php?type='+type+'&dir=images/public', 'kcfinder_image',
        'status=0, toolbar=0, location=0, menubar=0, directories=0, ' +
        'resizable=1, scrollbars=0, width=1180, height=800'
    );
}


function media_loading(catalogueid = 0, post = ''){
	let ajaxUrl = 'media/ajax/media/select_type';
	$.post(ajaxUrl, {
	catalogueid: catalogueid},
	function(data){
		if(data == 2){
			$('.album').removeClass('hidden');
			if(post == 'post'){
				$('.click-to-upload').hide();
				$('.upload-list').removeClass('hidden');
			}
			$('.video').addClass('hidden');
		}else if(data == 1){
			$('.video').removeClass('hidden');
			$('.album').addClass('hidden');
		}else if(data == 1){
			$('.album').addClass('hidden');
			$('.video').addClass('hidden');
		}
	});
}
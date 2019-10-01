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
	
	
	
});

function get_list_object(param){
	let ajaxUrl = 'product/ajax/catalogue/listCatalogue';
	$.get(ajaxUrl, {
		perpage: param.perpage, keyword: param.keyword, page: param.page},
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
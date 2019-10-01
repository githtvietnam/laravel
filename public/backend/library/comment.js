$(document).ready(function(){
	rating();
	/* XÓA RECORD */
	$(document).on('click','.ajax-group-delete',function(){
		//xóa nhiều: 
		// 		+ lấy hết giá trị trong all ô đc tích => lưu vào mảng
		//		+ gửi đi controller để xử lý
		let _this = $(this);
		let idCheck = []; //khai báo mảng
		
		//quét qua toàn bộ input đang checked
		$('.checkbox-item:checked').each(function(){
			idCheck.push($(this).val()); //lưu giá trị của input vào mảng
		});
		
		//nếu không có bản ghi nào đc check thì show lỗi và thoát
		if(idCheck.length <= 0){
			sweet_error_alert('Có vấn đề xảy ra','Bạn phải chọn ít nhất 1 bản ghi để thực hiện chức năng này');
			return false;
		}
		
		
		let param = {
			'title' : _this.attr('data-title'),
			'name'  : _this.attr('data-name'),
			'table': _this.attr('data-table'),
			'list'	: idCheck, //lưu toàn bộ id vào mảng
		}
		swal({
			title: "Hãy chắc chắn rằng bạn muốn thực hiện thao tác này?",
			text: param.title,
			type: "warning",
			showCancelButton: true,
			confirmButtonColor: "#DD6B55",
			confirmButtonText: "Thực hiện!",
			cancelButtonText: "Hủy bỏ!",
			closeOnConfirm: false,
			closeOnCancel: false },
			function (isConfirm) {
				if (isConfirm) {
					let ajaxUrl = 'comment/ajax/comment/ajax_group_delete';
					$.ajax({
						method: "POST",
						url: ajaxUrl,
						data: {param: param},
						dataType: 'json',
						cache: false,
						success: function(json){
							if(json.error.flag == 1){
								sweet_error_alert('Có vấn đề xảy ra',json.error.message);
							}else{
								$('#listComment tr.bg-active').each(function(){
									let target = $(this);
									target.hide('slow' , function(){
										target.remove();
									});
								});
								swal("Xóa thành công!", "Hạng mục đã được xóa khỏi danh sách.", "success");
							}
						}
					});
				} else {
					swal("Hủy bỏ", "Thao tác bị hủy bỏ", "error");
				}
			});
	});
	
	var time;
	$(document).on('keyup change' ,'.filter',function(){
		let param = {
			'module' : $('.module').val(),
			'keyword' : $('#keyword').val().trim(),
			'perpage' : $('#perpage').val(),
			'page'	  : 1,
		};
		clearTimeout(time);
		time = setTimeout(function(){
			get_list_object(param);
		} , 300);
	});
	
	$(document).on('click' , '#pagination ul>li>a[data-ci-pagination-page]', function(){
		let _this = $(this);
		let page = _this.attr("data-ci-pagination-page");
		let param = {
			'module' : $('.module').val(),
			'keyword' : $('#keyword').val().trim(),
			'perpage' : $('#perpage').val(),
			'page'	  : page,
		};
		clearTimeout(time);
		time = setTimeout(function(){
			get_list_object(param);
		} , 300);
		return false;
	});
	
	//===================album ảnh===================
	//đoạn js này để kéo thả ảnh
	$( function() {
		if($( "#sortable" ).length){
			$( "#sortable" ).sortable();
			$( "#sortable" ).disableSelection();
		}
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
			$('.upload-list').hide();
		}
		return false;
	});

	//mục đích: render ra form select để chọn chi tiết bài viết, sản phẩm, ... muốn chèn comment
	// để làm đc điều đó thì đầu tiên chúng ta phải render ra cấu trúc select
	// hoàn thiện cấu trúc select với đầu vào là param
	$(document).on('change' , '#module' , function(e){
		console.log(1);
		let _this = $(this);
		let param = {
			'module' : _this.val(),
			'json' : $('#object').attr('data-json'),
			'text' : _this.find('option:selected').text(),
		};
		let html = object_render(param);
		$('#object').html('').html(html);
		
		$('.selectMultipe').each(function(key1, index){
			let _this = $(this);

			let select = _this.attr('data-select');
			select = (typeof select == 'undefined') ? 'title' : select ;

			let key = _this.attr('data-key');
			key = (typeof key == 'undefined') ? 'id' : key ;

			let module = _this.attr('data-module');
			setTimeout(function(){
				let json = _this.attr('data-json');
				value = (typeof json != "undefined") ? window.atob(json) : '';
				if(value != ''){
					$.post('dashboard/ajax/dashboard/pre_select2', {
						value: value, module: module,select:select, key:key},
						function(data){
							let json = JSON.parse(data);
							if(json.items!='undefined' && json.items.length){
								for(let i = 0; i< json.items.length; i++){
									var option = new Option(json.items[i].text, json.items[i].id, true, true);
									_this.append(option).trigger('change');
								}
							}
						});
				}
				
			}, 100);
			selectMultipe($(this),select);
		});
	});
	
	
	// ============================== ĐÁNH GIÁ SAO =====================================
	
	if($('#module').length > 0 && module != ''){
		$('#module').trigger('change');
		var param = {
			'module' : module,
			'detailid' : object,
		};
		let Select = $('.selectMultipe');
		var ajaxUrl = 'comment/ajax/comment/get_select2';
		$.ajax({
			method: "POST",
			url: ajaxUrl,
			data: {param: param, module: param.module, detailid: param.detailid},
			dataType: 'json',
			cache: false,
			success: function(){
				if(json.items!='undefined' && json.items.length){
					for(let i = 0; i< json.items.length; i++){
						var option = new Option(json.items[i].text, json.items[i].id, true, true);
						Select.append(option).trigger('change');
					}
				}
			}
		});
	}
	
	
	$(document).on('change','.publish',function(){
		let _this = $(this);
		let objectid = _this.attr('data-id');
		let ajaxUrl = 'comment/ajax/comment/status';
		$.ajax({
			method: "POST",
			url: ajaxUrl,
			data: {objectid: objectid},
			cache: false,
			success: function(data){
				
			}
		});
	});
	
	// ============================== COMMENT VÀ BÌNH LUẬN =====================================
	
	var widthImg = 0; // chiều rộng ảnh cmt
	var textLength = 0; // độ dài nội dung bình luận
	
	$(document).on('click','.btn-reply', function(e){
		let _this = $(this);
		let param = {
			'id' : _this.attr('data-id'),
			'module' : _this.attr('data-module'),
			'detailid' : _this.attr('data-detailid'),
		};
		let reply = get_comment_html(param);
		let replyName = _this.parent().parent().siblings().find('._cmt-name').text();
		let commentAttr = _this.attr('data-comment');
		
		if(commentAttr == 1){
			_this.parent().siblings('.show-reply').html(reply);
			let replyTo = _this.parent().siblings('.show-reply').find('.text-reply').text('@'+ replyName + ' : ');
			replyTo.focus();
			textLength = $.trim(_this.parent().siblings('.show-reply').find('.text-reply').val()).length;
			//ban đầu ta ẩn nút gửi cmt
			_this.parent().siblings('.show-reply').find('.btn-submit').attr('disabled' , '');
			
			_this.attr('data-comment', 0);
			_this.html('Bỏ comment');
		}else{
			_this.parent().siblings('.show-reply').html('');
			_this.attr('data-comment', 1);
			_this.html('Trả lời');
		}
		e.preventDefault();
	});
	
	//hiển thị thời gian ago
	time_ago();

	$(document).on('keyup' , '.text-reply', function(){
		let _this = $(this);
		
		let text = $.trim(_this.val()); //xóa khoảng trắng
		let galleryBlock = _this.closest('.box-reply').find('.gallery-block'); //khối hình ảnh ở phiên hiện tại
		let btnSubmit = _this.closest('.box-reply').find('.btn-submit'); //nút gửi cmt
		
		if(text.length <= 0 && galleryBlock.is(":hidden")){
			// ẩn nút gửi cmt
			btnSubmit.attr('disabled', '');
		}else{
			btnSubmit.removeAttr('disabled');
		}
		
		return false;
	});
	
	
	// ajax trả lời bình luận
	$(document).on('click','.sent-cmt .btn-submit:enabled' ,function(){
		let _this = $(this);
		let btnReply = _this.closest('.cmt-content').find('.btn-reply'); // nút trả lời
		let loading = _this.closest('.box-reply').find('.bg-loading');
		let numReplyHtml = _this.closest('.cmt-content').find('.num-reply');
		let curentNumReply = parseInt(numReplyHtml.attr('data-num')); // lấy số lượng reply hiện tại
		let album = []; // mảng chứa list img
		
		_this.closest('.box-reply').find('.album').each(function(){
			album.push($(this).val());
		});
		
		let param = {
			'comment' : _this.closest('.box-reply').find('.text-reply').val(),
			'image' : album,
			'parentid' : _this.attr('data-parentid'),
			'module' : _this.attr('data-module'),
			'detailid' : _this.attr('data-detailid'),
		};
		
		loading.show();
		
		clearTimeout(time);
		
		//gửi ajax
		time = setTimeout(function(){
			let ajaxUrl = 'comment/ajax/comment/reply_comment';
			$.ajax({
				method: "POST",
				url: ajaxUrl,
				data: {param: param},
				dataType: 'json',
				cache: false,
				success: function(json){
					loading.hide();
					if(json.html.length > 0){
						numReply = curentNumReply + 1;
						$('#reply-to-'+param['parentid']+'').prepend(json.html);
						time_ago();
						numReplyHtml.text('('+numReply+')');
						numReplyHtml.attr('data-num', numReply);
						btnReply.trigger('click');
					}
				}
			});
		}, 400);
		
		return false;
	});
	
	
	// ajax sửa bình luận
	$(document).on('click' , '.edit-cmt .btn-edit' , function(){
		let _this = $(this);
		let liComment = _this.closest('li');
		let dataInfo  = _this.attr('data-info');
		data = window.atob(dataInfo); //decode base64
		let json = JSON.parse(data); // chuyển string về object
		// console.log(json); return false;
		let param = {
			'id' : _this.attr('data-id'),
			'table' : _this.attr('data-table'),
			'parentid' : json.parentid,
			'fullname' : json.fullname,
			'comment' : json.comment,
			'image' : (json.image.length > 0)? JSON.parse(json.image) : json.image,
			'dataInfo' : dataInfo,
		};
		
		let htmlEdit = get_edit_comment_html(param);
		_this.closest('li').html('').html(htmlEdit);
		let textReply = liComment.find('.text-reply');
		textReply.val(textReply.val() + ' ').focus();
		return false;
	});
	
	//ajax cancel cmt
	$(document).on('click' , '.cancel-cmt .btn-cancel' , function(){
		let _this = $(this);
		
		let dataInfo  = _this.attr('data-info');
		data = window.atob(dataInfo); //decode base64
		let json = JSON.parse(data);
		
		let param = {
			'id' : _this.attr('data-id'),
			'table' : _this.attr('data-table'),
			'parentid' : json.parentid,
			'fullname' : json.fullname,
			'comment' : json.comment,
			'image' : (json.image.length)? JSON.parse(json.image) : json.image,
			'dataInfo' : dataInfo,
			'created' : json.created,
			'updated' : (typeof(json.updated) != "undefined")? json.updated : "0000-00-00 00:00:00",
		};
		
		let prevHtml = get_prev_html(param);
		_this.closest('li').html('').html(prevHtml);
		time_ago();
		return false;
	});

	// ajax update cmt
	$(document).on('click' , '.update-cmt .btn-submit:enabled' , function(){
		let _this = $(this);
		
		let comment = _this.closest('.box-reply').find('.text-reply').val();
		let album = []; // list ảnh
		
		_this.closest('.box-reply').find('.album').each(function(){
			album.push($(this).val());
		});
		
		let dataInfo = _this.closest('.comment').find('.btn-cancel').attr('data-info');
		data = window.atob(dataInfo); //decode base64
		let json = JSON.parse(data); // convert chuỗi thành object
		
		let param = {
			'comment' : comment,
			'image' : album,
			'id' : _this.attr('data-id'),
			'parentid' : json.parentid,
			'fullname' : json.fullname,
			'dataInfo' : json,
		};
		
		// console.log(param); return false;
		
		let ajaxUrl = "comment/ajax/comment/update_comment";
		$.ajax({
			method: "POST",
			url: ajaxUrl,
			data: {param: param, comment: param.comment},
			dataType: "json",
			cache: false,
			success: function(json){
				if(json.flagError == 0){
					swal("Cập nhật thành công!", "Bình luận đã được cập nhật.", "success");
					_this.closest('li').html('').html(json.html);
					time_ago();
				}else{
					swal("Cập nhật không thành công!", "Đã có lỗi xảy ra.", "error");
				}
			}
		});
		
		return false;
	});
	
	$(document).on('click' , '.delete-img' , function(){
		let _this = $(this);
		let boxReply = _this.closest('.box-reply'); // hộp thoại
		let listImg = _this.closest('ul.lightBoxGallery'); //album ảnh
		_this.closest('li').remove();
		
		let numImg = listImg.find('li').length; // số lượng ảnh còn lại trong album
		
		listImg.css('width', widthImg*numImg); // tính lại chiều rộng của khối hình ảnh
		
		//ẩn khối hình ảnh khi all ảnh xóa hết
		if(numImg <= 0){
			listImg.parent().hide();
			textLength = $.trim(boxReply.find('.text-reply').val().length);
			//kiểm tra cmt k có text => ẩn nút gửi
			if(textLength > 0){
				boxReply.find('.btn-submit').removeAttr('disabled');
			}else{
				boxReply.find('.btn-submit').attr('disabled', '')
			}
		}
		
		return false;
	});
	
	//xóa comment
	$(document).on('click' , '.delete-cmt .btn-delete' , function(){
		let _this = $(this);
		_this.siblings('.ajax-delete').trigger('click');
		return false;
	});
	
	/* XÓA RECORD */
	$(document).on('click','.ajax-delete',function(){
		let _this = $(this);
		let param = {
			'title' : _this.attr('data-title'),
			'name'  : _this.attr('data-name'),
			'table': _this.attr('data-table'),
			'id'    : _this.attr('data-id'),
			'child' : _this.attr('data-child'),
		}
		let closest = _this.attr('data-closest'); // Đây là khối mà sẽ ẩn sau khi xóa
		
		let listReply = _this.closest('.list-reply');
		let numReply = _this.closest('.cmt-content').find('.num-reply');
		
		swal({
			title: "Hãy chắc chắn rằng bạn muốn thực hiện thao tác này?",
			text: param.title,
			type: "warning",
			showCancelButton: true,
			confirmButtonColor: "#DD6B55",
			confirmButtonText: "Thực hiện!",
			cancelButtonText: "Hủy bỏ!",
			closeOnConfirm: false,
			closeOnCancel: false },
			function (isConfirm) {
				if (isConfirm) {
					let ajaxUrl = 'comment/ajax/comment/ajax_delete';
					$.ajax({
						method: "POST",
						url: ajaxUrl,
						data: {table: param.table, id: param.id},
						dataType: 'json',
						cache: false,
						success: function(json){
							if(json.error.flag == 1){
								sweet_error_alert('Có vấn đề xảy ra',json.error.message);
							}else{
								if(typeof closest != 'undefined'){
									let target = _this.closest(''+closest+'');
									target.hide('slow', function(){ 
										target.remove(); 
										numReply.text('('+listReply.children('li').length+')');
										numReply.attr('data-num' , listReply.children('li').length);
									});
								}else{
									let target = _this.closest('tr');
									target.hide('slow', function(){
										target.remove();
										numReply.text('('+listReply.children('li').length+')');
										numReply.attr('data-num' , listReply.children('li').length);
									});
								}
								swal("Xóa thành công!", "Hạng mục đã được xóa khỏi danh sách.", "success");
							}
						}
					});
				} else {
					swal("Hủy bỏ", "Thao tác bị hủy bỏ", "error");
				}
			});
	});
	
	//xem thêm cmt
	$(document).on('click' , '.loadmore-cmt .btn-loadmore' , function(){
		let _this = $(this);
		let limit =  _this.attr('data-limit');
		let start =  parseInt(_this.attr('data-start')) * parseInt(_this.attr('data-limit'));
		let param = {
			'module': _this.attr('data-module'),
			'detailid': _this.attr('data-detailid'),
			'start': start,
			'limit': limit,
		};
		
		let totalComment = _this.attr('data-total'); //tổng số cmt
		let htmlListComment = _this.closest('.block-comment').children('.list-comment');
		
		let ajaxUrl = "comment/ajax/comment/loadmore_comment";
		$.ajax({
			method: "POST",
			url: ajaxUrl,
			data: {param: param, module: param.module, detailid: param.detailid, start: param.start, limit: param.limit},
			dataType: "json",
			cache: false,
			success: function(json){
				//khi load thêm thì cập nhật lại data-start
				if(json.html.length){
					_this.attr('data-start' , parseInt(_this.attr('data-start')) + 1);
					_this.closest('.block-comment').children('.list-comment').append(json.html);
					time_ago();
					rating(start, '.rating.rt-cmt');
				}
				//ẩn nút xem thêm khi lấy hết cmt
				if(totalComment == htmlListComment.children('li').length){
					_this.parent().hide();
				}
				// console.log(htmlListComment.children('li').length);
			}
		});
		
		return false;
	});
	

});


function object_render(param = ''){
	let html = '';
	html+='<label class="control-lable text-left"><span>Chi tiết</span></label>';
	html+='<div class="form-row">';
		html+='<select class="selectMultipe" id="detailid" name="detailid"  data-json="'+param.json+'" data-title="Nhập ít nhất 2 ký tự để tìm kiếm" data-module="'+param.module+'">';
			html+='<option value="0">'+((param.module == 0)? param.text:'Chọn '+param.text+'')+'</option>';
		html+='</select>';
	html+='</div>';
	return html;
}


//hàm lấy dữ liệu trả về từ ajax
function get_list_object(object = ''){
	let ajaxUrl = 'comment/ajax/comment/view';
	$.get(ajaxUrl, {
		param: object, module: object.module, perpage: object.perpage, keyword: object.keyword, page: object.page},
		function(data){
			let json = JSON.parse(data);
			$('#display').html(json.display);
			$('#listComment').html(json.listComment);
			$('#pagination').html(json.paginationList);
			rating();
		}
	);
}

/*############################################ Tú's function JS ####################################*/
function time_ago(){
	if ($('.meta')){
		$("time.timeago").timeago();
	}
}


function thumb_render(src = '' , parentid = 0){
	let html = '';
		
		html += '<li>';
			html += '<div class="thumb">';
				html +='<a href="'+src+'" title="" data-gallery="#blueimp-gallery-'+parentid+'"><img src="'+src+'" class="img-md"></a>';
				html += '<input type = "hidden" class="album" value="'+src+'" name="album[]">';
				html += '<div class="overlay-img"></div>';
				html += '<div class="delete-img"><i class="fa fa-times-circle" aria-hidden="true"></i></div>';
			html += '</div>';
		html += '</li>'
		
	return html;
}

function openKCFinderThumb(button) {
	window.KCFinder = {
		callBackMultiple: function(files) {
			window.KCFinder = null; // reset kcfinder
			let numImage = $(button).closest('.box-reply').find('.lightBoxGallery img').length; // số lượng ảnh đã tồn tại ở lần upload trc
			// console.log(numImage);
			let $galleryBlock = $(button).closest('.box-reply').find('.gallery-block');
			let $lightBoxGallery = $(button).closest('.box-reply').find('.lightBoxGallery');
			let $parentid = $(button).closest('.cmt-content').find('.btn-reply').attr('data-id'); // lấy id của cmt đang đc tương tác
			
			$galleryBlock.show();
			$(button).parent().siblings('.btn-cmt').find('.btn-submit').removeAttr('disabled');
			for (var i = 0; i < files.length; i++){
				$lightBoxGallery.prepend(thumb_render(files[i] , $parentid));
			}
			let imgWidth = $('.lightBoxGallery img').outerWidth(true); // kích thước ảnh tính cả margin
			widthImg = imgWidth; // gán kích thước ảnh ra ngoài sau này còn dùng
			$lightBoxGallery.css('width' , imgWidth*(files.length + numImage));
		}
	};
	window.open(BASE_URL + 'plugin/kcfinder-3.12/browse.php?type=images&dir=images/public', 'kcfinder_image',
        'status=0, toolbar=0, location=0, menubar=0, directories=0, ' +
        'resizable=1, scrollbars=0, width=1080, height=800'
    );
}


// Hàm tính số sao đánh giá
	function rating(start = 0, selector = '.rating', inputForm = 'input.data-rate'){
		var input = $(inputForm);
		var ratings = $(selector);
		for (var i = start; i < ratings.length; i++) {
			var r = new SimpleStarRating(ratings[i]);
			ratings[i].addEventListener('rate', function(e) {
				var numStar = e.detail; // tính số sao
				input.val(numStar);
				get_title_rate(numStar);
			});
		}
	}

	function get_title_rate(numStar = 0){
		let ajaxUrl = 'comment/ajax/comment/get_title_rate';
		$.ajax({
			method: "POST",
			url: ajaxUrl,
			data: {numStar: numStar},
			dataType: 'json',
			success: function(json){
				$('.title-rating').text(json.htmlReview);
			}
		});
	}
	
	
	function get_comment_html(param = ''){
		let comment = '';

		comment += '<div class="box-comment box-reply loading" style="margin-top: 10px;">';
			comment += '<div class="bg-loading"></div>';
			comment += '<form action="" class="form uk-form uk-clearfix">';
				comment += '<textarea name="text-reply" class="form-control text-reply " placeholder="Bạn hãy nhập ít nhất 1 ký tự để bình luận" autocomplete="off"></textarea>';
				comment += '<div class="gallery-block mt10" style="display: none;">';
					comment += '<ul class="uk-list uk-flex uk-flex-middle clearfix lightBoxGallery">';
						// list ảnh sẽ đc đổ ở đây
					comment += '</ul>';
				comment += '</div>';
				comment += '<div class="uk-flex uk-flex-middle uk-flex-space-between mt5">';
					comment += '<div class="upload">';
						comment += '<i class="fa fa-camera"></i> ';
						comment += '<a onclick="openKCFinderThumb(this);return false;" href="" title="" class="upload-picture">Chọn hình</a>';
					comment += '</div>';
					comment += '<div class="btn-cmt sent-cmt"><button type="submit" name="sent_comment" value="sent_comment" class="btn btn-success btn-submit" data-parentid = '+param.id+' data-module = '+param.module+' data-detailid = '+param.detailid+' >Gửi</button></div>';
				comment += '</div>';
			comment += '</form>';
		comment += '</div>';

	  return comment;
	}
	
	function get_edit_comment_html(param = ''){
		let comment = '';
		comment += '<div class="comment">';
			comment += '<div class="uk-flex uk-flex-middle uk-flex-space-between">';
				comment += '<div class="cmt-profile">';
					comment += '<div class="uk-flex uk-flex-middle">';
						comment += '<div class="_cmt-avatar"><img src="template/avatar.png" alt="" class="img-sm"></div>';
						comment += '<div class="_cmt-name">'+param.fullname+'</div>';
						comment += '<i>QTV</i>';
					comment += '</div>';
				comment += '</div>';
				comment += '<div class="uk-flex uk-flex-middle toolbox-cmt">';
					comment += '<div class="cancel-cmt"><a type="button" title="" class="btn-cancel" data-info="'+param.dataInfo+'" data-id="'+param.id+'" data-table="comment" data-closest="li" style="color: #e74c3c;">Hủy bỏ</a></div>';
				comment += '</div>';
			comment += '</div>';
			comment += '<div class="box-comment box-reply loading" style="margin-top: 10px; margin-left: 42px;">';
				comment += '<div class="bg-loading"></div>';
				comment += '<form action="" class="form uk-form uk-clearfix">';
					comment += '<textarea name="text-reply" class="form-control text-reply " placeholder="Bạn hãy nhập ít nhất 1 ký tự để bình luận" autocomplete="off">'+param.comment+'</textarea>';
					comment += '<div class="gallery-block mt10" style="'+((param.image.length > 0) ? '':"display: none")+'">';
						comment += '<ul class="uk-list uk-flex uk-flex-middle clearfix lightBoxGallery">';
							// list ảnh sẽ đc đổ ở đây
							if(param.image.length > 0){
								for(let i = 0; i < param.image.length ; i++){
									comment += thumb_render(param.image[i] , param.parentid);
								}
							}
						comment += '</ul>';
					comment += '</div>';
					comment += '<div class="uk-flex uk-flex-middle uk-flex-space-between mt5">';
						comment += '<div class="upload">';
							comment += '<i class="fa fa-camera"></i> ';
							comment += '<a onclick="openKCFinderThumb(this);return false;" href="" title="" class="upload-picture">Chọn hình</a>';
						comment += '</div>';
						comment += '<div class="btn-cmt update-cmt"><button type="submit" name="update_comment" value="update_comment" class="btn btn-success btn-submit" data-id='+param.id+' data-table = '+param.table+'>Cập nhật</button></div>';
					comment += '</div>';
				comment += '</form>';
			comment += '</div>';
		comment += '</div>';
		

	  return comment;
	}

	function get_prev_html(param = ''){
		$html = '';
			$html += '<div class="comment">';
				$html += '<div class="uk-flex uk-flex-middle uk-flex-space-between">';
					$html += '<div class="cmt-profile">';
						$html += '<div class="uk-flex uk-flex-middle">';
							$html += '<div class="_cmt-avatar"><img src="template/avatar.png" alt="" class="img-sm"></div>';
							$html += '<div class="_cmt-name">'+param.fullname+'</div>';
							$html += '<i>QTV</i>';
						$html += '</div>';
					$html += '</div>';
					$html += '<div class="uk-flex uk-flex-middle">';
						$html += '<div class="edit-cmt"><a type = "button" title="" class="btn-edit" data-info="'+param.dataInfo+'" data-id="'+param.id+'" data-table="comment">Sửa</a></div>';
						$html += '<div class="delete-cmt"><a type="button" title="" class="btn-delete ajax-delete" data-title="Lưu ý: Dữ liệu sẽ không thể khôi phục. Hãy chắc chắn rằng bạn muốn thực hiện hành động này!" data-id = "'+param.id+'" data-table = "comment" data-closest="li" style="color: #e74c3c;">Xóa</a></div>';
					$html += '</div>';
				$html += '</div>';
				$html += '<div class="cmt-content">';
					$html += '<p>'+param.comment+'</p>';
					$html += '<div class="gallery-block mb10" style="'+((param.image.length > 0) ? '':"display: none")+'">';
						$html += '<ul class="uk-list uk-flex uk-flex-middle clearfix lightBoxGallery">';
							// list ảnh sẽ đc đổ ở đây
							if(param.image.length > 0){
								for(let i = 0; i < param.image.length ; i++){
									$html += '<li>';
										$html += '<div class="thumb">';
											$html +='<a href="'+param.image[i]+'" title="" data-gallery="#blueimp-gallery-'+param.parentid+'-'+param.id+'"><img src="'+param.image[i]+'" class="img-md"></a>';
											$html += '<input type = "hidden" class="album" value="'+param.image[i]+'" name="album[]">';
										$html += '</div>';
									$html += '</li>'
								}
							}
						$html += '</ul>';
					$html += '</div>';
					$html += '<i class="fa fa-clock-o"></i> <time class="timeago meta" datetime="'+((param.updated> param.created)? param.updated : param.created)+'"></time>';
				$html += '</div>';
			$html += '</div>';
		
		return $html;
	}
	
/*########################################## end Tú's function JS ####################################*/
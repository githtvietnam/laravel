$(document).ready(function() {

   	$('.js_upload_now').on('submit',(function(e) {
   		console.log(1);
   		e.preventDefault();
   		
	}));
   	$(document).on('click','.nd_accordion tr .extend',function(){
		let _this = $(this);
		let level = _this.parents('tr').attr('data-level');
		let extend = _this.attr('data-extend');
		
		let index = _this.parents('tr').index();
		level = sum(level,1);
		let next_level = _this.parents('.nd_accordion').find('tr:eq('+sum(index,1)+')').attr('data-level');
		if(next_level == level){
			let index1 = 0;
			$('.nd_accordion tr').each(function() {
				if(index < $(this).index()){
					let lever_next = $(this).attr('data-level');
					if(level <= lever_next){
						index1 =1;
						if(extend == 'plus'){
							_this.attr('data-extend','minus');
							_this.html('<i class="fa fa-minus" aria-hidden="true"></i>');
							if($(this).hasClass('hidden')){
								$(this).removeClass('hidden');
							}
						}
						if(extend == 'minus'){
							_this.attr('data-extend','plus');
							_this.html('<i class="fa fa-plus" aria-hidden="true"></i>');
							if($(this).hasClass('hidden') == false){
								$(this).addClass('hidden');
							}
						}
					}
					if(level > lever_next && index1 == 1){
						return false;
					}
				}
				
			});
		}
	});

	$('input[name="title"]').focus();
	// cập nhật trạng thái hoạt động ở trang view
	$(document).on('click','.change_status',function(){
		let _this = $(this);
		let module = _this.attr('data-module');
		let field = _this.attr('data-field');
		let id = _this.attr('data-id');
		let ajaxURL = 'dashboard/ajax/dashboard/ajax_update_status_by_field';
		$.post(ajaxURL, {
			module: module, field : field, id: id},
			function(data){
				
			});
	});
	/* SELECT 2 */
	$('.select3NotSearch').select2({
	    minimumResultsForSearch: -1
	});
	$('.select3').select2();

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
						console.log(json)
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

	/* UPLOAD ẢNH */
	$(document).on('click', '.img-thumbnail', function(){
		openKCFinderAlbum($(this));
	});

	
	
	$(document).on('click','.edit-seo', function(){
		$('.seo-group').toggleClass('hidden');
		return false;
	});
	
	
	$(document).on('click', '.setting-button', function(){
		let _this = $(this);
		let flag = _this.attr('data-flag');
		let title = _this.attr('data-title');
		if(title==''){
			title = 'Thiết lập ngày/giờ hiển thị';
		}
		if(flag == 0){
			_this.text('Xóa thiết lập');
			_this.attr('data-flag', 1);
		}else if(flag == 1){
			_this.text(title);
			_this.attr('data-flag', 0);
		}
		$('.setting-group').toggleClass('hidden');
		return false;
	});
	
	$(document).on('keyup', '.title', function(){
		let _this = $(this);
		let metaTitle = _this.val();
		let totalCharacter = metaTitle.length;
		if(totalCharacter > 70){
			$('.meta-title').addClass('input-error');
		}else{
			$('.meta-title').removeClass('input-error');
		}
		let slugTitle = slug(metaTitle);
		if($('.meta-title').val() == ''){
			$('.g-title').text(metaTitle);
		}
		let canonical = $('.canonical');
		if(canonical.attr('data-flag') == 0){
			canonical.val(slugTitle);
			$('.g-link').text(BASE_URL + slugTitle + '.html');
		}
	});
	
	$(document).on('keyup','.canonical', function(){
		let _this = $(this);
		_this.attr('data-flag', '1');
		let slugTitle = slug(_this.val());
		$('.g-link').text(BASE_URL + slugTitle + '.html');
	});
	
	$(document).on('keyup change','.meta-title', function(){
		let _this = $(this);
		let totalCharacter = _this.val().length;
		$('#titleCount').text(totalCharacter);
		if(totalCharacter > 70){
			_this.addClass('input-error');
		}else{
			_this.removeClass('input-error');
		}
		$('.g-title').text(_this.val());
	});
	
	

	
	$(document).on('keyup change','.meta-description', function(){
		let _this = $(this);
		let totalCharacter = _this.val().length;
		$('#descriptionCount').text(totalCharacter);
		if(totalCharacter > 320){
			_this.addClass('input-error');
		}else{
			_this.removeClass('input-error');
		}
		$('.g-description').text(_this.val());
	});
	
	
	$(document).on('change','#city',function(e, data){
		let _this = $(this);
		let param = {
			'parentid' : _this.val(),
			'select' : 'districtid',
			'table'  : 'vn_district',
			'trigger_district': (typeof(data) != 'undefined') ? true : false,
			'text'   : 'Chọn Quận/Huyện',
			'parentField'  : 'provinceid',
		}
		
		getLocation(param, '#district');
	});

	if(typeof(cityid) != 'undefined' && cityid != ''){
		$('#city').val(cityid).trigger('change', [{'trigger':true}]);
	}
	$(document).on('change','#district', function(e, data){
		let _this = $(this);
		let param = {
			'parentid' : _this.val(),
			'select' : 'wardid',
			'trigger_ward': (typeof(data) != 'undefined') ? true : false,
			'table'  : 'vn_ward',
			'text'   : 'Chọn Phường/Xã',
			'parentField'   : 'districtid',
		}
		getLocation(param, '#ward');
	});
	
	
	
	
	/* XÓA RECORD */
	$(document).on('click','.ajax-delete',function(){
		let _this = $(this);
		let param = {
			'title' : _this.attr('data-title'),
			'name'  : _this.attr('data-name'),
			'module': _this.attr('data-module'),
			'id'    : _this.attr('data-id'),
			'router' : _this.attr('data-router'),
			'child'  : _this.attr('data-child')
		}
		let parent = _this.attr('data-parent'); // Đây là khối mà sẽ ẩn sau khi xóa
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
					let ajax_url = 'dashboard/ajax/dashboard/ajax_delete';
						$.post(ajax_url, {
							module: param.module, id: param.id, router: param.router, child: param.child},
							function(data){
								if(data == 0){
									sweet_error_alert('Có vấn đề xảy ra','Vui lòng thử lại')
								}else{
									if(typeof parent != 'undefined'){
										_this.parents('.'+parent+'').hide().remove();
									}else{
										_this.parent().parent().hide().remove();
									}
									
									swal("Xóa thành công!", "Hạng mục đã được xóa khỏi danh sách.", "success");
								}
							});

				} else {
					swal("Hủy bỏ", "Thao tác bị hủy bỏ", "error");
				}
			});
	});
	
	/* XÓA RECORD */
	$(document).on('click','.ajax-delete-all',function(){
		let _this = $(this);
		
		let id_checked = []; // Lấy id bản ghi
		$('.checkbox-item:checked').each(function() {
		   id_checked.push($(this).val());
		});
		
		if(id_checked.length <= 0){
			sweet_error_alert('Có vấn đề xảy ra','Bạn phải chọn ít nhất 1 bản ghi để thực hiện chức năng này');
			return false;
		}
		
		
		
		let param = {
			'title' : _this.attr('data-title'),
			'module': _this.attr('data-module'),
			'router' : _this.attr('data-router'),
			'child'  : _this.attr('data-child'),
			'list'	: id_checked,
		}
		let parent = _this.attr('data-parent'); // Đây là khối mà sẽ ẩn sau khi xóa
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
					let ajax_url = 'dashboard/ajax/dashboard/ajax_delete_all';
						$.post(ajax_url, {
							post: param},
							function(data){
								if(data == 0){
									sweet_error_alert('Có vấn đề xảy ra','Vui lòng thử lại')
								}else{
									for(let i = 0; i < id_checked.length; i++){
										$('#post-'+id_checked[i]).hide().remove()				
									}
									swal("Xóa thành công!", "Các bản ghi đã được xóa khỏi danh sách.", "success");
								}
							});

				} else {
					swal("Hủy bỏ", "Thao tác bị hủy bỏ", "error");
				}
			});
	});
	
	
	
	$(document).on('click','.label-checkboxitem',function(){
		let _this = $(this);
		_this.parent().find('.checkbox-item').trigger('click');
		check(_this);
		change_background(_this);
		check_item_all(_this);
		check_setting();
	});

	$(document).on('click','.labelCheckAll',function(){
		let _this = $(this);
		_this.siblings('input').trigger('click');
		check(_this);
		checkall(_this);
		change_background();
		check_setting();
	});
	
	
	$(document).on('change', '.sort-order', function(){
		let _this = $(this);
		let param = {
			'module' : _this.attr('data-module'),
			'id'	 : _this.attr('data-id'),
			'order'  : _this.val(),
		};
		let ajax_url = 'dashboard/ajax/dashboard/sort_order';
			$.post(ajax_url, {
				param: param},
				function(data){
					console.log(data);
				});
		
		return false;
	});
	


	$(document).on('keyup', '.tag-title', function(){
		let _this = $(this);
		let slugTitle = slug(_this.val());
		$('.tag-link').val(slugTitle);
		
	});
	
	$(document).on('submit' , '#create-tag' , function(event){
		let _this = $(this);
		let formURL = 'tag/ajax/tag/create';
		$.post(formURL,{title: $('.tag-title').val(), canonical: $('.tag-link').val()},function(data){
			json = JSON.parse(data);
			if (json.flag == false){
				$('.alert-danger').show();
				$('.alert-danger').html(json.message);
			}else{
				$('.alert-danger').hide();
				document.getElementById("create-tag").reset();
				swal("Thêm từ khóa thành công!","Ấn OK để tiếp tục", "success");
			}
		});
		event.preventDefault();
	});
	
	$('.datetimepicker').datepicker({
		todayBtn: "linked",
		keyboardNavigation: false,
		forceParse: false,
		calendarWeeks: true,
		autoclose: true,
		dateFormat: "dd/mm/yy"
	});
	// $('.multiDatesPicker').multiDatesPicker({
	// 	dateFormat: "dd-mm-yy",
	// });
	$('#data_5 .input-daterange').datepicker({
        keyboardNavigation: false,
        forceParse: false,
        autoclose: true
    });
    	
	$('#input-clock').clockpicker({
		autoclose: true
	});
	$('.input-clock').clockpicker({
		autoclose: true
	});
	
	
	
	
	$('.ckeditor-description').each(function(){
		CKEDITOR.replace( this.id, {
			height: 250,
			extraPlugins: 'colorbutton,panelbutton,pastefromexcel,font,format,youtube,link',
			removeButtons: '',
			entities: true,
			allowedContent: true,
			
		});
	});
	$('.ckeditor-content').each(function(){
		CKEDITOR.replace( this.id, {
			height: 250,
			extraPlugins: 'colorbutton,panelbutton,pastefromexcel,font,format,youtube',
			removeButtons: '',
			entities: true,
			allowedContent: true,
			toolbarGroups: [
				{ name: 'clipboard',   groups: [ 'clipboard', 'undo' ] },
				{ name: 'editing',     groups: [ 'find', 'selection', 'spellchecker' ] },
				{ name: 'links' },
				{ name: 'insert' },
				{ name: 'forms' },
				{ name: 'tools' },
				{ name: 'document',	   groups: [ 'mode', 'document', 'doctools' ] },
				{ name: 'colors' },
				{ name: 'others' },
				'/',
				{ name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] },
				{ name: 'paragraph',   groups: [ 'list', 'indent', 'blocks', 'align', 'bidi' ] },
				{ name: 'styles' }
			],
		});
	});
	// -----------------------kiểm tra INPUT TRONG TABLE_PRODUCT-----------------------
	// nếu input là 0 thì khi click vào sẽ rỗng
	$(document).on('click','.float, .int',function(){
		let data = $(this).val();
		if(data == 0){
			$(this).val('');
		}
	});
	$(document).on('keydown','.float, .int',function(e){
		let data = $(this).val();
		if(data == 0){
			let unicode=e.keyCode || e.which;
			if(unicode != 190){
				$(this).val('');
			}
		}
	});
	//khi thay đổi hoặc ấn phím xong : nếu  =='' sẽ trở về không, nếu == NaN cũng về 0
	$(document).on('change keyup blur','.int',function(){
		let data = $(this).val();
		if(data == '' ){
			$(this).val('0');
			return false;
		}
		data = data.replace(/\./gi, "");
		$(this).val(addCommas(data));
		// khi đánh chữ thì về 0
		data = data.replace(/\./gi, "");
		if(isNaN(data)){
			$(this).val('0');
			return false;
		}
	});
	$(document).on('change blur','.float',function(){
		let data = $(this).val();
		if(data == '' ){
			$(this).val('0');
			return false;
		}
		// khi đánh chữ thì về 0
		data = data.replace(/\./gi, "");
		if(isNaN(data)){
			$(this).val('0');
			return false;
		}
	});
	
});


function addCommas(nStr){
	nStr = String(nStr);
	nStr = nStr.replace(/\./gi, "");
	let str ='';
	for (i = nStr.length; i > 0; i -= 3){
		a = ( (i-3) < 0 ) ? 0 : (i-3); 
		str= nStr.slice(a,i) + '.' + str; 
	}
	str= str.slice(0,str.length-1); 
	return str;
}

/* CHECKBOX */
function check(object){
	if(object.hasClass('checked')){
		object.removeClass('checked');
	}else{
		object.addClass('checked');
	}
}

function check_setting(){
	if($('.checkbox-item').length) {
		if($('.checkbox-item:checked').length > 0) {
			$('.fa-cog').addClass('text-pink');
		}
		else{
			$('.fa-cog').removeClass('text-pink');
		}
	}
}

function check_item_all(_this){
	let table = _this.parents('table');
	if(table.find('.checkbox-item').length) {
		if(table.find('.checkbox-item:checked').length == table.find('.checkbox-item').length) {
			table.find('#checkbox-all').prop('checked', true);
			table.find('.labelCheckAll').addClass('checked');
		}
		else{
			table.find('#checkbox-all').prop('checked', false);
			table.find('.labelCheckAll').removeClass('checked');
		}
	}
}

function checkall(_this){
	let table = _this.parents('table');
	if($('#checkbox-all').length){
		if(table.find('#checkbox-all').prop('checked')){
			table.find('.checkbox-item').prop('checked', true);
			table.find('.label-checkboxitem').addClass('checked');
			
		}
		else{
			table.find('.checkbox-item').prop('checked', false);
			table.find('.label-checkboxitem').removeClass('checked');
		}
	}
	check_setting();
}


function change_background() {
	$('.checkbox-item').each(function() {
		if($(this).is(':checked')) {
			$(this).parents('tr').addClass('bg-active');
		}else {
			$(this).parents('tr').removeClass('bg-active');
		}
	});
}

function getLocation(param, object){
	if(districtid == '' || param.trigger_district == false) districtid = 0;
	if(wardid == ''  || param.trigger_ward == false) wardid = 0;
	
	let formURL = 'dashboard/ajax/dashboard/getLocation';
	$.post(formURL, {
		parentid: param.parentid, select: param.select, table: param.table, text: param.text, parentField: param.parentField},
		function(data){
			let json = JSON.parse(data);
			if(param.select == 'districtid'){
				if(param.trigger_district == true){
					$(object).html(json.html).val(districtid).trigger('change', [{'trigger':true}]);
				}else{
					$(object).html(json.html).val(districtid).trigger('change');
				}
			}else if(param.select == 'wardid'){
				$(object).html(json.html).val(wardid);
			}
		});
}




function sweet_error_alert(title, message){
	swal({
		title: title,
		text: message
	});
}

function slug(title){
	title = cnvVi(title);
	return title;
}


function cnvVi(str) {
	str = str.toLowerCase();
	str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
	str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
	str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
	str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
	str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
	str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
	str = str.replace(/đ/g, "d");
	str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'| |\"|\&|\#|\[|\]|~|$|_/g, "-");
	str = str.replace(/-+-/g, "-");
	str = str.replace(/^\-+|\-+$/g, "");
	return str;
}
function replace(Str=''){
	if(Str==''){
		return '';
	}else{
		Str = Str.replace(/\./gi, "");
		return Str;
	}
}

/* UPLOAD ẢNH KC FINDER */
function openKCFinder(field, type) {
	
	
	
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
function openKCFinderAlbum(field, type, result) {
    window.KCFinder = {
        callBack: function(url) {
            field.attr('src', url);
            field.parent().next().val(url);
            window.KCFinder = null;
        }
    };
	if(typeof(type) == 'undefined'){
		type = 'images';
	}
    window.open(BASE_URL + 'plugin/kcfinder-3.12/browse.php?type='+type+'&dir=images/public', 'kcfinder_image',
        'status=0, toolbar=0, location=0, menubar=0, directories=0, ' +
        'resizable=1, scrollbars=0, width=1080, height=800'
    );
	return false;
}


function pre_select2(module, value, select='title', condition='', key = 'id'){
	module = module.replace('"', '');
	module = module.replace('"', '');
	var studentSelect = $('#'+module);
	$.post('dashboard/ajax/dashboard/pre_select2', {
		value: value, module:module,select:select, key:key},
		function(data){
			let json = JSON.parse(data);
			if(json.items!='undefined' && json.items.length){
				for(let i = 0; i< json.items.length; i++){
					var option = new Option(json.items[i].text, json.items[i].id, true, true);
					studentSelect.append(option).trigger('change');
					// studentSelect.append(option); như này cũng được
				}
			}
		});
}
function pre_selectMultipe(object, value, select="title"){
	let module = object.attr('data-module');
	let key = object.attr('data-key');
	var studentSelect = object;
	$.post('dashboard/ajax/dashboard/pre_select2', {
		value: value, module:module,select:select, key:key},
		function(data){
			let json = JSON.parse(data);
			if(json.items!='undefined' && json.items.length){
				for(let i = 0; i< json.items.length; i++){
					var option = new Option(json.items[i].text, json.items[i].id, true, true);
					studentSelect.append(option).trigger('change');
					// studentSelect.append(option); như này cũng được
				}
			}
		});
}

 
function selectMultipe(object, select="title"){
	let condition =  object.attr('data-condition');
	let title = object.attr('data-title');
	let module = object.attr('data-module');
	let key = object.attr('data-key');
	object.select2({
		minimumInputLength: 2,
		placeholder: title,
			ajax: {
				url: 'dashboard/ajax/dashboard/get_select2',
				type: 'POST',
				dataType: 'json',
				deley: 250,
				data: function (params) {
					return {
						locationVal: params.term,
						module:module,key:key, select:select, condition:condition,
					};
				},
				processResults: function (data) {
					// console.log(data);
					return {
						results: $.map(data, function(obj, i){
							// console.log(obj);
							return obj
						})
					}
					
				},
				cache: true,
			}
	});
}
 


function select2(object, select="title",condition =''){
	let title = object.attr('data-title');
	let module = object.attr('id');
	object.select2({
		minimumInputLength: 2,
		placeholder: title,
			ajax: {
				url: 'dashboard/ajax/dashboard/get_select2',
				type: 'POST',
				dataType: 'json',
				deley: 250,
				data: function (params) {
					return {
						locationVal: params.term,
						module:module, select:select, condition:condition,
					};
				},
				processResults: function (data) {console.log(data);
					return {
						results: $.map(data, function(obj, i){
							return obj
						})
					}
					
				},
				cache: true,
			}
	});
}

function openKCFinderDescExtend(object) {
	window.KCFinder = {
		callBackMultiple: function(files) {
			window.KCFinder = null;
			for (var i = 0; i < files.length; i++){
				console.log(object);
				CKEDITOR.instances[object].insertHtml('<p><img src="'+files[i]+'" alt="'+files[i]+'"></p>');
				// textarea.value += files[i] + "\n";
			}
		}
	};
	 window.open(BASE_URL + 'plugin/kcfinder-3.12/browse.php?type=images&dir=images/public', 'kcfinder_image',
        'status=0, toolbar=0, location=0, menubar=0, directories=0, ' +
        'resizable=1, scrollbars=0, width=1080, height=800'
    );
}



function openKCFinderMulti(button) {
	window.KCFinder = {
		callBackMultiple: function(files) {
			window.KCFinder = null;
			for (var i = 0; i < files.length; i++){
				CKEDITOR.instances['ckDescription'].insertHtml('<p><img src="'+files[i]+'" alt="'+files[i]+'"></p>');
				// textarea.value += files[i] + "\n";
			}
		}
	};
	 window.open(BASE_URL + 'plugin/kcfinder-3.12/browse.php?type=images&dir=images/public', 'kcfinder_image',
        'status=0, toolbar=0, location=0, menubar=0, directories=0, ' +
        'resizable=1, scrollbars=0, width=1080, height=800'
    );
}

function openKCFinderSlide(button) {
	window.KCFinder = {
		callBackMultiple: function(files) {
			window.KCFinder = null;
			for (var i = 0; i < files.length; i++){
				$('.upload-list').show();
				$('.upload-list .row').prepend(slide_render(files[i]));
				$('.click-to-upload ').hide();
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
function openKCFinderImage(button) {
	window.KCFinder = {
		callBackMultiple: function(files) {
			window.KCFinder = null;
			for (var i = 0; i < files.length; i++){
				$('.upload-list .row #sortable').prepend(image_render(files[i]));
				$('.click-to-upload ').hide();
				$('.upload-list').removeClass('hidden');
				$('.upload-list').show();
			}
		}
	};
	window.open(BASE_URL + 'plugin/kcfinder-3.12/browse.php?type=images&dir=images/public', 'kcfinder_image',
        'status=0, toolbar=0, location=0, menubar=0, directories=0, ' +
        'resizable=1, scrollbars=0, width=1080, height=800'
    );
}
function cutnchar(str,n){
	length = str.length;
	if(length < n){
		return str;
	}
	str = str.substr(0,n)+'...';
	return str;
}
function sum(a = 0 ,b = 0){
	return parseFloat(a) + parseFloat(b);
}
function sub(a = 0 ,b = 0){
	return parseFloat(a) - parseFloat(b);
}
function div(a = 0 ,b = 0){
	return parseFloat(a) / parseFloat(b);
}
function mul(a = 0 ,b = 0, c = 1){
	return parseFloat(a) * parseFloat(b) * parseFloat(c);
}
// gettime trong js
function getTime(date, type='d-m-Y', result='Y/m/d'){
	// kieems tra xem co date truyển vào không
	if(date == '' || date == null){
		return false;
	}
	if(date.indexOf(' ') != -1){
		date = date.substr(0, 10)
	}
	// date = date.replace(' 00:00:00','');
	//chuyển ngày tháng nhập vào thành mảng
	if(date.indexOf('-') != -1){
		date1 = date.split('-');
	}
	if(date.indexOf('/') != -1){
		date1 = date.split('/');
	}
	// chuyển kiểu ngày tháng ban đầu thành mảng
	if(type.indexOf('-') != -1){
		type1 = type.split('-');
	}
	if(type.indexOf('/') != -1){
		type1 = type.split('/');
	}
	// chuyển ngày tháng muốn trả về thành mảng
	if(result.indexOf('-') != -1){
		result1 = result.split('-');
		// lấy kí tự phân cách giữa ngày tháng năm( chỉ có 2 TH là  - vs /)
		a ='-';
	}
	if(result.indexOf('/') != -1){
		result1 = result.split('/');
		a ='/';
	}
	//lặp mảng kiểu kết quả trả về
		// console.log(date1);
		// console.log(type1);
		// console.log(result1);
	for (i = 0; i < result1.length; i++){
		//lặp kiểu kết quả nhập vào ban đầu
		for (j = 0; j < type1.length; j++){
			// nếu kết quả ban đầu bằng với kết quả trả về thì ta
			// gắn ngày tháng nhập vào tương ứng vào mảng trả về
			if(type1[j] == result1[i]){
				result1[i] = date1[j]
			}
		}
	}
	//nối mảng trả về thành cuối cách nhau mảng kí tự phân cách

	// console.log(result1[0] + a + result1[1] + a + result1[2]);
	return result1[0] + a + result1[1] + a + result1[2] ;
}
function readerCode(length = 6) {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

  for (var i = 0; i < length; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}
function csl(str= 1) {
  return console.log();
}
function openKCFinderNdImage(button) {
	let _this = $(this);
	window.KCFinder = {
		callBackMultiple: function(files) {
			window.KCFinder = null;
			for (var i = 0; i < files.length; i++){
				$('.local_result').val(files[i]);
				$('.js_img_result').attr("src",files[i]);
				$('.js_input_result').val(files[i]);
			}
		}
	};
	window.open(BASE_URL + 'plugin/kcfinder-3.12/browse.php?type=images&dir=images/public', 'kcfinder_image',
        'status=0, toolbar=0, location=0, menubar=0, directories=0, ' +
        'resizable=1, scrollbars=0, width=1080, height=800'
    );
}
$(function(){
	$('.ck-editor').each(function(){
		//colorbutton,
		CKEDITOR.replace( this.id, {
			height: 400,
			extraPlugins: 'colorbutton, panelbutton, link, justify, lineheight, youtube, videodetector, image, imageresize, font, codemirror, copyformatting, autosave, find, qrc, slideshow, preview, hkemoji, contents, googledocs, codesnippet',
			removeButtons: '',
			entities: false,
			entities_latin : false,
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
		}).on('change',
			function(e){
				if(e.editor.name == 'ckDescription'){
					var metaDescription = document.getElementById('seoDescription').value;
					if(metaDescription == ''){
						let data = decodeEntities(e.editor.getData());
						var parser = new DOMParser;
						var dom = parser.parseFromString(
							'<!doctype html><body>' + data,
							'text/html');
						var decodedString = dom.body.textContent;
						document.getElementById('metaDescription').innerHTML = decodedString.slice(0, 320);
					}
				}
			}
		);;
	});
});

function decodeEntities(encodedString) {
    var translate_re = /&(nbsp|amp|quot|lt|gt);/g;
    var translate = {
        "nbsp":" ",
        "amp" : "&",
        "quot": "\"",
        "lt"  : "<",
        "gt"  : ">"
    };
    return encodedString.replace(translate_re, function(match, entity) {
        return translate[entity];
    }).replace(/&#(\d+);/gi, function(match, numStr) {
        var num = parseInt(numStr, 10);
        return String.fromCharCode(num);
    });
}
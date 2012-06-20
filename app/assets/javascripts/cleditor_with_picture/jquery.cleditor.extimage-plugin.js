/**
 @preserve CLEditor Image Upload Plugin v1.0.0
 http://premiumsoftware.net/cleditor
 requires CLEditor v1.3.0 or later
 
 Copyright 2011, Dmitry Dedukhin
 Plugin let you either to upload image or to specify image url.
 https://github.com/dmitry-dedukhin/cleditor-extimage-plugin

 이미지 업로드 후 처리 방식 수정함 - bayja
*/

(function($) {
	var hidden_frame_name = '__upload_iframe';
	// Define the image button by replacing the standard one
	$.cleditor.buttons.image = {
		name: 'image',
		title: 'Insert/Upload Image',
		command: 'insertimage',
		popupName: 'image',
		popupClass: 'cleditorPrompt',
		stripIndex: $.cleditor.buttons.image.stripIndex,
		popupContent:
			'<iframe style="width:0;height:0;border:0;" name="' + hidden_frame_name + '" />' +
			'<table cellpadding="0" cellspacing="0">' +
			'<tr><td>파일선택:</td></tr>' +
			'<tr><td> ' +
			'<form method="post" enctype="multipart/form-data" action="" target="' + hidden_frame_name + '">' +
      '<input class="cleditor_authenticity_token_field" name="authenticity_token" type="hidden" />' +
			'<input id="imageName" name="imageName" type="file" /></form> </td></tr>' +
			'<tr><td>또는 URL 입력:</td></tr>' +
			'<tr><td><input type="text" size="40" value="" /></td></tr>' +
			'</table><input type="button" value="이미지 등록">',
		buttonClick: imageButtonClick,
		uploadUrl: '/cleditor_with_picture/editor_pictures' // default url
	};

	function closePopup(editor) {
		editor.hidePopups();
		editor.focus();
	}

	function imageButtonClick(e, data) {
		var editor = data.editor,
			$text = $(data.popup).find(':text'),
			url = $.trim($text.val()),
			$iframe = $(data.popup).find('iframe'),
			$file = $(data.popup).find(':file');
			
    $(".cleditor_authenticity_token_field").val( $('meta[name=csrf-token]').attr('content') );

		// clear previously selected file and url
		$file.val('');
		$text.val('').focus();

		$(data.popup)
			.children(":button")
			.off("click")
			.on("click", function(e) {
				if($file.val()) { // proceed if any file was selected
					$iframe.on('load', function() {
						var response;
						var file_url;
						var picture_id;
						var $text_area = data.editor.$area;
						var $parent_form = $text_area.closest("form");
						var param_name = $text_area.attr("name").split('[')[0];

						try {
              file_url = $iframe.get(0).contentWindow.document.getElementById('picture_url').innerHTML;
              picture_id = $iframe.get(0).contentWindow.document.getElementById('picture_id').innerHTML;
						} catch(e) {};
						if(file_url) {
							editor.$frame[0].contentWindow.focus(); // for ie execComment "inserimage" bug //http://social.msdn.microsoft.com/Forums/en/iewebdevelopment/thread/1b8bfc9d-0746-4bc4-b7ca-9ebe3132877b
							editor.execCommand(data.command, file_url, null, data.button);
							$parent_form.append("<input type='hidden' value='"+ picture_id +"' name='"+ param_name +"[child_picture_ids][]'>")
						} else {
							alert('이미지 업로드 중 오류가 발행했습니다.');
						}
						$iframe.off('load');
						closePopup(editor);
					});
					$(data.popup).find('form').attr('action', $.cleditor.buttons.image.uploadUrl).submit();
				} else if (url != '') {
					editor.execCommand(data.command, url, null, data.button);
					closePopup(editor);
				}
			});
	}
})(jQuery);

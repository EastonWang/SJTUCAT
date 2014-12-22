function fetch_feed() {
	chrome.extension.sendRequest({'action' : 'fetch_feed', 'url' : 'http://www.jwc.sjtu.edu.cn/rss/rss_notice.aspx?SubjectID=198015&TemplateID=221009'}, 
    function(response) {
		//console.log(response);
		display_stories(response);
    }
  );
}

function display_stories(feed_data){
	//console.log("Now in display");
	var xml_doc = $.parseXML(feed_data);
	$xml = $(xml_doc);
	$('#popup').html('<div align="right"><a href="http://www.github.com/eastonwang/SJTUCAT" id="homepage">Join us!</a></div>');
	$('#homepage')[0].addEventListener('click', function() {
		open_item('http://www.github.com/eastonwang/SJTUCAT');
		window.close()} )
	console.log(xml_doc);
	var items = $xml.find("item");
	items = items.slice(0,20);
	//console.log(items);
	items.each(function(index, element) {
		var post = parse_post(element);
		var item = '';
		var class2 = '';
		if (index >= localStorage['unread_count']) {
			// // =console.log('visited');
			item += '<div class="post read">';
		}else {
			item += '<div class="post">'
		}
		item += '<span class="tag">' + post.date + '</span>\
			  <a href="' + post.url + '">\
				<div id="' + post.id + '" class="item">\
				  <h4>' + post.title + '</h4>\
				</div>\
			  </a>';
		item += '</div>';
		$('#popup').append(item);
		// TODO why isn't jQuery's .on defined?
		var $item = $('div[id="' + post.id + '"]')
		//console.log('$item', $item)
		$item[0].addEventListener('click', function(){open_item(post.url)})
	});
}

$(document).ready(function() {
  fetch_feed();
});

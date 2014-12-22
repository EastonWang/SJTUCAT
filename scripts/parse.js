function parse_post(element) {
	//console.log('element', element);
	var $element = $(element);
	var post = new Object();
	post.title = $element.find("title").text();
	//post.categories = [];
	//var categories = $element.find("category");
	//for (var i = 0; i < categories.length; i++)
	//	post.categories.push(categories[i].innerHTML)
	//post.tag = post.categories.join(', ')
	post.url = $(element).find('link').text();
	var reg = new RegExp("[0-9]+-[0-9]+");
	post.id = post.url.match(reg)[0];
	//console.log(post.id);
	post.date = $(element).find("pubDate").text();
	//post.description = $("<div/>").html($(element).find("description")).text();
	//post.img = $('img', post.description)[0].src; //107x60px
	//var shorten = 120;
	//if (post.title.length > 80) {
	//	shorten = 70;
	//}
	return post;
}

function open_item(url) {
	chrome.tabs.create({url: url});
	chrome.browserAction.setBadgeText({text:''});
}

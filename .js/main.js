$(function() {
	// Build TOC
	var tocList = $("#toc > ul.items");
	$("#items > .item").each(function (idx) {
		var obj = $(this);
		tocList.append("<li>" + obj.attr("val") + "<span class=\"page\">0</span></li>");

	});
	// Pagify Content
	// Assign Page Numbers
});

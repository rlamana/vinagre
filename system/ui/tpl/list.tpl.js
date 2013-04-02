define(['handlebars'], function(Handlebars) {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['list.tpl'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  


  return "<nav class=\"scrollable\">\n	<div class=\"scrollable-wrapper\">\n		<div class=\"puller puller-up\">\n			<div class=\"puller-icon\"><img src=\"devtools/client/system/img/loading-light.gif\" /></div>\n			<div class=\"puller-label\">Loading...</div>\n		</div>\n		\n		<ul class=\"list\"></ul>\n		\n		<div class=\"puller puller-down\">\n			<span class=\"puller-icon\"><img src=\"devtools/client/system/img/loading-light.gif\" /></span>\n			<span class=\"puller-label\">Loading...</span>\n		</div>\n	</div>\n</nav>\n";});
});

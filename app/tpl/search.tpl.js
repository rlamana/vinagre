define(['handlebars'], function(Handlebars) {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['search.tpl'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  


  return "<form>\n	<button class=\"search-button\"><i class=\"icon-search-2\"></i></button>\n	<input class=\"search\" type=\"text\" placeholder=\"Enter search\" />\n</form>";});
});

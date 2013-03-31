define(['handlebars'], function(Handlebars) {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['search.tpl'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; data = data || {};
  


  return "<form>\n	<button class=\"search-button\"><i class=\"icon-search-2\"></i></button>\n	<input class=\"search\" type=\"text\" placeholder=\"Enter search\" />\n</form>";
  });
});

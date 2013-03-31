requirejs.config({
	baseUrl: './',

	waitSeconds: 0,

	// To bypass browser cache uncomment this...
	//urlArgs: "bust=" +  (new Date()).getTime(),

	paths: {
		'$': 'vendor/jquery',
		'Underscore': 'vendor/underscore',
		'handlebars': 'vendor/handlebars',
		'json2': 'vendor/json2',

		// Plugins
		'tpl': 'system/plugins/tpl',
		'css': 'system/plugins/css',
		'json': 'system/plugins/json',
		'text': 'system/plugins/text'
	},

	// Handlebars view loader options
	tpl: {
		extension: 'tpl',
		compilerOptions: {}
	},

	// Less styles loader options
	css: {
		buildUrl: './'
	},

	// Name of dependencies for non-require libraries
	shim: {
		'$': {
			exports: '$'
		},

		'Underscore': {
			exports: '_'
		},

		'json2': {
			exports: 'JSON'
		}
	}
});

require(['app/main'], function(MainApp) {
	new MainApp().init();
});

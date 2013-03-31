define(['handlebars'], function(Handlebars) {
    function load(name, req, done, config) {
        var ext = config.tpl.extension || 'tpl';

        // Compilation mode
        if (config.isBuild) {
            // Require compiled handlebars template
            req([name + '.' + ext]);
            done();
            return;
        }

        require(['system/selector'], function($){
            var url = req.toUrl(name).replace(/\.[^/.]+$/, "").replace(/^\.\//, "");
            var tplname = name.replace(/^.*[\\\/]/, '') + '.' + ext;

            if(config.release) {
                require([url + '.' + ext], function () {
                    done(function(data) {
                        // Wrap Handlebar template with selector $ wrapper object
                        return $(Handlebars.templates[tplname](data));
                    });
                });
            } else {
                // Dynamically loading and compiling handlebars
                $.get(url + '.' + ext, {}, function(response, status){
                    done(function(data) {
                        // Add special options object
                        data = data || {};
                        data.baseUrl = config.tpl.baseUrl;

                        // Wrap Handlebar template with selector $ wrapper object
                        return $(Handlebars.compile(response)(data));
                    });
                }, "html");
            }

        });
    }

    function write() {
    }

    return {
        load: load,
        write: write
    };
});

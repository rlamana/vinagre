define(function() {

    var plugin = {
        options: {},
        load: function load(name, parentRequire, done, config) {
            var ext;

            this.options = config.css;

            if (config.isBuild) {
                done();
                return;
            }

            if(config.release) {
                done();
                return;
            }

            // Dynamically loading
            // Less can only be loaded on the browser
            require(['vendor/less'], function() {
                var ext = 'less';
                name = parentRequire.toUrl(name).replace(/\.[^/.]+$/, "");

                var style = document.createElement('link');
                style.setAttribute('rel', 'stylesheet/less');
                style.setAttribute('href', name + '.' + ext);

                less.sheets = [style];
                less.refresh();
                done(style);
            });
        },

        write: function write(pluginName, name, write) {
            /*write("var style = document.createElement('link');");
            write("style.setAttribute('rel', 'stylesheet/css');");
            write("style.setAttribute('href', '" + this.options.buildUrl + '/' + name + "');\n");*/
        }
    };

    return plugin;

});

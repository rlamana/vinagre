buildname = neutron

# Directories
builddir = .
appdir = app
systemdir = system

# Less compiler
less-systemfiles = $(wildcard ${systemdir}/css/*.less) $(wildcard ${systemdir}/ui/css/*.less)
less-appfiles = $(wildcard ${appdir}/css/*.less) 

# Handlebars template files
tpl-systemfiles = $(wildcard ${systemdir}/tpl/*.tpl) $(wildcard ${systemdir}/ui/tpl/*.tpl)
tpl-appfiles = $(wildcard ${appdir}/tpl/*.tpl)

# Targets Files
cssbuild = ${builddir}/${buildname}.css

all: debug release

show-includes:
	@echo $(mobile-includes)


# Mobile library

debug: templates less
	@echo Compiling '${buildname}' for debugging...
	@echo ---------------------------------------
	r.js -o build.js mainConfigFile=boot.js name="boot" out=${builddir}/${buildname}.js optimize=none
	@echo done.

release: templates less
	@echo Compiling '${buildname}' for production...
	@echo ----------------------------------------
	r.js -o build.js mainConfigFile=boot.js name="boot" out=${builddir}/${buildname}.min.js optimize=uglify
	@echo done.

${builddir}:
	@mkdir -p ${builddir}


# Templates building

templates: clean-templates ${builddir} $(tpl-systemfiles:.tpl=.tpl.js) $(tpl-appfiles:.tpl=.tpl.js)
	@echo HANDLEBARS template compiler finished.
	@echo

%.tpl.js: %.tpl
	@echo Compiling HANDLEBARS template $<...
	@handlebars --amd $< > $<.js

clean-templates:
	@echo "Cleaning temporary HANDLEBARS generated templates..."
	rm -f $(tpl-appfiles:.tpl=.tpl.js)
	rm -f $(tpl-systemfiles:.tpl=.tpl.js)
	@echo


# Style sheets building

less: clean-less ${builddir} $(less-systemfiles:.less=.css) $(less-appfiles:.less=.css)
	@echo "LESS compiler finished."
	@echo

%.css: %.less
	@echo Compiling LESS stylesheet $<
	@lessc --yui-compress $< >> ${cssbuild}

clean-less:
	@echo "Cleaning CSS generated stylesheets..."
	rm -f ${cssbuild}
	@echo


# Build cleaning

clean: clean-templates clean-less
	@echo "Removing build files..."
	rm -f ${builddir}/${buildname}.js
	rm -f ${builddir}/${buildname}.min.js
	@echo
	
install:
	npm install -g requirejs
	npm install -g less
	npm install -g handlebars
	npm install -g uglifyjs

install-test:
	npm install -g testacular@0.6.0
	npm install -g mocha
	



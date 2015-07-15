#CSS3 grids and PostCSS starter kit

A repository of files implementing experimental CSS3 grids that uses PostCSS to compile the CSS. So, what could go wrong?

## Contains
* Source files for HTML and CSS files for CSS3 grids testing.
* Polyfill for CSS3 grids. 
* Markdown files with text to serve as dummy content for the html pages.

##To use
* Clone the repository
* At the repo root level, run npm install to install the dependencies. 
* At the repo root level run "gulp" or "gulp build" to compile the dist files.
* "gulp listen" 

##Etc.
* Markdown files save in src/markdown will automatically compile and be moved to the dist/markdown folder
* The compiled markdown files can be included in the HMTL files using syntax from the gulp-file-include plugin.
* To use without a polyfill, enable experimental Web Platform features in Chrome.
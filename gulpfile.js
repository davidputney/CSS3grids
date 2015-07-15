
var gulp = require('gulp'),
		postcss = require('gulp-postcss'),
		pxtorem = require('postcss-pxtorem'),
		variables = require('postcss-css-variables'),
		mixins = require('postcss-mixins'),
		nested = require('postcss-nested'),
		pxtorem = require('postcss-pxtorem'),
		vars = require('postcss-simple-vars'),
		cssnext = require('cssnext'),
		spiffing = require('postcss-spiffing'),
		extend = require('postcss-simple-extend'),
		rename = require("gulp-rename"),
		watch = require('gulp-watch'),
		livereload = require('gulp-livereload'),
		autoprefixer = require('autoprefixer'),
		importer = require('postcss-import'),
		styleGuide = require('postcss-style-guide'),
		fs = require('fs'),
		fileinclude = require('gulp-file-include'),
		colorRebeccapurple = require("postcss-color-rebeccapurple"),
		markdown = require('gulp-markdown');

var paths = {
	css: {
		input: 'src/css/*.css',
		output: 'dist/css/',
	},
	html: {
		input: 'src/html/*.html ',
		output: 'dist/html/'
	},
	markdown: {
		input: 'src/markdown/*.md',
		output: 'dist/markdown/'
		},
		scripts: {
		input: 'src/js/*.js',
		output: 'dist/js/'
		}
	};


gulp.task('css', function () {
	var importPartials = [
      importer()
  ];
  var processors = [
      mixins(),
      vars(),
      cssnext(),
      extend(),
      pxtorem({
					root_value: 16,
					unit_precision: 5,
					prop_white_list: ['font', 'font-size', 'line-height', 'letter-spacing', 'max-width', 'width', 'height', 'grid-template-columns', 'grid-template-rows', 'max-width', 'min-width', 'margin', 'padding-left'],
					selector_black_list: [],
					replace: true,
					media_query: true
      }),
      autoprefixer({
      		browsers: ['last 2 version']
      }),
      nested(),
      spiffing(),
      colorRebeccapurple()
  ];
   return gulp.src(paths.css.input)
	      .pipe(postcss(importPartials))
        .pipe(postcss(processors))
        .pipe(rename("styles.css"))
        .pipe( gulp.dest(paths.css.output) );
});


gulp.task('fileinclude', function() {
  gulp.src(paths.html.input)
    .pipe(fileinclude(/*{
      prefix: '@@',
      basepath: '@file'
    }*/))
    .pipe(gulp.dest(paths.html.output));
});


gulp.task('markdown', function () {
    return gulp.src(paths.markdown.input)
        .pipe(markdown())
        .pipe(gulp.dest(paths.markdown.output));
});

gulp.task('js', function () {
    return gulp.src(paths.scripts.input)
        .pipe(gulp.dest(paths.scripts.output));
});

gulp.task('listen', function () {
    gulp.watch(paths.css.input).on('change', function(file) {
        gulp.start('css');
    });
     gulp.watch(paths.markdown.input).on('change', function(file) {
        gulp.start('markdown');
    });
     gulp.watch(paths.html.input).on('change', function(file) {
        gulp.start('fileinclude');
    });
});

gulp.task('build', function () {
  		gulp.start('css')
  		gulp.start('fileinclude')
  		gulp.start('markdown')
  		gulp.start('js');
});


gulp.task('default', function () {
  gulp.start('build');
});

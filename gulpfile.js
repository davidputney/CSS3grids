
var gulp = require('gulp'),
		postcss = require('gulp-postcss'),
		pxtorem = require('postcss-pxtorem'),
		variables = require('postcss-css-variables'),
		mixins = require('postcss-mixins'),
		nested = require('postcss-nested'),
		pxtorem = require('postcss-pxtorem'),
		vars = require('postcss-simple-vars'),
		cssnext = require('cssnext'),
		rename = require("gulp-rename"),
		rename = require("gulp-rename"),
		watch = require('gulp-watch'),
		livereload = require('gulp-livereload'),
//		webserver = require('gulp-webserver'),
		autoprefixer = require('autoprefixer'),
		importer = require('postcss-import'),
		styleGuide = require('postcss-style-guide'),
		fs = require('fs');

var paths = {
	css: {
		input: 'src/*.css',
		output: 'css/',
	},
		guide: {
		input: 'css/',
		output: 'style_guide/',
	}
	};


gulp.task('css', function () {

    var processors = [
        importer(),
        variables(),
        mixins(),
        pxtorem(),
        vars(),
        cssnext(),
        pxtorem({
						root_value: 16,
						unit_precision: 5,
						prop_white_list: ['font', 'font-size', 'line-height', 'letter-spacing', 'max-width', 'width', 'height', 'grid-template-columns', 'grid-template-rows' ],
						selector_black_list: [],
						replace: true,
						media_query: true
        }),
        autoprefixer({
        		browsers: ['last 2 version']
        }),
        nested()
    ];

   return gulp.src(paths.css.input)
        .pipe(postcss(processors))
         .pipe(rename("styles.css"))
        .pipe( gulp.dest(paths.css.output) );
});


gulp.task('styleguide', function () {
    var postcss = require('gulp-postcss');
    var processedCSS = fs.readFileSync('css/styles.css', 'utf-8');
    return gulp.src('css/styles.css')
        .pipe(postcss([
             require('postcss-style-guide')(processedCSS, {
                 name: "Project name"
             })
         ]))
        .pipe(gulp.dest('build/'));
});

gulp.task('listen', function () {
    gulp.watch(paths.css.input).on('change', function(file) {
        gulp.start('css');
    });
});

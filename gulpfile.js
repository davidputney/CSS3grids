
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
		autoprefixer = require('autoprefixer');

gulp.task('css', function () {

    var processors = [
        variables(),
        mixins(),
        nested(),
        pxtorem(),
        vars(),
        cssnext(),
        pxtorem({
						root_value: 16,
						unit_precision: 5,
						prop_white_list: ['font', 'font-size', 'line-height', 'letter-spacing', 'max-width', 'width', 'height' ],
						selector_black_list: [],
						replace: true,
						media_query: false
        }),
        autoprefixer({
        		browsers: ['last 2 version']
        })
    ];

   return gulp.src('src/*.css')
        .pipe(postcss(processors))
         .pipe(rename("styles.css"))
        .pipe( gulp.dest('css/') );
});

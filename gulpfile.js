var gulp = require('gulp');
var minifyCss = require('gulp-minify-css');
var imagemin = require('gulp-imagemin');
var imageResize = require('gulp-image-resize');
var pngquant = require('imagemin-pngquant');
var nodemon = require('gulp-nodemon');
var sass = require('gulp-sass');

gulp.task('sass', function(){
	return gulp.src('public/stylesheets/scss/style.scss')
		.pipe(sass())
		.pipe(gulp.dest('public/stylesheets/css'))
});

gulp.task('css', function(){
	return gulp.src('public/stylesheets/css/style.css')
		.pipe(minifyCss({comptability: 'ie8'}))
		.pipe(gulp.dest('public/stylesheets/css'));
});

gulp.task('minify', function(){
	return gulp.src('public/images/*')
		.pipe(imagemin({
			progressive: true,
			svgoPlugins: [{removeViewBox: false}],
			use: [pngquant()]
		}))
		.pipe(gulp.dest('public/images'));
});

gulp.task('nodemon', function() {
	return nodemon({
		script: 'bin/www',
		ext: 'js'
	}).on('start', function(){
	});
});

gulp.task('watch', function(){
	gulp.watch('public/stylesheets/scss/*.scss', ['sass']);
	gulp.watch('public/stylesheets/css/*.css', ['css']);
});

gulp.task('default', ['sass', 'css', 'minify', 'nodemon', 'watch']);
'use strict';

const gulp = require('gulp');

/*
 * Configure a Fractal instance.
 *
 * This configuration could also be done in a separate file, provided that this file
 * then imported the configured fractal instance from it to work with in your Gulp tasks.
 * i.e. const fractal = require('./my-fractal-config-file');
 */

const fractal = require('@frctl/fractal').create();
const git = require('git-rev-sync');

const version = 'v' + git.tag() + ' (' + git.short()+')';
fractal.set('project.title', 'Magento 2 Boilerplate Theme - ' + version); // title for the project
fractal.set('project.version', version);
fractal.set('project.author', 'Thomas Hampe');

fractal.web.set('builder.dest', __dirname + '/build/documentation/tmp'); // destination for the static export
fractal.docs.set('path', __dirname + '/styles/documentation'); // location of the documentation directory.
fractal.components.set('path', __dirname + '/styles/components'); // location of the component directory.
fractal.web.set('static.path', __dirname + '/web');

// any other configuration or customisation here

const logger = fractal.cli.console; // keep a reference to the fractal CLI console utility

var sass = require('gulp-sass');
 
gulp.task('styles', ['styles:vendor'], function () {
  return gulp.src(['./styles/**/*.scss', '!./styles/vendor/**/*.scss'])
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./web/css'));
});
 
gulp.task('styles:watch', function () {
  gulp.watch('./styles/components/**/*.scss', ['styles', 'styles:lint']);
});

gulp.task('styles:vendor', ['styles:vendor:bootstrap', 'styles:vendor:font-awesome']);

gulp.task('styles:vendor:bootstrap', function() {
    return gulp.src('./node_modules/bootstrap/scss/**/*').pipe(gulp.dest('./styles/vendor/bootstrap'));
});

gulp.task('styles:vendor:font-awesome', function() {
    return gulp.src('./node_modules/font-awesome/scss/**/*').pipe(gulp.dest('./styles/vendor/font-awesome'));
});

gulp.task('fonts', function() {
    return gulp.src('./node_modules/font-awesome/fonts/**/*').pipe(gulp.dest('./web/fonts'));
});

const sassLint = require('gulp-sass-lint');

gulp.task('styles:lint', function () {
  return gulp.src('styles/components/**/*.scss')
    .pipe(sassLint({
       configFile: '.scss-lint.yml'
    }))
    .pipe(sassLint.format())
    .pipe(sassLint.failOnError())
});

/*
 * Start the Fractal server
 *
 * In this example we are passing the option 'sync: true' which means that it will
 * use BrowserSync to watch for changes to the filesystem and refresh the browser automatically.
 * Obviously this is completely optional!
 *
 * This task will also log any errors to the console.
 */

gulp.task('fractal:start', ['styles', 'styles:lint', 'styles:watch'], function(){
    const server = fractal.web.server({
        sync: true
    });
    server.on('error', function(err) {logger.error(err.message)});


    return server.start().then(function() {
        logger.success('Fractal server is now running at ' + server.url);
    });
});

/*
 * Run a static export of the project web UI.
 *
 * This task will report on progress using the 'progress' event emitted by the
 * builder instance, and log any errors to the terminal.
 *
 * The build destination will be the directory specified in the 'builder.dest'
 * configuration option set above.
 */

gulp.task('fractal:build', ['styles', 'fonts'], function(cb){
    const builder = fractal.web.builder();
    builder.on('progress', function(completed, total) {
        logger.update('Exported ' + completed + ' of ' + total + 'items', 'info');
    });
    builder.on('error', function(err) {
        logger.error(err.message)
    });

    builder.build().then(function() {
        logger.success('Fractal build completed!');
        cb();
    });
});

gulp.task('test', ['styles:lint']);

gulp.task('build', ['styles', 'fractal:build', 'release']);


var zip = require('gulp-zip');

gulp.task('release', ['styles', 'release:magento-theme', 'release:frontend-source']);

gulp.task('release:magento-theme', ['styles', 'fonts'], function() {
    return gulp.src([
        './**/*',
        '!node_modules{,/**}',
        '!build{,/**}',
        '!.*',
        '!deploy*',
        '!gulpfile.js',
        '!package.json',
        '!README.md',
        '!yarn.lock',

        '!styles/components/**/*.{hbs,html,yml,md}',
        '!styles/documentation{,/**}'
    ]).pipe(zip('magento-theme.zip')).pipe(gulp.dest('build'));
});

gulp.task('release:frontend-source', function() {
    return gulp.src([
        './styles/**/*.scss',
        '!./styles/vendor{,/**}',
        '!./styles/styles.scss'
    ]).pipe(zip('frontend-source.zip')).pipe(gulp.dest('build'));
});

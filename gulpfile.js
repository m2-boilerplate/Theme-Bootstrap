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

fractal.set('project.title', 'Magento 2 Boilerplate Theme'); // title for the project
fractal.set('project.version', `v${git.tag()} (${git.short()})`);
fractal.set('project.author', 'Thomas Hampe');

fractal.web.set('builder.dest', `${__dirname}/_documentation/tmp`); // destination for the static export
fractal.docs.set('path', `${__dirname}/styles/documentation`); // location of the documentation directory.
fractal.components.set('path', `${__dirname}/styles/components`); // location of the component directory.
fractal.web.set('static.path', `${__dirname}/web`);

// any other configuration or customisation here

const logger = fractal.cli.console; // keep a reference to the fractal CLI console utility

var sass = require('gulp-sass');
 
gulp.task('styles', function () {
  return gulp.src('./styles/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./web/css'));
});
 
gulp.task('styles:watch', function () {
  gulp.watch('./styles/**/*.scss', ['styles', 'styles:lint']);
});


const sassLint = require('gulp-sass-lint');

gulp.task('styles:lint', function () {
  return gulp.src('styles/**/*.scss')
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
    server.on('error', err => logger.error(err.message));
    return server.start().then(() => {
        logger.success(`Fractal server is now running at ${server.url}`);
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

gulp.task('fractal:build', ['styles'], function(){
    const builder = fractal.web.builder();
    builder.on('progress', (completed, total) => logger.update(`Exported ${completed} of ${total} items`, 'info'));
    builder.on('error', err => logger.error(err.message));
    return builder.build().then(() => {
        logger.success('Fractal build completed!');
    });
});

gulp.task('test', ['styles:lint']);

gulp.task('build', ['styles', 'fractal:build']);

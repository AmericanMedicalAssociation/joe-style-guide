// npm requirements
var gulp        = require('gulp'),
    bump        = require('gulp-bump'),
    clean       = require('gulp-clean'),
    concat      = require('gulp-concat'),
    browserSync = require('browser-sync'),
    filter      = require('gulp-filter'),
    git         = require('gulp-git'),
    gulpif      = require('gulp-if'),
    imagemin    = require('gulp-imagemin'),
    rename      = require('gulp-rename'),
    sass        = require('gulp-sass'),
    sassGlob    = require('gulp-sass-glob'),
    svgmin      = require('gulp-svgmin'),
    shell       = require('gulp-shell'),
    tagversion  = require('gulp-tag-version'),
    uglify      = require('gulp-uglify'),
    ghPages     = require('gulp-gh-pages'),
    runSequence = require('gulp4-run-sequence'),
    glob        = require('glob'),
    sourcemaps  = require('gulp-sourcemaps'),
    prefix      = require('gulp-autoprefixer'),
    postcss     = require('gulp-postcss'),
    reporter    = require('postcss-reporter'),
    stylelint   = require('gulp-stylelint'),
    gutil       = require('gulp-util');
    pWaitFor    = require('p-wait-for'),
    pathExists  = require('path-exists'),
    gulpicon    = require("gulpicon/tasks/gulpicon"),
    plumber     = require('gulp-plumber');

// Config
var config = require('./build.config.json');


// Trigger
var production;
// Task: Clean:before
// Description: Removing assets files before running other tasks
gulp.task('clean:before', function () {
  return gulp.src(config.assets.dest, {allowEmpty: true})
    .pipe(clean({
      force: true
    }))
});

// Task: Sass Linting
// Description: lint sass files
gulp.task('scss-lint', function() {
  return gulp.src(config.scss.files, {allowEmpty: true})
    .pipe(stylelint({
      reporters: [
        {formatter: 'string', console: true}
      ]
    }));
});

// Task: Clean:publish
// Description: Removing temp dir from git deploy
gulp.task('clean:publish', function () {
  return gulp.src( '.publish', {allowEmpty: true} )
    .pipe(clean({ force: true }))
});

// Task: Handle scripts
gulp.task('scripts', function () {
  // Package up all of the custom stuff for Drupal to consume
  var ds = gulp.src(config.scripts.drupalfiles, {allowEmpty: true})
  // unminified for development
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(concat('styleguide-custom.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(config.scripts.dest));

  // Package up everything for use by Pattern Lab
  return gulp.src(config.scripts.files, {allowEmpty: true})
  // unminified for development
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(concat('app.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(config.scripts.dest))
    // also 'production-ready' js file even though we don't use it yet
    .pipe(rename('app.min.js'))
    .pipe(uglify())
    .on('error', function (err) { gutil.log(gutil.colors.red('[Error]'), err.toString()); })
    .pipe(gulp.dest(config.scripts.dest))
    .pipe(browserSync.reload({stream:true}));
});

// Task: Handle fonts
gulp.task('fonts', function () {
  return gulp.src(config.fonts.files, {allowEmpty: true})
    .pipe(plumber())
    .pipe(gulp.dest(
      config.fonts.dest
    ))
    .pipe(browserSync.reload({stream:true}));
});

// Task: Handle media
gulp.task('images', function () {
  return gulp.src(config.images.files, {allowEmpty: true})
    .pipe(plumber())
    .pipe(gulpif(production, imagemin()))
    .pipe(gulp.dest(
      config.images.dest
    ))
    .pipe(browserSync.reload({stream:true}));
});


// Task: Handle icons
// We have to do this in a few steps until
// https://github.com/filamentgroup/gulpicon/issues/1 is resolved
gulp.task('minifyIcons', function() {
  return gulp.src(config.icons.files, {allowEmpty: true})
    .pipe(plumber())
    .pipe(svgmin())
    .pipe(gulp.dest(config.icons.min));
});

// Based on https://github.com/filamentgroup/gulpicon#usage
var iconFiles = glob.sync(config.icons.files);
var iconConfig = require(config.icons.configFile);
iconConfig.dest = config.icons.dest;
gulp.task('makeIcons', gulpicon(iconFiles, iconConfig));
gulp.task('waitForIcons', function(callback) {
  var trigger = iconConfig.dest + 'preview.html';
  return pWaitFor(() => pathExists(trigger, '1000')).then(() => {
    console.log('Yay! The icons now exist.');
  });
});
gulp.task('reloadIcons', function() {
  return gulp.src('.', {read: false, allowEmpty: true})
    .pipe(browserSync.reload({stream:true}));
});

gulp.task('icons', function (callback) {
  runSequence('minifyIcons', 'makeIcons', 'waitForIcons', 'reloadIcons', callback);
});

gulp.task('sass', gulp.series('scss-lint', function(callback){
  return gulp.src(config.scss.files, {allowEmpty: true})
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sassGlob())
    .pipe(sass(gulpif(production, { outputStyle: 'compressed' })).on('error', sass.logError))
    .pipe(prefix('last 2 version'))
    .pipe(gulpif(production, rename({
      suffix: '.min'
    })))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(config.scss.dest))
    .pipe(browserSync.reload({stream:true}));
}));

// Task: patternlab
// Description: Build static Pattern Lab files via PHP script
gulp.task('patternlab', function () {
  return gulp.src('.', {read: false, allowEmpty: true})
    .pipe(plumber())
    .pipe(shell([
      'php core/console --generate'
    ]))
    .pipe(browserSync.reload({stream:true}));
});

// Task: styleguide
// Description: Copy Styleguide-Folder from core/ to public
gulp.task('styleguide', function() {
  return gulp.src(config.patternlab.styleguide.files, {allowEmpty: true})
    .pipe(plumber())
    .pipe(gulp.dest(config.patternlab.styleguide.dest));
});

// task: BrowserSync
// Description: Run BrowserSync server with disabled ghost mode
gulp.task('browser-sync', function(done) {
  browserSync({
    server: {
      baseDir: config.root
    },
    ghostMode: true,
    open: false
  });
  done();
});


// copy files settings
var svg2twig = {
  base: config.icons.base,
  src: config.icons.files,
  dest: "./source/_patterns/01-atoms/media/icons/"
};

/* copy files */
gulp.task("svg2twig", function() {
  return gulp.src(svg2twig.src, { base: svg2twig.base, allowEmpty: true })
    .pipe(plumber())
    .pipe(rename({
      extname: ".twig"
    }))
    .pipe(gulp.dest(svg2twig.dest))
});

// Task: Watch files
gulp.task('watch', function (done) {

  // Watch Pattern Lab files
  var watcher_patternlab = gulp.watch(config.patternlab.files, {interval: 1000, usePolling: true});
  watcher_patternlab.on('all', gulp.series('patternlab', 'default'));

  // Watch scripts
  var watcher_scripts = gulp.watch(config.scripts.files, {interval: 1000, usePolling: true});
  watcher_scripts.on('all', gulp.series('scripts'));

  // Watch media
  var watcher_media = gulp.watch(config.images.files, {interval: 1000, usePolling: true});
  watcher_media.on('all', gulp.series('images'));

  // Watch icons
  var watcher_icons = gulp.watch(config.icons.files, {interval: 1000, usePolling: true});
  watcher_icons.on('all', gulp.series('icons', 'svg2twig'));

  // Watch sass
  var watcher_sass = gulp.watch(config.scss.watch, {interval: 1000, usePolling: true});
  watcher_sass.on('all', gulp.series('sass'));

  // Watch fonts
  var watcher_fonts = gulp.watch(config.fonts.files, {interval: 1000, usePolling: true});
  watcher_fonts.on('all', gulp.series('fonts'));

  done();
});

// Task: Default
// Description: Build all stuff of the project once
gulp.task('default', gulp.series('clean:before', function(callback){
  production = false;

  // We need to re-run sass last to make sure the latest styles.css gets loaded
  runSequence(
    ['scripts', 'fonts', 'images', 'sass'],
    'patternlab',
    'styleguide',
    'icons',
    'sass',
    callback
  );
}));

// gulp.task('default', runSequence(['scripts', 'fonts', 'images', 'sass', 'patternlab', 'styleguide']));

// Task: Start your production-process
// Description: Type 'gulp' in the terminal
gulp.task('serve', function () {
  production = false;

  runSequence(
    'default',
    'browser-sync',
    'watch'
  );
});

// Task: Publish static content
// Description: Publish static content using rsync shell command
gulp.task('publish', gulp.series('clean:publish', function(){
  return gulp.src(config.deployment.local.path, {allowEmpty: true})
    .pipe(ghPages({ branch: config.deployment.branch}));
}));

// Task: Deploy to GitHub pages
// Description: Build the public code and deploy it to GitHub pages
gulp.task('deploy', function () {
  // make sure to use the gulp from node_modules and not a different version
  runSequence = require('gulp4-run-sequence').use(gulp);
  // run default to build the code and then publish it GitHub pages
  runSequence('default', 'publish');
});

// Task: Deploy to dev-assets branch
// Description: Build the public code and deploy it to be consumed by Drupal
gulp.task('drupal-deploy', function (callback) {
  // make sure to use the gulp from node_modules and not a different version
  runSequence = require('gulp4-run-sequence').use(gulp);
  // Change the deploy branch
  config.deployment.branch = "dev-assets";
  // run default to build the code and then publish it to our branch
  runSequence('default', 'publish');
  callback();
});

// Function: Tagging deployed code
// Description: After code is pushed to master using master-deploy, tag it.
gulp.task('tag', function () {
  return gulp.src(config.versioning.files, {allowEmpty: true})
  // Fetch master so that we can tag it.
    .pipe(shell(['git fetch origin master:master']))
    // Tag it.
    .pipe(tagversion({args: 'master'}))
    // Push tag.
    .pipe(shell(['git push origin --tags']));
});

gulp.task('set-master', function (callback) {
  // Change the deploy branch
  gutil.log('Setting branch to master.');
  config.deployment.branch = "master";
  callback();
})

// Task: Release the code
// Description: Release runs deploy to build to gh-pages,
// pushes the same code to master, then tags master.
gulp.task('release', function (callback) {
  // make sure to use the gulp from node_modules and not a different version
  runSequence = require('gulp4-run-sequence').use(gulp);
  // Build the style guide, publish to gh-pages, set the branch to master,
  // publish to master, then tag master.
  runSequence('default', 'publish', 'set-master', 'publish', 'tag', callback);
});

var gulp = require('gulp');
var _ = require('lodash');
var karma = require('karma').server;
var deploy = require('gulp-gh-pages');

//one could also externalize common config into a separate file,
//ex.: var karmaCommonConf = require('./karma-common-conf.js');
var karmaCommonConf = {
  browsers: ['PhantomJS'],
  frameworks: ['jasmine'],
  files: [
    'src/**/minecraft.js',
    'test/**/*.spec.js'
  ]
};

/**
 * Run test once and exit
 */
gulp.task('test', function (done) {
  karma.start(_.assign({}, karmaCommonConf, {singleRun: true}), done);
});

/**
 * Watch for file changes and re-run tests on each change
 */
gulp.task('tdd', function (done) {
  karma.start(karmaCommonConf, done);
});

gulp.task('default', ['tdd']);

/**
 * Deploy to gh pages
 */
gulp.task('deploy', function() {
	gulp.src('./dist/**/*')
		.pipe(deploy());
});
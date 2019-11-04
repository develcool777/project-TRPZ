const $gulp = require('gulp');
const $clean = require('gulp-clean');
const $debug = require('gulp-debug');
const $less = require('gulp-less');
const $sourcemaps = require('gulp-sourcemaps');
const $gif = require('gulp-if');
const $gswig = require('gulp-swig');
const $fs = require('fs');
const $path = require('path');
const $util = require('util');
const $through = require('through2');


const debug = (options = {}) => $debug({
	title: 'debug: ',
	minimal: true,
	showFiles: true,
	showCount: false,
	...options,
});
const dump = ({
			path,
			content
		} = {
	path: true,
	content: false,
}) => $through.obj((file, encoding, next) => {
	// https://gist.github.com/razbomi/693f8c24dd69675f1c516157478614c7
	// https://gulpjs.com/docs/en/api/vinyl
	path && console.log(file.path);
	content && console.log(file.contents.toString(encoding));
	return next(null, file);
});


const task_clean = () => $gulp.src('./trg/*', {
		read: false
	})
	.pipe(debug({
		title: 'clean: ',
	}))
	.pipe($clean({
		force: true
	}));
$gulp.task('clean', task_clean);



const src_watch_dir = './src/**/*';
const task_watch_dir = () =>
	$gulp.watch(
		src_watch_dir,
	)
	.on('addDir', (path, stats) => {
		console.log(`Dir ${path} was added ?`);
		path = path.replace(/^src[\/]/, 'trg/');
		$fs.mkdir(path, (error) => console.log(`Dir ${path} was added`));
	})
	.on('unlinkDir', async(path, stats) => {
		console.log(`Dir ${path} was removed ?`);
		path = path.replace(/^src[\/]/, 'trg/');
		await $fs.rmdir(path, {
			recursive: true,
		});
		console.log(`Dir ${path} was removed`);
	});
$gulp.task('dir:watch', task_watch_dir);



const src_asset = './src/**/*.{gif,png,jpe?g}';
const src_watch_asset = src_asset;
const trg_asset = './trg/';
const task_asset = () => $gulp.src(src_asset, {
		since: $gulp.lastRun(task_asset),
	})
	.pipe(debug({
		title: 'asset: ',
	}))
	.pipe(
		dump({
			path: false,
			content: false,
		})
	)
	.pipe($gulp.dest(trg_asset, {
		overwrite: true,
	}));
const task_watch_asset = () =>
	$gulp.watch(
		src_watch_asset,
		$gulp.series('asset')
	)
	.on('add', (path, stats) => {
		console.log(`File ${path} was added`);
		$gulp.series('asset');
	})
	.on('unlink', (path, stats) => {
		path = path.replace(/^src[\/]/, 'trg/');
		$fs.unlink(path, (error) => console.log(`File ${path} was removed`));
	});
$gulp.task('asset', task_asset);
$gulp.task('asset:watch', task_watch_asset);



// https://www.npmjs.com/package/gulp-swig
const src_html = './src/html/*.html';
const src_watch_html = './src/html/**/*.html';
const trg_html = './trg/';
const html = () => $gulp.src(src_html)
	.pipe(debug({
		title: 'html: ',
	}))
	.pipe($gswig({
		defaults: {
			cache: false,
		},
		data: {},
	}))
	.pipe(
		dump({
			path: false,
			content: false,
		})
	)
	.pipe($gulp.dest(trg_html, {
		overwrite: true,
	}));
const watch_html = () =>
	$gulp.watch(
		src_watch_html,
		$gulp.series('html')
	);
$gulp.task('html', html);
$gulp.task('html:watch', watch_html);



const src_js = './src/**/*.js';
const src_watch_js = src_js;
const trg_js = './trg/';
const task_js = () => $gulp.src(src_js)
	.pipe(debug({
		title: 'js: ',
	}))
	.pipe(
		dump({
			path: false,
			content: false,
		})
	)
	.pipe($gulp.dest(trg_js, {
		overwrite: true,
	}));
const task_watch_js = () =>
	$gulp.watch(
		src_watch_js,
		$gulp.series('js')
	);
$gulp.task('js', task_js);
$gulp.task('js:watch', task_watch_js);



const src_less = './src/css/style.less';
const src_watch_less = './src/css/**/*.less';
const trg_less = './trg/';
const less = () => $gulp.src(src_less)
	.pipe(debug({
		title: 'less: ',
	}))
	.pipe($sourcemaps.init())
	.pipe($less({}))
	.pipe($sourcemaps.write())
	.pipe(
		dump({
			path: false,
			content: false,
		})
	)
	.pipe($gulp.dest(trg_less, {
		overwrite: true,
	}));
const watch_less = () =>
	$gulp.watch(
		src_watch_less,
		$gulp.series('less')
	);
$gulp.task('less', less);
$gulp.task('less:watch', watch_less);



const task_default = $gulp.series(
	'clean',
	$gulp.parallel(
		'asset',
		'html',
		'js',
		'less',
	),
	$gulp.parallel(
		'dir:watch',
		'asset:watch',
		'html:watch',
		'js:watch',
		'less:watch',
	),
);
$gulp.task('default', task_default);
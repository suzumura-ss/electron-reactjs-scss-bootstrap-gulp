const gulp = require('gulp');
const babel = require('gulp-babel');
const sass  = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const config = require(__dirname + '/package.json');
const shell = require('gulp-shell');
const espower = require('gulp-espower');
const runSequence = require('gulp-run-sequence');

gulp.task('babel', ()=>{
  var bbl = babel(config.babel);
  return gulp.src('src/*.jsx')
    .pipe(sourcemaps.init())
    .pipe(bbl.on('error', (e)=>{
      console.log(e.message);
      console.log(e.codeFrame);
      bbl.emit('end');
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('js'));
});
gulp.task('scss', ()=>{
  return gulp.src('src/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('css'));
});
gulp.task('compile', ['babel', 'scss']);


gulp.task('watch', ()=>{
  gulp.watch('src/*.jsx', ['babel']);
  gulp.watch('src/*.scss', ['scss']);
});

//export CSC_LINK=file://path/to/codesign.p12
//or export CSC_IDENTITY_AUTO_DISCOVERY=false
gulp.task('package-darwin', shell.task([
  "build --mac dmg --x64"
]));
gulp.task('package-win32', shell.task([
  "build --win nsis --ia32"
]));
gulp.task('package', ['package-' + process.platform]);


gulp.task('babel-test', ()=>{
  var bbl = babel(config.babel);
  return gulp.src('test/*.es6')
    .pipe(sourcemaps.init())
    .pipe(bbl.on('error', (e)=>{
      console.log(e.message);
      console.log(e.codeFrame);
      bbl.emit('end');
    }))
    .pipe(espower())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('test_js'));
});
gulp.task('test-exec', shell.task([
  "node test_js/app_test.js"
]));
gulp.task('test', ()=>{
  return runSequence(
    'babel-test',
    'test-exec'
  );
});

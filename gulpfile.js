require('babel-core/register')
const gulp = require('gulp')
const babel = require('gulp-babel')
const sass  = require('gulp-sass')
const path = require('path')
const sourcemaps = require('gulp-sourcemaps')
const config = require(path.join(__dirname, 'package.json'))
const shell = require('gulp-shell')


gulp.task('lint', shell.task([
  'eslint --ext .js,.jsx -f ./node_modules/eslint-friendly-formatter src/ *.js'
]))
gulp.task('lint:fix', shell.task([
  'eslint --ext .js,.jsx -f ./node_modules/eslint-friendly-formatter --fix ./src *.js'
]))


gulp.task('babel', () => {
  var bbl = babel(config.babel)
  return gulp.src('src/*.jsx')
    .pipe(sourcemaps.init())
    .pipe(bbl.on('error', (e) => {
      console.log(e.message)
      console.log(e.codeFrame)
      bbl.emit('end')
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('js'))
})
gulp.task('scss', () => {
  return gulp.src('src/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('css'))
})
gulp.task('compile', gulp.series('lint', gulp.parallel('babel', 'scss')))


gulp.task('watch', () => {
  gulp.watch('src/*.jsx', gulp.series('lint', 'babel'))
  gulp.watch('src/*.scss', gulp.task('scss'))
})

// export CSC_LINK=file://path/to/codesign.p12
// or export CSC_IDENTITY_AUTO_DISCOVERY=false
gulp.task('package-darwin', shell.task([
  'build --mac dmg --x64'
]))
gulp.task('package-win32', shell.task([
  'build --win nsis --ia32'
]))
gulp.task('package', gulp.series('package-' + process.platform))


gulp.task('run-test', () => {
  const mocha = require('gulp-mocha')
  return gulp.src('test/*.es6')
    .pipe(mocha({compilers: ['es6:babel-core/register'], timeout: 5000}))
})


gulp.task('test', gulp.series('compile', 'run-test'))

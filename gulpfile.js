const gulp = require('gulp');
const babel = require('gulp-babel');
const sass  = require('gulp-sass');
const config = require(__dirname + '/package.json');

gulp.task('babel', ()=>{
  var bbl = babel(config.babel);
  return gulp.src('src/*.jsx')
    .pipe(bbl.on('error', (e)=>{
      console.log(e.message);
      console.log(e.codeFrame);
      bbl.emit('end');
    }))
    .pipe(gulp.dest('js'));
});

gulp.task('scss', ()=>{
  return gulp.src('src/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('css'));
});

gulp.task('build', ['babel', 'scss']);

gulp.task('watch', ()=>{
  gulp.watch('src/*.jsx', ['babel']);
  gulp.watch('src/*.scss', ['scss']);
});

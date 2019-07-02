// dependency
var colors = require("colors/safe");
var path = require("path");
var shelljs = require("shelljs");
// gulp & gulp plugin
var gulp = require("gulp");
var babel = require("gulp-babel");
var sass = require("gulp-sass");
var less = require("gulp-less");
var es3ify = require("gulp-es3ify");
var concat  = require("gulp-concat");
colors.setTheme({
  silly: 'rainbow',
  input: 'grey',
  verbose: 'cyan',
  prompt: 'grey',
  info: 'green',
  data: 'grey',
  help: 'cyan',
  warn: 'yellow',
  debug: 'blue',
  error: 'red'
});
var getFromCwd =  function() {
  var args = [].slice.call(arguments, 0);
  args.unshift(process.cwd());
  return path.join.apply(path, args);
};

gulp.task("pack_lib2", function(cb) {
  console.log(colors.info("###### pack_lib2 start ######"));
  gulp
    .src([
      path.join(process.cwd(), "./src/**/*.js"),
      // path.join(process.cwd(), "./js/**/*.jsx")
    ])
    .pipe(
      babel()
    )
    .pipe(es3ify())
    .pipe(gulp.dest("lib/"))
    .on("end", function() {
      console.log(colors.info("###### pack_lib2 done ######"));
      cb();
    });
});

gulp.task("move_style", function() {
  gulp
    .src([
      path.join(process.cwd(), "./src/**/*.less"),
      path.join(process.cwd(), "./src/**/*.scss"),
  ])
    .pipe(gulp.dest("./lib"));
  console.log("###### move_style done ######");
});

gulp.task("less_component", ["move_style"],function() {
  gulp
    .src([
      path.join(process.cwd(), "./src/index.less"),
  ])
    .pipe(less())
    .pipe(gulp.dest("./lib"));
  console.log("###### less_component done ######");
});

//将lib下的index.css合并dist下的index.css生成完成的index.css
gulp.task("change_dist",["less_component"], function() {
  gulp.src([
      path.join(process.cwd(), "./src/index.less"),
      path.join(process.cwd(), "./dist/index.css"),
  ])
  .pipe(less())
    .pipe(concat('./dist/index.css'))
    .pipe(gulp.dest("./"));
  console.log("###### change_dist done ######");
});


gulp.task("clean_lib2", function() {
  return shelljs.rm("-rf", getFromCwd("lib"));
});

gulp.task("lib2", ["clean_lib2","pack_lib2"], function() {});

gulp.task('default',['lib2','change_dist']);
// gulp.task('default',['theme_src']);


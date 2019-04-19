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

gulp.task("css_component", function() {
  gulp
    .src([
      path.join(process.cwd(), "./src/theme-red.css"),
  ])
    .pipe(gulp.dest("./lib"));
  console.log("###### css_component done ######");
});

gulp.task("less_component", function() {
  gulp
    .src([
      path.join(process.cwd(), "./src/*.less"),
  ])
    .pipe(less())
    .pipe(gulp.dest("./lib"));
  console.log("###### less_component done ######");
});

gulp.task("clean_lib2", function() {
  return shelljs.rm("-rf", getFromCwd("lib"));
});

gulp.task("lib2", ["clean_lib2","pack_lib2", "less_component"], function() {});

gulp.task('default',['lib2']);
// gulp.task('default',['theme_src']);


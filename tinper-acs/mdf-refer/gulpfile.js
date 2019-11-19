
var path = require("path");
var shelljs = require("shelljs");
var gulp = require("gulp");
var babel = require("gulp-babel");
var less = require("gulp-less");

gulp.task("pack_lib2", function(cb) {
  console.log( ("###### pack_lib2 start ######"));
  gulp
    .src([
      path.join(process.cwd(), "./src/index.js"),
    ])
    .pipe(
      babel()
    )
    // .pipe(es3ify())
    .pipe(gulp.dest("lib/"))
    .on("end", function() {
      console.log( ("###### pack_lib2 done ######"));
      cb();
    });
});

// gulp.task('build_css', ['move_style'],function() {
//   gulp
//     .src([
//       path.join(process.cwd(), "./src/index.less"),
//   ]) 
//     .pipe(less())
//     .pipe(gulp.dest("./lib"));
//   console.log("###### build_css done ######");
// });

gulp.task("move_style", function() {
  gulp
    .src([
      path.join(process.cwd(), "./src/index.less"),
      path.join(process.cwd(), "./dist/*.css"),
      path.join(process.cwd(), "./dist/*.png"),
      path.join(process.cwd(), "./dist/*.woff"),
      path.join(process.cwd(), "./dist/*.eot"),
      path.join(process.cwd(), "./dist/*.ttf"),
      path.join(process.cwd(), "./dist/*.svg"),
  ])
    .pipe(gulp.dest("./lib"));
  console.log("###### move_style done ######");
});


gulp.task("clean_lib2", function() {
  return shelljs.rm("-rf");
});

gulp.task("lib2", ["clean_lib2","move_style","pack_lib2"], function() {});

gulp.task('default',['lib2']);
// gulp.task('default',['theme_src']);


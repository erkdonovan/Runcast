const gulp = require("gulp");
const sass = require("gulp-sass");
const concat = require("gulp-concat");
const autoprefixer = require("gulp-autoprefixer");
const browserSync = require("browser-sync");
const reload = browserSync.reload;

gulp.task("styles", () => {
  return gulp.src("dev/styles/**/*.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(autoprefixer('last 2 versions', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1'))
    .pipe(concat("styles.css"))
    .pipe(gulp.dest("public/styles/"))
    .pipe(reload({stream: true}));
});

gulp.task("scripts", () => {
  return gulp.src("dev/scripts/main.js")
    .pipe(gulp.dest("public/scripts/"))
    .pipe(reload({stream: true}));
});

gulp.task("browserSync", () => {
  browserSync.init({
    server: "."
  })
});

gulp.task("watch", () => {
  gulp.watch("dev/styles/**/*.scss", ["styles"]);
  gulp.watch("dev/scripts/**/*.js", ["scripts"]);
  gulp.watch("index.html", reload);
});

gulp.task("default", ["browserSync", "scripts", "styles", "watch"])
var gulp = require("gulp");
var browserify = require("browserify");
var ts = require("gulp-typescript");
var sourcemaps = require("gulp-sourcemaps");
var source = require("vinyl-source-stream");
var merge = require('merge2');
var mocha = require('gulp-mocha');
var notify = require("gulp-notify");

function buildStuff(folder, distPath, generateMap = true) {
    var project = ts.createProject("./" + folder + "/tsconfig.json");
    var tsResult = project.src();
    if (generateMap) {
        tsResult = tsResult.pipe(sourcemaps.init())
    }
    tsResult = tsResult.pipe(project());

    var js = tsResult.js;
    if (generateMap) {
        js = js.pipe(sourcemaps.mapSources(function (sourcePath, file) {
                return "../" + folder + "/" + sourcePath;
            }))
            .pipe(sourcemaps.write("."))
    }

    return merge(
        tsResult.dts.pipe(gulp.dest(distPath)),
        js.pipe(gulp.dest(distPath))
    );
}

function handleErrors() {
  var args = Array.prototype.slice.call(arguments);
  notify.onError({
    title: "Compile Error",
    message: "<%= error.message %>"
  }).apply(this, args);
  this.emit('end'); // Keep gulp from hanging on this task
}

gulp.task("build-tests", ["build"], function () {
    return buildStuff("test", "test", false);
});

gulp.task("build-src", function() {
    return buildStuff("src", "dist");
});

gulp.task("browserify", ["build-src"], function () {
    return browserify({
        entries: ["./dist/ts-simpleevents.js"]
    })
        .bundle()
        .on('error', handleErrors)
        .pipe(source("ts-simpleevents-browser.js"))
        .pipe(gulp.dest("./dist/"));
});

gulp.task("build", ["build-src", "browserify"], function () {
    return true;
});

gulp.task("run-tests", ["build", "build-tests"], function () {
    return gulp.src('dist/**/*-test.js', { read: false })
        .pipe(mocha({ reporter: 'spec' }));
});

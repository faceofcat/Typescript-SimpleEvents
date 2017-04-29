var gulp = require("gulp");
var ts = require("gulp-typescript");
var sourcemaps = require("gulp-sourcemaps");
var merge = require('merge2');
var mocha = require('gulp-mocha');
var zip = require('gulp-zip');

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

gulp.task("build-src", function() {
    return buildStuff("src", "dist");
});


gulp.task("build", ["build-src"], function() {
    return gulp.src([
            "./src/*.ts",
            "./dist/*.js",
            "./dist/*.js.map",
            "./dist/*.d.ts"
        ])
        .pipe(zip('typescript-simpleevents.zip'))
        .pipe(gulp.dest("./dist/"));
});

gulp.task("build-tests", ["build"], function () {
    return buildStuff("test", "test", false);
});

gulp.task("run-tests", ["build", "build-tests"], function () {
    return gulp.src('test/**/*-test.js', { read: false })
        .pipe(mocha({ reporter: 'spec' }));
});

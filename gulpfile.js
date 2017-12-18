var gulp        = require('gulp'),
    sass        = require('gulp-sass'),
    uglify      = require('gulp-uglify'),
    browserSync = require('browser-sync'),
    cssmin      = require('gulp-clean-css'),
    prefixer    = require('gulp-autoprefixer'),
    reload = browserSync.reload,
    rimraf = require('rimraf');

var path = {
    build: {
        fonts:  'dist/fonts/',
        html:   'dist/',
        css:    'dist/css/',
        js:     'dist/js/'
    },
    src: {
        fonts: 'app/fonts/',
        style: 'app/scss/styles.scss',
        html: 'app/*.html',
        js: 'app/js/main.js'
    },
    watch: {
        fonts: 'app/fonts/',
        style: 'app/scss/**/*.scss',
        html: 'app/**/*.html',
        js: 'app/js/main.js'
    },
    clean: './dist'
};

var config = {
    server: {
        baseDir: "./app"
    },
    tunnel: true,
    host: 'localhost',
    port: 3000,
    logPrefix: 'FED'
    /*proxy: 'solution'*/
};

gulp.task('html:build', function(){
    gulp.src(path.src.html)
        .pipe(gulp.dest(path.build.html))
        .pipe(reload({stream: true}));
});

gulp.task('js:build', function(){
    gulp.src(path.src.js)
       .pipe(uglify())
       .pipe(gulp.dest(path.build.js))
       .pipe(reload({stream: true}));
});

gulp.task('style:build', function(){
    gulp.src(path.src.style)
       .pipe(sass()).on('error', sass.logError)
       .pipe(prefixer())
       .pipe(cssmin())
       .pipe(gulp.dest(path.build.css))
       .pipe(gulp.dest('app/css'))
       .pipe(reload({stream: true}));
});

gulp.task('fonts:build', function () {
    gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.build.fonts))
});


gulp.task('build', [
    'style:build',
    'fonts:build',
    'html:build',
    'js:build'
]);

gulp.task('watch', function () {
    gulp.watch([path.watch.html],   ['html:build']);
    gulp.watch([path.watch.style],  ['style:build']);
    gulp.watch([path.watch.js],     ['js:build']);
    gulp.watch([path.watch.fonts],  ['fonts:build']);
});

gulp.task('webserver', function () {
    browserSync(config);
});

gulp.task('clean', function (cb) {
    rimraf(path.clean, cb);
});


gulp.task('default', ['build', 'webserver', 'watch']);

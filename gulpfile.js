const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();

// NAME OF THE THEME
const source = 'public_html';
const dest = source,
    css = {
        in: source + '/scss/style.scss',
        watch: [source + '/scss/**/*'],
        out: dest, //?
        sassOpts: {
            outputStyle: 'nested',
            imagePath: '../images',
            precision: 3,
            errLogToConsole: true
        }
    };

//  Sass compiler
const sassFunc =
    function sassFunc() {
        return gulp.src(css.in)
            .pipe(sass(css.sassOpts))
            .pipe(gulp.dest(css.out));
    };

// Browser sync proxy server
const bspFunc =
    function bspFunc() {
        browserSync.init({
            server: {
                baseDir: source
            },
            port: 3020,
            ui: {
                port: 4040
            }
        });
        // gulp.watch(source + '/style.css').on('change', browserSync.reload);
        gulp.watch(source + '/**/*.html').on('change', browserSync.reload);
        gulp.watch(source + '/scss/*.scss', sassFunc).on('change', browserSync.reload);
        gulp.watch(source + '/js/*.js').on('change', browserSync.reload);
        // gulp.watch(source + '**/*').on('change', browserSync.reload);
    };


gulp.task('default', gulp.parallel(
    gulp.series(bspFunc),
));

console.log(source + '/**/*.html')

exports.sassFunc = sassFunc;
exports.bspFunc = bspFunc;
exports.default = 'default';
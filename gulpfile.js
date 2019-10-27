var gulp         = require('gulp'),
    sass         = require('gulp-sass'),
    browserSync  = require('browser-sync'),
    autoprefixer = require('gulp-autoprefixer'),
    imagemin     = require('gulp-imagemin'),
    pngquant     = require('imagemin-pngquant');

gulp.task('sass', async function() {
    return  gulp.src('src/sass/**/*.sass')
            .pipe(sass())
            .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
            .pipe(gulp.dest('src/css'))
            .pipe(browserSync.reload({stream: true}));
});

gulp.task('img', function() {
    return gulp.src('src/img/**/*')
        .pipe(imagemin({
            interlaced: true,
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest('dist/img'));
});

gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: 'src'
        },
        notify: false,
    });
});

gulp.task('watch', function() {
    gulp.watch('src/sass/**/*.sass', gulp.parallel('sass'));
});

gulp.task('default', gulp.parallel('sass', 'browser-sync', 'watch'));
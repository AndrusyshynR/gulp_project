// Подключение модулейи плагинов Galp
const gulp = require('gulp'); //подключение gulp
const concat = require('gulp-concat'); //подключение плагина gulp-concat
const autoprefixer = require('gulp-autoprefixer'); //подключение к проекту gulp-autoprefixer
const cleanCSS = require('gulp-clean-css'); //подключение к проекту gulp-clean-css дя зжатия css файла
const butternut = require('gulp-butternut'); // нет проблем с es 6 
const browserSync = require('browser-sync').create(); //дя автоматичиского обновления и компеляции css и js файлов
const sourcemaps = require('gulp-sourcemaps'); //для отображения в concole где написан наш элемент
const less = require('gulp-less'); //подключили less также можно и другие(scss,sass)

const cssFiles = ['./src/css/main.less', './src/css/media.less']; // перечесление less либо поменять на тот формат который нужно(css,sass...)
const jsFiles = ['./src/js/lib.js', './src/js/main.js'];

function styles() { // конпиляция на стили
    return gulp.src(cssFiles)
    .pipe(sourcemaps.init())
    .pipe(less())
    .pipe(concat('style.css')) // указываем путь куда сливать файлы
    .pipe(autoprefixer({ //подключили автопрефиксер к стилям
        overrideBrowserslist: ['last 2 versions'],
        cascade: false
    }))
    .pipe(cleanCSS({level: 2})) //добавили cleanCSS для сжатия стилей
    .pipe(sourcemaps.write('./')) //для отслежования в концоли
    .pipe(gulp.dest('./build/css')) // указываем куда будет компилироваца наш файл
    .pipe(browserSync.stream()); //для обновления styles файла
};

function scripts() { //компиляция на скрипты
    return gulp.src(jsFiles)
    .pipe(concat('script.js')) // указываем путь куда сливать файлы
    .pipe(gulp.dest('./build/js')) // указываем куда будет компилироваца наш файл
    .pipe(butternut()) // для сжатия js и узнавания ES6 вместо uglify
    .pipe(browserSync.stream()); //для обновления scripts файла
};

function watch() { //дя отслежевания и обновления в браузере
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    gulp.watch('./src/css/**/*.less', styles) //следить за css файлами  в папке и все что в ней(**) либо поменять на тот формат который нужно(less,sass)
    gulp.watch('./src/js/**/*.js', scripts) //следить за js файлами  в папке и все что в ней(**)
    gulp.watch('./*.html').on('change', browserSync.reload); // для html перерендеринг
};

gulp.task ('styles', styles); //запускает css 
gulp.task ('scripts', scripts); //запускает js
gulp.task ('watch', watch); // обновляет наши файлы
gulp.task ('build', gulp.series(gulp.parallel(styles, scripts))); // обновляет последовательно файлы
gulp.task ('dev', gulp.series('build','watch')); // окончательно соберает и рендерит
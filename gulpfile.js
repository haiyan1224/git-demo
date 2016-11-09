//载入gulp模块
var gulp=require('gulp');
var less=require('gulp-less');
var cssnano=require('gulp-cssnano');
var cleanCSS=require('gulp-clean-css');
var concat=require('gulp-concat');
gulp.task('copy',function(){
	//当gulp执行say任务时会自动执行该函数
	console.log('hello world');
	//合并 压缩之关的操作
	//复制文件
	//gulp.src的作用是取一个文件
	gulp.src('src/index.html')
		.pipe(gulp.dest('dist/'));//将此处需要的操作传递进去，每人pipe都是一个环节

});
gulp.task('dist',function(){
	
	gulp.watch('src/index.html',['copy']);
	gulp.watch('src/styles/*.less',['style']);
		
});

gulp.task('style',function(){
	gulp.src(['src/styles/*.less','!src/styles/_*.less'])
		.pipe(less())//该环节之后就是css
		.pipe(cleanCSS())//压缩css
		.pipe(gulp.dest('dist/styles/'))//输出到目标路径
		.pipe(reload({
			stream:true
		}));
});
//JS合并 压缩混淆
var uglify=require('gulp-uglify');
gulp.task('script',function(){
	gulp.src('src/scripts/*.js')
		.pipe(concat('all.js'))
		.pipe(uglify())
		.pipe(gulp.dest('dist/scripts'))
		.pipe(reload({
			stream:true
		}));
});
// 图片复制
gulp.task('image',function(){
	gulp.src('src/images/*.*')
		.pipe(gulp.dest('dist/images'))
		.pipe(reload({
			stream:true
		}));
});
// html复制
var htmlmin=require('gulp-htmlmin');
gulp.task('html',function(){
	gulp.src('src/*.html')
		.pipe(htmlmin({
			collapseWhitespace:true,//去空格
			removeComments:true//去注释
		}))
		.pipe(gulp.dest('dist'))
		.pipe(reload({
			stream:true
		}));
});
var browserSync = require('browser-sync').create();
var reload= browserSync.reload;
// Static server
gulp.task('serve', function() {
    browserSync.init({
        server: {
            // baseDir: "./"
            baseDir: ['dist']
        }
    });
    gulp.watch('src/styles/*.less',['style']);
    gulp.watch('src/scripts/*.js',['script']);
    gulp.watch('src/images/*.*',['image']);
    gulp.watch('src/*.html',['html']);
   // gulp.watch(["src/index.html","src/styles/*.less"]).on('change', reload);
   	//也可以在四个task后面加reload，然后watch每个任务 实现自动刷新
});
// gulp.task('default', ['serve']);
//let replace = require('gulp-replace'); //.pipe(replace('bar', 'foo'))
let { src, dest } = require("gulp");
let fs = require('fs');
let gulp = require("gulp");
let browsersync = require("browser-sync").create();
let autoprefixer = require("gulp-autoprefixer");
let scss = require("gulp-sass");
let group_media = require("gulp-group-css-media-queries");
let plumber = require("gulp-plumber");
let del = require("del");
let imagemin = require("gulp-imagemin");
let uglify = require("gulp-uglify-es").default;
let rename = require("gulp-rename");
let fileinclude = require("gulp-file-include");
let clean_css = require("gulp-clean-css");
let newer = require('gulp-newer');

let webp = require('imagemin-webp');
let webpcss = require("gulp-webp-css");
let webphtml = require('gulp-webp-html');
let svgSprite = require('gulp-svg-sprite');
let svgmin = require('gulp-svgmin');
let cheerio = require('gulp-cheerio');
let replace = require('gulp-replace');

let fonter = require('gulp-fonter');

let ttf2woff = require('gulp-ttf2woff');
let ttf2woff2 = require('gulp-ttf2woff2');

let fileExists = require('file-exists');
let gulpif = require('gulp-if');

let ghPages = require('gh-pages');
let pathF = require('path');

let project_name = require("path").basename(__dirname);
let src_folder = "#src";

let webFontsPath = 'node_modules/@fortawesome/fontawesome-free/webfonts/*';

let path = {
	build: {
		html: project_name + "/",
		js: project_name + "/js/",
		css: project_name + "/css/",
		images: project_name + "/img/",
		fonts: project_name + "/fonts/",
		distWebfonts: project_name + '/webfonts/',
	},
	src: {
		favicon: src_folder + "/img/favicon.{jpg,png,svg,gif,ico,webp}",
		html: [src_folder + "/*.html", "!" + src_folder + "/_*.html"],
		js: [src_folder + "/js/app.js", src_folder + "/js/vendors.js"],
		css: src_folder + "/scss/style.scss",
		images: [src_folder + "/img/**/*.{jpg,png,svg,gif,ico,webp}", "!**/favicon.*"],
		fonts: src_folder + "/fonts/*.ttf",
		sprite: src_folder + '/iconsprite/*.svg'
	},
	watch: {
		html: src_folder + "/**/*.html",
		js: src_folder + "/js/**/*.js",
		css: src_folder + "/scss/**/*.scss",
		images: src_folder + "/img/**/*.{jpg,png,svg,gif,ico,webp}",
		sprite: src_folder + '/iconsprite/*.svg'
	},
	clean: "./" + project_name + "/"
};
function browserSync(done) {
	browsersync.init({
		server: {
			baseDir: "./" + project_name + "/"
		},
		notify: false,
		port: 3000,
	});
}
function html() {
	return src(path.src.html, {})
		.pipe(plumber())
		.pipe(fileinclude())
		.pipe(webphtml())
		.pipe(dest(path.build.html))
		.pipe(browsersync.stream());
}
function css() {
	return src(path.src.css, {})
		.pipe(plumber())
		.pipe(
			scss({
				outputStyle: "expanded"
			})
		)
		.pipe(group_media())
		.pipe(
			autoprefixer({
				grid: true,
				overrideBrowserslist: ["last 5 versions"],
				cascade: true
			})
		)
		.pipe(webpcss(
			['.jpg', '.jpeg', '.png']
		))
		.pipe(dest(path.build.css))
		.pipe(clean_css())
		.pipe(
			rename({
				extname: ".min.css"
			})
		)
		.pipe(dest(path.build.css))
		.pipe(browsersync.stream());
}
function js() {
	return src(path.src.js, {})
		.pipe(plumber())
		.pipe(fileinclude())
		.pipe(gulp.dest(path.build.js))
		.pipe(uglify(/* options */))
		.pipe(
			rename({
				suffix: ".min",
				extname: ".js"
			})
		)
		.pipe(dest(path.build.js))
		.pipe(browsersync.stream());
}

function images() {
	return src(path.src.images)
		.pipe(newer(path.build.images))
		.pipe(
			imagemin([
				webp({
					quality: 75
				})
			])
		)
		.pipe(
			rename({
				extname: ".webp"
			})
		)
		.pipe(dest(path.build.images))
		.pipe(src(path.src.images))
		.pipe(newer(path.build.images))
		.pipe(
			imagemin({
				progressive: true,
				svgoPlugins: [{ removeViewBox: false }],
				interlaced: true,
				optimizationLevel: 3 // 0 to 7
			})
		)
		.pipe(dest(path.build.images))
}
function favicon() {
	return src(path.src.favicon)
		.pipe(plumber())
		.pipe(
			rename({
				extname: ".ico"
			})
		)
		.pipe(dest(path.build.html))
}
function fonts_otf() {
	return src('./' + src_folder + '/fonts/*.otf')
		.pipe(plumber())
		.pipe(fonter({
			formats: ['ttf']
		}))
		.pipe(gulp.dest('./' + src_folder + +'/fonts/'));
}
function fonts() {
	src(path.src.fonts)
		.pipe(plumber())
		.pipe(ttf2woff())
		.pipe(dest(path.build.fonts));
	return src(path.src.fonts)
		.pipe(ttf2woff2())
		.pipe(dest(path.build.fonts))
		.pipe(browsersync.stream());
}
function fontsStyle(done) {

	let file_content = fs.readFileSync(src_folder + '/scss/base/_fonts.scss');
	if (file_content == '') {
		fs.writeFile(src_folder + '/scss/base/_fonts.scss', '', cb);
		return fs.readdir(path.build.fonts, function (err, items) {
			if (items) {
				let c_fontname;
				for (var i = 0; i < items.length; i++) {
					let fontname = items[i].split('.');
					fontname = fontname[0];
					if (c_fontname != fontname) {
						fs.appendFile(src_folder + '/scss/base/_fonts.scss', '@include font("' + fontname + '", "' + fontname + '", "400", "normal");\r\n', cb);
					}
					c_fontname = fontname;
				}
			}
		})
	}
	done();
}

// use a file of webfonts to check it's existing then make a copy in dist
const fontawesomeWebfont =
	'node_modules/@fortawesome/fontawesome-free/webfonts/fa-brands-400.eot';

// to check if file exists or not for testing purposes
// console.log(fileExists.sync(fontawesomeWebfont)); // OUTPUTS: true or false

// copy webfonts folder if it exists
// because our task contains asynchronous code
// use async before our task
// to avoid getting this error `Did you forget to signal async completion`
async function copyfontawesomeWebfontsTask() {
	return gulpif(
		fileExists.sync(fontawesomeWebfont),
		src(webFontsPath).pipe(dest(path.build.distWebfonts))
	);
}

// function svgSpriteBuild() {
// 	return src(path.src.sprite)
// 		// minify svg
// 		.pipe(svgmin({
// 			js2svg: {
// 				pretty: true
// 			}
// 		}))
// 		// remove all fill, style and stroke declarations in out shapes
// 		.pipe(cheerio({
// 			run: function ($) {
// 				$('[fill]').removeAttr('fill');
// 				$('[stroke]').removeAttr('stroke');
// 				$('[style]').removeAttr('style');
// 			},
// 			parserOptions: { xmlMode: true }
// 		}))
// 		// cheerio plugin create unnecessary string '&gt;', so replace it.
// 		.pipe(replace('&gt;', '>'))
// 		// build svg sprite
// 		.pipe(svgSprite({
// 			mode: {
// 				stack: {
// 					sprite: "../sprite.svg",
// 					// example: true
// 					render: {
// 						scss: {
// 							dest: "../../../#src/scss/sprite.scss",
// 							template: src_folder + "/templates/sprite_template.scss"
// 						}
// 					}
// 				}
// 			},
// 		}))
// 		.pipe(dest('#src/img/'));
// }

function deploy(cb) {
	ghPages.publish(pathF.join(process.cwd(), project_name), cb);
}

function cb() { }
function clean() {
	return del(path.clean);
}
function watchFiles() {
	gulp.watch([path.watch.html], html);
	gulp.watch([path.watch.css], css);
	gulp.watch([path.watch.js], js);
	gulp.watch([path.watch.images], images);
	// gulp.watch([path.watch.sprite], svgSpriteBuild);
}

let build = gulp.series(clean, fonts_otf, gulp.parallel(html, css, js, favicon, images, fonts, copyfontawesomeWebfontsTask), fontsStyle);
let watch = gulp.parallel(build, watchFiles, browserSync);

exports.deploy = deploy;
// exports.svgSpriteBuild = svgSpriteBuild;
exports.copyfontawesomeWebfontsTask = copyfontawesomeWebfontsTask;
exports.html = html;
exports.css = css;
exports.js = js;
exports.favicon = favicon;
exports.fonts_otf = fonts_otf;
exports.fontsStyle = fontsStyle;
exports.fonts = fonts;
exports.images = images;
exports.clean = clean;
exports.build = build;
exports.watch = watch;
exports.default = watch;
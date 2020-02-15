const gulp = require('gulp');
const babel = require('gulp-babel');
const cache = require('gulp-cached');
const gulpIf = require('gulp-if');
const nodemon = require('gulp-nodemon');
const rev = require('gulp-rev');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const ts = require('gulp-typescript');
const zip = require('gulp-zip');
const webpack = require('webpack-stream');
const through = require('through2');
const rsync = require('gulp-rsync');
const revReplace = require('gulp-rev-replace');
const fs = require('fs');
const del = require('del');

const getWebpackConfig = require('./build/webpack');

const tsProject = ts.createProject('tsconfig.json');

function handleError(error) {
  console.error(error);
  this.emit('end');
}

function createCheckServerJSTask({
  name,
  globs,
  destination,
  serverWatchGlobs = undefined,
}) {
  if (serverWatchGlobs) {
    serverWatchGlobs[name] = globs;
  }

  gulp.task(name, () => {
    return gulp
      .src(globs)
      .pipe(tsProject())
      .on('error', handleError)
      .pipe(gulp.dest(destination));
  });
}

function createBuildServerJSTask({
  name,
  globs,
  destination,
  serverWatchGlobs = undefined,
}) {
  if (serverWatchGlobs) {
    serverWatchGlobs[name] = globs;
  }

  gulp.task(name, () => {
    return gulp
      .src(globs)
      .pipe(cache(name))
      .pipe(sourcemaps.init())
      .pipe(babel())
      .on('error', handleError)
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest(destination));
  });
}

function createBuildClientJSWebpackTask(
  name,
  {
    sourceFile,
    destFile,
    destDir,
    cssDestDir,
    cssDestFile,
    production = false,
    watch = false,
    hasCss = true,
    isMobile = false,
  },
) {
  const destFileParts = destFile.split('.');

  // In production mode, add a suffix for caching
  // (see https://webpack.js.org/guides/caching)
  if (production && !isMobile) {
    destFileParts.splice(destFileParts.length - 1, 0, '[contenthash:8]');
    destFile = destFileParts.join('.');
  }

  const webpackConfig = getWebpackConfig(
    {
      hasCss,
      useSourceMaps: !production,
      useCssSourceMaps: !production && !isMobile,
      minimize: production,
      production,
      // For mobile, code-splitting is unneeded because we put
      // all Javascript on the client anyways
      splitChunks: !isMobile,
      emitLoadable: !isMobile,
    },
    {
      output: { filename: destFile, publicPath: '/js/' },
      watch,
    },
  );

  gulp.task(name, taskDone => {
    let cssEmitted = !hasCss || false;
    let jsEmitted = false;
    let taskDoneCalled = false;

    gulp
      .src(sourceFile)
      .pipe(webpack(webpackConfig))
      .pipe(gulpIf(/\.css/, gulp.dest(cssDestDir)))
      .pipe(gulpIf(/\.js/, gulp.dest(destDir)))
      .pipe(
        through.obj((file, enc, cb) => {
          // We want to mark the task as finished as soon as the first set of
          // files are bundled, so we don't block later tasks
          if (
            file.path.match(/\.css(\.\w{8})?(\.asset)?$/) ||
            file.path.endsWith(cssDestFile)
          ) {
            cssEmitted = true;
          }
          if (
            file.path.match(/\.js(\.\w{8})?(\.asset)?$/) ||
            file.path.endsWith(destFile)
          ) {
            jsEmitted = true;
          }

          if (cssEmitted && jsEmitted && !taskDoneCalled) {
            taskDoneCalled = true;
            taskDone();
          }

          cb(null, file);
        }),
      );
  });
}

function createWatchTask(name, watchGlobs) {
  console.log(
    'If watching fails on Linux, consider running `yarn adjust-linux-watch-limit`',
  );
  gulp.task(name, cb => {
    Object.keys(watchGlobs).forEach(taskName => {
      const glob = watchGlobs[taskName];
      gulp.watch(glob, gulp.series(taskName));
    });
    cb();
  });
}

function createRevRenameTask(name, glob, dest, manifestDest, production) {
  gulp.task(name, () => {
    if (production) {
      return gulp
        .src(glob)
        .pipe(rev())
        .pipe(gulp.dest(dest))
        .pipe(rev.manifest()) // Used for rev-replace-references
        .pipe(gulp.dest(manifestDest));
    }
    return gulp.src('.');
  });
}

function createBuildViewsTask(
  name,
  {
    glob,
    dest,
    revManifestPath = '',
    production = false,
    watchGlobs = undefined,
  },
) {
  if (watchGlobs) {
    watchGlobs[name] = glob;
  }

  gulp.task(name, () => {
    let ret = gulp.src(glob);
    if (production && revManifestPath) {
      ret = ret.pipe(
        revReplace({
          replaceInExtensions: ['.html', '.ejs'],
          manifest: gulp.src(revManifestPath),
        }),
      );
      if (watchGlobs) {
        watchGlobs[name] = `{${watchGlobs[name]},${revManifestPath}}`;
      }
    } else {
      ret = ret.pipe(cache(name));
    }

    return ret.pipe(gulp.dest(dest));
  });
}

function createBuildSassTask(
  name,
  glob,
  dests,
  production = false,
  watchGlobs = undefined,
) {
  if (watchGlobs) {
    watchGlobs[name] = glob;
  }

  gulp.task(name, () => {
    let stream = gulp.src(glob);

    if (!production) {
      stream = stream.pipe(sourcemaps.init());
    }

    stream = stream.pipe(sass().on('error', sass.logError));

    if (!production) {
      stream = stream.pipe(sourcemaps.write());
    }

    for (const dest of dests) {
      stream = stream.pipe(gulp.dest(dest));
    }

    return stream;
  });
}

function createCopyGulpTask(taskName, globs, destDir, watchGlobsVar) {
  if (watchGlobsVar) {
    watchGlobsVar[taskName] = globs;
  }

  gulp.task(taskName, () => {
    return gulp
      .src(globs)
      .pipe(cache(taskName))
      .pipe(gulp.dest(destDir));
  });
}

function createCreateDirectoriesGulpTask(taskName, directories) {
  gulp.task(taskName, async () => {
    directories.forEach(dir => {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
    });
  });
}

function createRunServerTask(name, script, watchDirs, env = {}) {
  gulp.task(name, cb => {
    nodemon({
      script: script,
      ext: 'js json ejs css jpg png',
      env,
      delay: 200, // Delay is in milliseconds
      watch: watchDirs,
      stdout: false,
      verbose: true,
    }).on('readable', function() {
      this.stdout.pipe(process.stdout);
      this.stderr.pipe(process.stderr);
      cb();
    });
  });
}

function createSyncTask(name, srcGlobs, rsyncOptions) {
  gulp.task(name, () => gulp.src(srcGlobs).pipe(rsync(rsyncOptions)));
}

/**
 * Get a gulp task to delete all items at a certain path
 * @param {string|string[]} globs
 * @return Promise.<void>
 */
function createDeleteTask(name, globs) {
  gulp.task(name, () => {
    globs = globs instanceof Array ? globs : [globs];
    return del(globs);
  });
}

/**
 * Zips a bunch of files into
 */
function createZipTask(
  name,
  globs,
  outputFile,
  outputDir,
  watchGlobs = undefined,
) {
  if (watchGlobs) {
    watchGlobs[name] = globs;
  }

  gulp.task(name, () =>
    gulp
      .src(globs)
      .pipe(zip(outputFile))
      .pipe(gulp.dest(outputDir)),
  );
}

module.exports = {
  createCheckServerJSTask,
  createBuildServerJSTask,
  createBuildClientJSWebpackTask,
  createWatchTask,
  createRevRenameTask,
  createBuildViewsTask,
  createBuildSassTask,
  createCopyGulpTask,
  createCreateDirectoriesGulpTask,
  createRunServerTask,
  createSyncTask,
  createDeleteTask,
  createZipTask,
};

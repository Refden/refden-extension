// Desktop notification for webpack compilations.
//
// This replaces webpack-notifier, which pulls in node-notifier. node-notifier
// vendors `terminal-notifier` as an x86_64-only Mach-O binary; on Apple Silicon
// without Rosetta 2 the spawn fails with EBADARCH ("Unknown system error -86").
// webpack-notifier calls notify() with no callback, so that throw escapes into
// the compilation and kills `yarn start` / `yarn compress` even though the
// build itself succeeded.
//
// Notifications are cosmetic, so this shells out to the OS directly and
// swallows every failure: a missing or broken notifier must never fail a build.
const { spawn } = require('child_process');

const TITLE = 'Webpack';

// AppleScript string literal: escape backslashes, then quotes, and flatten
// newlines (legal in AppleScript, but osascript arg parsing gets unhappy).
const appleScriptString = (text) =>
  `"${String(text).replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/[\r\n]+/g, ' ')}"`;

const COMMANDS = {
  darwin: (message) => [
    'osascript',
    ['-e', `display notification ${appleScriptString(message)} with title ${appleScriptString(TITLE)}`],
  ],
  linux: (message) => ['notify-send', [TITLE, message]],
};

const notify = (message) => {
  const buildCommand = COMMANDS[process.platform];
  if (!buildCommand) return;

  try {
    const [command, args] = buildCommand(message);
    const child = spawn(command, args, { stdio: 'ignore', detached: true });
    // notify-send is missing on many Linux installs. The failure arrives as an
    // async 'error' event, and an unhandled one would crash the build the same
    // way EBADARCH did.
    child.on('error', () => {});
    child.unref();
  } catch {
    // a broken notifier is not a build failure
  }
};

const describeCompilation = (stats) => {
  const { errors, warnings } = stats.compilation;

  if (errors.length) {
    return `Failed to compile: ${errors.length} error${errors.length === 1 ? '' : 's'}`;
  }
  if (warnings.length) {
    return `Compiled with ${warnings.length} warning${warnings.length === 1 ? '' : 's'}`;
  }

  const { time } = stats.toJson({ all: false, timings: true });
  return time ? `Compiled successfully in ${time} ms` : 'Compiled successfully';
};

class WebpackNotifierPlugin {
  apply(compiler) {
    compiler.hooks.done.tap('WebpackNotifier', (stats) => {
      try {
        notify(describeCompilation(stats));
      } catch {
        // a notification failure is not a build failure
      }
    });
  }
}

module.exports = WebpackNotifierPlugin;

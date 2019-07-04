const { formatErrorMessage } = require('./formatMessages');

class CustomOutputPlugin {
  constructor(cb) {
    // this.stdout = (message) => void
    // TODO: message -> { type: ..., message: ... }
    this.stdout = cb;
  }

  // Define `apply` as its prototype method which is supplied with compiler as its argument
  apply(compiler) {
    compiler.hooks.invalid.tap('invalid', () => {
      this.stdout('compiling...');
    });

    compiler.hooks.done.tap('done', stats => {
      // don't care about module messages
      // just warnings + errors
      const statsData = stats.toJson({
        all: false,
        warnings: true,
        errors: true
      });

      const wasSuccessful =
        !statsData.errors.length && !statsData.warnings.length;
      if (wasSuccessful) {
        this.stdout('success!');
      }

      if (statsData.errors.length) {
        const error = statsData.errors[0];
        return this.stdout(formatErrorMessage(error));
      }

      if (statsData.warnings.length) {
        this.stdout(statsData.warnings.join('\n\n'));
      }
    });
  }
}

module.exports = CustomOutputPlugin;

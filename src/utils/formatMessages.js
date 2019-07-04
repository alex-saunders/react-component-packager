const formatErrorMessage = error => {
  let lines = error.split('\n');
  lines = lines.filter(line => !/Module [A-z ]+\(from/.test(line));

  // Remove leading lines
  if (lines.length > 2 && lines[1].trim() === '') {
    lines.splice(0, 2);
  }

  // Remove duplicated newlines
  lines = lines.filter(
    (line, index, arr) =>
      index === 0 || line.trim() !== '' || line.trim() !== arr[index - 1].trim()
  );

  // Reassemble the message
  const message = lines.join('\n');
  return message.trim();
};

const formatWarningMessage = message => message;

module.exports = {
  formatErrorMessage,
  formatWarningMessage
};

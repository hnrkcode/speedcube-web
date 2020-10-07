export const formatDate = (date, format = {}) => {
  // Default formatting is YYYY-MM-DD hh:mm:ss.
  if (Object.keys(format).length === 0) {
    format.year = "numeric";
    format.month = "numeric";
    format.day = "numeric";
    format.hour = "numeric";
    format.minute = "numeric";
    format.second = "numeric";
  }

  return new Date(date).toLocaleDateString("sv-SE", format);
};

export const formatTime = (duration) => {
  // Add zero before single digit numbers.
  const pad = (num) => ("0" + num.toString()).slice(-2);

  const ms = duration % 1000;
  duration = (duration - ms) / 1000;
  const secs = duration % 60;
  duration = (duration - secs) / 60;
  const mins = duration % 60;
  const hours = (duration - mins) / 60;

  if (hours) return `${hours}:${pad(mins)}:${pad(secs)}.${ms}`;
  if (mins) return `${mins}:${pad(secs)}.${ms}`;
  if (secs === 0 && ms === 0) return "0.00";

  return `${secs}.${ms}`;
};

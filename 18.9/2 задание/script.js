function progress(timeInSeconds) {
  const bar = document.getElementById('progress-bar');
  const timeLabel = document.getElementById('progress-time');
  if (!bar) return;

  const duration = Math.max(timeInSeconds, 2); // минимум 2 секунды

  bar.style.transition = 'none';
  bar.style.transform = 'scaleX(0)';
  if (timeLabel) timeLabel.textContent = '0 c';

  requestAnimationFrame(() => {
    bar.style.transition = `transform ${duration}s linear`;
    bar.style.transform = 'scaleX(1)';
  });

  if (timeLabel) {
    let elapsed = 0;
    const intervalId = setInterval(() => {
      elapsed += 1;
      if (elapsed <= duration) {
        timeLabel.textContent = `${elapsed} c`;
      }
      if (elapsed >= duration) {
        clearInterval(intervalId);
      }
    }, 1000);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  progress(7); 
});
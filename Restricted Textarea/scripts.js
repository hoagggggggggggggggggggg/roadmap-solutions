const textarea = document.getElementById('message');
const counter = document.getElementById('counter');
const maxChars = 250;

textarea.addEventListener('input', () => {
  const currentLength = textarea.value.length;

  if (currentLength > maxChars) {
    textarea.value = textarea.value.substring(0, maxChars);
  }

  const isLimitReached = currentLength >= maxChars;
  counter.textContent = `${textarea.value.length} / ${maxChars}`;
  textarea.classList.toggle('limit-reached', isLimitReached);
  counter.classList.toggle('limit-reached', isLimitReached);
});

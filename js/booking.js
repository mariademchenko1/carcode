document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('bookingForm');
  const dateInput = document.getElementById('date');
  const result = document.getElementById('bookingResult');
  const captchaAnswer = document.getElementById('captchaAnswer');

  if (!form || !dateInput || !result || !captchaAnswer) return;

  const today = new Date().toISOString().split('T')[0];
  dateInput.min = today;
  dateInput.value = today;

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    result.className = '';

    if (captchaAnswer.value.trim() !== '8') {
      result.textContent = 'Проверьте ответ на вопрос капчи.';
      result.classList.add('error');
      captchaAnswer.focus();
      return;
    }

    const button = form.querySelector('button[type="submit"]');
    const originalText = button.textContent;
    button.textContent = 'Отправляем...';
    button.disabled = true;

    setTimeout(() => {
      result.textContent = 'Заявка отправлена. Мы свяжемся с вами для подтверждения записи.';
      result.classList.add('success');
      form.reset();
      dateInput.value = today;
      button.textContent = originalText;
      button.disabled = false;
    }, 700);
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contactForm');
  const success = document.getElementById('formSuccess');

  function showError(id, msg) {
    const el = document.getElementById(id);
    if(el) el.textContent = msg;
  }
  function clearError(id) {
    const el = document.getElementById(id);
    if(el) el.textContent = '';
  }

  ['nameInput','emailInput','phoneInput','msgInput'].forEach((id, i) => {
    document.getElementById(id)?.addEventListener('input', () => {
      clearError(['nameError','emailError','phoneError','msgError'][i]);
    });
  });

  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;

    const name = document.getElementById('nameInput').value.trim();
    const email = document.getElementById('emailInput').value.trim();
    const phone = document.getElementById('phoneInput').value.trim();
    const msg = document.getElementById('msgInput').value.trim();

    if (name.length < 2) { showError('nameError', 'Name must be at least 2 characters.'); valid = false; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { showError('emailError', 'Enter a valid email address.'); valid = false; }
    if (!/^\d{10,}$/.test(phone)) { showError('phoneError', 'Phone must be at least 10 digits (numbers only).'); valid = false; }
    if (msg.length < 10) { showError('msgError', 'Message must be at least 10 characters.'); valid = false; }

    if (valid) {
      form.style.display = 'none';
      if(success) success.style.display = 'block';
    }
  });
});
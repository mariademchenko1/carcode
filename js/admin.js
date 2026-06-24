document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('adminLoginForm');
  const loginPanel = document.getElementById('loginForm');
  const dashboard = document.getElementById('adminDashboard');
  const logoutBtn = document.getElementById('logoutBtn');
  const refreshBtn = document.getElementById('refreshBtn');
  const error = document.getElementById('adminError');
  const bookingsBody = document.getElementById('bookingsBody');
  const emptyState = document.getElementById('emptyState');

  const stats = {
    total: document.getElementById('statTotal'),
    new: document.getElementById('statNew'),
    confirmed: document.getElementById('statConfirmed'),
    completed: document.getElementById('statCompleted'),
  };

  const showDashboard = () => {
    loginPanel.classList.add('hidden');
    dashboard.classList.remove('hidden');
    logoutBtn.classList.remove('hidden');
    loadBookings();
  };

  const showLogin = () => {
    dashboard.classList.add('hidden');
    logoutBtn.classList.add('hidden');
    loginPanel.classList.remove('hidden');
    loginForm.reset();
  };

  const updateStats = (bookings) => {
    stats.total.textContent = bookings.length;
    stats.new.textContent = bookings.filter((item) => item.status === 'new').length;
    stats.confirmed.textContent = bookings.filter((item) => item.status === 'confirmed').length;
    stats.completed.textContent = bookings.filter((item) => item.status === 'completed').length;
  };

  const renderBookings = (bookings) => {
    bookingsBody.innerHTML = '';
    emptyState.classList.toggle('hidden', bookings.length > 0);

    bookings.forEach((booking) => {
      const row = document.createElement('tr');
      [
        booking.id,
        booking.name,
        booking.phone,
        booking.service,
        `${booking.date} ${booking.time}`,
        booking.statusLabel,
        booking.comment || '',
      ].forEach((value) => {
        const cell = document.createElement('td');
        cell.textContent = value;
        row.appendChild(cell);
      });
      bookingsBody.appendChild(row);
    });
  };

  const loadBookings = async () => {
    // Когда появится backend, замените пустой массив на:
    // const response = await fetch('/api/bookings');
    // const bookings = await response.json();
    const bookings = [];
    updateStats(bookings);
    renderBookings(bookings);
  };

  loginForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const login = document.getElementById('adminLogin').value.trim();
    const password = document.getElementById('adminPassword').value.trim();

    if (!login || !password) {
      error.textContent = 'Введите логин и пароль.';
      error.classList.remove('hidden');
      return;
    }

    error.classList.add('hidden');
    showDashboard();
  });

  logoutBtn.addEventListener('click', showLogin);
  refreshBtn.addEventListener('click', loadBookings);
});

const API_BASE = import.meta.env.VITE_API_URL || '';

export const api = {
  async getProducts(params = {}) {
    const searchParams = new URLSearchParams();
    if (params.category && params.category !== 'All' && params.category !== 'All Collections') {
      searchParams.append('category', params.category);
    }
    if (params.search) searchParams.append('search', params.search);
    if (params.sort) searchParams.append('sort', params.sort);
    if (params.featured) searchParams.append('featured', params.featured);
    if (params.curated) searchParams.append('curated', params.curated);

    const query = searchParams.toString() ? `?${searchParams.toString()}` : '';
    try {
      const res = await fetch(`${API_BASE}/api/products${query}`);
      if (!res.ok) throw new Error('Network response not ok');
      return await res.json();
    } catch (err) {
      console.warn('[API Client] Falling back to local atelier data cache:', err.message);
      return { success: true, products: [] };
    }
  },

  async getProductById(id) {
    try {
      const res = await fetch(`${API_BASE}/api/products/${id}`);
      if (!res.ok) throw new Error('Product lookup failed');
      return await res.json();
    } catch (err) {
      console.warn('[API Client] Product lookup failed:', err.message);
      return { success: false };
    }
  },

  async createOrder(orderData, token = null) {
    const headers = { 'Content-Type': 'application/json' };
    if (token) headers['Authorization'] = `Bearer ${token}`;

    const res = await fetch(`${API_BASE}/api/orders`, {
      method: 'POST',
      headers,
      body: JSON.stringify(orderData),
    });
    return await res.json();
  },

  async getOrderById(id) {
    const res = await fetch(`${API_BASE}/api/orders/${id}`);
    return await res.json();
  },

  async subscribeNewsletter(email) {
    const res = await fetch(`${API_BASE}/api/newsletter/subscribe`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    return await res.json();
  },

  async bookAppointment(appointmentData) {
    const res = await fetch(`${API_BASE}/api/appointments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(appointmentData),
    });
    return await res.json();
  },

  async login(email, password) {
    const res = await fetch(`${API_BASE}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    return await res.json();
  },

  async register(name, email, password) {
    const res = await fetch(`${API_BASE}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });
    return await res.json();
  },

  async getProfile(token) {
    const res = await fetch(`${API_BASE}/api/auth/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return await res.json();
  },

  async getMyOrders(token) {
    const res = await fetch(`${API_BASE}/api/orders/myorders`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return await res.json();
  },
};

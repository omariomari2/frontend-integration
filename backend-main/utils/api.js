const API_URL = "http://10.232.142.23:5000/api";

export async function login(email, password) {
  try {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    return await res.json();
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
}

export async function register(firstName, lastName, email, password) {
  try {
    const res = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ firstName, lastName, email, password }),
    });
    return await res.json();
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
}

export async function getProfile(token) {
  try {
    const res = await fetch(`${API_URL}/auth/profile`, {
      method: "GET",
      headers: { 
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
    });
    return await res.json();
  } catch (error) {
    console.error('Profile fetch error:', error);
    throw error;
  }
} 
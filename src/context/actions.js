const BASE_URL = 'https://krvga-7efc9d7c87af.herokuapp.com/api';
const dev_url = 'http://localhost:5000/api';

export const fetchMembershipTypes = async () => {
  try {
    const response = await fetch(`${dev_url}/membership-purchase/types`);
    const result = await response.json();

    return result;
  } catch (error) {
    const errorMessage =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();

    return {error: errorMessage};
  }
};

export const requestPurchaseMembership = async (purchaseData) => {
  try {
    const response = await fetch(`${dev_url}/stripe/checkout-session`, {
      method: 'POST',
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify(purchaseData),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    const errorMessage =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();

    return {error: errorMessage};
  }
};

export const requestProcessMembershipPurchase = async (checkout_session_id) => {
  try {
    const response = await fetch(
      `${dev_url}/membership-purchase/${checkout_session_id}`,
      {
        method: 'POST',
      }
    );
    const result = await response.json();
    return result;
  } catch (error) {
    const errorMessage =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();

    return {error: errorMessage};
  }
};

export const register = async (userData) => {
  try {
    const response = await fetch(`${dev_url}/user`, {
      method: 'POST',
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify(userData),
    });
    const result = await response.json();
    if (result.success) {
      localStorage.setItem('ut', JSON.stringify(result.token));
      return result;
    }
    return result;
  } catch (error) {
    const errorMessage =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();

    return {error: errorMessage};
  }
};

export const logIn = async (userData) => {
  try {
    const response = await fetch(`${dev_url}/user/login`, {
      method: 'POST',
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify(userData),
    });
    const result = await response.json();

    if (result.success) {
      localStorage.setItem('ut', JSON.stringify(result.token));
      return result;
    }
    return result;
  } catch (error) {
    const errorMessage =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();

    return {error: errorMessage};
  }
};

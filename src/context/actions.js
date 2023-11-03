const BASE_URL = 'https://krvga-7efc9d7c87af.herokuapp.com/api';
const dev_url = 'http://localhost:5000/api';

export const fetchMembershipTypes = async () => {
  try {
    const response = await fetch(`${BASE_URL}/membership-purchase/types`);
    const result = await response.json();

    return result;
  } catch (error) {
    const errorMessage =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();

    return {error: errorMessage ? errorMessage : 'Something went wrong.'};
  }
};

export const requestPurchaseMembership = async (purchaseData) => {
  try {
    const response = await fetch(`${BASE_URL}/stripe/checkout-session`, {
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

    return {error: errorMessage ? errorMessage : 'Something went wrong.'};
  }
};

export const requestProcessMembershipPurchase = async (checkout_session_id) => {
  try {
    const response = await fetch(
      `${BASE_URL}/membership-purchase/${checkout_session_id}`,
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

    return {error: errorMessage ? errorMessage : 'Something went wrong.'};
  }
};

export const getUserProfileInfo = async (token) => {
  try {
    const response = await fetch(`${BASE_URL}/user/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const result = await response.json();
    return result;
  } catch (error) {
    const errorMessage =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();

    return {error: errorMessage ? errorMessage : 'Something went wrong.'};
  }
};

export const register = async (userData) => {
  try {
    const response = await fetch(`${BASE_URL}/user`, {
      method: 'POST',
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify(userData),
    });
    const result = await response.json();
    if (result.register_success) {
      localStorage.setItem(
        'user',
        JSON.stringify({ut: result.token, id: result.id})
      );
    }
    return result;
  } catch (error) {
    const errorMessage =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();

    return {error: errorMessage ? errorMessage : 'Something went wrong.'};
  }
};

export const logIn = async (userData) => {
  try {
    const response = await fetch(`${BASE_URL}/user/login`, {
      method: 'POST',
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify(userData),
    });
    const result = await response.json();

    if (result.login_success) {
      localStorage.setItem(
        'user',
        JSON.stringify({ut: result.token, id: result.id})
      );
    }
    return result;
  } catch (error) {
    const errorMessage =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();

    return {error: errorMessage ? errorMessage : 'Something went wrong.'};
  }
};

export const downloadPaperApp = async () => {
  try {
    const result = await fetch(`${BASE_URL}/download/2023Application.docx.pdf`);
    return result;
  } catch (error) {
    const errorMessage =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();

    return {error: errorMessage ? errorMessage : 'Something went wrong.'};
  }
};

export const resetPwd = async (email) => {
  try {
    const response = await fetch(`${BASE_URL}/user/password-reset`, {
      headers: {'Content-type': 'application/json'},
      method: 'POST',
      body: JSON.stringify({email}),
    });
    const result = await response.json();

    return result;
  } catch (error) {
    const errorMessage =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();

    return {error: errorMessage ? errorMessage : 'Something went wrong.'};
  }
};

export const updatePassword = async ({
  previous_password,
  new_password,
  repeat_new_pwd,
  tokenString,
}) => {
  try {
    const response = await fetch(
      `${BASE_URL}/user/change-password/${tokenString}`,
      {
        headers: {'Content-type': 'application/json'},
        method: 'PUT',
        body: JSON.stringify({
          currentPassword: previous_password,
          newPassword: new_password,
          repeatNewPassword: repeat_new_pwd,
        }),
      }
    );
    const result = await response.json();

    return result;
  } catch (error) {
    const errorMessage =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();

    return {error: errorMessage ? errorMessage : 'Something went wrong.'};
  }
};

export const logoutUser = async () => await localStorage.removeItem('user');

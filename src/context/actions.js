const BASE_URL = 'https://krvga-7efc9d7c87af.herokuapp.com/api';

export const fetchMembershipTypes = async () => {
  try {
    const response = await fetch(`${BASE_URL}/membership-purchase/types`);
    const result = await response.json();

    return result;
  } catch (error) {
    console.log(error);
  }
};

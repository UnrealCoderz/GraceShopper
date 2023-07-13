const API_URL = "http://localhost:4000/api";

async function LoginPerson(UserObj) {
  try {
    const response = await fetch(`${API_URL}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: UserObj.email,
        password: UserObj.password,
      }),
    });
    const result = await response.json();
    console.log(result);
    return result.token;
  } catch (error) {
    throw error;
  }
}

async function RegisterPerson(UserObj) {
  try {
    const response = await fetch(`${API_URL}/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: UserObj.username,
        email: UserObj.email,
        password: UserObj.password,
      }),
    });
    const result = await response.json();
    console.log(result);
    return result;
  } catch (error) {
    throw error;
  }
}

export { RegisterPerson, LoginPerson };

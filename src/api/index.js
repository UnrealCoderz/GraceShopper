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

async function createProduct(prodObj) {
  try {
    const response = await fetch(`${API_URL}/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(prodObj),
    });
    const result = await response.json();
    console.log(result);
    cpnsole.log(prodObj);
    return result;
  } catch (error) {
    throw error;
  }
}

async function GetAllProducts() {
  try {
    const response = await fetch(`${API_URL}/products`, {
      headers: {
      "Content-Type": "application/json"
    },
    });
    const result = await response.json();
    return result;
  }
  catch (error) {
    console.error(error);
  }
}

const myData = async (token) => {
  try {
    const response = await fetch(`${API_URL}/users/me`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const result = await response.json();

    return result;
  } catch (err) {
    console.error(err);
  }
};

const getAllProducts = async () => {
  try {
    const response = await fetch(`${API_URL}/products`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();
    console.log(result);
    return result;
  } catch (err) {
    console.error(err);
  }
};

export { RegisterPerson, LoginPerson, myData, GetAllProducts, getAllProducts, createProduct };

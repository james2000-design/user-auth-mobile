import axios from "axios";

const API_KEY = process.env.EXPO_PUBLIC_API_KEY;

async function authenticate(mode: string, email: any, password: any) {
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`;

 try {
  const response = await axios.post(url, {
    email,
    password,
    returnSecureToken: true,
  });
  return response.data.idToken;
} catch (err: any) {
  console.log("Auth error:", err.response?.data || err.message);
  throw err;
}

}

export function createUser(email: any, password: any) {
  return authenticate("signUp", email, password);
}

export function login(email: any, password: any) {
  return authenticate("signInWithPassword", email, password);
}

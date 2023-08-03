export async function httpRequestJson(method, uri, body) {
  const apiUrl = `http://localhost:3001/${uri}`;

  let options = {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  const res = await fetch(apiUrl, options);
  return res.json();
}

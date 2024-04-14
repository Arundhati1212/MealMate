export async function fetchMeals() {
  const res = await fetch("http://localhost:3000/meals");
  const data = await res.json();
  if (!res.ok) {
    console.log("errorr");
    throw new Error("Failed to fetch 😓");
  }

  return [...data];
}

export async function placeOrder(orderData) {
  const response = await fetch("http://localhost:3000/orders", {
    method: "POST",
    body: JSON.stringify(orderData),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error("Failed to send order");
  }
  return data.message;
}

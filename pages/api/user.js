import prisma from "../../lib/prisma.ts";

export default async function handler(req, res) {
  const { email } = req.body;

  console.log(email);
  const result = await (
    await fetch(`https://common-assets.herokuapp.com/User`, {
      method: "POST",
      body: JSON.stringify({ email: email }),
      headers: {
        "Content-Type": "application/json",
      },
    })
  ).json();

  console.log(result);
  res.json(result);
}

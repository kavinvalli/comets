import { getSession } from "next-auth/react";
import prisma from "../../lib/prisma.ts";

export default async function handler(req, res) {
  const { name, uname, apikey } = req.body;

  const session = await getSession({ req });
  const exists = await prisma.app.findFirst({
    where: {
      uname,
    },
  });
  if (exists) {
    return res.status(400).json({
      message: "App with unique id already exists",
    });
  }
  console.log(apikey);

  const result = await (
    await fetch(`https://common-assets.herokuapp.com/App?auth=${apikey}`, {
      method: "POST",
      body: JSON.stringify({ name: uname }),
      headers: {
        "Content-Type": "application/json",
      },
    })
  ).json();
  console.log(result);

  const r = await prisma.app.create({
    data: {
      name,
      uname,
      apiKey: result.key,
      madeBy: { connect: { email: session.user.email } },
    },
  });
  return res.json(r);
}

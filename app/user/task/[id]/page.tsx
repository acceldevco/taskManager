
import jwt from "jsonwebtoken";
import TaskId from "./TaskId";
async function page() {
  const JWT_SECRET = process.env.ACCESS_TOKEN!;
  async function crypto(params: any) {
    "use server";
    const token = jwt.sign(params, JWT_SECRET, { expiresIn: "1d" })
    return token;
  }

  return (
    <>
      <TaskId cry={crypto} />
    </>
  );
}

export default page;

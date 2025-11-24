
import GroupList from "./Group";
import jwt from "jsonwebtoken";
async function page() {
  const JWT_SECRET = process.env.ACCESS_TOKEN!;
  async function crypto(params: any) {
    "use server";
    const token = jwt.sign(params, JWT_SECRET, { expiresIn: "1d" })
    return token;
  }
  return ( <>
  <GroupList crypto={crypto}/>
  </> );
}

export default page;
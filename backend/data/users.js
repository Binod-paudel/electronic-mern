import bcrypt from "bcryptjs";

const users = [
  {
    name: "admin",
    email: "admin@example.com",
    password: bcrypt.hashSync("password", 10),
    role: "admin",
  },
  {
    name: "John Doe",
    email: "john.doe@example.com",
    password: bcrypt.hashSync("password", 10),
    role: "customer",
  },
  {
    name: "Jane Doe",
    email: "jane.doe@example.com",
    password: bcrypt.hashSync("password", 10),
    role: "customer",
  },
];

export default users;

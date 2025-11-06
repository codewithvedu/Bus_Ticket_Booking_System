import { compareSync, hashSync } from "bcrypt";
import { getConnectionObject } from "../configs/DbConfig.js";
import jwt from "jsonwebtoken";

//  Register new user
export async function registerUser(request, response) {
  try {
    const connection = await getConnectionObject();
    const { fullname, email, password } = request.body;

    // Encrypt password
    const encryptedPassword = hashSync(password, 12);

    // Use parameterized query to avoid SQL injection
    const qry = "INSERT INTO users (fullname, email, password) VALUES (?, ?, ?)";
    const [resultSet] = await connection.query(qry, [fullname, email, encryptedPassword]);

    if (resultSet.affectedRows === 1) {
      response.status(200).send({ message: "Registration successful. You can now login." });
    } else {
      response.status(500).send({ message: "User registration failed" });
    }
  } catch (error) {
    console.error(error);
    response.status(500).send({ message: "Something went wrong" });
  }
}

//  Login existing user
// export async function userLogin(request, response) {
//   try {
//     const connection = await getConnectionObject();
//     const { email, password } = request.body;

//     const qry = "SELECT * FROM users WHERE email = ?";
//     const [rows] = await connection.query(qry, [email]);

//     if (rows.length === 0) {
//       return response.status(400).send({ message: "Login failed, email not found" });
//     }

//     // Compare encrypted password
//     if (compareSync(password, rows[0].password)) {
//       const token = jwt.sign({ userId: rows[0].id }, "userSecret123", { expiresIn: "1h" });
//       return response.status(200).send({
//         token,
//         message: "Login successful",
//         user: {
//           id: rows[0].id,
//           fullname: rows[0].fullname,
//           email: rows[0].email,
//         },
//       });
//     } else {
//       return response.status(400).send({ message: "Invalid password" });
//     }
//   } catch (error) {
//     console.error(error);
//     response.status(500).send({ message: "Something went wrong" });
//   }
// }

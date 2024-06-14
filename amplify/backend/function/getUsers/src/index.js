const mysql = require('mysql2/promise');

exports.handler = async (event) => {
  console.log(`EVENT: ${JSON.stringify(event)}`);
  console.log(process.env.DB_HOST)

  try {
    // Replace with actual connection pool configuration
    const pool = mysql.createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME
    });

    const { httpMethod, path, body } = event; // Extract details from event

    switch (httpMethod) {
      case 'GET':
        const [rows] = await pool.query('select * from users;');
        return {
          statusCode: 200,
          // Uncomment below to enable CORS requests
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "*"
          },
          body: JSON.stringify(rows),
        };

      case 'POST':
        if (!body) {
          return {
            statusCode: 400,
            body: JSON.stringify({ message: 'Missing request body' })
          };
        }

        const newUser = JSON.parse(body);
        const { name, email } = newUser; // Assuming these fields in users table

        const [insertResult] = await pool.query(
          'insert into users (name, email) values (?, ?)',
          [name, email]
        );

        return {
          statusCode: 201, // Created
          body: JSON.stringify({ message: 'User created successfully', id: insertResult.insertId })
        };

      case 'PUT':
        if (!path.includes('/')) {
          return {
            statusCode: 400,
            body: JSON.stringify({ message: 'Missing user ID in path' })
          };
        }

        const userId = path.split('/')[1];
        if (!body) {
          return {
            statusCode: 400,
            body: JSON.stringify({ message: 'Missing request body' })
          };
        }

        const updateUser = JSON.parse(body);
        const { name, email } = updateUser; // Assuming these fields in users table

        const [updateResult] = await pool.query(
          'update users set name = ?, email = ? where id = ?',
          [name, email, userId]
        );

        if (updateResult.affectedRows === 0) {
          return {
            statusCode: 404, // Not Found
            body: JSON.stringify({ message: 'User not found' })
          };
        }

        return {
          statusCode: 200,
          body: JSON.stringify({ message: 'User updated successfully' })
        };

      case 'DELETE':
        if (!path.includes('/')) {
          return {
            statusCode: 400,
            body: JSON.stringify({ message: 'Missing user ID in path' })
          };
        }

        const userId = path.split('/')[1];

        const [deleteResult] = await pool.query(
          'delete from users where id = ?',
          [userId]
        );

        if (deleteResult.affectedRows === 0) {
          return {
            statusCode: 404, // Not Found
            body: JSON.stringify({ message: 'User not found' })
          };
        }

        return {
          statusCode: 200,
          body: JSON.stringify({ message: 'User deleted successfully' })
        };

      default:
        return {
          statusCode: 405, // Method Not Allowed
          body: JSON.stringify({ message: `Method ${httpMethod} not supported` })
        };
    }
  } catch (error) {
    console.error(error);

    return {
      statusCode: 500,
      body: JSON.stringify({ message: error }),
    };
  }
};
# BASIC REST API w/ Bun & SQLite

This README provides instructions for installing and using a simple REST API built with the Bun framework and utilizing an SQLite database. The API supports operations for creating and retrieving animals.

## Tech Stack

1. **Bun** ⚡ -> fast javascript runtime
2. **SQLite** 📄 -> database
3. **Zod** ✏️ -> input validation

## Installation

1. **Prerequisites**

   Ensure that Bun is installed on your machine.If not, you can download it from [the official Bun website](https://bun.sh/).

   Or by running

   ```bash
   curl -fsSL https://bun.sh/install | bash
   ```

2. **Clone the Repository**

   Clone this repository to your machine using the following command:

   ```bash
   git clone https://github.com/your-user/your-repo.git
   ```

3. **Install Dependencies**

   Navigate to the project directory and install the dependencies by running the following command:

   ```bash
   bun install
   ```

4. **Run the API**

   Start the API by using the Bun CLI:

   ```bash
   bun start
   ```

   The API will be accessible at `http://localhost:8080`.

## Endpoints

### 1. Create a New Animal

- **Endpoint:** `POST /api/animals`
- **Expected Data:**
  - A JSON object containing the name of the animal.
    ```json
    {
      "name": "Animal Name"
    }
    ```
- **Response (201 Created):**
  - A JSON object containing information about the created animal.
    ```json
    {
      "animal": {
        "name": "Animal Name"
      }
    }
    ```

### 2. Retrieve All Animals

- **Endpoint:** `GET /api/animals`
- **Response (200 OK):**
  - A JSON object containing the list of all registered animals.
    ```json
    {
      "animals": [
        {
          "id": 1,
          "name": "Animal Name 1"
        },
        {
          "id": 2,
          "name": "Animal Name 2"
        }
        // ...
      ]
    }
    ```

### 3. Welcome Message

- **Endpoint:** `GET /api`
- **Response (200 OK):**
  - A JSON object containing a welcome message.
    ```json
    {
      "message": "Hello world! ✨"
    }
    ```

You will receive a "Not Found" response with a 404 status for any other unspecified route or method.

---

The API is now operational, and you can begin interacting with it using the mentioned endpoints. Feel free to add additional features based on your specific needs.

---

## License

[MIT](https://choosealicense.com/licenses/mit/)
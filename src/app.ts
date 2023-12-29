import { Database } from "bun:sqlite";
import { z } from "zod";
import os from "os";

const db = new Database("db.sqlite", { create: true });

db.exec(`
    CREATE TABLE IF NOT EXISTS animals (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name VARCHAR(255) NOT NULL
    );
`);

const createAnimalSchema = z.object({
  name: z.string().max(32),
});

Bun.serve({
  port: 8080,
  async fetch(req) {
    const url = new URL(req.url);
    const { method } = req;

    const name = os.hostname();

    if (url) {
      const { pathname } = url;

      console.log(`${req.method} ${pathname}`);

      /**
       * All POST request
       */
      if (method === "POST") {
        const json = await req.json();

        /**
         * Create animal
         * POST /api/animals
         */
        if (pathname === "/api/animals") {
          // Parse
          const createAnimalData = createAnimalSchema.safeParse(json);

          //   Validate schema
          if (!createAnimalData.success) {
            return new Response(
              JSON.stringify({ message: "Please give a valid animal object" }),
              { status: 400 }
            );
          }

          // Extract data
          const { data } = createAnimalData;

          // Create in DB
          const query = db.query("INSERT INTO animals (name) VALUES (?1)");
          const animal = query.run(data.name);

          console.log(`Animal created`, data);

          return new Response(JSON.stringify({ animal: data }), {
            headers: {
              "Content-Type": "application/json",
            },
            status: 201,
          });
        }
      }

      /**
       * All GET request
       */
      if (method === "GET") {
        // GET /api
        if (pathname === "/api") {
          return new Response(
            JSON.stringify({ message: "Hello world! ✨", server: name }),
            {
              headers: {
                "Content-Type": "application/json",
              },
              status: 200,
            }
          );
        }

        /**
         * Find all animals
         * GET /api/animals
         */
        if (pathname === "/api/animals") {
          // Find from DB
          const animals = db.query("SELECT * FROM animals").get();

          console.log(`Animals find`, animals);

          return new Response(JSON.stringify({ animals }), {
            headers: {
              "Content-Type": "application/json",
            },
          });
        }
      }

      if (method === "PATCH") {
      }

      if (method === "DELETE") {
      }
    }

    return new Response("Not Found", { status: 404 });
  },
});

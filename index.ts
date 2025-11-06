import { faker } from "@faker-js/faker";
import "expo-router/entry";
import {
  belongsTo,
  createServer,
  Factory,
  hasMany,
  Model,
  Response,
  RestSerializer,
  Server,
} from "miragejs";
import { type User } from "./app/_layout";

declare global {
  interface Window {
    server: Server;
  }
}

let mincodin9: User;

if(__DEV__) {
  if( window.server) {
    window.server.shutdown();
  }

  window.server = createServer({
    models: {
      user: Model.extend({
        posts: hasMany("post"),
        activities: hasMany("activity"),
      }),
      post: Model.extend({
        user: belongsTo("user"),
      }),
      activity: Model.extend({
        user: belongsTo("user"),
      }),
    },
    serializers: {
      post: RestSerializer.extend({
        include: ["user"],
        embed: true,
      }),
      activity: RestSerializer.extend({
        include: ["user"],
        embed: true,
      }),
    },
    factories: {
      user: Factory.extend({
        id: () => faker.person.firstName(),
        name: () => faker.person.fullName(),
        description: () => faker.lorem.sentence(),
        profileImageUrl: () =>
          `https://avatars.githubusercontent.com/u/${Math.floor(
            Math.random() * 100_000
          )}?v=4`,
        isVerified: () => Math.random() > 0.5,
      }),
      post: Factory.extend({
        id: () => faker.string.numeric(6),
        content: () => faker.lorem.paragraph(),
        imageUrls: () =>
          Array.from({ length: Math.floor(Math.random() * 3) }, () =>
            faker.image.urlLoremFlickr()
          ),
        likes: () => Math.floor(Math.random() * 100),
        comments: () => Math.floor(Math.random() * 100),
        reposts: () => Math.floor(Math.random() * 100),
      }),
    },
    seeds(server) {
      mincodin9 = server.create("user", {
        id: "mincodin9",
        name: "Mincodin9",
        description: "🐬 lover, passionate programmer",
        profileImageUrl: "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNTA0MDJfODcg%2FMDAxNzQzNTY5NzUxMzQy.0B1j0ngDIm1YG497nH_4A71FGVnMQdgtub867eAqoYog.lAHEFDVUZnReM0J6yXu4nr5zbJk5yuIcaI1AuoNQKZEg.JPEG%2FIMG_5123.jpg&type=sc960_832",
      });
      const users = server.createList("user", 10);
      users.forEach((user) => {
        server.createList("post", 5, {
          user,
        });
      });
    },
    routes() {
      this.post("/posts", (schema, request) => {
        const { posts } = JSON.parse(request.requestBody);
        posts.forEach((post: any) => {
          schema.create("post", {
            content: post.content,
            imageUrls: post.imageUrls,
            location: post.location,
            user: schema.find("user", "mincodin9"),
          });
        });
        return new Response(200, {}, { posts });
      })

      this.get("/posts", (schema, request) => {
        console.log("user.all", schema.all("user").models);
        const cursor = parseInt((request.queryParams.cursor as string) || "0");
        const posts = schema.all("post").models.slice(cursor, cursor + 10);
        return new Response(200, {}, { posts });
      });

      this.get("/post/:id", (schema, request) => {
        const post = schema.find("post", request.params.id);
        const comments = schema.all("post").models.slice(0, 10);
        return new Response(200, {}, { post, comments });
      });

      this.post("/login", (schema, request) => {
        const { username, password } = JSON.parse(request.requestBody);

        if(username === "mincodin9" && password === "1234") {
          return {
            accessToken: "access-token",
            refreshToken: "refresh-token",
            user: {
              id: "mincodin9",
              name: "mincodin9",
              description: "🐬 lover, passionate programmer",
              profileImageUrl: "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNTA0MDJfODcg%2FMDAxNzQzNTY5NzUxMzQy.0B1j0ngDIm1YG497nH_4A71FGVnMQdgtub867eAqoYog.lAHEFDVUZnReM0J6yXu4nr5zbJk5yuIcaI1AuoNQKZEg.JPEG%2FIMG_5123.jpg&type=sc960_832"
            },
          };
        } else {
          return new Response(401, {}, { message: "Invalid credentials" });
        }
      });
    },
  });
}

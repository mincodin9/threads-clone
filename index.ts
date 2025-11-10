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

declare global {
  interface Window {
    server: Server;
  }
}

let mincodin9: any;

if(__DEV__) {
  if( window.server) {
    window.server.shutdown();
  }

  window.server = createServer({
    models: {
      user: Model.extend({
        posts: hasMany("post"),
        activities: hasMany("activity"),
        searches: hasMany("search"),
      }),
      post: Model.extend({
        user: belongsTo("user"),
      }),
      activity: Model.extend({
        user: belongsTo("user"),
      }),
      search: Model.extend({
        user: belongsTo("user"),
      })
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
            faker.image.urlLoremFlickr({ category: "nature"})
          ),
        likes: () => Math.floor(Math.random() * 100),
        comments: () => Math.floor(Math.random() * 100),
        reposts: () => Math.floor(Math.random() * 100),
      }),
    },
    seeds(server) {
      mincodin9 = server.create("user", {
        id: "mincodin9",
        name: "Min",
        description: "🐬 lover, passionate programmer",
        profileImageUrl: "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNTA0MDJfODcg%2FMDAxNzQzNTY5NzUxMzQy.0B1j0ngDIm1YG497nH_4A71FGVnMQdgtub867eAqoYog.lAHEFDVUZnReM0J6yXu4nr5zbJk5yuIcaI1AuoNQKZEg.JPEG%2FIMG_5123.jpg&type=sc960_832",
      });
      const users = server.createList("user", 10);
      users.forEach((user) => {
        server.createList("post", 5, {
          user,
        });
      });
      server.createList("post", 5, {
        user: mincodin9,
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
        return posts;
      })

      this.get("/posts", (schema, request) => {
        console.log("request", request.queryParams);
        let posts = schema.all("post");
        if(request.queryParams.type === "following") {
          posts = posts.filter((post) => post.user?.id === mincodin9?.id);
        }
        let targetIndex = -1;
        if(request.queryParams.cursor) {
          targetIndex = posts.models.findIndex(
            (v) => v.id === request.queryParams.cursor
          );
        }
        return posts.slice(targetIndex + 1, targetIndex + 11)
      });

      this.get("/post/:id", (schema, request) => {
        const post = schema.find("post", request.params.id);
        const comments = schema.all("post").slice(0, 10);
        return { post, comments };
      });

      this.get("/users/:id/:type", (schema, request) => {
        console.log("request", request.queryParams);
        let posts = schema.all("post");
        if(request.params.type === "threads") {
          posts = posts.filter((post) => post.user?.id === request.params.id);
        } else if(request.params.type === "reposts") {
          posts = posts.filter((post) => post.user?.id !== request.params.id);
        }
        let targetIndex = -1;
        if(request.queryParams.cursor) {
          targetIndex = posts.models.findIndex(
            (v) => v.id === request.queryParams.cursor
          );
        }
        return posts.slice(targetIndex + 1, targetIndex + 11);
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

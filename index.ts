import "expo-router/entry";
import { createServer, Response, Server } from "miragejs";

declare global {
  interface Window {
    server: Server;
  }
}

if(__DEV__) {
  if( window.server) {
    window.server.shutdown();
  }

  window.server = createServer({
    routes() {
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
              profileImage: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fmypetlife.co.kr%2F146821%2F&psig=AOvVaw22dwDpNCevcaeutOpvuK7T&ust=1759937753435000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCNj-qZi1kpADFQAAAAAdAAAAABAE"
            },
          };
        } else {
          return new Response(401, {}, { message: "Invalid credentials" });
        }
      });
    },
  });
}

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

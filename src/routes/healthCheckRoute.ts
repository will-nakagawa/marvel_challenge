import { ServerRoute } from "@hapi/hapi";

const healthCheckRoutes: ServerRoute[] = [
    {
      method: "GET",
      path: "/",
      handler: () => ({status: 200, message: "ok"}),
    },
  ];
  
  
  export default healthCheckRoutes;
import { ServerRoute } from "@hapi/hapi";
import {start} from '../controller/characterController';

const charactersRoutes: ServerRoute[] = [
    {
      method: "GET",
      path: "/characters/start",
      handler: start,
    },
  ];
  
  
  export default charactersRoutes;
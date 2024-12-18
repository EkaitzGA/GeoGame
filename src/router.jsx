import { createBrowserRouter } from "react-router-dom";
import Root from "./components/root/root";
/* import Flags from "./components/flags/flags";
import Capitals from "./components/capitals/capitals"; */

const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
     /*  children: [
        {
          path: "flags",
          element: <Flags />,
        },
        {
          path: "capitals",
          element: <Capitals />,
        },
      ], */
    },
  ]);
  
  export default router;
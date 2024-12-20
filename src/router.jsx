import { createBrowserRouter } from "react-router-dom";
import Root from "./components/root/root";
import Flags from "./components/flagPage/flagPage";
/* import Capitals from "./components/capitals/capitals";
import Scoreboard from "./components/scoreboard/scoreboard"; */

const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [
        {
          path: "flags",
          element: <Flags />,
        },
       /*  {
          path: "capitals",
          element: <Capitals />,
        },
        {
            path: "scoreboard",
            element: <Scoreboard />,
          }, */
      ],
    },
  ]);
  
  export default router;
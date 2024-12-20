import { createBrowserRouter } from "react-router-dom";
import Root from "./components/root/root";
import Flags from "./components/flagPage/flagPage";
import Capitals from "./components/capitalPage/capitalPage";
import ScoreBoard from "./components/highScoreTable/highScoreTable";



const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [
        {
          path: "flags",
          element: <Flags />,
        },
        {
          path: "capitals",
          element: <Capitals />,
        },
        {
            path: "scoreboard",
            element: <ScoreBoard />,
          },
      ],
    },
  ]);
  
  export default router;
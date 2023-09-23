import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import TempLay from './TempLay/TempLay';
import Home from './Home/Home';
import Quiz from './Quiz/Quiz';
import Summary from './Summary/Summary';


const router = createBrowserRouter([
  {
    path: '/quiz-app',
    element: <TempLay />,
    children: [
      {
        path: '/quiz-app',
        element: <Home />,
      },
      {
        path: '/quiz-app/quiz',
        element: <Quiz />,
      },
      {
        path: '/quiz-app/summary',
        element: <Summary />,
      },
    ],
  },
]);


function App() {
  return (
    <div >
      <RouterProvider router={router} />
    </div>
  );
}

export default App;

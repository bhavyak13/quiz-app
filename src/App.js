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
    path: '/',
    element: <TempLay />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/quiz',
        element: <Quiz />,
      },
      {
        path: '/summary',
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

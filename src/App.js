import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Page1 from "./Components/Page1";
import Page2 from "./Components/Page2";

function App() {
  const appRouter = createBrowserRouter([
    { path: "/", element: <Page1 /> },
    { path: "/page2", element: <Page2 /> },
  ]);
  return (
    <div className="App">
      <RouterProvider router={appRouter} />
    </div>
  );
}

export default App;

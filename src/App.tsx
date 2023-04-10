import { Layout } from "components/Layout";
import { ROUTES } from "routes/routes";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const AppRouter = createBrowserRouter(
  ROUTES.map((route) => {
    const { path, component } = route;

    return {
      path: path,
      element: <Layout>{component}</Layout>,
    };
  })
);

function App() {
  return (
    <div className="App">
      <RouterProvider router={AppRouter} />
    </div>
  );
}

export default App;

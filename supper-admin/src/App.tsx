import { RouterProvider } from "react-router-dom";
import "./App.css";
import { RootRouter } from "./routers";

function App() {
  return (
    <>
      <RouterProvider router={RootRouter} />
    </>
  );
}

export default App;

import { RouterProvider } from "react-router";
import { router } from "./routes";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import { AutoRefresh } from "./components/ui/autoRefrest";

export default function App() {
  return (
    <Provider store={store}>
      <AutoRefresh />
      <RouterProvider router={router} />
    </Provider>
  );
}

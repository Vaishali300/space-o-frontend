import { Route, Routes } from "react-router-dom";

import "./App.css";
import { ROUTING } from "./lib/constants";
import SignIn from "./features/auth";
import NotFound from "./components/OtherPage/NotFound";
import Events from "./features/events";

function App() {
  return (
    <>
      <Routes>
        <Route path={ROUTING.SIGNIN} element={<SignIn />} />
        <Route path={ROUTING.EVENT} element={<Events />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;

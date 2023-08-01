import logo from "./logo.svg";
import "./App.css";
import Main from "./layout/Main.jsx";
import { PageProvider } from "./context/Page.context";

function App() {
  return (
    <PageProvider>
      <Main />
    </PageProvider>
  );
}

export default App;

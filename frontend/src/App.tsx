import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Contacts from "./components/pages/Contacts";
import Templates from "./components/pages/Templates";
import Campaigns from "./components/pages/Campaigns";
import "./styles/main.css";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Contacts />} />
          <Route path="/templates" element={<Templates />} />
          <Route path="/campaigns" element={<Campaigns />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
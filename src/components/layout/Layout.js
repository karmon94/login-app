import Footer from "./Footer";
import Header from "./Header";

import "./Layout.css";

const Layout = ({ children }) => {
  return (
    <div className="app-layout">
      <Header />
      <div className="content-container">{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;

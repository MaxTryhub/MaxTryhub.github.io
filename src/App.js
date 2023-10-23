import React, { useState } from "react";
import { BrowserRouter as Router, Link, Routes, Route, useLocation } from "react-router-dom";
import ContactPage from "./ContactPage";
import HeroList from "./HeroList";
import "./App.css";

function App() {
  const [currentItem] = useState(null);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [openItems, setOpenItems] = useState([]);
  const [isPageCardOpen] = useState(false);

  const handleItemClick = (itemId) => {
    setSelectedItemId(itemId);

    if (!openItems.includes(itemId)) {
      setOpenItems([...openItems, itemId]);
    }
  };

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <div className="header-container">
            <Link to="/" className="logo">
              <img
                src={process.env.PUBLIC_URL + "/img/3572703401_w200_h100_tov-dniprosila.webp"}
                alt="img"
              />
            </Link>
            <ul className="list nav-list">
              <li className="nav-item">
                <Link to="/" className="nav-text">
                  Главная
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/contacts" className="nav-text">
                  Контакты
                </Link>
              </li>
            </ul>
            <ul className="contacts list">
              <li className="contacts-header__item">
                <a className="link" href="mailto:info@devstudio.com">
                  <svg className="contacts-mail-tel__icon" width="16" height="12">
                    <use href="./img/sprite.svg#letter"></use>
                  </svg>
                  info@devstudio.com
                </a>
              </li>
              <li className="contacts-header__item">
                <a className="link" href="tel:+380961111111">
                  <svg className="contacts-mail-tel__icon" width="10" height="16">
                    <use href="./img/sprite.svg#phone"></use>
                  </svg>
                  +38 096 111 11 11
                </a>
              </li>
            </ul>
          </div>
        </header>
        <Routes>
          <Route path="/contacts" element={<ContactPage />} />
        </Routes>
        <main className="main">
          <section className="block-img">
            <div className="hero-container">
              <a href="index.html" className="img-text">
                Обратная связь
              </a>
            </div>
          </section>
          <section className="main-menu">
            <div className="hero-container">
              <HeroList
                currentItem={currentItem}
                selectedItemId={selectedItemId}
                onItemClick={handleItemClick}
                isPageCardOpen={isPageCardOpen}
                openItems={openItems}
                setOpenItems={setOpenItems}
              />
            </div>
          </section>
        </main>
      </div>
    </Router>
  );
}

export default App;

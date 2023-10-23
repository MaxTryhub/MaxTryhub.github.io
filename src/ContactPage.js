
import SimpleMap from "./google-map.js";
import React from "react";

function ContactPage() {
  return (
    <div className="contacts-page"> {/* Добавьте класс или идентификатор здесь */}
      <h1>Контакты</h1>
      <SimpleMap />
    </div>
  );
}

export default ContactPage;
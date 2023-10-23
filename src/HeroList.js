import React from "react";
import { Routes, Route, Link, useParams} from "react-router-dom";
import data from "./hero-item.json";
import Sidebar from "./Sidebar";

function HeroItem({ item, onItemClick, isItemOpen, selectedItemId }) {
  const handleItemClick = () => {
    onItemClick(item.id);
  };

  const isSelected = item.id === selectedItemId; 

  return (
    <li
      className={`hero-item ${isItemOpen ? "open" : ""} ${isSelected ? "selected" : ""}`}
      key={item.id}
    >
      <Link to={`/item/${item.id}`}>
        <img
          className="hero__image"
          alt="img"
          src={`${process.env.PUBLIC_URL}/${item.img}`}
        />
        <h3 className="hero__title" onClick={() => handleItemClick(item)}>
          {item.title}
        </h3>
      </Link>
      {isItemOpen && item.items && item.items.length > 0 && (
        <InnerList items={item.items} />
      )}
    </li>
  );
}

function renderTable(data) {
  const tableHeaders = data.map((table) => Object.values(table)[0]);
  const tableData = data.map((table) => table.nest.map((nestItem) => Object.values(nestItem)[0]));

  return (
    <table className="custom-table">
      <thead>
        <tr>
          {tableHeaders.map((header, index) => (
            <th key={index}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {tableData[0].map((_, rowIndex) => (
          <tr key={rowIndex}>
            {tableData.map((rowData, columnIndex) => (
              <td key={columnIndex}>{rowData[rowIndex]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function findItemById(itemId, dataArray) {
  for (const item of dataArray) {
    if (item.id === itemId) {
      return item;
    }
    if (item.items) {
      const nestedItem = findItemById(itemId, item.items);
      if (nestedItem) {
        return nestedItem;
      }
    }
  }
  return null;
}

function ItemDescription({ item }) {
  const openPdfFile = () => {
    if (item["card-pdf"]) {
      window.open(`${process.env.PUBLIC_URL}/${item["card-pdf"]}`, '_blank');
    }
  }

  return (
    <div className="page-card">
      <img
        className="hero__image"
        alt="img"
        src={`${process.env.PUBLIC_URL}/${item.img}`}
      />
      <h3 className="hero__title">{item.title}</h3>
      {item["card-Name"] && <p className="hero-name">{item["card-Name"]}</p>}
      {item["card-Text"] && <p className="hero-text">{item["card-Text"]}</p>}

      {item["card-table"] && renderTable(item["card-table"])}

      {item["card-pdf"] && (
        <div>
          <button onClick={openPdfFile}>Открыть PDF</button>
        </div>
      )}
      <div className="item-info">
        <p>Виробник: {item["Виробник"]}</p>
        <p>Країна виробник: {item["Країна виробник"]}</p>
        <p>Тип елемента кріплення кабелю: {item["Тип елемента кріплення кабелю"]}</p>
        <p>Довжина: {item["Довжина"]}</p>
        <p>Конструкція: {item["Конструкція"]}</p>
        <p>Одноразове з'єднання: {item["Одноразове з'єднання"]}</p>
        <p>Кількість в упаковці: {item["Кількість в упаковці"]}</p>
        <p>Стан: {item["Стан"]}</p>
        <p>Матеріал наконечника: {item["Матеріал наконечника"]}</p>
        <p>Максимальна напруга: {item["Максимальна напруга"]}</p>
        <p>Переріз проводів, що підключаються кв. мм.: {item["Переріз проводів, що підключаються кв. мм."]}</p>
      </div>
    </div>
  );
}

function InnerList({ items }) {
  return (
    <div className="inner-list">
      <ul className="list-horizontal list">
        {items.map((item) => (
          <HeroItem key={item.id} item={item} isItemOpen={false} onItemClick={() => {}} />
        ))}
      </ul>
    </div>
  );
}

function HomePage({ currentItem, onItemClick, isPageCardOpen, selectedItemId }) {
  return (
    <div>
<ul className="list-horizontal list">
  {data.map((el) => (
    <HeroItem
      key={el.id}
      item={el}
      onItemClick={onItemClick}
      isItemOpen={isPageCardOpen}
      isSelected={el.id === selectedItemId}
    />
  ))}
</ul>
      {currentItem && isPageCardOpen && <ItemDescription item={currentItem} />}
    </div>
  );
}

function ItemPage() {
  const { itemId } = useParams();
  const item = findItemById(itemId, data);

  if (!item) {
    return <div>Товар не найден</div>;
  }

  if (item.items) {
    return <InnerList items={item.items} />;
  } else {
    return (
      <>
        <ItemDescription item={item} />
      </>
    );
  }
}

function HeroList({ currentItem, onItemClick, isPageCardOpen, openItems }) {

  return (
    <div className="container">
      <Routes>
        <Route
          path="/"
          element={<HomePage currentItem={currentItem} onItemClick={onItemClick} isPageCardOpen={isPageCardOpen} openItems={openItems} />}
        />
        <Route
          path="/item/:itemId"
          element={<ItemPage />}
        />
      </Routes>
      <div className="Sidebar">
      <Sidebar data={data} onItemClick={onItemClick} />
    </div>
  </div>
  );
}
export default HeroList;
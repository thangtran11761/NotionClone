import React, { useState } from "react";

export const PageContext = React.createContext();

export const PageProvider = ({ children }) => {
  const [page, setPage] = useState(
    JSON.parse(localStorage.getItem("pageFocusing"))
  );

  const onChangePageHandler = (page) => {
    setPage({
      id: page.id,
      type: page.type,
      name: page.name,
    });

    localStorage.setItem(
      "pageFocusing",
      JSON.stringify({
        id: page.id,
        type: page.type,
        name: page.name,
      })
    );
  };

  return (
    <PageContext.Provider value={{ page, onChangePageHandler }}>
      {children}
    </PageContext.Provider>
  );
};

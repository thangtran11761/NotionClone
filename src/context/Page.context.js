import React, { useState } from "react";

export const PageContext = React.createContext();

export const PageProvider = ({ children }) => {
  const [page, setPage] = useState({
    id: null,
    type: "",
    name: "",
  });

  const onChangePageHandler = (page) => {
    setPage({
      id: page.id,
      type: page.type,
      name: page.name,
    });
  };

  return (
    <PageContext.Provider value={{ page, onChangePageHandler }}>
      {children}
    </PageContext.Provider>
  );
};

import React, { useState } from "react";

const PageContext = React.createContext();

export const PageProvider = ({ children }) => {
  const [page, setPage] = useState({
    id: null,
    type: "",
  });

  const onChangePageHandler = (id, type) => {
    setPage({
      id: id,
      type: type,
    });
  };

  return (
    <PageContext.Provider value={{ page, onChangePageHandler }}>
      {children}
    </PageContext.Provider>
  );
};

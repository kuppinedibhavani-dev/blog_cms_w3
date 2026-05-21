import { useEffect, useState } from "react";

import { ThemeContext } from "./theme";

function ThemeProvider({ children }) {

  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  // Apply theme

  useEffect(() => {

    document.body.style.backgroundColor = darkMode
      ? "#121212"
      : "#f5f5f5";

    document.body.style.color = darkMode
      ? "white"
      : "black";

    localStorage.setItem(
      "theme",
      darkMode ? "dark" : "light"
    );

  }, [darkMode]);

  const toggleTheme = () => {

    setDarkMode((prev) => !prev);

  };

  return (
    <ThemeContext.Provider
      value={{ darkMode, toggleTheme }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export default ThemeProvider;
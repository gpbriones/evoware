import { useEffect, useState } from "react";
type Theme = "light" | "dark";

export const useTheme = () => {
    const [theme, setTheme] = useState<Theme>(() => {
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme === "dark" || savedTheme === "light") {
            return savedTheme;
        }
        return "light";
    });

    useEffect(() => {
        document.documentElement.setAttribute(
            "data-theme",
            theme
        );
        localStorage.setItem("theme", theme);
    }, [theme]);
    const toggleTheme = () => {
        setTheme(currentTheme =>
            currentTheme === "light"
                ? "dark"
                : "light"
        );
    };
    return {
        theme,
        toggleTheme
    };
};
import { createContext, useState} from 'react';

const themeContext = createContext();

const ThemeProvider = ({children}) => {

    const [theme, setTheme] = useState('light');
    const [fontColor, setFontColor] = useState('dark');

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
        setFontColor(fontColor === 'dark' ? 'light' : 'dark');
    }

    return <themeContext.Provider value={{theme, fontColor, toggleTheme}}>{children}</themeContext.Provider>
}

export {themeContext, ThemeProvider};


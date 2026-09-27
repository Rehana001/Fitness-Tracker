import {createContext, useState, useEffect, useContext} from 'react'


interface ThemeContextType {
    theme: 'light' | 'dark';
    toggleTheme : () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({children}: {children: React.ReactNode}){


    const [theme, setTheme] = useState<'light' | 'dark'>(() => {
        const savedTheme = localStorage.getItem('theme');
        return savedTheme === 'dark' || savedTheme === 'light' ? savedTheme : 'light';
    });

    //Update theme when state changes
    useEffect(()=>{
        const root = window.document.documentElement;
        root.classList.remove('light', 'dark'); 
        root.classList.add(theme)
        localStorage.setItem('theme',theme)
    },[theme])


    const toggleTheme = () =>{
        setTheme((prev)=> (prev === 'light' ? 'dark' : "light"))
    }


     return <ThemeContext.Provider value= {{theme, toggleTheme}}>
        {children}
     </ThemeContext.Provider>
}

export function useTheme(){
    const context = useContext(ThemeContext)
    if(context == undefined){
        throw new Error('useTheme must be used within a ThemeProvider')
    }
    return context;
}

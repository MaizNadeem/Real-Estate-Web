import { useEffect, useState } from "react";

const useHeaderColor = () => {

    const [headerColor, setHeaderColor] = useState(false)
    
    useEffect(() => {
        function handleScroll() {
        if (window.scrollY > 8) {
            setHeaderColor("#302E2E")
        } else {
            setHeaderColor("none");
        }
        }
        window.addEventListener("scroll", handleScroll);
        return () => {
        window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return headerColor
};

export default useHeaderColor;
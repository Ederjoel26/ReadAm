import axios from 'axios';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from "react-router-dom";

export const SelectCategories = () => {
    
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);

    const gettingCategories = async () => {
        const category = await axios({
            url: 'https://apireadamblog-production.up.railway.app/category/all',
            method: 'get'
        });
        category.data.map(d => {
            if(!categories.includes(d.categoryName)){
                categories.push(d.categoryName)
            }
        });
    }

    useMemo(() => {
        gettingCategories();
        console.log(categories);
    });

    return(
        <div>
            {
                categories.map(d => <input type = 'button' key={d} value={d} />)
            }
        </div>
    );
}
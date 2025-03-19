import { createContext, useEffect, useState } from "react";
import API from "../api/api";
import { toast } from "react-toastify";

export const  ProductContext = createContext({
    products:[], 
    paginationMeta: {}, 
    setPaginationMeta : () => { 
    }, 
    setProducts : () => {}, 
    paginationPage :() => {}, 
    getDataFromCategory :() => {}
});


export const ProductProvider = ({children}) => {
    const [products , setProducts] = useState([]);
    const [paginationMeta , setPaginationMeta] = useState({});

    const fetchData = async (page = 1) => {
        try {
            const res = await API.get(
                `/products/?PageNumber=${page}&PageSize=10`
            );
            const data = res.data;
            console.log(data);
            setProducts(data.data.items);
            setPaginationMeta(data.data.meta)
        } catch (err) {
            toast.error(err.data.message)
        }
    }

    useEffect(() => {
        fetchData();
    }, []);
    
    const fetchDataFromCategory = async (page , categoryId) => {
      try {
        const res = await API.get(
          `/products/?PageNumber=${page}&PageSize=10&categoryId=${categoryId}`
        );
        const data = res.data
        console.log(data)
        setProducts(data.data.items)
        setPaginationMeta(data.data.meta)
      } catch (err) {
        toast.error(err.data.message)
      }
    }

    return (
      <ProductContext.Provider
        value={{
          products,
          paginationMeta,
          paginationPage: fetchData,
          getDataFromCategory : fetchDataFromCategory
          
        }}
      >
        {children}
      </ProductContext.Provider>
    );
};

export default ProductContext;
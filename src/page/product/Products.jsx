import { Badge, Button, Drawer, FormControl, InputLabel, MenuItem, Pagination, PaginationItem, Select } from "@mui/material";
import Footer from "../../components/Footer";
import { Navbar } from "../../components/Navbar";
import { useContext, useEffect, useState } from "react";
import RemoveIcon from '@mui/icons-material/Remove';
import FiltersSidebar from "../../components/FiltersSidebar";
import Products from "../../components/Products";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { ProductContext } from "../../context/ProductContext";
import API from "../../api/api";
import { toast } from "react-toastify";
import FilterListIcon from "@mui/icons-material/FilterList";
import { useSearchParams } from "react-router-dom";

export default function ProductsPage() {
  const [sortOption, setSortOption] = useState();
  const [priceRange, setPriceRange] = useState([0, 400]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [showOnSale, setShowOnSale] = useState(false);
  const [showNewArrivals, setShowNewArrivals] = useState(false);
  const [categories ,setCategories] = useState([]);
  const [mobileFiltersOpen , setMobileFiltersOpen] = useState(false)
  const {products ,paginationMeta , paginationPage ,getDataFromCategory } = useContext(ProductContext)
  const [pageParams, setPageParams] = useSearchParams();
  const currentPage = parseInt(pageParams.get("page") || "1");
  
  useEffect(() => {
    const fetch = async () => {
       try {
        const res = await API.get("/categories"); 
        const data = res.data;
        console.log(data);
        setCategories(data.data);
       } catch (err) {
         toast.error(err.data.message)
       }
    }
    fetch()
  }, [])

  const productsPerPage = 10

  const minDistance  = 10;

  

  // Filter products based on selected filters
  const filteredProducts = products.filter((product) => {
    // Price range filter
    // if (product.price < priceRange[0] || product.price > priceRange[1]) {
    //   return false;
    // }
    // Category filter
    if (
      selectedCategories.length > 0 &&
      !selectedCategories.includes(product.categoryId)
    ) {
      return false;
    }

    // Sale filter
    if (showOnSale && !product.isSale) {
      return false;
    }

    // New arrivals filter
    if (showNewArrivals && !product.isNew) {
      return false;
    }

    return true;
  });
  console.log(filteredProducts)
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortOption) {
      case "asc":
        return a.price - b.price;
      case "Desc":
        return b.price - a.price;
      default:
        return 0; // Featured - keep original order
    }
  });

  console.log(sortedProducts);

  // Paginate products
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

  
  const totalPages =
    sortOption
      ? Math.ceil(sortedProducts.length / productsPerPage)
      : paginationMeta.totalPages;
    paginationMeta.totalPages;
  console.log(paginationMeta.totalPages);
  // Sort products based on selected sort option
  
  const handleCategoryChange = (category) => {
    setPageParams({page : 1})
    getDataFromCategory(currentPage , category)
      setSelectedCategories((prev) => {
        if (prev.includes(category)) {
          return prev.filter((c) => c !== category);
        } else {
          setPageParams({page : currentPage, categories: category });
          return [category]; 
        }
      });
    
  };

  const handlePriceChange = (event , newValue , activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      setPriceRange([Math.min(newValue[0], priceRange[1] - minDistance), priceRange[1]]);
    } else {
      setPriceRange([priceRange[0], Math.max(newValue[1], priceRange[0] + minDistance)]);
    }
    // setCurrentPage(1);
  };
  console.log(priceRange);

  const handleSortChange = (value) => {
    setSortOption(value);
    // setCurrentPage(1);
  };

  const handlePageChange = (value,page) => {
    // setCurrentPage(page)
    console.log(selectedCategories);
    if (selectedCategories) {
      selectedCategories.map((categories) => { 
         getDataFromCategory(page , categories  )
      })
    }
    paginationPage(page)
    setPageParams({ page: currentPage + 1 });
    console.log("current page : ",page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const clearAllFilters = () => {
    setPriceRange([0, 200]);
    setSelectedCategories([]);
    setShowOnSale(false);
    setShowNewArrivals(false);
    setSortOption("featured");
    setPageParams({page : currentPage})
    // setCurrentPage(1);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 min-h-[1000px] w-full flex-col gap-y-10 mb-5">
        {/* Hero Banner */}
        <div className="relative bg-muted py-16">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center">
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                Shop All Products
              </h1>
              <p className="mt-4 max-w-[600px] text-muted-foreground">
                Browse our collection of high-quality products. Use the filters
                to find exactly what you're looking for.
              </p>
            </div>
          </div>
        </div>

        <div className="container px-4 py-8 md:px-6 md:py-12">
          {/* Mobile Filters Button */}
          <div className="flex items-center justify-between lg:hidden">
            <Button
              variant="outlined"
              startIcon={<FilterListIcon />}
              onClick={() => setMobileFiltersOpen(true)}
            >
              Filters
            </Button>

            <Drawer
              anchor="left"
              open={mobileFiltersOpen}
              onClose={() => setMobileFiltersOpen(false)}
            >
              <div className="w-72 p-4">
                <FiltersSidebar
                  categories={categories}
                  selectedCategories={selectedCategories}
                  priceRange={priceRange}
                  setCurrentPage={currentPage}
                  handlePriceChange={handlePriceChange}
                  clearAllFilters={clearAllFilters}
                  handleCategoryChange={handleCategoryChange}
                  showNewArrivals={showNewArrivals}
                  showOnSale={showOnSale}
                  setShowNewArrivals={setShowNewArrivals}
                  setShowOnSale={setShowOnSale}
                />
              </div>
            </Drawer>

            <FormControl>
              <Select
                value={sortOption}
                onChange={(e) => handleSortChange(e.target.value)}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={"featured"}>Featured</MenuItem>
                <MenuItem value={"asc"}>Price : Low to High</MenuItem>
                <MenuItem value={"Desc"}>Price : Hinh to Low</MenuItem>
              </Select>
            </FormControl>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
            {/* Filters - Desktop */}
            <div className="hidden lg:block">
              <FiltersSidebar
                categories={categories}
                selectedCategories={selectedCategories}
                priceRange={priceRange}
                setCurrentPage={currentPage}
                handlePriceChange={handlePriceChange}
                clearAllFilters={clearAllFilters}
                handleCategoryChange={handleCategoryChange}
                showNewArrivals={showNewArrivals}
                showOnSale={showOnSale}
                setShowNewArrivals={setShowNewArrivals}
                setShowOnSale={setShowOnSale}
              />
            </div>

            {/* Products */}
            <div className="lg:col-span-3">
              {/* Sort - Desktop */}
              <div className="mb-6 hidden items-center justify-between lg:flex">
                <p className="text-sm text-muted-foreground">
                  Showing {indexOfFirstProduct + 1}-
                  {Math.min(indexOfLastProduct, sortedProducts.length)} of{" "}
                  {paginationMeta.totalItems} products
                </p>
                <FormControl className="w-fit h-10 font-bold border-2 border-amber-700">
                  <Select 
                    value={sortOption}
                    onChange={(e) => handleSortChange(e.target.value)}
                    className="h-full"
                  >
                    <MenuItem value="None">
                       None
                    </MenuItem>
                    <MenuItem value={"featured"}>Featured</MenuItem>
                    <MenuItem value={"asc"}>Price : Low to High</MenuItem>
                    <MenuItem value={"Desc"}>Price : Hinh to Low</MenuItem>
                  </Select>
                </FormControl>
              </div>

              {/* Active Filters */}
              {(selectedCategories.length > 0 ||
                showOnSale ||
                showNewArrivals) && (
                <div className="mb-6 flex flex-wrap gap-2">
                  {selectedCategories.map((category) => (
                    <Badge
                      key={category}
                      variant="outline"
                      className="flex items-center gap-2 border-2 border-gray-500/50 rounded-3xl px-2 py-1 bg-white font-semibold"
                    >
                      {categories.find((c) => c.id === category)?.name}
                      <button
                        className="cursor-pointer"
                        onClick={() => handleCategoryChange(category)}
                      >
                        <RemoveIcon className="border-2 rounded-3xl h-3 w-3 text-red-400 font-bold" />
                        <span className="sr-only">Remove</span>
                      </button>
                    </Badge>
                  ))}
                  {showOnSale && (
                    <Badge
                      variant="outline"
                      className="flex items-center gap-2 border-2 border-gray-500/50 rounded-3xl px-2 py-1 bg-white font-semibold"
                    >
                      On Sale
                      <button onClick={() => setShowOnSale(false)}>
                        <RemoveIcon className="border-2 rounded-3xl h-3 w-3 text-red-400 font-bold" />
                        <span className="sr-only">Remove</span>
                      </button>
                    </Badge>
                  )}
                  {showNewArrivals && (
                    <Badge
                      variant="outline"
                      className="flex items-center gap-2 border-2 border-gray-500/50 rounded-3xl px-2 py-1 bg-white font-semibold"
                    >
                      New Arrivals
                      <button onClick={() => setShowNewArrivals(false)}>
                        <RemoveIcon className="border-2 rounded-3xl h-3 w-3 text-red-400 font-bold" />
                        <span className="sr-only">Remove</span>
                      </button>
                    </Badge>
                  )}
                </div>
              )}

              {/* Product Grid */}
              {sortedProducts.length > 0 ? (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
                  {sortedProducts.map((product, index) => (
                    <Products product={product} key={index} />
                  ))}
                </div>
              ) : (
                <div className="flex h-40 flex-col items-center justify-center rounded-lg border border-dashed">
                  <p className="text-muted-foreground">
                    No products match your filters.
                  </p>
                  <Button
                    variant="link"
                    onClick={clearAllFilters}
                    className="mt-2"
                  >
                    Clear all filters
                  </Button>
                </div>
              )}

              {/* Pagination */}
              <Pagination
                count={totalPages}
                page={currentPage}
                value={currentPage}
                onChange={handlePageChange}
                renderItem={(item) => (
                  <PaginationItem
                    slots={{
                      previous: ArrowBackIcon,
                      next: ArrowForwardIcon,
                    }}
                    {...item}
                  />
                )}
              />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

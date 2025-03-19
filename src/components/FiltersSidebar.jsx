import { Button, Checkbox, Slider } from "@mui/material";
import { Separator } from "@radix-ui/themes/components/context-menu";

import PropTypes from "prop-types";

export default function FiltersSidebar({
  
    categories,
    selectedCategories,
    handleCategoryChange,
    priceRange,
    handlePriceChange,
    showOnSale,
    setShowOnSale,
    showNewArrivals,
    setShowNewArrivals,
    clearAllFilters,
    setCurrentPage,
  
}) {
  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center justify-between">
          <h3 className="text-lg lg:font-medium sm:font-bold sm:text-2xl">Filters</h3>
          {(selectedCategories.length > 0 ||
            showOnSale ||
            showNewArrivals ||
            priceRange[0] > 0 ||
            priceRange[1] < 200) && (                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAllFilters}
              className="h-8 text-xs"
            > 
              Clear All
            </Button>
          )}
        </div>
        <Separator className="my-4" />
      </div>

      {/* Categories */}
      <div>
        <h4 className="mb-3 text-sm font-medium">Categories</h4>
        <div className="space-y-2">
          {categories.slice(0).map((category) => (
            <div key={category.id} className="flex items-center space-x-2">
              <Checkbox
                id={`category-${category.id}`}
                checked={selectedCategories.includes(category.id)}
                onChange={() => handleCategoryChange(category.id)}
              />
              <label
                htmlFor={`category-${category.id}`}
                className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {category.name}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h4 className="mb-3 text-sm font-medium">Price Range</h4>
        <Slider
          value={priceRange}
          valueLabelDisplay="auto"
          min={0}
          max={400}
          step={1}
          onChange={handlePriceChange}
          className="py-4"
          disableSwap
        />
        <div className="flex items-center justify-between">
          <span className="text-sm">${priceRange[0]}</span>
          <span className="text-sm">${priceRange[1]}</span>
        </div>
      </div>

      {/* Product Status */}
      <div>
        <h4 className="mb-3 text-sm font-medium">Product Status</h4>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="on-sale"
              checked={showOnSale}
              onChange={() => {
                setShowOnSale(!showOnSale);
                setCurrentPage(1);
              }}
            />
            <label
              htmlFor="on-sale"
              className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              On Sale
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="new-arrivals"
              checked={showNewArrivals}
              onChange={() => {
                setShowNewArrivals(!showNewArrivals);
                setCurrentPage(1);
              }}
            />
            <label
              htmlFor="new-arrivals"
              className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              New Arrivals
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};
 

FiltersSidebar.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  selectedCategories: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  ).isRequired,
  handleCategoryChange: PropTypes.func.isRequired,
  priceRange: PropTypes.arrayOf(PropTypes.number).isRequired,
  handlePriceChange: PropTypes.func.isRequired,
  showOnSale: PropTypes.bool.isRequired,
  setShowOnSale: PropTypes.func.isRequired,
  showNewArrivals: PropTypes.bool.isRequired,
  setShowNewArrivals: PropTypes.func.isRequired,
  clearAllFilters: PropTypes.func.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
};
import { Button, Card, CardContent, Link } from "@mui/material";
import PropTypes from "prop-types";

export default function Products({product}) {

    return (
      <>
        <Card key={product.id} className="overflow-hidden">
          <Link
            href={`/product/${product.id}`}
            className="relative block h-60 overflow-hidden"
          >
            <img
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              className="object-cover transition-transform duration-300 hover:scale-105"
            />
            {product.isNew && (
              <div className="absolute left-2 top-2 rounded-md bg-gray-700 text-white px-2 py-1 text-xs font-medium text-primary-foreground">
                new
              </div>
            )}
            {product.isSale && (
              <div className="absolute right-2 top-2 rounded-md bg-red-400 px-2 py-1 text-xs font-medium text-primary-foreground">
                sale
              </div>
            )}
          </Link>
          <CardContent className="p-4">
            <div className="space-y-1">
              <h3 className="font-medium">{product.name}</h3>
              <p className="text-sm text-muted-foreground">
                {product.category}
              </p>
            </div>
            <div className="mt-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-semibold">${product.price}</span>
                {product.originalPrice && (
                  <span className="text-sm text-muted-foreground line-through">
                    ${product.originalPrice}
                  </span>
                )}
              </div>
              {product.rating && (
                <div className="flex items-center text-sm">
                  <span className="mr-1">★</span>
                  <span>{product.rating}</span>
                </div>
              )}
            </div>
          </CardContent>
          <div className="card-footer p-4 pt-0">
            <Button variant="outline" className="w-full">
              Add to Cart
            </Button>
          </div>
        </Card>
      </>
    );
}; 


Products.propTypes = {
  product: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      image: PropTypes.string,
      name: PropTypes.string.isRequired,
      category: PropTypes.oneOfType([PropTypes.string ,PropTypes.number]).isRequired,
      price: PropTypes.number.isRequired,
      originalPrice: PropTypes.number,
      rating: PropTypes.number,
    })
  ).isRequired,
};


import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { Link } from "react-router-dom";
import Products from "./Products";

export default function FeaturedProducts(params) {
  return (
    <section className="py-16">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">
              Featured Products
            </h2>
            <p className="text-muted-foreground">
              Check out our most popular items
            </p>
          </div>
          <Button asChild>
            <Link href="/shop">View All Products</Link>
          </Button>
        </div>
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <Products />
        </div>
      </div>
    </section>
  );
}

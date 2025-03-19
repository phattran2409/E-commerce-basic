import { Button } from "@mui/material";
import { Navbar } from "../components/Navbar";
import Footer from "../components/Footer";
import { Link, Navigate } from "react-router-dom";
import FeaturedProducts from "../components/Featured-product";



export default function Home(params) {
    return (
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1">
          {/* Hero Section */}
          <section className="relative">
            <div className="relative h-[70vh] w-full overflow-hidden">
              <img
                src="/placeholder.svg?height=1080&width=1920"
                alt="Hero image"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/40" />
              <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
                <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
                  Discover Our Latest Collection
                </h1>
                <p className="mt-4 max-w-xl text-lg text-white/90">
                  Shop the newest trends and find your perfect style with our
                  curated selection of premium products.
                </p>
                <div className="mt-8 flex flex-wrap justify-center gap-5">
                  <button
                    color="primary"
                    size="lg"
                    className="bg-black border-amber-50 border-2 text-amber-50 p-3 rounded-full font-semibold w-35"
                  >
                    <Link to={"/product"}>Shop Now</Link>
                  </button>
                  <button
                    size="lg"
                    color="inherit"
                    className="border-amber-50 border-2 p-3 w-35 font-semibold cursor-pointer rounded-full bg-transparent text-white hover:bg-white hover:text-black"
                  >
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          </section>
          {/* Categories Section */}
          <section className="py-16">
            {/* <div className="container px-4 md:px-6">
              <h2 className="mb-10 text-center text-3xl font-bold tracking-tight">
                Shop by Category
              </h2>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {categories.map((category) => (
                  <Link
                    key={category.name}
                    href={category.href}
                    className="group relative h-80 overflow-hidden rounded-lg"
                  >
                    <Image
                      src={category.image || "/placeholder.svg"}
                      alt={category.name}
                      width={600}
                      height={800}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-0 left-0 p-6">
                      <h3 className="text-xl font-semibold text-white">
                        {category.name}
                      </h3>
                      <p className="mt-1 text-sm text-white/80">
                        {category.count} products
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div> */}
          </section>
          {/* Featured Products */}
          <FeaturedProducts/>
          
          {/* Promotion Banner */}
          <section className="bg-primary py-16">
            <div className="container flex flex-col items-center px-4 text-center md:px-6">
              <h2 className="text-3xl font-bold tracking-tight text-primary-foreground">
                Summer Sale Now On
              </h2>
              <p className="mt-4 max-w-[600px] text-lg text-primary-foreground/80">
                Enjoy up to 50% off on selected items. Limited time offer.
              </p>
              <Button
                size="lg"
                variant="secondary"
                className="mt-8 rounded-full"
              >
                View Offers
              </Button>
            </div>
          </section>
          {/* Newsletter */}
        </main>
        <Footer />
      </div>
    );
};

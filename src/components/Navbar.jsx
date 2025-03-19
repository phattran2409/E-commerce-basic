import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Badge, Box, Button, Drawer, Input, Menu } from "@mui/material";
import LunchDiningIcon from "@mui/icons-material/LunchDining";
import CancelIcon from "@mui/icons-material/Cancel";
import SearchIcon from "@mui/icons-material/Search";
import PersonIcon from "@mui/icons-material/Person";
import { useAuth } from "../context/AuthContext";
import LoginIcon from "@mui/icons-material/Login";

export function Navbar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isToggle , setIsToggle] = useState(false);
  const navigate = useNavigate()
  const {user} = useAuth();
  return (
    <header className="sticky top-0 z-50  shadow-lg transition-all bg-white ">
      <div className="container flex h-16 items-center px-2 md:px-3">
        {/* Mobile Menu */}
        <div className="block lg:hidden">
          <div>
            <Button
              size="icon"
              className="rounded-lg lg:hidden"
              onClick={() => setIsToggle(true)}
            >
              <LunchDiningIcon className="text-black text-opacity-50" />
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </div>
          <Drawer
            side="left"
            className="w-[500px] sm:w-[400px]"
            open={isToggle}
            onClose={() => setIsToggle(false)}
          >
            <Box sx={{ width: 250 }} role="presentation">
              <nav className="grid gap-6 text-lg font-medium w-full pl-3 mt-4">
                <Link
                  href="/"
                  className="flex items-center gap-2 text-lg font-semibold"
                >
                  <ShoppingCartIcon className="h-6 w-6" />
                  <span className="">ShopName</span>
                </Link>
                <Link href="/" className="hover:text-slate-400">
                  Home
                </Link>
                <Link href="/shop" className="hover:text-slate-400">
                  Shop
                </Link>
                <Link href="/categories" className="hover:text-slate-400">
                  Categories
                </Link>
                <Link href="/about" className="hover:text-slate-400">
                  About
                </Link>
                <Link href="/contact" className="hover:text-slate-400">
                  Contact
                </Link>
              </nav>
            </Box>
          </Drawer>
        </div>

        {/* Logo */}
        <Link
          href="/"
          className="mr-6 flex items-center gap-2 text-lg font-semibold"
        >
          <ShoppingCartIcon className="h-6 w-6" />
          <span className="hidden sm:inline-block">ShopName</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden gap-6 lg:flex">
          <Link href="/" className="text-sm font-medium hover:text-primary">
            Home
          </Link>
          <Link href="/shop" className="text-sm font-medium hover:text-primary">
            Shop
          </Link>
          <Link
            href="/categories"
            className="text-sm font-medium hover:text-primary"
          >
            Categories
          </Link>
          <Link
            href="/about"
            className="text-sm font-medium hover:text-primary"
          >
            About
          </Link>
          <Link
            href="/contact"
            className="text-sm font-medium hover:text-primary"
          >
            Contact
          </Link>
        </nav>

        <div className="ml-auto flex items-center gap-2">
          {/* Search */}
          {isSearchOpen ? (
            <div className="flex items-center">
              <Input
                type="search"
                placeholder="Search..."
                className="w-[200px] md:w-[300px]"
                autoFocus
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsSearchOpen(false)}
              >
                <CancelIcon className="h-5 w-5" />
                <span className="sr-only">Close search</span>
              </Button>
            </div>
          ) : (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSearchOpen(true)}
            >
              <SearchIcon className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Button>
          )}

          {/* Account */}
          {user ? (
            <Button variant="ghost" size="icon" asChild>
              <Link href="/account">
                <PersonIcon className="h-5 w-5" />
                <span className="sr-only">Account</span>
              </Link>
            </Button>
          ) : (
            <Button
              variant="contained"
              className="flex items-center justify-center w-fit"
              color="inherit"
              onClick={() => navigate("/login")}
            >
              <span className="mr-2">
                <LoginIcon />
              </span>
              <p className="w-fit text-xs ">Login</p>
            </Button>
          )}

          {/* Cart */}
          <Button variant="ghost" size="icon" className="relative">
            <Link href="/cart">
              <Badge badgeContent={4} color="primary">
                <ShoppingCartIcon className="h-5 w-5" />
              </Badge>
              <span className="sr-only">Cart</span>
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}

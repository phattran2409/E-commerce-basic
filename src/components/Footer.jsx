import { Button, Link } from "@mui/material";
import XIcon from "@mui/icons-material/X";
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from "@mui/icons-material/Facebook";
export default function Footer() {
     return (
       <footer className="border-t bg-background">
         <div className="container px-4 py-12 md:px-6">
           <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
             {/* Company Info */}
             <div>
               <h3 className="mb-4 text-lg font-semibold">ShopName</h3>
               <p className="mb-4 text-sm text-muted-foreground">
                 Providing quality products since 2023. We are committed to
                 bringing you the best shopping experience.
               </p>
               <div className="flex gap-4">
                 <Button variant="ghost" size="icon" asChild>
                   <Link
                     href="https://twitter.com"
                     target="_blank"
                     rel="noreferrer"
                   >
                     <XIcon className="h-5 w-5" />
                     <span className="sr-only">Twitter</span>
                   </Link>
                 </Button>
                 <Button variant="ghost" size="icon" asChild>
                   <Link
                     href="https://instagram.com"
                     target="_blank"
                     rel="noreferrer"
                   >
                     <InstagramIcon className="h-5 w-5" />
                     <span className="sr-only">Instagram</span>
                   </Link>
                 </Button>
                 <Button variant="ghost" size="icon" asChild>
                   <Link
                     href="https://facebook.com"
                     target="_blank"
                     rel="noreferrer"
                   >
                     <FacebookIcon className="h-5 w-5" />
                     <span className="sr-only">Facebook</span>
                   </Link>
                 </Button>
               </div>
             </div>

             {/* Shop Links */}
             <div>
               <h3 className="mb-4 text-lg font-semibold">Shop</h3>
               <ul className="grid gap-2 text-sm">
                 <li>
                   <Link
                     href="/shop"
                     className="text-muted-foreground hover:text-foreground"
                   >
                     All Products
                   </Link>
                 </li>
                 <li>
                   <Link
                     href="/category/new-arrivals"
                     className="text-muted-foreground hover:text-foreground"
                   >
                     New Arrivals
                   </Link>
                 </li>
                 <li>
                   <Link
                     href="/category/best-sellers"
                     className="text-muted-foreground hover:text-foreground"
                   >
                     Best Sellers
                   </Link>
                 </li>
                 <li>
                   <Link
                     href="/category/sale"
                     className="text-muted-foreground hover:text-foreground"
                   >
                     Sale Items
                   </Link>
                 </li>
               </ul>
             </div>

             {/* Customer Service */}
             <div>
               <h3 className="mb-4 text-lg font-semibold">Customer Service</h3>
               <ul className="grid gap-2 text-sm">
                 <li>
                   <Link
                     href="/contact"
                     className="text-muted-foreground hover:text-foreground"
                   >
                     Contact Us
                   </Link>
                 </li>
                 <li>
                   <Link
                     href="/shipping"
                     className="text-muted-foreground hover:text-foreground"
                   >
                     Shipping & Returns
                   </Link>
                 </li>
                 <li>
                   <Link
                     href="/faq"
                     className="text-muted-foreground hover:text-foreground"
                   >
                     FAQ
                   </Link>
                 </li>
                 <li>
                   <Link
                     href="/privacy-policy"
                     className="text-muted-foreground hover:text-foreground"
                   >
                     Privacy Policy
                   </Link>
                 </li>
                 <li>
                   <Link
                     href="/terms-of-service"
                     className="text-muted-foreground hover:text-foreground"
                   >
                     Terms of Service
                   </Link>
                 </li>
               </ul>
             </div>

             {/* Contact Info */}
             <div>
               <h3 className="mb-4 text-lg font-semibold">Contact</h3>
               <address className="grid gap-2 text-sm not-italic text-muted-foreground">
                 <p>123 Shopping Street</p>
                 <p>Retail City, RC 10001</p>
                 <p>United States</p>
                 <p className="mt-2">
                   <a
                     href="mailto:info@shopname.com"
                     className="hover:text-foreground"
                   >
                     info@shopname.com
                   </a>
                 </p>
                 <p>
                   <a
                     href="tel:+1-555-123-4567"
                     className="hover:text-foreground"
                   >
                     +1 (555) 123-4567
                   </a>
                 </p>
               </address>
             </div>
           </div>

           <div className="mt-12 border-t pt-8 text-center text-sm text-muted-foreground">
             <p>© {new Date().getFullYear()} ShopName. All rights reserved.</p>
           </div>
         </div>
       </footer>
     );
};

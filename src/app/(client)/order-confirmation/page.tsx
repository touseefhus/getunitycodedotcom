// "use client";

// import React, { useEffect, useState } from "react";
// import { Button } from "@/components/ui/button";
// import { useRouter } from "next/navigation";

// interface CartItem {
//     _id: string;
//     name: string;
//     price: number;
//     quantity: number;
// }

// const OrderConfirmation: React.FC = () => {
//     const [cartItems, setCartItems] = useState<CartItem[]>([]);
//     const [totalPrice, setTotalPrice] = useState<number>(0);
//     const router = useRouter();

//     // Load cart items from localStorage
//     useEffect(() => {
//         const storedCart = localStorage.getItem("cart");
//         if (storedCart) {
//             try {
//                 const parsedCart: CartItem[] = JSON.parse(storedCart);
//                 setCartItems(parsedCart);

//                 // Calculate total price
//                 const total = parsedCart.reduce(
//                     (sum, item) => sum + item.price * item.quantity,
//                     0
//                 );
//                 setTotalPrice(total);
//             } catch (error) {
//                 console.error("Error parsing cart data from localStorage:", error);
//             }
//         }
//     }, []);

//     // Confirm order (send to backend and clear cart)
//     const confirmOrder = async () => {
//         try {
//             // Replace with your backend API endpoint for order creation
//             const response = await fetch("/api/orders", {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify({ items: cartItems, total: totalPrice }),
//             });

//             if (response.ok) {
//                 // Clear cart on successful order confirmation
//                 localStorage.removeItem("cart");
//                 alert("Order confirmed successfully!");
//                 router.push("/thank-you"); // Redirect to thank-you page
//             } else {
//                 console.error("Failed to confirm order:", await response.text());
//                 alert("Failed to confirm order. Please try again.");
//             }
//         } catch (error) {
//             console.error("Error confirming order:", error);
//             alert("Something went wrong. Please try again.");
//         }
//     };

//     return (
//         <div className="container mx-auto px-4 py-6">
//             <h2 className="text-2xl font-semibold mb-6 text-center">
//                 Order Confirmation
//             </h2>
//             {cartItems.length === 0 ? (
//                 <p className="text-center text-gray-600">
//                     No items in your cart to confirm.
//                 </p>
//             ) : (
//                 <div>
//                     <div className="mb-6">
//                         {cartItems.map((item) => (
//                             <div
//                                 key={item._id}
//                                 className="flex justify-between items-center mb-4 p-4 border border-gray-200 rounded"
//                             >
//                                 <div>
//                                     <h4 className="font-semibold">{item.name}</h4>
//                                     <p className="text-gray-600">Quantity: {item.quantity}</p>
//                                     <p className="text-gray-800">
//                                         Price: ${item.price.toFixed(2)}
//                                     </p>
//                                 </div>
//                                 <p className="font-semibold">
//                                     Subtotal: ${(item.price * item.quantity).toFixed(2)}
//                                 </p>
//                             </div>
//                         ))}
//                     </div>
//                     <div className="text-right mb-8">
//                         <h3 className="text-xl font-semibold">Total: ${totalPrice.toFixed(2)}</h3>
//                     </div>
//                     <div className="flex justify-center">
//                         <Button className="custom-btn" onClick={confirmOrder}>
//                             Confirm Order
//                         </Button>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default OrderConfirmation;

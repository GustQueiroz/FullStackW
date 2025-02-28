import { useContext } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import { CartContext } from "../../context/cart";
import CartProductItem from "./cart-product-item";
const CartSheet = () => {
  const { isOpen, toggleCart, products } = useContext(CartContext);
  return (
    <Sheet open={isOpen} onOpenChange={toggleCart}>
      <SheetContent side="right" className="w-[80%]">
        <SheetHeader>
          <SheetTitle className="text-left">Sacola</SheetTitle>
        </SheetHeader>
        <div className="flex h-full flex-col py-5">
          <div className="flex-auto">
            {products.map((product) => (
              <CartProductItem key={product.id} product={product} />
            ))}
          </div>
          <Card className="p-5">
            <CardContent>
              <div className="flex justify-between">
                <p>Total</p>
              </div>
            </CardContent>
          </Card>
          <Button className="w-full rounded-full">Finalizar pedido</Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CartSheet;

import { Button } from "@/components/ui/button";
import { ShoppingCart, Plus, Minus } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";

interface AddToCartButtonProps {
  productId: string;
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
  showQuantityControls?: boolean;
}

export function AddToCartButton({ 
  productId, 
  variant = "default", 
  size = "default", 
  className = "",
  showQuantityControls = false
}: AddToCartButtonProps) {
  const { addToCart, updateQuantity, items } = useCart();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const existingItem = items.find(item => item.product_id === productId);
  const quantity = existingItem?.quantity || 0;

  const handleAddToCart = async () => {
    if (!user) {
      // Could redirect to auth page or show login modal
      return;
    }

    setIsLoading(true);
    try {
      await addToCart(productId, 1);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateQuantity = async (newQuantity: number) => {
    if (newQuantity < 1) return;
    
    setIsLoading(true);
    try {
      await updateQuantity(productId, newQuantity);
    } finally {
      setIsLoading(false);
    }
  };

  if (showQuantityControls && quantity > 0) {
    return (
      <div className={`flex items-center space-x-2 ${className}`}>
        <Button
          variant="outline"
          size="icon"
          onClick={() => handleUpdateQuantity(quantity - 1)}
          disabled={isLoading || quantity <= 1}
        >
          <Minus className="h-4 w-4" />
        </Button>
        
        <span className="px-3 py-2 bg-muted rounded text-center min-w-[3rem]">
          {quantity}
        </span>
        
        <Button
          variant="outline"
          size="icon"
          onClick={() => handleUpdateQuantity(quantity + 1)}
          disabled={isLoading}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
    );
  }

  return (
    <Button
      variant={variant}
      size={size}
      className={className}
      onClick={handleAddToCart}
      disabled={isLoading || !user}
    >
      <ShoppingCart className="h-4 w-4 mr-2" />
      {quantity > 0 ? `In Cart (${quantity})` : 'Add to Cart'}
    </Button>
  );
}
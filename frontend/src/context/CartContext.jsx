import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState(() => {
    try {
      const saved = localStorage.getItem('aurelle_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('aurelle_cart', JSON.stringify(items));
  }, [items]);

  const addToCart = (product, selectedSize = '38', selectedColor = null, quantity = 1) => {
    const colorName = selectedColor || (product.colors && product.colors[0]?.name) || 'Noir';
    const colorHex = (product.colors && product.colors.find(c => c.name === colorName)?.hex) || '#0A1F44';
    const image = (product.images && product.images[0]) || '';

    setItems((prev) => {
      const index = prev.findIndex(
        (item) => item.productId === (product._id || product.id) && item.size === selectedSize && item.color === colorName
      );

      if (index > -1) {
        const next = [...prev];
        next[index].quantity += quantity;
        return next;
      } else {
        return [
          ...prev,
          {
            productId: product._id || product.id,
            name: product.name,
            price: product.price,
            image,
            size: selectedSize,
            color: colorName,
            colorHex,
            quantity,
          },
        ];
      }
    });

    setIsCartOpen(true);
  };

  const removeFromCart = (productId, size, color) => {
    setItems((prev) => prev.filter((i) => !(i.productId === productId && i.size === size && i.color === color)));
  };

  const updateQuantity = (productId, size, color, delta) => {
    setItems((prev) =>
      prev
        .map((item) => {
          if (item.productId === productId && item.size === size && item.color === color) {
            const nextQty = item.quantity + delta;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const complimentaryShippingThreshold = 350;
  const isFreeShipping = subtotal >= complimentaryShippingThreshold || items.length === 0;
  const shippingCost = isFreeShipping ? 0 : 45;
  const total = subtotal + shippingCost;
  const totalCount = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        subtotal,
        shippingCost,
        isFreeShipping,
        complimentaryShippingThreshold,
        total,
        totalCount,
        isCartOpen,
        setIsCartOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);

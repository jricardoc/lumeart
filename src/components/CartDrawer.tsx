import React, { useEffect } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';

export default function CartDrawer() {
  const { isCartOpen, toggleCart, cartItems, updateQuantity, removeFromCart, cartTotal } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isCartOpen]);

  return (
    <>
      {/* Overlay */}
      {isCartOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] transition-opacity"
          onClick={() => toggleCart(false)}
        />
      )}

      {/* Drawer */}
      <div 
        className={`fixed top-0 right-0 h-full w-full sm:w-[400px] bg-[#0a0a0f] border-l border-white/10 z-[70] shadow-2xl transform transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col ${
          isCartOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <ShoppingBag className="w-5 h-5 text-gold" />
            <h2 className="text-xl font-heading font-bold text-white tracking-widest uppercase">Seu Carrinho</h2>
          </div>
          <button 
            onClick={() => toggleCart(false)}
            className="p-2 text-gray-400 hover:text-gold hover:rotate-90 transition-all duration-300 cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center opacity-60">
              <ShoppingBag className="w-16 h-16 text-gold mb-4 opacity-50" />
              <p className="text-gray-300 text-lg">Seu carrinho está vazio</p>
              <p className="text-sm text-gray-500 mt-2">Navegue pela loja para adicionar produtos.</p>
              <button 
                onClick={() => { toggleCart(false); navigate('/produtos'); }}
                className="mt-6 px-6 py-2 border border-gold text-gold hover:bg-gold hover:text-dark font-bold uppercase text-sm tracking-wider rounded transition-colors cursor-pointer"
              >
                Ver Produtos
              </button>
            </div>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} className="flex gap-4 bg-white/5 border border-white/10 rounded-xl p-3">
                <div className="w-20 h-20 rounded-lg overflow-hidden bg-black shrink-0">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                
                <div className="flex flex-col flex-1 justify-between">
                  <div className="flex justify-between items-start gap-2">
                    <h3 className="text-sm font-bold text-white line-clamp-2">{item.name}</h3>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="text-gray-500 hover:text-red-400 transition-colors cursor-pointer shrink-0"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center bg-[#121225] border border-white/10 rounded-lg px-1 py-0.5">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-6 h-6 flex items-center justify-center text-white hover:text-gold transition-colors cursor-pointer"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-6 text-center text-sm font-bold text-white">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-6 h-6 flex items-center justify-center text-white hover:text-gold transition-colors cursor-pointer"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                    
                    <span className="font-heading font-bold text-gold text-sm">
                      R$ {(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="p-6 border-t border-white/10 bg-[#0a0a0f]">
            <div className="flex items-center justify-between mb-6">
              <span className="text-gray-400 font-mono text-sm uppercase">Subtotal</span>
              <span className="text-2xl font-heading font-black text-gold">
                R$ {cartTotal.toFixed(2)}
              </span>
            </div>
            
            <button
              onClick={() => {
                toggleCart(false);
                navigate('/carrinho');
              }}
              className="w-full flex items-center justify-center gap-2 bg-gold text-dark font-black py-4 rounded-xl uppercase tracking-wider hover:bg-white hover:shadow-[0_0_20px_rgba(212,168,83,0.4)] transition-all cursor-pointer"
            >
              Finalizar Compra
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </>
  );
}

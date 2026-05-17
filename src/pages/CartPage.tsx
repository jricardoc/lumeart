import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowLeft, ShoppingCart, ShieldCheck, CreditCard, ChevronRight } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function CartPage() {
  const { cartItems, updateQuantity, removeFromCart, cartTotal, itemCount } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (cartItems.length === 0) {
    return (
      <div className="min-h-[80vh] pt-32 pb-16 bg-[#0a0a16] flex flex-col items-center justify-center text-white">
        <ShoppingCart className="w-24 h-24 text-gold mb-6 opacity-50" />
        <h2 className="text-3xl font-heading font-bold mb-4">Seu carrinho está vazio</h2>
        <p className="text-gray-400 mb-8 max-w-md text-center">
          Parece que você ainda não adicionou nenhum produto ao carrinho. Descubra nossos produtos exclusivos!
        </p>
        <Link to="/produtos" className="px-8 py-4 bg-gold text-dark font-black rounded-lg hover:bg-gold-light transition-all uppercase tracking-wider hover:shadow-[0_0_20px_rgba(212,168,83,0.4)]">
          Voltar para a Loja
        </Link>
      </div>
    );
  }

  const shippingCost = 0; // Exemplo: Frete grátis
  const finalTotal = cartTotal + shippingCost;

  return (
    <div className="min-h-screen pt-24 pb-16 bg-[#0a0a16] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <nav className="flex items-center text-sm text-gray-400 mb-8 font-mono">
          <Link to="/" className="hover:text-gold transition-colors">Home</Link>
          <ChevronRight className="w-4 h-4 mx-2" />
          <Link to="/produtos" className="hover:text-gold transition-colors">Produtos</Link>
          <ChevronRight className="w-4 h-4 mx-2" />
          <span className="text-white">Carrinho</span>
        </nav>

        <div className="flex items-center gap-4 mb-12 border-b border-white/10 pb-6">
          <h1 className="text-4xl font-heading font-black text-white uppercase tracking-wider">Meu Carrinho</h1>
          <span className="px-3 py-1 bg-gold/10 text-gold rounded-full font-bold text-sm">
            {itemCount} {itemCount === 1 ? 'item' : 'itens'}
          </span>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Cart Items List - Left */}
          <div className="lg:w-2/3 space-y-6">
            <div className="hidden md:grid grid-cols-12 gap-4 text-sm font-mono text-gray-400 uppercase tracking-wider mb-4 px-4">
              <div className="col-span-6">Produto</div>
              <div className="col-span-3 text-center">Quantidade</div>
              <div className="col-span-3 text-right">Subtotal</div>
            </div>

            {cartItems.map((item) => (
              <div key={item.id} className="group relative bg-[#121225] border border-white/10 rounded-2xl p-4 md:p-6 transition-all hover:border-gold/30">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                  
                  {/* Product Info */}
                  <div className="col-span-1 md:col-span-6 flex items-center gap-4">
                    <div className="w-24 h-24 rounded-xl overflow-hidden bg-black shrink-0 relative border border-white/5">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <span className="text-xs text-gold font-mono uppercase tracking-widest mb-1 block">{item.category}</span>
                      <h3 className="text-lg font-bold text-white mb-2 leading-tight">
                        <Link to={`/produtos/${item.id}`} className="hover:text-gold transition-colors">{item.name}</Link>
                      </h3>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-red-400 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" /> Remover
                      </button>
                    </div>
                  </div>

                  {/* Quantity Mobile/Desktop */}
                  <div className="col-span-1 md:col-span-3 flex md:justify-center items-center">
                    <div className="flex items-center bg-white/5 border border-white/10 rounded-xl px-2">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-10 h-10 flex items-center justify-center text-white hover:text-gold transition-colors cursor-pointer"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <input 
                        type="number" 
                        value={item.quantity}
                        readOnly
                        className="w-12 h-10 bg-transparent text-center text-white font-bold outline-none"
                      />
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-10 h-10 flex items-center justify-center text-white hover:text-gold transition-colors cursor-pointer"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="col-span-1 md:col-span-3 flex md:justify-end items-center">
                    <div className="text-right">
                      <span className="md:hidden text-xs text-gray-400 block mb-1">Subtotal</span>
                      <span className="text-2xl font-heading font-black text-gold block">
                        R$ {(item.price * item.quantity).toFixed(2)}
                      </span>
                      <span className="text-xs text-gray-500 mt-1 block">R$ {item.price.toFixed(2)} / un</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <Link to="/produtos" className="inline-flex items-center gap-2 text-gold hover:text-white transition-colors mt-8 uppercase font-bold text-sm tracking-wider">
              <ArrowLeft className="w-4 h-4" /> Continuar Comprando
            </Link>
          </div>

          {/* Order Summary - Right */}
          <div className="lg:w-1/3">
            <div className="bg-[#121225] border border-white/10 rounded-3xl p-8 sticky top-28">
              <h2 className="text-xl font-heading font-bold text-white mb-6 uppercase tracking-wider pb-4 border-b border-white/10">
                Resumo do Pedido
              </h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center text-gray-300">
                  <span>Subtotal ({itemCount} {itemCount === 1 ? 'item' : 'itens'})</span>
                  <span className="font-mono">R$ {cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center text-gray-300">
                  <span>Frete estimado</span>
                  <span className="text-green-400 font-bold">Grátis</span>
                </div>
              </div>

              <div className="flex justify-between items-end border-t border-white/10 pt-6 mb-8">
                <span className="text-lg font-bold text-white">Total</span>
                <span className="text-4xl font-heading font-black text-gold">
                  R$ {finalTotal.toFixed(2)}
                </span>
              </div>

              <button 
                onClick={() => alert('Finalização de compra iniciada! (Implementar integração de pagamento)')}
                className="w-full flex items-center justify-center gap-3 bg-gold text-dark font-black py-4 rounded-xl uppercase tracking-wider hover:bg-white hover:shadow-[0_0_30px_rgba(212,168,83,0.5)] transition-all cursor-pointer mb-6"
              >
                <CreditCard className="w-6 h-6" />
                Finalizar Compra
              </button>

              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm text-gray-400">
                  <ShieldCheck className="w-5 h-5 text-gold shrink-0" />
                  <span>Ambiente seguro e criptografado.</span>
                </div>
                <div className="flex flex-wrap gap-2 mt-4 opacity-60 grayscale hover:grayscale-0 transition-all">
                  {/* Mock de bandeiras de cartão em CSS */}
                  <div className="px-2 py-1 bg-white/10 rounded text-xs font-bold text-white">VISA</div>
                  <div className="px-2 py-1 bg-white/10 rounded text-xs font-bold text-white">MASTERCARD</div>
                  <div className="px-2 py-1 bg-white/10 rounded text-xs font-bold text-white">PIX</div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

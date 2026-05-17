import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { mockProducts } from '../data/mockProducts';
import { ChevronRight, ChevronLeft, Star, ShoppingCart, Truck, ShieldCheck, Ruler, Layers } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const product = mockProducts.find((p) => p.id === id);
  const { addToCart } = useCart();

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  // Reset image index when product changes
  useEffect(() => {
    setCurrentImageIndex(0);
  }, [id]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-screen pt-32 pb-16 bg-[#0a0a16] flex flex-col items-center justify-center text-white">
        <h1 className="text-4xl font-heading font-black text-gold mb-4">404</h1>
        <h2 className="text-2xl font-bold mb-6">Produto não encontrado</h2>
        <Link to="/produtos" className="px-6 py-3 bg-gold text-dark font-bold rounded-lg hover:bg-gold-light transition-colors uppercase tracking-wider">
          Voltar para Produtos
        </Link>
      </div>
    );
  }

  const gallery = product.gallery || [product.image];

  // Related products (same category, max 3)
  const relatedProducts = mockProducts
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  return (
    <div className="min-h-screen pt-24 pb-16 bg-[#0a0a16] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <nav className="flex items-center text-sm text-gray-400 mb-8 font-mono">
          <Link to="/" className="hover:text-gold transition-colors">Home</Link>
          <ChevronRight className="w-4 h-4 mx-2" />
          <Link to="/produtos" className="hover:text-gold transition-colors">Produtos</Link>
          <ChevronRight className="w-4 h-4 mx-2" />
          <span className="text-white truncate max-w-xs">{product.name}</span>
        </nav>

        {/* Product Top Section */}
        <div className="flex flex-col lg:flex-row gap-12 mb-16">
          
          {/* Gallery - Left (Slider) */}
          <div className="lg:w-1/2 flex flex-col gap-4">
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-black/50 border border-white/10 group">
              {/* Slider Track */}
              <div 
                className="flex w-full h-full transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}
              >
                {gallery.map((img, idx) => (
                  <img 
                    key={idx} 
                    src={img} 
                    alt={`${product.name} - imagem ${idx + 1}`} 
                    className="w-full min-w-full h-full object-cover shrink-0" 
                  />
                ))}
              </div>
              
              <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
                {product.badges.map(badge => (
                  <span key={badge} className="bg-gold text-dark text-xs font-bold px-3 py-1.5 rounded uppercase tracking-wider shadow-lg">
                    {badge}
                  </span>
                ))}
              </div>

              {gallery.length > 1 && (
                <>
                  {/* Arrows */}
                  <button 
                    onClick={() => setCurrentImageIndex(prev => prev === 0 ? gallery.length - 1 : prev - 1)}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-gold hover:text-dark cursor-pointer z-10"
                  >
                    <ChevronLeft className="w-6 h-6 -ml-0.5" />
                  </button>
                  <button 
                    onClick={() => setCurrentImageIndex(prev => prev === gallery.length - 1 ? 0 : prev + 1)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-gold hover:text-dark cursor-pointer z-10"
                  >
                    <ChevronRight className="w-6 h-6 ml-0.5" />
                  </button>

                  {/* Dots */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                    {gallery.map((_, idx) => (
                      <button 
                        key={idx}
                        onClick={() => setCurrentImageIndex(idx)}
                        className={`h-2 rounded-full transition-all cursor-pointer ${
                          currentImageIndex === idx ? 'bg-gold w-6' : 'bg-white/50 w-2 hover:bg-white'
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Info - Right */}
          <div className="lg:w-1/2 flex flex-col">
            <span className="text-sm text-gold font-mono mb-2 uppercase tracking-wider">{product.category}</span>
            <h1 className="text-3xl md:text-4xl font-heading font-black text-white mb-4 leading-tight">{product.name}</h1>
            
            <div className="flex items-center gap-4 mb-6 pb-6 border-b border-white/10">
              <div className="flex items-center gap-1.5">
                <Star className="w-5 h-5 fill-gold text-gold" />
                <span className="font-bold text-white text-lg">{product.rating}</span>
                <span className="text-gray-400">({product.reviews} avaliações)</span>
              </div>
              <div className="h-4 w-px bg-white/20"></div>
              <span className={`text-sm font-bold uppercase tracking-wider ${product.isAvailable ? 'text-green-400' : 'text-red-400'}`}>
                {product.isAvailable ? 'Em Estoque' : 'Esgotado'}
              </span>
            </div>

            <p className="text-gray-300 text-lg mb-8 leading-relaxed">
              {product.description}
            </p>

            <div className="mb-8">
              {product.oldPrice && (
                <span className="block text-gray-500 line-through mb-1 text-lg">
                  R$ {product.oldPrice.toFixed(2)}
                </span>
              )}
              <div className="flex items-end gap-3">
                <span className="text-5xl font-heading font-black text-gold">
                  R$ {product.price.toFixed(2)}
                </span>
                <span className="text-gray-400 mb-1">à vista</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <div className="flex items-center bg-[#121225] border border-white/10 rounded-xl px-2">
                <button 
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="w-10 h-10 flex items-center justify-center text-white hover:text-gold transition-colors cursor-pointer"
                >
                  -
                </button>
                <input 
                  type="number" 
                  value={quantity}
                  readOnly
                  className="w-12 h-10 bg-transparent text-center text-white font-bold outline-none"
                />
                <button 
                  onClick={() => setQuantity(q => q + 1)}
                  className="w-10 h-10 flex items-center justify-center text-white hover:text-gold transition-colors cursor-pointer"
                >
                  +
                </button>
              </div>
              
              <button 
                disabled={!product.isAvailable}
                onClick={() => addToCart(product, quantity)}
                className="flex-1 flex items-center justify-center gap-3 bg-gold text-dark font-black px-8 py-4 rounded-xl uppercase tracking-wider hover:bg-white hover:shadow-[0_0_20px_rgba(212,168,83,0.4)] transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                <ShoppingCart className="w-6 h-6" />
                Adicionar ao Carrinho
              </button>
            </div>

            {/* Info Cards */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-4 bg-white/5 border border-white/10 rounded-xl">
                <Truck className="w-6 h-6 text-gold" />
                <span className="text-sm text-gray-300">Frete grátis p/ o Sul e Sudeste</span>
              </div>
              <div className="flex items-center gap-3 p-4 bg-white/5 border border-white/10 rounded-xl">
                <ShieldCheck className="w-6 h-6 text-gold" />
                <span className="text-sm text-gray-300">Garantia de 90 dias</span>
              </div>
            </div>

          </div>
        </div>

        {/* Detailed Info Section */}
        <div className="mb-24 mt-12">
          <div className="border-b border-white/10 mb-12">
            <h2 className="text-3xl font-heading font-bold text-white pb-6 border-b-2 border-gold inline-block">Detalhes do Produto</h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 prose prose-invert max-w-none text-gray-300">
              <p className="text-lg leading-relaxed mb-6">
                {product.longDescription || product.description}
              </p>
              
              {product.features && product.features.length > 0 && (
                <>
                  <h3 className="text-2xl font-heading font-bold text-white mb-6 mt-12">Características Principais:</h3>
                  <ul className="space-y-4">
                    {product.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-gold mt-1">•</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>

            <div className="lg:col-span-1">
              <div className="bg-[#121225] border border-white/10 rounded-2xl p-8 sticky top-28">
                <h3 className="text-xl font-bold text-white mb-8 uppercase tracking-wider font-heading border-b border-white/10 pb-4">Especificações</h3>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Ruler className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                    <div>
                      <span className="block text-sm text-gray-400 mb-0.5">Dimensões</span>
                      <span className="text-white font-medium">{product.dimensions || 'N/A'}</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Layers className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                    <div>
                      <span className="block text-sm text-gray-400 mb-0.5">Material</span>
                      <span className="text-white font-medium">{product.material || 'N/A'}</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-gold font-bold w-5 text-center shrink-0 mt-0.5">#</span>
                    <div>
                      <span className="block text-sm text-gray-400 mb-0.5">Tags</span>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {product.tags.map(tag => (
                          <span key={tag} className="px-2 py-1 bg-white/5 border border-white/10 rounded text-xs text-gray-300">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-32">
            <div className="flex items-center justify-between mb-10">
              <h2 className="text-3xl font-heading font-bold text-white">Produtos Relacionados</h2>
              <Link to={`/produtos?categoria=${product.category}`} className="text-gold text-sm font-bold uppercase hover:text-white transition-colors">
                Ver mais
              </Link>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map((relProduct) => (
                <Link to={`/produtos/${relProduct.id}`} key={relProduct.id} className="group flex flex-col bg-[#121225] border border-white/10 rounded-2xl overflow-hidden hover:border-gold/30 transition-all cursor-pointer">
                  <div className="relative aspect-square overflow-hidden bg-black/50">
                    <img 
                      src={relProduct.image} 
                      alt={relProduct.name} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="text-lg font-bold text-white mb-2 line-clamp-1 group-hover:text-gold transition-colors">
                      {relProduct.name}
                    </h3>
                    <div className="mt-auto flex items-end justify-between">
                      <span className="text-xl font-heading font-black text-gold">
                        R$ {relProduct.price.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

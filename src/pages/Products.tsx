import React, { useState, useMemo, useEffect } from 'react';
import { Search, Filter, ChevronRight, ShoppingCart, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { mockProducts, type ProductCategory } from '../data/mockProducts';
import { useCart } from '../context/CartContext';

export default function Products() {
  const { addToCart } = useCart();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | 'Todas'>('Todas');

  const categories: (ProductCategory | 'Todas')[] = [
    'Todas',
    'Action Figures',
    'Luminárias',
    'Protótipos',
    'Colecionáveis',
    'Peças Customizadas',
  ];

  const [minPrice, setMinPrice] = useState<string>('');
  const [maxPrice, setMaxPrice] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<string>('Mais Relevantes');
  const [currentPage, setCurrentPage] = useState<number>(1);

  const ITEMS_PER_PAGE = 6;

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory, minPrice, maxPrice, sortOrder]);

  const filteredProducts = useMemo(() => {
    let result = mockProducts.filter((p) => {
      const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'Todas' || p.category === selectedCategory;
      
      const pMin = minPrice ? parseFloat(minPrice) : 0;
      const pMax = maxPrice ? parseFloat(maxPrice) : Infinity;
      const matchesPrice = p.price >= pMin && p.price <= pMax;

      return matchesSearch && matchesCategory && matchesPrice;
    });

    if (sortOrder === 'Menor Preço') {
      result = result.sort((a, b) => a.price - b.price);
    } else if (sortOrder === 'Maior Preço') {
      result = result.sort((a, b) => b.price - a.price);
    } else if (sortOrder === 'Melhor Avaliados') {
      result = result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [searchTerm, selectedCategory, minPrice, maxPrice, sortOrder]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="min-h-screen pt-24 pb-16 bg-[#0a0a16] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <nav className="flex items-center text-sm text-gray-400 mb-8 font-mono">
          <a href="/" className="hover:text-gold transition-colors">Home</a>
          <ChevronRight className="w-4 h-4 mx-2" />
          <span className="text-white">Produtos</span>
          {selectedCategory !== 'Todas' && (
            <>
              <ChevronRight className="w-4 h-4 mx-2" />
              <span className="text-white">{selectedCategory}</span>
            </>
          )}
        </nav>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar / Filters */}
          <aside className="w-full lg:w-64 shrink-0">
            <div className="bg-[#121225] border border-white/10 rounded-2xl p-6 sticky top-28">
              <div className="flex items-center gap-2 text-gold font-heading font-bold text-lg mb-6 uppercase tracking-wider">
                <Filter className="w-5 h-5" />
                Filtros
              </div>
              
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-4">Categorias</h3>
                <div className="space-y-2">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition-colors cursor-pointer ${
                        selectedCategory === cat
                          ? 'bg-gold/20 text-gold font-medium border border-gold/30'
                          : 'text-gray-400 hover:bg-white/5 hover:text-white border border-transparent'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Filter Placeholder */}
              <div>
                <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-4">Faixa de Preço</h3>
                <div className="flex items-center gap-2">
                  <input 
                    type="number" 
                    placeholder="Min" 
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    className="w-full bg-black/50 border border-white/10 rounded-md px-3 py-2 text-sm text-white focus:border-gold/50 outline-none" 
                  />
                  <span className="text-gray-500">-</span>
                  <input 
                    type="number" 
                    placeholder="Max" 
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    className="w-full bg-black/50 border border-white/10 rounded-md px-3 py-2 text-sm text-white focus:border-gold/50 outline-none" 
                  />
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            
            {/* Search Bar & Top Actions */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Buscar produtos geeks, tech, action figures..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="block w-full pl-11 pr-4 py-3 bg-[#121225] border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/50 transition-all"
                />
              </div>
              
              <div className="shrink-0 flex items-center">
                <span className="text-sm text-gray-400 mr-3">Ordenar por:</span>
                <select 
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                  className="bg-[#121225] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-gold/50 appearance-none pr-8 cursor-pointer"
                >
                  <option value="Mais Relevantes">Mais Relevantes</option>
                  <option value="Menor Preço">Menor Preço</option>
                  <option value="Maior Preço">Maior Preço</option>
                  <option value="Melhor Avaliados">Melhor Avaliados</option>
                </select>
              </div>
            </div>

            {/* Product Grid */}
            {filteredProducts.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 bg-[#121225] border border-white/10 rounded-2xl border-dashed">
                <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
                  <Search className="w-8 h-8 text-gray-500" />
                </div>
                <h3 className="text-xl font-heading font-bold text-white mb-2">Nenhum produto encontrado</h3>
                <p className="text-gray-400 text-center max-w-md">
                  Não encontramos resultados para sua busca. Tente usar termos diferentes ou limpar os filtros.
                </p>
                <button 
                  onClick={() => { setSearchTerm(''); setSelectedCategory('Todas'); setMinPrice(''); setMaxPrice(''); }}
                  className="mt-6 px-6 py-2 bg-gold text-dark font-bold text-sm uppercase tracking-wider rounded-lg hover:bg-gold-light transition-colors cursor-pointer"
                >
                  Limpar Filtros
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {paginatedProducts.map((product) => (
                  <Link to={`/produtos/${product.id}`} key={product.id} className="group flex flex-col bg-[#121225] border border-white/10 rounded-2xl overflow-hidden hover:border-gold/30 transition-all hover:shadow-[0_0_30px_rgba(212,168,83,0.1)] cursor-pointer">
                    
                    {/* Image Area */}
                    <div className="relative aspect-square overflow-hidden bg-black/50">
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      
                      {/* Badges */}
                      <div className="absolute top-3 left-3 flex flex-col gap-2">
                        {product.badges.map(badge => (
                          <span key={badge} className="bg-gold text-dark text-xs font-bold px-2 py-1 rounded uppercase tracking-wider shadow-lg">
                            {badge}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Content Area */}
                    <div className="p-5 flex flex-col flex-1">
                      <span className="text-xs text-gold/80 font-mono mb-2 uppercase tracking-wider">{product.category}</span>
                      <h3 className="text-lg font-bold text-white mb-2 line-clamp-2 leading-tight group-hover:text-gold transition-colors">
                        {product.name}
                      </h3>
                      
                      {/* Rating */}
                      <div className="flex items-center gap-1.5 mb-4">
                        <Star className="w-4 h-4 fill-gold text-gold" />
                        <span className="text-sm font-bold text-white">{product.rating}</span>
                        <span className="text-sm text-gray-500">({product.reviews})</span>
                      </div>

                      <div className="mt-auto flex items-end justify-between">
                        <div>
                          {product.oldPrice && (
                            <span className="block text-sm text-gray-500 line-through mb-0.5">
                              R$ {product.oldPrice.toFixed(2)}
                            </span>
                          )}
                          <span className="text-xl font-heading font-black text-gold">
                            R$ {product.price.toFixed(2)}
                          </span>
                        </div>
                        <button 
                          onClick={(e) => {
                            e.preventDefault();
                            addToCart(product, 1);
                          }}
                          className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-gold hover:border-gold hover:text-dark transition-all cursor-pointer"
                        >
                          <ShoppingCart className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {/* Pagination Placeholder */}
            {totalPages > 1 && (
              <div className="mt-12 flex justify-center">
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="w-10 h-10 rounded-lg flex items-center justify-center bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    &lt;
                  </button>
                  
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors cursor-pointer ${
                        currentPage === page 
                          ? 'bg-gold text-dark font-bold' 
                          : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      {page}
                    </button>
                  ))}

                  <button 
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="w-10 h-10 rounded-lg flex items-center justify-center bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    &gt;
                  </button>
                </div>
              </div>
            )}
            
          </div>
        </div>
      </div>
    </div>
  );
}

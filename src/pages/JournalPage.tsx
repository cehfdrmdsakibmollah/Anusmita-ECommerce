import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/common/ProductCard';
import { BookOpen, Clock, Calendar, ArrowRight, ArrowLeft, ChevronRight, Share2 } from 'lucide-react';

export const JournalPage: React.FC = () => {
  const { journalArticles, selectedArticle, products, navigateTo, showToast } = useStore();
  const [selectedTopic, setSelectedTopic] = useState<string>('All');

  const topics = ['All', 'Skincare Guide', 'Style & Trends'];

  const filteredArticles = journalArticles.filter(a => 
    selectedTopic === 'All' ? true : a.category === selectedTopic
  );

  // If viewing a single article detail
  if (selectedArticle) {
    const relatedProducts = products.filter(p => selectedArticle.relatedProductIds.includes(p.id));

    return (
      <div className="max-w-[860px] mx-auto px-4 sm:px-6 py-10 space-y-8">
        {/* Navigation back */}
        <button
          onClick={() => navigateTo('journal')}
          className="text-xs font-semibold text-[#514950] hover:text-[#B74764] flex items-center gap-1.5"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Journal Articles</span>
        </button>

        {/* Article Header */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs text-[#746B70]">
            <span className="font-bold text-[#B74764] uppercase tracking-wider">{selectedArticle.category}</span>
            <span>•</span>
            <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {selectedArticle.readTime}</span>
            <span>•</span>
            <span>{selectedArticle.publishedAt}</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#211D20] leading-tight">
            {selectedArticle.title}
          </h1>

          <p className="text-xs sm:text-sm text-[#746B70] font-medium">
            Written by {selectedArticle.author}
          </p>
        </div>

        {/* Article Cover Image */}
        <div className="rounded-3xl overflow-hidden border border-[#EADDE0] bg-[#FFF7F3] aspect-16/9">
          <img 
            src={selectedArticle.image} 
            alt={selectedArticle.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Article Content */}
        <article className="prose prose-sm sm:prose-base max-w-none text-[#514950] leading-relaxed whitespace-pre-line font-sans text-xs sm:text-sm">
          {selectedArticle.content}
        </article>

        {/* Related Products Featured in Article */}
        {relatedProducts.length > 0 && (
          <div className="pt-8 border-t border-[#EADDE0] space-y-6">
            <h3 className="font-serif text-2xl font-bold text-[#211D20]">
              Featured Products in This Article
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  // Listing view
  return (
    <div className="max-w-[1240px] mx-auto px-4 sm:px-6 py-10 space-y-10">
      {/* Breadcrumb */}
      <nav className="text-xs text-[#746B70] flex items-center gap-1.5">
        <button onClick={() => navigateTo('home')} className="hover:text-[#B74764]">Home</button>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-[#211D20] font-bold">The Beauty & Lifestyle Journal</span>
      </nav>

      {/* Header */}
      <div className="text-center max-w-xl mx-auto space-y-3">
        <span className="text-xs font-bold text-[#B74764] uppercase tracking-widest">
          Editorial & Sourcing Knowledge
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#211D20]">
          The ANUSMITA Journal
        </h1>
        <p className="text-xs sm:text-sm text-[#746B70] leading-relaxed">
          Evidence-based skincare advice, ingredient deep-dives, styling inspirations, and sourcing stories straight from East Asia.
        </p>
      </div>

      {/* Topic Filter Tabs */}
      <div className="flex justify-center gap-2 text-xs">
        {topics.map(t => (
          <button
            key={t}
            onClick={() => setSelectedTopic(t)}
            className={`px-4 py-2 rounded-xl font-semibold border transition ${
              selectedTopic === t
                ? 'bg-[#B74764] text-white border-[#B74764] shadow-xs'
                : 'bg-white text-[#514950] border-[#EADDE0] hover:border-[#B74764]'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Article Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredArticles.map((art) => (
          <div
            key={art.id}
            onClick={() => navigateTo('journal-detail', art.slug)}
            className="group bg-white rounded-3xl overflow-hidden border border-[#EADDE0] shadow-xs hover:shadow-md transition cursor-pointer flex flex-col justify-between"
          >
            <div className="aspect-16/9 overflow-hidden bg-[#FFF7F3]">
              <img 
                src={art.image} 
                alt={art.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            <div className="p-6 sm:p-8 space-y-3">
              <div className="flex items-center gap-2 text-[11px] text-[#746B70]">
                <span className="font-bold text-[#B74764] uppercase">{art.category}</span>
                <span>•</span>
                <span>{art.readTime}</span>
                <span>•</span>
                <span>{art.publishedAt}</span>
              </div>

              <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#211D20] group-hover:text-[#B74764] transition-colors leading-snug">
                {art.title}
              </h2>

              <p className="text-xs sm:text-sm text-[#514950] leading-relaxed line-clamp-3">
                {art.excerpt}
              </p>

              <div className="pt-2 text-xs font-bold text-[#B74764] flex items-center gap-1.5">
                <span>Read Full Article</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

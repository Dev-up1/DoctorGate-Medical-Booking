import { Footer } from '@/app/components/Footer';
import { articles, offers, type Article, type Offer } from '@/app/data/mockData';
import { Calendar, Clock, User, Tag, TrendingDown } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs';
import { OfferBookingModal } from '@/app/components/OfferBookingModal';
import { useState } from 'react';

interface OffersArticlesPageProps {
  onNavigate: (page: string, data?: any) => void;
}

export function OffersArticlesPage({ onNavigate }: OffersArticlesPageProps) {
  const [bookingOffer, setBookingOffer] = useState<Offer | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleBookingSuccess = () => {
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <div className="min-h-screen">
      {/* Success Message */}
      {showSuccess && (
        <div className="fixed top-4 right-4 z-50 bg-green-500 text-white px-6 py-4 rounded-lg shadow-xl animate-slide-in">
          <p className="font-semibold">تم تأكيد الحجز بنجاح!</p>
        </div>
      )}

      {/* Booking Modal */}
      {bookingOffer && (
        <OfferBookingModal
          offerTitle={bookingOffer.title}
          offerPrice={bookingOffer.discountedPrice}
          onClose={() => setBookingOffer(null)}
          onSuccess={handleBookingSuccess}
        />
      )}

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#0070cd] to-[#0056a3] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            العروض والمقالات الطبية
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl">
            اكتشف أحدث العروض الطبية واقرأ مقالات صحية مفيدة من أفضل الأطباء المتخصصين
          </p>
        </div>
      </section>

      {/* Tabs Section */}
      <section className="py-12 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs defaultValue="offers" className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-12">
              <TabsTrigger value="offers" className="text-lg">العروض الطبية</TabsTrigger>
              <TabsTrigger value="articles" className="text-lg">المقالات الطبية</TabsTrigger>
            </TabsList>

            <TabsContent value="offers">
              <OffersSection offers={offers} onBook={setBookingOffer} />
            </TabsContent>

            <TabsContent value="articles">
              <ArticlesSection articles={articles} />
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            اشترك في النشرة الإخبارية
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            احصل على أحدث العروض والمقالات الطبية مباشرة في بريدك الإلكتروني
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
            <input
              type="email"
              placeholder="أدخل بريدك الإلكتروني"
              className="flex-1 px-4 py-3 rounded-lg border border-border bg-input-background text-foreground"
            />
            <Button className="bg-[#0070cd] hover:bg-[#0056a3] text-white px-8">
              اشترك الآن
            </Button>
          </div>
        </div>
      </section>

      <Footer onNavigate={onNavigate} />
    </div>
  );
}

interface OffersSectionProps {
  offers: Offer[];
  onBook: (offer: Offer) => void;
}

function OffersSection({ offers, onBook }: OffersSectionProps) {
  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-2">العروض الحالية</h2>
        <p className="text-muted-foreground">
          استفد من عروضنا الطبية الحصرية بأسعار مخفضة
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {offers.map((offer) => (
          <OfferCard key={offer.id} offer={offer} onBook={() => onBook(offer)} />
        ))}
      </div>
    </div>
  );
}

interface OfferCardProps {
  offer: Offer;
  onBook: () => void;
}

function OfferCard({ offer, onBook }: OfferCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-border group">
      <div className="relative">
        <img
          src={offer.image}
          alt={offer.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 right-4">
          <Badge className="bg-red-500 text-white text-lg px-3 py-1">
            خصم {offer.discount}
          </Badge>
        </div>
      </div>

      <div className="p-6">
        <Badge variant="secondary" className="mb-3 bg-blue-50 text-[#0070cd]">
          {offer.category}
        </Badge>

        <h3 className="text-xl font-bold text-foreground mb-2">{offer.title}</h3>
        <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
          {offer.description}
        </p>

        <div className="flex items-center gap-3 mb-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground line-through">
              {offer.originalPrice.toLocaleString()} ريال
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-[#0070cd]">
              {offer.discountedPrice.toLocaleString()}
            </span>
            <span className="text-sm text-muted-foreground">ريال يمني</span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
          <Calendar className="w-4 h-4" />
          <span>صالح حتى: {new Date(offer.validUntil).toLocaleDateString('ar-YE')}</span>
        </div>

        <Button className="w-full bg-[#0070cd] hover:bg-[#0056a3] text-white" onClick={onBook}>
          احجز العرض
        </Button>
      </div>
    </div>
  );
}

interface ArticlesSectionProps {
  articles: Article[];
}

function ArticlesSection({ articles }: ArticlesSectionProps) {
  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-2">المقالات الطبية</h2>
        <p className="text-muted-foreground">
          مقالات صحية مفيدة من أطباء متخصصين
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </div>
  );
}

interface ArticleCardProps {
  article: Article;
}

function ArticleCard({ article }: ArticleCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-border group cursor-pointer">
      <div className="relative">
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      <div className="p-6">
        <Badge variant="secondary" className="mb-3 bg-blue-50 text-[#0070cd]">
          {article.category}
        </Badge>

        <h3 className="text-xl font-bold text-foreground mb-3 leading-tight group-hover:text-[#0070cd] transition-colors">
          {article.title}
        </h3>

        <p className="text-sm text-muted-foreground mb-4 leading-relaxed line-clamp-2">
          {article.excerpt}
        </p>

        <div className="flex items-center justify-between text-sm text-muted-foreground mb-4 pb-4 border-b border-border">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4" />
            <span>{article.author}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>{article.readTime}</span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="w-4 h-4" />
          <span>{new Date(article.date).toLocaleDateString('ar-YE')}</span>
        </div>
      </div>
    </div>
  );
}
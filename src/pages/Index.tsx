import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setSelectedImage(e.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const processImage = () => {
    setIsProcessing(true);
    setTimeout(() => setIsProcessing(false), 2000);
  };

  const filters = [
    { name: 'Портретная ретушь', description: 'Улучшение кожи и черт лица', icon: 'User' },
    { name: 'Винтажный стиль', description: 'Классическая обработка фото', icon: 'Camera' },
    { name: 'Художественный ЧБ', description: 'Чёрно-белая стилизация', icon: 'Palette' },
    { name: 'Мягкое свечение', description: 'Beauty-фильтр с эффектом сияния', icon: 'Sparkles' },
    { name: 'Кинематограф', description: 'Цветокоррекция как в фильмах', icon: 'Film' },
    { name: 'Профессиональное фото', description: 'Студийная обработка', icon: 'Camera' }
  ];

  const examples = [
    { before: '/img/f587f24a-26c0-4737-afd4-5678ac34aedc.jpg', after: '/img/29769d78-922d-453c-844b-6d3aae2d125d.jpg' },
    { before: '/img/77927007-e514-408f-9df3-ecc8fe96ca37.jpg', after: '/img/f587f24a-26c0-4737-afd4-5678ac34aedc.jpg' }
  ];

  const plans = [
    {
      name: 'Базовый',
      price: '990 ₽',
      period: '/месяц',
      features: ['50 обработок в месяц', 'Базовые фильтры', 'HD качество'],
      popular: false
    },
    {
      name: 'Профи',
      price: '1990 ₽', 
      period: '/месяц',
      features: ['200 обработок в месяц', 'Все фильтры', '4K качество', 'Приоритетная обработка'],
      popular: true
    },
    {
      name: 'Студия',
      price: '4990 ₽',
      period: '/месяц', 
      features: ['Безлимитные обработки', 'Все фильтры', '8K качество', 'API доступ', 'Персональная поддержка'],
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Icon name="Aperture" size={32} className="text-primary" />
              <h1 className="text-2xl font-bold text-slate-900">AI Photo Filters</h1>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#filters" className="text-slate-600 hover:text-primary transition-colors">Фильтры</a>
              <a href="#examples" className="text-slate-600 hover:text-primary transition-colors">Примеры</a>
              <a href="#pricing" className="text-slate-600 hover:text-primary transition-colors">Цены</a>
              <Button variant="outline">Войти</Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-6 text-center">
          <Badge variant="secondary" className="mb-6">Новая технология ИИ</Badge>
          <h2 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight">
            Преобразите свои фото<br />
            <span className="text-primary">одним кликом</span>
          </h2>
          <p className="text-xl text-slate-600 mb-12 max-w-2xl mx-auto">
            Профессиональная обработка портретов и селфи с помощью искусственного интеллекта. 
            Быстро, качественно, без навыков фоторедактирования.
          </p>

          {/* Upload Area */}
          <Card className="max-w-2xl mx-auto mb-12 border-2 border-dashed border-slate-300 hover:border-primary transition-colors">
            <CardContent className="p-12">
              {selectedImage ? (
                <div className="space-y-6">
                  <img src={selectedImage} alt="Загруженное фото" className="max-w-full h-64 object-cover rounded-lg mx-auto" />
                  <div className="flex gap-4 justify-center">
                    <Button onClick={processImage} disabled={isProcessing} className="px-8">
                      {isProcessing ? (
                        <>
                          <Icon name="Loader2" className="mr-2 h-4 w-4 animate-spin" />
                          Обрабатываем...
                        </>
                      ) : (
                        <>
                          <Icon name="Wand2" className="mr-2 h-4 w-4" />
                          Применить фильтр
                        </>
                      )}
                    </Button>
                    <Button variant="outline" onClick={() => setSelectedImage(null)}>
                      <Icon name="X" className="mr-2 h-4 w-4" />
                      Удалить
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <Icon name="Upload" size={48} className="text-slate-400 mx-auto" />
                  <div>
                    <h3 className="text-xl font-semibold text-slate-900 mb-2">Загрузите свое фото</h3>
                    <p className="text-slate-600 mb-6">Поддерживаются форматы JPG, PNG до 10 МБ</p>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="file-upload"
                    />
                    <label htmlFor="file-upload">
                      <Button asChild className="cursor-pointer">
                        <span>
                          <Icon name="Upload" className="mr-2 h-4 w-4" />
                          Выбрать файл
                        </span>
                      </Button>
                    </label>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <p className="text-sm text-slate-500">
            Первые 3 обработки — бесплатно. Без регистрации.
          </p>
        </div>
      </section>

      {/* Filters Section */}
      <section id="filters" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Каталог ИИ-фильтров</h2>
            <p className="text-xl text-slate-600">Специально настроенные для портретов и селфи</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filters.map((filter, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Icon name={filter.icon as any} size={24} className="text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{filter.name}</CardTitle>
                      <CardDescription>{filter.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    Попробовать
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Examples Section */}
      <section id="examples" className="py-20 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Примеры обработки</h2>
            <p className="text-xl text-slate-600">До и после применения ИИ-фильтров</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {examples.map((example, index) => (
              <Card key={index} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="relative">
                    <img 
                      src={example.before} 
                      alt={`Пример ${index + 1}`}
                      className="w-full h-64 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent">
                      <div className="absolute top-4 left-4">
                        <Badge variant="secondary">До</Badge>
                      </div>
                      <div className="absolute bottom-4 right-4">
                        <Badge className="bg-primary">После</Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Тарифные планы</h2>
            <p className="text-xl text-slate-600">Выберите подходящий план для ваших нужд</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {plans.map((plan, index) => (
              <Card key={index} className={`relative ${plan.popular ? 'border-primary shadow-lg scale-105' : ''}`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-primary">Популярный</Badge>
                  </div>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <div className="flex items-baseline justify-center">
                    <span className="text-4xl font-bold text-slate-900">{plan.price}</span>
                    <span className="text-slate-600">{plan.period}</span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center space-x-3">
                      <Icon name="Check" size={16} className="text-green-500" />
                      <span className="text-slate-700">{feature}</span>
                    </div>
                  ))}
                </CardContent>
                <CardFooter>
                  <Button className={`w-full ${plan.popular ? '' : 'variant-outline'}`}>
                    Выбрать план
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Icon name="Aperture" size={24} className="text-primary" />
              <span className="text-xl font-bold">AI Photo Filters</span>
            </div>
            <p className="text-slate-400">© 2024 AI Photo Filters. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
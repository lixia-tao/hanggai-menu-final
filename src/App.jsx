import React, { useState, useMemo } from 'react';
import { createClient } from '@supabase/supabase-js';

// === 1. 配置（填入您的 Supabase 钥匙） ===
const SUPABASE_URL = 'https://xalyterisfaqasbinoro.supabase.co';
const SUPABASE_KEY = 'sb_publishable_309UokPSyDH21yEaiASb3g__jrT65tl';
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// === 2. 菜单数据 (保持原有数据结构) ===
const menuData = [
  // --- 核心必点 ---
  { id: '', cat: '必点', zh: '杭盖冰煮羊锅底', ru: 'Основа для бульона', price: 680, img: 'https://pic1.imgdb.cn/item/69b57d9936d55e5b86ff1b67.jpg' },
  { id: '', cat: '必点', zh: '手切草原鲜羊肉(200克)', ru: 'Молодая баранина', price: 750, img: 'https://pic1.imgdb.cn/item/69b57dba36d55e5b86ff1b90.jpg' },
  { id: '', cat: '必点', zh: '必备蘸料', ru: 'Соус', price: 150, img: 'https://pic1.imgdb.cn/item/69b57ed036d55e5b86ff1ccc.jpg' },

  // --- 蔬菜系列 ---
  { id: '1.', cat: '草原蔬菜', zh: '生菜130克', ru: 'Салат латук, 130 г', price: 180, img: 'https://pic1.imgdb.cn/item/69a809f6e2b0164ce37aa2dd.jpg' },
  { id: '2.', cat: '草原蔬菜', zh: '香菜150克', ru: 'Кинза, 150 г', price: 190, img: 'https://pic1.imgdb.cn/item/69a80a8be2b0164ce37aa2fd.jpg' },
  { id: '3.', cat: '草原蔬菜', zh: '菠菜200克', ru: 'Шпинат, 200 г', price: 250, img: 'https://pic1.imgdb.cn/item/69a809ece2b0164ce37aa2da.jpg' },
  { id: '4.', cat: '草原蔬菜', zh: '大白菜220克', ru: 'Капуста пекинская, 220 г', price: 250, img: 'https://pic1.imgdb.cn/item/69a80b9ae2b0164ce37aa349.jpg' },
  { id: '5.', cat: '草原蔬菜', zh: '娃娃菜220克', ru: 'Пекинская капуста мини, 220 г', price: 250, img: 'https://pic1.imgdb.cn/item/69a80a84e2b0164ce37aa2fa.jpg' },
  { id: '6.', cat: '草原蔬菜', zh: '油麦菜200克', ru: 'Листовая горчица, 200 г', price: 270, img: 'https://pic1.imgdb.cn/item/69a80a97e2b0164ce37aa300.jpg' },
  { id: '7.', cat: '草原蔬菜', zh: '茼蒿220克', ru: 'Хризантема овощная, 220 г', price: 280, img: 'https://pic1.imgdb.cn/item/69a80b4be2b0164ce37aa32d.jpg' },
  { id: '62.', cat: '草原蔬菜', zh: '冬瓜250克', ru: 'Китайская тыква 250 г', price: 280, img: 'https://pic1.imgdb.cn/item/69bbcddc658eb5ba3dfa7f21.jpg' },
  { id: '8.', cat: '草原蔬菜', zh: '青菜拼盘小份200克', ru: 'Маленькая овощная ассорти, 200 г', price: 380, img: 'https://pic1.imgdb.cn/item/69a80e55e2b0164ce37aa5f7.png' },
  { id: '9.', cat: '草原蔬菜', zh: '青菜拼盘大份400克', ru: 'Большая овощная ассорти, 400 г', price: 620, img: 'https://pic1.imgdb.cn/item/69a80cc6e2b0164ce37aa4c4.png' },

  // --- 草原菌类 ---
  { id: '10.', cat: '草原菌类', zh: '木耳150克', ru: 'Древесные грибы, 150 г', price: 280, img: 'https://pic1.imgdb.cn/item/69a80fe7e2b0164ce37aa7ca.jpg' },
  { id: '11.', cat: '草原菌类', zh: '杏鲍菇200克', ru: 'Вешенка королевская, 200 г', price: 280, img: 'https://pic1.imgdb.cn/item/69a80ff5e2b0164ce37aa7cf.jpg' },
  { id: '12.', cat: '草原菌类', zh: '白玉菇150克', ru: 'Белые грибы (вуйпи), 150 г', price: 280, img: 'https://pic1.imgdb.cn/item/69a80fd8e2b0164ce37aa7c6.jpg' },
  { id: '13.', cat: '草原菌类', zh: '香菇150克', ru: 'Шиитаке, 150 г', price: 280, img: 'https://pic1.imgdb.cn/item/69a80feee2b0164ce37aa7cc.jpg' },
  { id: '14.', cat: '草原菌类', zh: '蟹味菇150克', ru: 'Грибы крабовые, 150 г', price: 280, img: 'https://pic1.imgdb.cn/item/69a812efe2b0164ce37aa86e.png' },
  { id: '15.', cat: '草原菌类', zh: '金针菇100克', ru: 'Энокитаке, 100 г', price: 350, img: 'https://pic1.imgdb.cn/item/69a80fdfe2b0164ce37aa7c7.jpg' },
  { id: '16.', cat: '草原菌类', zh: '菌类拼盘360克', ru: 'Грибное ассорти, 360 г', price: 600, img: 'https://pic1.imgdb.cn/item/69a960b4a1838fcbddfc8fc0.png' },
  // --- 草原丸子 ---
  { id: '17.', cat: '草原丸子', zh: '墨鱼丸8个', ru: 'Фрикадельки из кальмара (8 шт.)', price: 450, img: 'https://pic1.imgdb.cn/item/69a813a8e2b0164ce37aa87c.jpg' },
  { id: '18.', cat: '草原丸子', zh: '鱼籽包8个', ru: 'Мешочки с икрой (8 шт.)', price: 450, img: 'https://pic1.imgdb.cn/item/69a813bde2b0164ce37aa880.jpg' },
  { id: '19.', cat: '草原丸子', zh: '龙虾丸8个', ru: 'Фрикадельки из омара (8 шт.)', price: 450, img: 'https://pic1.imgdb.cn/item/69a8139ce2b0164ce37aa87a.jpg' },
  { id: '20.', cat: '草原丸子', zh: '撒尿牛丸8个', ru: 'Фрикадельки "Сочная говядина" (8 шт.)', price: 450, img: 'https://pic1.imgdb.cn/item/69a813b4e2b0164ce37aa87e.jpg' },
  { id: '21.', cat: '草原丸子', zh: '亲亲肠8个', ru: 'Сосиски "Циньциньчан" (8 шт.)', price: 450, img: 'https://pic1.imgdb.cn/item/69a813aee2b0164ce37aa87d.jpg' },
  { id: '22.', cat: '草原丸子', zh: '鱼豆腐8个', ru: 'Рыбный тофу (8 шт.)', price: 450, img: 'https://pic1.imgdb.cn/item/69a813b8e2b0164ce37aa87f.jpg' },
  { id: '23.', cat: '草原丸子', zh: '包心鱼丸8个', ru: 'Фрикадельки с начинкой (8 шт.)', price: 450, img: 'https://pic1.imgdb.cn/item/69a81592e2b0164ce37aa8be.png' },
  { id: '24.', cat: '草原丸子', zh: '丸子拼盘300克', ru: 'Ассорти фрикаделек (300 г)', price: 880, img: 'https://pic1.imgdb.cn/item/69a816f8e2b0164ce37aa8e4.png' },
  // --- 原野涮品 ---
  { id: '25.', cat: '原野涮品', zh: '豆皮100克', ru: 'Соевая кожица (100 г)', price: 180, img: 'https://pic1.imgdb.cn/item/69a95c06a1838fcbddfc8e85.png' },
  { id: '26.', cat: '原野涮品', zh: '细粉丝150克', ru: 'Тонкая лапша (150 г)', price: 180, img: 'https://pic1.imgdb.cn/item/69a95936a1838fcbddfc87c9.png' },
  { id: '27.', cat: '原野涮品', zh: '细面条200克', ru: 'Домашняя яичая лапша 200г', price: 180, img: 'https://pic1.imgdb.cn/item/69a95da1a1838fcbddfc8f72.png' },
  { id: '63.', cat: '原野涮品', zh: '方便面饼', ru: 'Лапша быстрого приготовления', price: 150, img: 'https://pic1.imgdb.cn/item/69bbce16658eb5ba3dfa7f34.jpg' },
  { id: '28.', cat: '原野涮品', zh: '宽粉180克', ru: 'Широкая лапша (180 г)', price: 180, img: 'https://pic1.imgdb.cn/item/69a9596fa1838fcbddfc87d8.png' },
  { id: '29.', cat: '原野涮品', zh: '玉米300克', ru: 'Кукуруза, 300 г', price: 220, img: 'https://pic1.imgdb.cn/item/69a817bee2b0164ce37aa925.jpg' },
  { id: '30.', cat: '原野涮品', zh: '腐竹250克', ru: 'Юба (соевые палочки, 250 г)', price: 280, img: 'https://pic1.imgdb.cn/item/69a817ade2b0164ce37aa920.jpg' },
  { id: '31.', cat: '原野涮品', zh: '竹笋230克', ru: 'Бамбуковые побеги, 230 г', price: 300, img: 'https://pic1.imgdb.cn/item/69a817c4e2b0164ce37aa927.jpg' },
  { id: '32.', cat: '原野涮品', zh: '蒙古豆腐180克', ru: 'Монгольский тофу (180 г)', price: 350, img: 'https://pic1.imgdb.cn/item/69a9591ea1838fcbddfc87c6.png' },
  { id: '64.', cat: '原野涮品', zh: '冻豆腐180克', ru: 'Замороженный тофу 180 г', price: 350, img: 'https://pic1.imgdb.cn/item/69bbcdfc658eb5ba3dfa7f2a.jpg' },
  { id: '33.', cat: '原野涮品', zh: '响铃卷125克', ru: 'Хрустящие соевые рулетики, 125 г', price: 450, img: 'https://pic1.imgdb.cn/item/69a95c1ca1838fcbddfc8edd.png' },
  { id: '34.', cat: '原野涮品', zh: '午餐肉170克', ru: 'Ветчина консервированная, 200 г', price: 450, img: 'https://pic1.imgdb.cn/item/69a817b3e2b0164ce37aa922.jpg' },
  { id: '65.', cat: '原野涮品', zh: '蟹棒150克', ru: 'Крабовые палочки 150 г', price: '', img: 'https://pic1.imgdb.cn/item/69bbce45658eb5ba3dfa7f46.jpg' },
  // 大口吃肉系列
  { id: '35.', cat: '肉类', zh: '羊肉卷200克', ru: 'Рулетики из баранины. 200г', price: 650, img: 'https://pic1.imgdb.cn/item/69a95db9a1838fcbddfc8f73.jpg' },
  { id: '36.', cat: '肉类', zh: '手切羊肉200克', ru: 'Рубленая баранина.200г', price: 650, img: 'https://pic1.imgdb.cn/item/69a95dd4a1838fcbddfc8f75.jpg' },
  { id: '37.', cat: '肉类', zh: '手打虾滑130克', ru: 'Ручной работы креветочный фарш, 130 г', price: 600, img: 'https://pic1.imgdb.cn/item/69a95f1ea1838fcbddfc8f84.png' },
  { id: '38.', cat: '肉类', zh: '带骨羊肉卷225克', ru: 'Рулетики из баранины с косточкой, 225 г', price: 650, img: 'https://pic1.imgdb.cn/item/69a961d8a1838fcbddfc8fdb.png' },
  { id: '39.', cat: '肉类', zh: '羊排卷250克', ru: 'Рулетики из бараньих рёбрышек, 250 г', price: 650, img: 'https://pic1.imgdb.cn/item/69a963eea1838fcbddfc903e.png' },
    // --- 蒙古烧烤 ---
  { id: '40.', cat: '蒙古烧烤', zh: '面包片一串', ru: 'Хлебные ломтики', price: 80, img: 'https://pic1.imgdb.cn/item/69a962daa1838fcbddfc9013.jpg' },
  { id: '41.', cat: '蒙古烧烤', zh: '韭菜1份', ru: 'Лук душистый, 1 порция', price: 180, img: 'https://pic1.imgdb.cn/item/69a96280a1838fcbddfc8ffc.jpg' },
  { id: '42.', cat: '蒙古烧烤', zh: '烤土豆片5个', ru: 'Жареный картофель (ломтики), 5 шт.', price: 180, img: 'https://pic1.imgdb.cn/item/69a9628da1838fcbddfc9003.jpg' },
  { id: '66.', cat: '蒙古烧烤', zh: '烤土豆块', ru: 'Запеченный картофель', price: '', img: 'https://pic1.imgdb.cn/item/69bbce30658eb5ba3dfa7f3f.jpg' },
  { id: '43.', cat: '蒙古烧烤', zh: '鸡翅中2个', ru: 'Куриные крылышки (середина), 2 шт.', price: 280, img: 'https://pic1.imgdb.cn/item/69a96272a1838fcbddfc8ff9.jpg' },
  { id: '44.', cat: '蒙古烧烤', zh: '秘料烤鸡翅1串', ru: 'Куриные крылышки с секретным соусом, 1 шт.', price: 260, img: 'https://pic1.imgdb.cn/item/69a962d4a1838fcbddfc9011.jpg' },
  { id: '45.', cat: '蒙古烧烤', zh: '烤大虾2个', ru: 'Жареные креветки, 2 шт.', price: 300, img: 'https://pic1.imgdb.cn/item/69a96285a1838fcbddfc8ffd.jpg' },
  { id: '46.', cat: '蒙古烧烤', zh: '豆角3串', ru: 'Стручковая фасоль на шпажках, 3 шт.', price: 300, img: 'https://pic1.imgdb.cn/item/69a9626aa1838fcbddfc8ff8.jpg' },
  { id: '47.', cat: '蒙古烧烤', zh: '蒙古族传承羊排/公斤', ru: 'Баранина на рёбрышках по-монгольски (за кг)', price: 1600, img: 'https://pic1.imgdb.cn/item/69a962e9a1838fcbddfc9016.jpg' },
  { id: '48.', cat: '蒙古烧烤', zh: '奔跑的五花肉5串', ru: 'Шашлык из свиной грудинки, 5 шт.', price: 300, img: 'https://pic1.imgdb.cn/item/69a962e1a1838fcbddfc9014.jpg' },
];

const categories = ['必点', '草原蔬菜', '草原菌类', '草原丸子', '原野涮品', '肉类', '蒙古烧烤', '凉菜', '牧民主食', '草原甜点、饮品'];

export default function App() {
  const [lang, setLang] = useState('zh');
  const [cart, setCart] = useState({}); // 格式: { "菜名": { item, count } }
  const [activeCat, setActiveCat] = useState('必点');

  const t = {
    zh: { title: '杭盖·冰煮羊', order: '提交订单', total: '合计', unit: '₽', switch: 'Русский', count: '份' },
    ru: { title: 'Хангай', order: 'Заказать', total: 'Итого', unit: '₽', switch: '中文', count: 'шт' }
  }[lang];

  // 数量控制逻辑
  const updateCart = (item, delta) => {
    const key = item.zh;
    setCart(prev => {
      const newCart = { ...prev };
      const currentCount = newCart[key]?.count || 0;
      const nextCount = currentCount + delta;
      
      if (nextCount <= 0) {
        delete newCart[key];
      } else {
        newCart[key] = { item, count: nextCount };
      }
      return newCart;
    });
  };

  const totalPrice = useMemo(() => {
    return Object.values(cart).reduce((sum, entry) => sum + (entry.item.price * entry.count), 0);
  }, [cart]);

  const cartItemsCount = Object.values(cart).reduce((sum, entry) => sum + entry.count, 0);

  return (
    <div className="flex flex-col md:flex-row h-screen bg-[#F8F9FA] overflow-hidden font-sans text-[#1A365D]">
      
      {/* 1. 顶部通栏 (大气导航) */}
      <header className="w-full h-16 md:h-20 bg-[#1A365D] flex items-center justify-between px-6 shadow-lg fixed top-0 z-50">
        <div className="flex items-center gap-3">
          <img src="https://pic1.imgdb.cn/item/69c12e4bdc921df82a0c1f76.jpg" className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-[#D4AF37]" alt="Logo" />
          <h1 className="text-xl md:text-2xl font-black text-[#D4AF37] tracking-widest uppercase">{t.title}</h1>
        </div>
        <button 
          onClick={() => setLang(lang === 'zh' ? 'ru' : 'zh')}
          className="bg-[#D4AF37] text-[#1A365D] px-4 py-1.5 rounded-full text-xs font-black hover:bg-white transition-colors"
        >
          {t.switch}
        </button>
      </header>

      {/* 2. 主体内容区 */}
      <div className="flex flex-1 pt-16 md:pt-20 overflow-hidden">
        
        {/* 左侧分类栏 (大气竖版) */}
        <nav className="w-24 md:w-32 bg-white border-r border-gray-200 flex flex-col overflow-y-auto no-scrollbar py-4">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCat(cat)}
              className={`w-full py-6 px-2 text-xs md:text-sm font-bold transition-all relative ${
                activeCat === cat 
                  ? 'text-[#D4AF37] bg-[#F8F9FA]' 
                  : 'text-gray-400 hover:text-[#1A365D]'
              }`}
            >
              {activeCat === cat && <div className="absolute left-0 top-1/4 bottom-1/4 w-1.5 bg-[#D4AF37] rounded-r-full"></div>}
              {cat}
            </button>
          ))}
        </nav>

        {/* 右侧菜品区 (网格布局) */}
        <main className="flex-1 overflow-y-auto bg-[#F8F9FA] p-4 md:p-8">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-black mb-8 text-center text-[#1A365D] relative">
              <span className="bg-[#F8F9FA] px-6 relative z-10">{activeCat}</span>
              <div className="absolute top-1/2 left-0 w-full h-[2px] bg-[#D4AF37]/20 -z-0"></div>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {menuData.filter(item => item.cat === activeCat).map((item, idx) => {
                const count = cart[item.zh]?.count || 0;
                return (
                  <div key={idx} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow border border-gray-100 group">
                    {/* 图片容器: 强制 4:3 比例 */}
                    <div className="aspect-[4/3] overflow-hidden bg-gray-100">
                      <img src={item.img} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt={item.zh} />
                    </div>
                    
                    <div className="p-5">
                      <div className="min-h-[60px]">
                        <h3 className="text-lg font-black text-[#1A365D] line-clamp-1">{item.id} {lang === 'zh' ? item.zh : item.ru}</h3>
                        <p className="text-xs text-gray-400 mt-1 uppercase tracking-tighter">{lang === 'zh' ? item.ru : item.zh}</p>
                      </div>

                      <div className="flex items-center justify-between mt-4">
                        <div className="text-2xl font-black text-[#D4AF37]">
                          {item.price} <span className="text-xs font-normal">{t.unit}</span>
                        </div>
                        
                        {/* 数量控制器 */}
                        <div className="flex items-center gap-3">
                          {count > 0 ? (
                            <>
                              <button onClick={() => updateCart(item, -1)} className="w-8 h-8 rounded-full border-2 border-[#1A365D] text-[#1A365D] font-bold flex items-center justify-center">-</button>
                              <span className="font-bold text-[#1A365D]">{count}</span>
                            </>
                          ) : null}
                          <button 
                            onClick={() => updateCart(item, 1)}
                            className="w-8 h-8 rounded-full bg-[#1A365D] text-[#D4AF37] font-bold flex items-center justify-center shadow-lg active:scale-90 transition-transform"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="h-32"></div> {/* 占位符防止底部结算条遮挡 */}
        </main>
      </div>

      {/* 3. 底部购物车 (悬浮通栏) */}
      {cartItemsCount > 0 && (
        <div className="fixed bottom-0 left-0 right-0 p-4 md:p-6 z-[60] animate-slideUp">
          <div className="max-w-4xl mx-auto bg-[#1A365D] rounded-2xl md:rounded-full p-4 md:px-8 flex items-center justify-between shadow-[0_20px_50px_rgba(26,54,93,0.3)] border border-[#D4AF37]/30">
            <div className="flex items-center gap-6">
              <div className="relative">
                <span className="absolute -top-3 -right-3 bg-[#D4AF37] text-[#1A365D] w-6 h-6 rounded-full text-[10px] font-black flex items-center justify-center border-2 border-[#1A365D]">
                  {cartItemsCount}
                </span>
                <div className="text-[#D4AF37]">
                   <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
                </div>
              </div>
              <div>
                <p className="text-[#D4AF37]/70 text-[10px] uppercase font-bold tracking-widest">{t.total}</p>
                <p className="text-white text-2xl font-black">{totalPrice} <span className="text-xs text-[#D4AF37]">{t.unit}</span></p>
              </div>
            </div>
            <button className="bg-[#D4AF37] text-[#1A365D] px-10 py-3 rounded-xl md:rounded-full font-black text-sm md:text-base hover:bg-white active:scale-95 transition-all shadow-lg">
              {t.order}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
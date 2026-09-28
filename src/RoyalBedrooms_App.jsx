// ============================================================================
//  ROYAL BEDROOMS — Luxury Bedroom Furniture Showcase & E-commerce App
//  Single-file React application (App.jsx)
//
//  SETUP (2 minutes):
//    1) npx create-react-app royal-bedrooms  (or Vite: npm create vite@latest)
//    2) Replace src/App.jsx with this file
//    3) In public/index.html add inside <head>:
//         <html lang="ar" dir="rtl">
//         <script src="https://cdn.tailwindcss.com"></script>
//         <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;500;600;700;800&family=Amiri:wght@400;700&display=swap" rel="stylesheet">
//    4) npm start
//
//  No extra npm dependencies — everything is plain React + Tailwind classes.
// ============================================================================

import React, {
  useState,
  useEffect,
  useMemo,
  createContext,
  useContext,
  useReducer,
} from "react";
import "./App.css";
/* ----------------------------- CONFIG ------------------------------------ */
const WHATSAPP_NUMBER = "01125683265"; // <-- change to the business number
const STORAGE_KEY = "royal_bedrooms_products_v1";
const ADMIN_PASSWORD = "admin123"; // <-- change the admin panel password

const CATEGORIES = [
  "كل الغرف",
  "غرف نوم كلاسيكية",
  "غرف نوم مودرن",
  "غرف نوم ملكية",
  "غرف أطفال",
];

const CURRENCY = "ر.س";

/* --------------------------- SEED DATA ----------------------------------- */
const u = (id, w = 1200) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

const seedProducts = [
  {
    id: "br-001",
    name: "غرفة نوم رويال الملكية",
    category: "غرف نوم ملكية",
    price: 24500,
    oldPrice: 28900,
    images: [
      u("photo-1616594039964-ae9021a400a0"),
      u("photo-1540518614846-7eded433c457"),
      u("photo-1522771739844-6a9f6d5f14af"),
    ],
    short:
      "غرفة نوم فاخرة بطراز ملكي متكامل تضم سريراً كبيراً وخزانة ملابس وكومودينو.",
    description:
      "تحفة فنية تجمع بين الفخامة الملكية والحرفية العالية. صُنعت يدوياً من أجود أنواع الخشب الطبيعي مع نقوش ذهبية وقشرة الجوز الفاخرة، وتشمل طقم كامل: سرير كبير بظهر عالي منجد، خزانة ملابس مزدوجة بمرآة، كومودينو ×2، وطاولة تسريح.",
    dimensions: "السرير: 200×180 سم — الخزانة: 240×220×60 سم",
    material: "خشب زان طبيعي 100% مع قشرة جوز وقماش مخملي",
    warranty: "ضمان 10 سنوات ضد عيوب الصناعة",
    available: true,
    featured: true,
  },
  {
    id: "br-002",
    name: "غرفة نوم فيرونا الكلاسيكية",
    category: "غرف نوم كلاسيكية",
    price: 18900,
    oldPrice: null,
    images: [
      u("photo-1615873968403-89e068629265"),
      u("photo-1595526114035-0d45ed16cfbf"),
    ],
    short: "أناقة إيطالية كلاسيكية بخطوط ناعمة وتشطيبات خشبية دافئة.",
    description:
      "غرفة نوم مستوحاة من الطراز الإيطالي الكلاسيكي، بألوان البيج الدافئة ولمسات نحاسية على المقابض. تشمل سريراً بحوض خشبي متين، خزانة بأبواب مزخرفة، وكومودينو أنيق.",
    dimensions: "السرير: 200×160 سم — الخزانة: 200×210×55 سم",
    material: "خشب سنديان طبيعي مع طلاء بولي يوريثان مقاوم للخدش",
    warranty: "ضمان 10 سنوات ضد عيوب الصناعة",
    available: true,
    featured: true,
  },
  {
    id: "br-003",
    name: "غرفة نوم ميلانو المودرن",
    category: "غرف نوم مودرن",
    price: 13400,
    oldPrice: 15800,
    images: [
      u("photo-1617806118233-18e1de247200"),
      u("photo-1505693416388-ac5ce068fe85"),
    ],
    short: "تصميم إيطالي عصري بخطوط هندسية نظيفة وألوان محايدة راقية.",
    description:
      "بساطة تلتقي بالفخامة. غرفة نوم مودرن بخطوط مستقيمة وإضاءة LED مخفية في الظهر، تشطيب مطفي فاخر، ومساحات تخزين ذكية. مثالية لعشاق التصميم الاسكندنافي العصري.",
    dimensions: "السرير: 200×180 سم — الخزانة: 220×200×58 سم",
    material: "خشب MDF ألماني فائق مع قشرة طبيعية ودهانات إيطالية",
    warranty: "ضمان 10 سنوات ضد عيوب الصناعة",
    available: true,
    featured: true,
  },
  {
    id: "br-004",
    name: "غرفة نوم ليون الخشبية",
    category: "غرف نوم كلاسيكية",
    price: 16800,
    oldPrice: null,
    images: [
      u("photo-1567767292278-a4f21aa2d36e"),
      u("photo-1615529182904-14819c35db37"),
    ],
    short: "دفء الخشب الطبيعي بلمسات ريفية راقية وإضاءة دافئة.",
    description:
      "غرفة نوم بروح ريفية فاخرة، خشب طبيعي غير مصبوغ بملمسه الأصلي، مع أقمشة كتانية فاخرة وإضاءة دافئة تخلق أجواء الاسترخاء المثالية.",
    dimensions: "السرير: 190×160 سم — الخزانة: 190×200×55 سم",
    material: "خشب صنوبر طبيعي معتّق وقماش كتان مقاوم للبقع",
    warranty: "ضمان 10 سنوات ضد عيوب الصناعة",
    available: true,
    featured: false,
  },
  {
    id: "br-005",
    name: "غرفة نوم سيرينيتي",
    category: "غرف نوم مودرن",
    price: 11200,
    oldPrice: null,
    images: [
      u("photo-1595526051245-4506e0005bd0"),
      u("photo-1586023492125-27b2c045efd7"),
    ],
    short: "ألوان ترابية هادئة وتصميم انسيابي يمنح غرفتك هدوءاً ملكياً.",
    description:
      "غرفة نوم صُممت للراحة القصوى: ألوان رملية وترابية، ظهر سرير منجد ناعم بارتفاع مريح للقراءة، وأسطح مقاومة للخدش سهلة التنظيف.",
    dimensions: "السرير: 200×180 سم — الخزانة: 200×190×55 سم",
    material: "خشب زان مع أقمشة مقاومة للبقع وتقنية Easy-Clean",
    warranty: "ضمان 10 سنوات ضد عيوب الصناعة",
    available: true,
    featured: false,
  },
  {
    id: "br-006",
    name: "غرفة أطفال سكاي أدفنشر",
    category: "غرف أطفال",
    price: 8900,
    oldPrice: 9900,
    images: [
      u("photo-1616627561839-074385245ff6"),
      u("photo-1567767292278-a4f21aa2d36e"),
    ],
    short: "غرفة أطفال آمنة ومرحة بألوان هادئة وتخزين ذكي للألعاب والكتب.",
    description:
      "غرفة أطفال عملية وآمنة: زوايا مدورة، دهانات صديقة للبيئة خالية من الرصاص، سرير بدرجات تخزين، مكتب دراسة مدمج، وإمكانية تخصيص الألوان حسب ذوق طفلك.",
    dimensions: "السرير: 190×120 سم — المكتب: 120×75 سم",
    material: "خشب MDF صديق للبيئة بدرجة E0 مع دهانات مائية آمنة",
    warranty: "ضمان 10 سنوات ضد عيوب الصناعة",
    available: true,
    featured: false,
  },
  {
    id: "br-007",
    name: "غرفة نوم أوركا الملكية",
    category: "غرف نوم ملكية",
    price: 27500,
    oldPrice: null,
    images: [
      u("photo-1540518614846-7eded433c457"),
      u("photo-1616594039964-ae9021a400a0"),
      u("photo-1595526114035-0d45ed16cfbf"),
    ],
    short: "قمة الفخامة: قشرة جوز أمريكي، نحاس مصقول، وإضاءة مخفية ساحرة.",
    description:
      "قمة ما يمكن أن تصل إليه حرفة صناعة غرف النوم. قشرة جوز أمريكي فاخرة، تفاصيل نحاسية مصقولة يدوياً، إضاءة LED مخفية بثلاث درجات، وجلد طبيعي في الظهر. قطعة استثمارية تدوم أجيالاً.",
    dimensions: "السرير: 210×200 سم — الخزانة: 260×230×65 سم",
    material: "قشرة جوز أمريكي + جلد طبيعي + نحاس مصقول",
    warranty: "ضمان 10 سنوات + صيانة دورية مجانية لسنتين",
    available: true,
    featured: true,
  },
  {
    id: "br-008",
    name: "غرفة نوم نور التركية",
    category: "غرف نوم مودرن",
    price: 9800,
    oldPrice: null,
    images: [
      u("photo-1522771739844-6a9f6d5f14af"),
      u("photo-1505693416388-ac5ce068fe85"),
    ],
    short: "تصميم تركي عصري بسعر ذكي وجودة تصنيع أوروبية.",
    description:
      "غرفة نوم بجودة تصنيع تركية عالية وخطوط عصرية أنيقة. الخيار الأمثل لمن يبحث عن التوازن بين السعر والجودة والفخامة، مع ضمان حقيقي لعشر سنوات.",
    dimensions: "السرير: 200×160 سم — الخزانة: 180×190×55 سم",
    material: "خشب زان تركي طبيعي مع أقمشة مستوردة",
    warranty: "ضمان 10 سنوات ضد عيوب الصناعة",
    available: false,
    featured: false,
  },
];

/* --------------------------- HELPERS ------------------------------------- */
const fmt = (n) => Number(n || 0).toLocaleString("en-US");
const waLink = (p) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    `مرحباً، أريد الاستفسار عن غرفة نوم: ${p.name} (رقم المنتج: ${p.id}) بسعر ${fmt(p.price)} ${CURRENCY}.`,
  )}`;
const waGeneral = () =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    "مرحباً، أريد الاستفسار عن غرف النوم المتوفرة لديكم.",
  )}`;

const fallbackImg =
  "data:image/svg+xml," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600'><rect width='100%' height='100%' fill='#1A1A1A'/><text x='50%' y='50%' fill='#C5A880' font-size='30' text-anchor='middle' font-family='sans-serif'>صورة الغرفة</text></svg>`,
  );

const SmartImg = ({ src, alt, className }) => (
  <img
    src={src}
    alt={alt}
    className={className}
    loading="lazy"
    onError={(e) => {
      if (e.currentTarget.src !== fallbackImg)
        e.currentTarget.src = fallbackImg;
    }}
  />
);

/* ----------------------- STATE (Context + Reducer) ------------------------ */
const ProductCtx = createContext(null);
const useProducts = () => useContext(ProductCtx);

function productReducer(state, action) {
  switch (action.type) {
    case "ADD":
      return [action.product, ...state];
    case "UPDATE":
      return state.map((p) =>
        p.id === action.product.id ? action.product : p,
      );
    case "DELETE":
      return state.filter((p) => p.id !== action.id);
    case "RESET":
      return seedProducts;
    default:
      return state;
  }
}

function loadInitial() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length) return parsed;
    }
  } catch (e) {}
  return seedProducts;
}

function ProductsProvider({ children }) {
  const [products, dispatch] = useReducer(
    productReducer,
    undefined,
    loadInitial,
  );
  const [toast, setToast] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
    } catch (e) {}
  }, [products]);

  const notify = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2600);
  };

  return (
    <ProductCtx.Provider value={{ products, dispatch, notify }}>
      {children}
      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] bg-[#1A1A1A] text-[#FDFBF7] text-sm px-5 py-3 rounded-full shadow-2xl border border-[#C5A880]/40 flex items-center gap-2">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#C5A880"
            strokeWidth="2"
          >
            <path d="M20 6L9 17l-5-5" />
          </svg>
          {toast}
        </div>
      )}
    </ProductCtx.Provider>
  );
}

/* ------------------------------ ICONS ------------------------------------ */
const I = {
  search: (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    >
      <circle cx="11" cy="11" r="7" />
      <path d="M21 21l-4.3-4.3" />
    </svg>
  ),
  wa: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5.1-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.4-.7-1.6-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4 0-.5.2-.7l.5-.6c.1-.2.1-.4 0-.5l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.9.9-1.1 2.2-.2 3.9a11.6 11.6 0 0 0 4.5 4.3c1.7.8 2.4.9 3.2.7.5-.1 1.4-.6 1.6-1.2.2-.6.2-1 .1-1.2 0-.1-.2-.2-.4-.3z" />
    </svg>
  ),
  menu: (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    >
      <path d="M4 7h16M4 12h16M4 17h10" />
    </svg>
  ),
  close: (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    >
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  ),
  bed: (
    <svg
      width="26"
      height="26"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
    >
      <path d="M2 20v-8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v8" />
      <path d="M4 10V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v4" />
      <path d="M2 17h20" />
      <path d="M6 10V8h5v2M15 10V8h3v2" />
    </svg>
  ),
  ruler: (
    <svg
      width="26"
      height="26"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
    >
      <path d="M2 16l14-14 6 6L8 22l-6-6z" />
      <path d="M7.5 10.5l2 2M10.5 7.5l2 2M13.5 4.5l2 2" />
    </svg>
  ),
  truck: (
    <svg
      width="26"
      height="26"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M1 8h13v9H1zM14 11h4l3 3v3h-7z" />
      <circle cx="6" cy="19" r="1.6" />
      <circle cx="17.5" cy="19" r="1.6" />
    </svg>
  ),
  shield: (
    <svg
      width="26"
      height="26"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 2l8 3v6c0 5-3.5 9.5-8 11-4.5-1.5-8-6-8-11V5l8-3z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  ),
  palette: (
    <svg
      width="26"
      height="26"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
    >
      <circle cx="12" cy="12" r="9" />
      <circle cx="8" cy="9" r="1" fill="currentColor" />
      <circle cx="15" cy="8" r="1" fill="currentColor" />
      <circle cx="17" cy="13" r="1" fill="currentColor" />
      <path d="M12 21a2.5 2.5 0 0 0 0-5h-1" />
    </svg>
  ),
  edit: (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17 3l4 4L8 20H4v-4L17 3z" />
    </svg>
  ),
  trash: (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    >
      <path d="M3 6h18M8 6V4h8v2M6 6l1 14h10l1-14M10 11v6M14 11v6" />
    </svg>
  ),
  plus: (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    >
      <path d="M12 5v14M5 12h14" />
    </svg>
  ),
  arrow: (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ transform: "scaleX(-1)" }}
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  ),
};

/* ------------------------------ NAVBAR ------------------------------------ */
function Navbar({ page, setPage, query, setQuery }) {
  const [open, setOpen] = useState(false);
  const links = [
    { id: "home", label: "الرئيسية" },
    { id: "products", label: "المنتجات" },
    { id: "services", label: "خدماتنا" }
  ];
  const go = (id) => {
    setPage(id);
    setOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-[#FDFBF7]/85 backdrop-blur-xl border-b border-[#C5A880]/25">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 md:h-[72px] flex items-center gap-4">
        <button
          onClick={() => go("home")}
          className="flex items-center gap-2 shrink-0"
        >
          <span className="w-9 h-9 rounded-full bg-[#1A1A1A] text-[#C5A880] grid place-items-center">
            {I.bed}
          </span>
          <span className="text-lg md:text-xl font-extrabold tracking-tight text-[#1A1A1A]">
            رويال <span className="text-[#B08D4F]">للغرف</span>
          </span>
        </button>

        <nav className="hidden lg:flex items-center gap-1 mx-auto">
          {links.map((l) => (
            <button
              key={l.id}
              onClick={() => go(l.id)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition ${
                page === l.id
                  ? "bg-[#1A1A1A] text-[#FDFBF7]"
                  : "text-[#1A1A1A]/70 hover:text-[#1A1A1A] hover:bg-[#C5A880]/10"
              }`}
            >
              {l.label}
            </button>
          ))}
        </nav>

        <div className="hidden md:flex items-center relative mr-auto lg:mr-0">
          <span className="absolute right-3 text-[#1A1A1A]/40">{I.search}</span>
          <input
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              if (page !== "products") setPage("products");
            }}
            placeholder="ابحث عن غرفة نوم..."
            className="w-48 lg:w-64 bg-white/70 border border-[#C5A880]/30 rounded-full pr-10 pl-4 py-2 text-sm outline-none focus:border-[#B08D4F] focus:ring-2 focus:ring-[#C5A880]/20 transition"
          />
        </div>

        <a
          href={waGeneral()}
          target="_blank"
          rel="noreferrer"
          className="hidden sm:inline-flex items-center gap-2 bg-[#1F7A4D] hover:bg-[#186140] text-white text-sm font-bold px-4 py-2 rounded-full transition shadow-lg shadow-[#1F7A4D]/20"
        >
          {I.wa} واتساب
        </a>

        <button
          className="lg:hidden text-[#1A1A1A] p-1"
          onClick={() => setOpen(!open)}
          aria-label="القائمة"
        >
          {open ? I.close : I.menu}
        </button>
      </div>

      {/* Mobile drawer */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 bg-[#FDFBF7] border-t border-[#C5A880]/20 ${
          open ? "max-h-96" : "max-h-0"
        }`}
      >
        <div className="px-5 py-4 flex flex-col gap-1">
          <div className="relative mb-2 md:hidden">
            <span className="absolute right-3 top-2.5 text-[#1A1A1A]/40">
              {I.search}
            </span>
            <input
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                if (page !== "products") setPage("products");
              }}
              placeholder="ابحث عن غرفة نوم..."
              className="w-full bg-white border border-[#C5A880]/30 rounded-full pr-10 pl-4 py-2 text-sm outline-none"
            />
          </div>
          {links.map((l) => (
            <button
              key={l.id}
              onClick={() => go(l.id)}
              className={`text-right px-4 py-3 rounded-xl text-sm font-semibold ${
                page === l.id
                  ? "bg-[#1A1A1A] text-[#FDFBF7]"
                  : "text-[#1A1A1A]/80"
              }`}
            >
              {l.label}
            </button>
          ))}
          <a
            href={waGeneral()}
            target="_blank"
            rel="noreferrer"
            className="sm:hidden inline-flex items-center justify-center gap-2 bg-[#1F7A4D] text-white text-sm font-bold px-4 py-3 rounded-xl mt-1"
          >
            {I.wa} تواصل عبر واتساب
          </a>
        </div>
      </div>
    </header>
  );
}

/* ------------------------------- HERO ------------------------------------- */
function Hero({ goProducts }) {
  return (
    <section className="relative min-h-[92vh] flex items-center overflow-hidden bg-[#1A1A1A]">
      <SmartImg
        src={u("photo-1616594039964-ae9021a400a0", 1600)}
        alt="غرفة نوم فاخرة"
        className="absolute inset-0 w-full h-full object-cover opacity-45"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-[#1A1A1A]/60 to-[#1A1A1A]/30" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-28 w-full">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-2 text-[#C5A880] text-sm font-bold border border-[#C5A880]/40 rounded-full px-4 py-1.5 mb-6 bg-white/5 backdrop-blur">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880]" />
            صناعة يدوية فاخرة منذ 1998
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#FDFBF7] leading-[1.15] mb-6">
            غرف نوم تُلهم
            <span className="block text-[#C5A880]">حياتك اليومية</span>
          </h1>
          <p className="text-[#FDFBF7]/75 text-base sm:text-lg leading-8 mb-9 max-w-xl">
            تصاميم ملكية وكلاسيكية ومودرن من خشب الزان والجوز الطبيعي، بضمان 10
            سنوات وتوصيل وتركيب مجاني. اصنع غرفة أحلامك مع رويال للغرف.
          </p>
          <div className="flex flex-wrap gap-4">
            <button
              onClick={goProducts}
              className="inline-flex items-center gap-2 bg-[#C5A880] hover:bg-[#B08D4F] text-[#1A1A1A] font-extrabold px-7 py-3.5 rounded-full transition shadow-xl shadow-[#C5A880]/25"
            >
              تصفح المجموعة {I.arrow}
            </button>
            <a
              href={waGeneral()}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 border border-[#FDFBF7]/40 hover:border-[#C5A880] hover:text-[#C5A880] text-[#FDFBF7] font-bold px-7 py-3.5 rounded-full transition backdrop-blur bg-white/5"
            >
              {I.wa} تواصل عبر واتساب
            </a>
          </div>
        </div>
      </div>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-8 text-center">
        {[
          ["+27", "عاماً من الخبرة"],
          ["+4800", "غرفة سعيدة"],
          ["10", "سنوات ضمان"],
        ].map(([n, t]) => (
          <div key={t}>
            <div className="text-2xl font-extrabold text-[#C5A880]">{n}</div>
            <div className="text-xs text-[#FDFBF7]/60">{t}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------------------------- HIGHLIGHTS ---------------------------------- */
const highlights = [
  {
    icon: I.bed,
    title: "مجموعات غرف النوم",
    text: "أكثر من 40 تصميماً ملكياً وكلاسيكياً ومودرن بخامات طبيعية فاخرة.",
  },
  {
    icon: I.ruler,
    title: "نجارة مخصصة",
    text: "نفصّل غرفتك على مقاسك بالضبط — ارتفاع، عرض، ألوان، وخامات حسب ذوقك.",
  },
  {
    icon: I.palette,
    title: "تنسيق داخلي",
    text: "مهندسو ديكور يطابقون ألوان غرفتك مع باقي المنزل مجاناً قبل الطلب.",
  },
];

function Highlights() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 -mt-14 relative z-10">
      <div className="grid sm:grid-cols-3 gap-4">
        {highlights.map((h) => (
          <div
            key={h.title}
            className="bg-white/80 backdrop-blur-xl border border-[#C5A880]/25 rounded-2xl p-6 shadow-xl shadow-[#1A1A1A]/5 hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#C5A880]/20 transition-all duration-300"
          >
            <div className="w-12 h-12 rounded-xl bg-[#1A1A1A] text-[#C5A880] grid place-items-center mb-4">
              {h.icon}
            </div>
            <h3 className="font-extrabold text-[#1A1A1A] mb-1.5">{h.title}</h3>
            <p className="text-sm text-[#1A1A1A]/60 leading-6">{h.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ------------------------- SEARCH & FILTER BAR ----------------------------- */
function FilterBar({ filters, setFilters, resultCount }) {
  const maxPrice = 30000;
  return (
    <div className="bg-white/80 backdrop-blur-xl border border-[#C5A880]/25 rounded-2xl p-4 sm:p-5 shadow-lg shadow-[#1A1A1A]/5 mb-8">
      <div className="flex flex-col lg:flex-row lg:items-center gap-4">
        <div className="relative flex-1 min-w-[200px]">
          <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#1A1A1A]/40">
            {I.search}
          </span>
          <input
            value={filters.q}
            onChange={(e) => setFilters({ ...filters, q: e.target.value })}
            placeholder="ابحث بالاسم أو الوصف..."
            className="w-full bg-[#FDFBF7] border border-[#C5A880]/30 rounded-xl pr-11 pl-4 py-2.5 text-sm outline-none focus:border-[#B08D4F] focus:ring-2 focus:ring-[#C5A880]/20 transition"
          />
        </div>
        <div className="flex items-center gap-3 flex-1 min-w-[220px]">
          <span className="text-xs font-bold text-[#1A1A1A]/60 whitespace-nowrap">
            السعر حتى
          </span>
          <input
            type="range"
            min={3000}
            max={maxPrice}
            step={500}
            value={filters.maxPrice}
            onChange={(e) =>
              setFilters({ ...filters, maxPrice: +e.target.value })
            }
            className="flex-1 accent-[#B08D4F]"
          />
          <span className="text-sm font-extrabold text-[#B08D4F] whitespace-nowrap tabular-nums w-24">
            {fmt(filters.maxPrice)} {CURRENCY}
          </span>
        </div>
        <select
          value={filters.sort}
          onChange={(e) => setFilters({ ...filters, sort: e.target.value })}
          className="bg-[#FDFBF7] border border-[#C5A880]/30 rounded-xl px-4 py-2.5 text-sm font-semibold outline-none focus:border-[#B08D4F] cursor-pointer"
        >
          <option value="default">الترتيب: الأحدث</option>
          <option value="low">السعر: من الأقل</option>
          <option value="high">السعر: من الأعلى</option>
        </select>
      </div>
      <div className="flex flex-wrap gap-2 mt-4">
        {CATEGORIES.map((c) => (
          <button
            key={c}
            onClick={() => setFilters({ ...filters, category: c })}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition border ${
              filters.category === c
                ? "bg-[#1A1A1A] text-[#C5A880] border-[#1A1A1A]"
                : "border-[#C5A880]/30 text-[#1A1A1A]/60 hover:border-[#B08D4F] hover:text-[#1A1A1A]"
            }`}
          >
            {c}
          </button>
        ))}
        <span className="mr-auto self-center text-xs text-[#1A1A1A]/50">
          {resultCount} غرفة متاحة
        </span>
      </div>
    </div>
  );
}

/* ------------------------------ PRODUCT CARD ------------------------------ */
function ProductCard({ p, onOpen }) {
  return (
    <article className="group bg-white rounded-2xl overflow-hidden border border-[#C5A880]/20 shadow-md shadow-[#1A1A1A]/5 hover:shadow-2xl hover:shadow-[#C5A880]/25 hover:-translate-y-1.5 transition-all duration-300 flex flex-col">
      <div className="relative overflow-hidden aspect-[4/3]">
        <SmartImg
          src={p.images[0]}
          alt={p.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <span className="absolute top-3 right-3 bg-[#1A1A1A]/80 backdrop-blur text-[#C5A880] text-[11px] font-bold px-3 py-1 rounded-full">
          {p.category}
        </span>
        {p.oldPrice && (
          <span className="absolute top-3 left-3 bg-[#8C2F2F] text-white text-[11px] font-bold px-2.5 py-1 rounded-full">
            خصم {Math.round((1 - p.price / p.oldPrice) * 100)}%
          </span>
        )}
        {!p.available && (
          <span className="absolute inset-0 bg-[#1A1A1A]/60 backdrop-blur-[2px] grid place-items-center">
            <span className="border border-[#C5A880] text-[#C5A880] font-bold text-sm px-5 py-2 rounded-full bg-[#1A1A1A]/70">
              غير متوفر حالياً
            </span>
          </span>
        )}
      </div>
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-extrabold text-[#1A1A1A] text-base mb-1.5 leading-6">
          {p.name}
        </h3>
        <p className="text-sm text-[#1A1A1A]/55 leading-6 mb-4 line-clamp-2 flex-1">
          {p.short}
        </p>
        <div className="flex items-end justify-between gap-3">
          <div>
            <div className="text-xl font-extrabold text-[#B08D4F] tabular-nums">
              {fmt(p.price)}{" "}
              <span className="text-xs font-bold">{CURRENCY}</span>
            </div>
            {p.oldPrice && (
              <div className="text-xs text-[#1A1A1A]/40 line-through tabular-nums">
                {fmt(p.oldPrice)} {CURRENCY}
              </div>
            )}
          </div>
          <button
            onClick={() => onOpen(p)}
            className="inline-flex items-center gap-1.5 bg-[#1A1A1A] hover:bg-[#B08D4F] text-[#FDFBF7] text-xs font-bold px-4 py-2.5 rounded-full transition"
          >
            تفاصيل أكثر {I.arrow}
          </button>
        </div>
      </div>
    </article>
  );
}

/* ----------------------------- PRODUCT GRID ------------------------------- */
function ProductGrid({ items, onOpen }) {
  if (!items.length)
    return (
      <div className="text-center py-24 text-[#1A1A1A]/50">
        <div className="mx-auto w-14 h-14 rounded-full bg-[#C5A880]/10 grid place-items-center text-[#B08D4F] mb-4">
          {I.search}
        </div>
        <p className="font-bold mb-1">لا توجد نتائج مطابقة</p>
        <p className="text-sm">جرّب تعديل كلمة البحث أو الفلاتر</p>
      </div>
    );
  return (
    <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-6">
      {items.map((p) => (
        <ProductCard key={p.id} p={p} onOpen={onOpen} />
      ))}
    </div>
  );
}

/* --------------------------- PRODUCT DETAIL MODAL -------------------------- */
function ProductModal({ product, onClose }) {
  const [img, setImg] = useState(0);
  useEffect(() => setImg(0), [product]);
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  if (!product) return null;
  const p = product;
  const specs = [
    ["الأبعاد", p.dimensions],
    ["الخامة", p.material],
    ["الضمان", p.warranty],
  ];

  return (
    <div
      className="fixed inset-0 z-[90] flex items-center justify-center p-3 sm:p-6"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="absolute inset-0 bg-[#1A1A1A]/70 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-[#FDFBF7] w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-2xl shadow-2xl border border-[#C5A880]/30">
        <button
          onClick={onClose}
          className="absolute top-4 left-4 z-10 w-9 h-9 rounded-full bg-[#1A1A1A] text-[#FDFBF7] grid place-items-center hover:bg-[#B08D4F] transition"
          aria-label="إغلاق"
        >
          {I.close}
        </button>

        <div className="grid md:grid-cols-2">
          {/* Gallery */}
          <div className="p-5 sm:p-7">
            <div className="rounded-xl overflow-hidden aspect-[4/3] bg-[#1A1A1A] mb-3">
              <SmartImg
                src={p.images[img]}
                alt={p.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex gap-2">
              {p.images.map((src, i) => (
                <button
                  key={i}
                  onClick={() => setImg(i)}
                  className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition ${
                    img === i
                      ? "border-[#B08D4F]"
                      : "border-transparent opacity-60 hover:opacity-100"
                  }`}
                >
                  <SmartImg
                    src={src}
                    alt={`${p.name} ${i + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Info */}
          <div className="p-5 sm:p-7 md:pr-0 flex flex-col">
            <span className="text-xs font-bold text-[#B08D4F] mb-2">
              {p.category}
            </span>
            <h2 className="text-2xl font-extrabold text-[#1A1A1A] mb-3">
              {p.name}
            </h2>
            <p className="text-sm text-[#1A1A1A]/65 leading-7 mb-5">
              {p.description}
            </p>

            <div className="space-y-2.5 mb-5">
              {specs.map(([k, v]) => (
                <div key={k} className="flex gap-3 text-sm">
                  <span className="font-extrabold text-[#1A1A1A] w-14 shrink-0">
                    {k}
                  </span>
                  <span className="text-[#1A1A1A]/60 leading-6">{v}</span>
                </div>
              ))}
            </div>

            <div
              className={`inline-flex self-start items-center gap-2 text-xs font-bold px-3 py-1.5 rounded-full mb-5 ${
                p.available
                  ? "bg-[#1F7A4D]/10 text-[#1F7A4D]"
                  : "bg-[#8C2F2F]/10 text-[#8C2F2F]"
              }`}
            >
              <span
                className={`w-2 h-2 rounded-full ${p.available ? "bg-[#1F7A4D]" : "bg-[#8C2F2F]"}`}
              />
              {p.available ? "متوفر — جاهز للطلب" : "غير متوفر حالياً"}
            </div>

            <div className="mt-auto pt-4 border-t border-[#C5A880]/25">
              <div className="flex items-end gap-3 mb-4">
                <div className="text-3xl font-extrabold text-[#B08D4F] tabular-nums">
                  {fmt(p.price)} <span className="text-sm">{CURRENCY}</span>
                </div>
                {p.oldPrice && (
                  <div className="text-sm text-[#1A1A1A]/40 line-through tabular-nums pb-1">
                    {fmt(p.oldPrice)} {CURRENCY}
                  </div>
                )}
              </div>
              <a
                href={waLink(p)}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 bg-[#1F7A4D] hover:bg-[#186140] text-white font-extrabold py-3.5 rounded-xl transition shadow-lg shadow-[#1F7A4D]/25"
              >
                {I.wa} اطلب الآن عبر واتساب
              </a>
              <p className="text-[11px] text-[#1A1A1A]/40 mt-2.5 text-center">
                سيُفتح واتساب برسالة جاهزة تتضمن اسم الغرفة ورقم المنتج وسعره
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------- SERVICES -------------------------------- */
const services = [
  {
    icon: I.ruler,
    title: "مقاسات وتصاميم مخصصة",
    text: "نصمّم ونفصّل غرفتك على مقاسات مساحتك بالمليمتر، مع 3D تصور مجاني قبل التنفيذ.",
  },
  {
    icon: I.truck,
    title: "توصيل وتركيب مجاني",
    text: "فريق تركيب محترف يوصّل ويركّب غرفتك في موقعك داخل المدينة دون أي رسوم إضافية.",
  },
  {
    icon: I.palette,
    title: "مطابقة ألوان الديكور",
    text: "مهندسو التنسيق الداخلي يطابقون ألوان وخامات غرفتك مع باقي أثاث منزلك مجاناً.",
  },
  {
    icon: I.shield,
    title: "ضمان 10 سنوات",
    text: "ضمان حقيقي ضد عيوب الصناعة على الهيكل الخشبي والمفصلات، مع صيانة دورية مجانية.",
  },
];

function Services() {
  return (
    <section className="bg-[#1A1A1A] py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <span className="text-[#C5A880] text-sm font-bold">خدماتنا</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#FDFBF7] mt-2 mb-3">
            تجربة شراء ملكية من البداية للنهاية
          </h2>
          <p className="text-[#FDFBF7]/55 max-w-xl mx-auto leading-7">
            لا نبيع غرف نوم فقط — نصمّم لك تجربة متكاملة تبدأ من المعاينة
            المجانية وتنتهي بغرفة أحلامك مركّبة وجاهزة.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map((s) => (
            <div
              key={s.title}
              className="bg-white/5 backdrop-blur border border-[#C5A880]/20 rounded-2xl p-6 hover:bg-white/10 hover:border-[#C5A880]/50 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-12 h-12 rounded-xl bg-[#C5A880]/15 text-[#C5A880] grid place-items-center mb-4">
                {s.icon}
              </div>
              <h3 className="font-extrabold text-[#FDFBF7] mb-2">{s.title}</h3>
              <p className="text-sm text-[#FDFBF7]/55 leading-6">{s.text}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <a
            href={waGeneral()}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 bg-[#C5A880] hover:bg-[#B08D4F] text-[#1A1A1A] font-extrabold px-8 py-3.5 rounded-full transition"
          >
            {I.wa} اطلب معاينة مجانية الآن
          </a>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------- ADMIN PANEL -------------------------------- */
const emptyForm = {
  id: "",
  name: "",
  category: CATEGORIES[2],
  price: "",
  oldPrice: "",
  images: "",
  short: "",
  description: "",
  dimensions: "",
  material: "خشب زان طبيعي 100%",
  warranty: "ضمان 10 سنوات ضد عيوب الصناعة",
  available: true,
  featured: false,
};

function AdminPanel() {
  const { products, dispatch, notify } = useProducts();
  const [authed, setAuthed] = useState(false);
  const [pass, setPass] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const startEdit = (p) => {
    setForm({
      ...emptyForm,
      ...p,
      images: p.images.join(", "),
      price: String(p.price),
      oldPrice: p.oldPrice ? String(p.oldPrice) : "",
    });
    setShowForm(true);
  };

  const submit = (e) => {
    e.preventDefault();
    const images = form.images
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    if (!form.name.trim() || !form.price || images.length === 0) {
      notify("يرجى تعبئة الاسم والسعر ورابط صورة واحد على الأقل");
      return;
    }
    const payload = {
      ...form,
      id: form.id || `br-${Date.now().toString(36)}`,
      price: Number(form.price),
      oldPrice: form.oldPrice ? Number(form.oldPrice) : null,
      images,
      short: form.short || form.description.slice(0, 90),
    };
    dispatch({ type: form.id ? "UPDATE" : "ADD", product: payload });
    notify(form.id ? "تم تحديث الغرفة بنجاح" : "تمت إضافة الغرفة بنجاح");
    setForm(emptyForm);
    setShowForm(false);
  };

  const remove = (p) => {
    if (window.confirm(`هل أنت متأكد من حذف "${p.name}"؟`)) {
      dispatch({ type: "DELETE", id: p.id });
      notify("تم حذف الغرفة");
    }
  };

  /* ---- password gate ---- */
  if (!authed)
    return (
      <section className="min-h-screen pt-28 pb-16 px-4 bg-[#FDFBF7]">
        <div className="max-w-sm mx-auto bg-white border border-[#C5A880]/25 rounded-2xl shadow-xl p-8 text-center">
          <div className="w-14 h-14 rounded-full bg-[#1A1A1A] text-[#C5A880] grid place-items-center mx-auto mb-5">
            {I.shield}
          </div>
          <h2 className="text-xl font-extrabold text-[#1A1A1A] mb-1">
            لوحة تحكم المالك
          </h2>
          <p className="text-sm text-[#1A1A1A]/50 mb-6">
            أدخل كلمة المرور للمتابعة (للتجربة: admin123)
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (pass === ADMIN_PASSWORD) setAuthed(true);
              else notify("كلمة المرور غير صحيحة");
            }}
            className="space-y-3"
          >
            <input
              type="password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              placeholder="كلمة المرور"
              className="w-full bg-[#FDFBF7] border border-[#C5A880]/30 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#B08D4F] focus:ring-2 focus:ring-[#C5A880]/20 text-center"
            />
            <button className="w-full bg-[#1A1A1A] hover:bg-[#B08D4F] text-[#FDFBF7] font-extrabold py-3 rounded-xl transition">
              دخول
            </button>
          </form>
        </div>
      </section>
    );

  /* ---- dashboard ---- */
  return (
    <section className="min-h-screen pt-24 pb-16 px-4 sm:px-6 bg-[#FDFBF7]">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1A1A1A]">
              إدارة منتجات غرف النوم
            </h1>
            <p className="text-sm text-[#1A1A1A]/50 mt-1">
              {products.length} منتج — تُحفظ التعديلات تلقائياً في المتصفح
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => {
                setForm(emptyForm);
                setShowForm(!showForm);
              }}
              className="inline-flex items-center gap-2 bg-[#1A1A1A] hover:bg-[#B08D4F] text-[#FDFBF7] text-sm font-bold px-5 py-2.5 rounded-full transition"
            >
              {I.plus} {showForm ? "إخفاء النموذج" : "إضافة غرفة جديدة"}
            </button>
            <button
              onClick={() => {
                if (
                  window.confirm(
                    "استعادة البيانات الافتراضية؟ سيتم فقدان تعديلاتك.",
                  )
                ) {
                  dispatch({ type: "RESET" });
                  notify("تمت استعادة البيانات الافتراضية");
                }
              }}
              className="text-sm font-bold px-5 py-2.5 rounded-full border border-[#C5A880]/40 text-[#1A1A1A]/60 hover:border-[#B08D4F] hover:text-[#1A1A1A] transition"
            >
              استعادة الافتراضي
            </button>
          </div>
        </div>

        {/* Create / Edit form */}
        {showForm && (
          <form
            onSubmit={submit}
            className="bg-white border border-[#C5A880]/25 rounded-2xl shadow-lg p-6 mb-8"
          >
            <h2 className="font-extrabold text-[#1A1A1A] mb-5">
              {form.id ? `تعديل: ${form.name}` : "غرفة نوم جديدة"}
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <label className="flex flex-col gap-1.5">
                <span className="text-xs font-bold text-[#1A1A1A]/60">
                  اسم الغرفة *
                </span>
                <input
                  value={form.name}
                  onChange={(e) => set("name", e.target.value)}
                  className="inp"
                  placeholder="مثال: غرفة نوم رويال الملكية"
                />
              </label>
              <label className="flex flex-col gap-1.5">
                <span className="text-xs font-bold text-[#1A1A1A]/60">
                  الفئة *
                </span>
                <select
                  value={form.category}
                  onChange={(e) => set("category", e.target.value)}
                  className="inp"
                >
                  {CATEGORIES.slice(1).map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </label>
              <label className="flex flex-col gap-1.5">
                <span className="text-xs font-bold text-[#1A1A1A]/60">
                  السعر ({CURRENCY}) *
                </span>
                <input
                  type="number"
                  min="0"
                  value={form.price}
                  onChange={(e) => set("price", e.target.value)}
                  className="inp"
                  placeholder="15000"
                />
              </label>
              <label className="flex flex-col gap-1.5">
                <span className="text-xs font-bold text-[#1A1A1A]/60">
                  السعر قبل الخصم (اختياري)
                </span>
                <input
                  type="number"
                  min="0"
                  value={form.oldPrice}
                  onChange={(e) => set("oldPrice", e.target.value)}
                  className="inp"
                  placeholder="18000"
                />
              </label>
              <label className="flex flex-col gap-1.5 sm:col-span-2">
                <span className="text-xs font-bold text-[#1A1A1A]/60">
                  روابط الصور (افصل بينها بفاصلة) *
                </span>
                <input
                  value={form.images}
                  onChange={(e) => set("images", e.target.value)}
                  className="inp"
                  dir="ltr"
                  placeholder="https://..., https://..."
                />
              </label>
              <label className="flex flex-col gap-1.5 sm:col-span-2 lg:col-span-3">
                <span className="text-xs font-bold text-[#1A1A1A]/60">
                  وصف قصير
                </span>
                <input
                  value={form.short}
                  onChange={(e) => set("short", e.target.value)}
                  className="inp"
                  placeholder="سطران يظهران في بطاقة المنتج"
                />
              </label>
              <label className="flex flex-col gap-1.5 sm:col-span-2 lg:col-span-3">
                <span className="text-xs font-bold text-[#1A1A1A]/60">
                  الوصف الكامل
                </span>
                <textarea
                  rows={3}
                  value={form.description}
                  onChange={(e) => set("description", e.target.value)}
                  className="inp resize-none"
                />
              </label>
              <label className="flex flex-col gap-1.5">
                <span className="text-xs font-bold text-[#1A1A1A]/60">
                  الأبعاد
                </span>
                <input
                  value={form.dimensions}
                  onChange={(e) => set("dimensions", e.target.value)}
                  className="inp"
                  placeholder="السرير: 200×180 سم"
                />
              </label>
              <label className="flex flex-col gap-1.5">
                <span className="text-xs font-bold text-[#1A1A1A]/60">
                  الخامة
                </span>
                <input
                  value={form.material}
                  onChange={(e) => set("material", e.target.value)}
                  className="inp"
                />
              </label>
              <label className="flex flex-col gap-1.5">
                <span className="text-xs font-bold text-[#1A1A1A]/60">
                  الضمان
                </span>
                <input
                  value={form.warranty}
                  onChange={(e) => set("warranty", e.target.value)}
                  className="inp"
                />
              </label>
            </div>
            <div className="flex flex-wrap items-center gap-6 mt-5">
              <label className="flex items-center gap-2 text-sm font-bold text-[#1A1A1A]/70 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.available}
                  onChange={(e) => set("available", e.target.checked)}
                  className="accent-[#B08D4F] w-4 h-4"
                />
                متوفر
              </label>
              <label className="flex items-center gap-2 text-sm font-bold text-[#1A1A1A]/70 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.featured}
                  onChange={(e) => set("featured", e.target.checked)}
                  className="accent-[#B08D4F] w-4 h-4"
                />
                مميز في الرئيسية
              </label>
              <div className="mr-auto flex gap-2">
                <button
                  type="submit"
                  className="bg-[#1F7A4D] hover:bg-[#186140] text-white font-extrabold text-sm px-6 py-2.5 rounded-full transition"
                >
                  {form.id ? "حفظ التعديلات" : "إضافة الغرفة"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setForm(emptyForm);
                  }}
                  className="text-sm font-bold px-5 py-2.5 rounded-full border border-[#C5A880]/40 text-[#1A1A1A]/60"
                >
                  إلغاء
                </button>
              </div>
            </div>
          </form>
        )}

        {/* Products table (desktop) */}
        <div className="hidden md:block bg-white border border-[#C5A880]/25 rounded-2xl shadow-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#1A1A1A] text-[#C5A880] text-right">
                <th className="px-5 py-3.5 font-bold">الغرفة</th>
                <th className="px-5 py-3.5 font-bold">الفئة</th>
                <th className="px-5 py-3.5 font-bold">السعر</th>
                <th className="px-5 py-3.5 font-bold">الحالة</th>
                <th className="px-5 py-3.5 font-bold text-left">إجراءات</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr
                  key={p.id}
                  className="border-t border-[#C5A880]/15 hover:bg-[#C5A880]/5 transition"
                >
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <SmartImg
                        src={p.images[0]}
                        alt={p.name}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div>
                        <div className="font-bold text-[#1A1A1A]">{p.name}</div>
                        <div className="text-xs text-[#1A1A1A]/40" dir="ltr">
                          {p.id}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-[#1A1A1A]/60">{p.category}</td>
                  <td className="px-5 py-3 font-extrabold text-[#B08D4F] tabular-nums">
                    {fmt(p.price)} {CURRENCY}
                  </td>
                  <td className="px-5 py-3">
                    <span
                      className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${p.available ? "bg-[#1F7A4D]/10 text-[#1F7A4D]" : "bg-[#8C2F2F]/10 text-[#8C2F2F]"}`}
                    >
                      {p.available ? "متوفر" : "غير متوفر"}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => startEdit(p)}
                        className="w-8 h-8 rounded-lg grid place-items-center text-[#B08D4F] hover:bg-[#C5A880]/15 transition"
                        title="تعديل"
                      >
                        {I.edit}
                      </button>
                      <button
                        onClick={() => remove(p)}
                        className="w-8 h-8 rounded-lg grid place-items-center text-[#8C2F2F] hover:bg-[#8C2F2F]/10 transition"
                        title="حذف"
                      >
                        {I.trash}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile cards */}
        <div className="md:hidden space-y-3">
          {products.map((p) => (
            <div
              key={p.id}
              className="bg-white border border-[#C5A880]/25 rounded-2xl p-4 flex gap-3 items-center"
            >
              <SmartImg
                src={p.images[0]}
                alt={p.name}
                className="w-16 h-16 rounded-xl object-cover shrink-0"
              />
              <div className="flex-1 min-w-0">
                <div className="font-bold text-[#1A1A1A] text-sm truncate">
                  {p.name}
                </div>
                <div className="text-xs text-[#1A1A1A]/50">{p.category}</div>
                <div className="text-sm font-extrabold text-[#B08D4F] tabular-nums">
                  {fmt(p.price)} {CURRENCY}
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => startEdit(p)}
                  className="w-8 h-8 rounded-lg grid place-items-center text-[#B08D4F] bg-[#C5A880]/10"
                >
                  {I.edit}
                </button>
                <button
                  onClick={() => remove(p)}
                  className="w-8 h-8 rounded-lg grid place-items-center text-[#8C2F2F] bg-[#8C2F2F]/10"
                >
                  {I.trash}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------- FOOTER ---------------------------------- */
function Footer({ setPage }) {
  return (
    <footer className="bg-[#1A1A1A] text-[#FDFBF7] pt-16 pb-8 border-t border-[#C5A880]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <span className="w-9 h-9 rounded-full bg-[#C5A880] text-[#1A1A1A] grid place-items-center">
              {I.bed}
            </span>
            <span className="text-xl font-extrabold">
              رويال <span className="text-[#C5A880]">للغرف</span>
            </span>
          </div>
          <p className="text-sm text-[#FDFBF7]/50 leading-7">
            وجهتك الأولى لغرف النوم الفاخرة في المملكة. خشب طبيعي، حرفية عالية،
            وضمان حقيقي لعشر سنوات.
          </p>
        </div>
        <div>
          <h4 className="font-extrabold mb-4 text-[#C5A880]">روابط سريعة</h4>
          <ul className="space-y-2.5 text-sm text-[#FDFBF7]/60">
            {[
              ["home", "الرئيسية"],
              ["products", "جميع الغرف"],
              ["services", "خدماتنا"],
              ["admin", "لوحة التحكم"],
            ].map(([id, label]) => (
              <li key={id}>
                <button
                  onClick={() => {
                    setPage(id);
                    window.scrollTo({ top: 0 });
                  }}
                  className="hover:text-[#C5A880] transition"
                >
                  {label}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-extrabold mb-4 text-[#C5A880]">خدماتنا</h4>
          <ul className="space-y-2.5 text-sm text-[#FDFBF7]/60">
            <li>مقاسات مخصصة وتصاميم خاصة</li>
            <li>توصيل وتركيب مجاني</li>
            <li>تنسيق ألوان مجاني</li>
            <li>ضمان 10 سنوات</li>
          </ul>
        </div>
        <div>
          <h4 className="font-extrabold mb-4 text-[#C5A880]">تواصل معنا</h4>
          <ul className="space-y-2.5 text-sm text-[#FDFBF7]/60">
            <li dir="ltr" className="text-left sm:text-right">
              +966 50 000 0000
            </li>
            <li>الرياض — طريق الملك فهد</li>
            <li>يومياً 9 صباحاً — 11 مساءً</li>
          </ul>
          <a
            href={waGeneral()}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 mt-4 bg-[#1F7A4D] hover:bg-[#186140] text-white text-sm font-bold px-5 py-2.5 rounded-full transition"
          >
            {I.wa} واتساب
          </a>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-12 pt-6 border-t border-[#C5A880]/15 text-center text-xs text-[#FDFBF7]/40">
        © 2026 رويال للغرف — جميع الحقوق محفوظة
      </div>
    </footer>
  );
}

/* --------------------------------- APP ------------------------------------ */
export default function App() {
  const [page, setPage] = useState("home");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(null);
  const [filters, setFilters] = useState({
    q: "",
    category: "كل الغرف",
    maxPrice: 30000,
    sort: "default",
  });

  // keep navbar search and filter bar in sync
  useEffect(() => setFilters((f) => ({ ...f, q: query })), [query]);
  useEffect(() => setQuery(filters.q), [filters.q]);

  const { products } = useProductsSafe();

  const filtered = useMemo(() => {
    let list = products.filter((p) => {
      const q = filters.q.trim();
      const matchQ =
        !q ||
        p.name.includes(q) ||
        p.short.includes(q) ||
        p.description.includes(q);
      const matchC =
        filters.category === "كل الغرف" || p.category === filters.category;
      const matchP = p.price <= filters.maxPrice;
      return matchQ && matchC && matchP;
    });
    if (filters.sort === "low")
      list = [...list].sort((a, b) => a.price - b.price);
    if (filters.sort === "high")
      list = [...list].sort((a, b) => b.price - a.price);
    return list;
  }, [products, filters]);

  const featured = useMemo(
    () => products.filter((p) => p.featured).slice(0, 3),
    [products],
  );

  const goProducts = () => {
    setPage("products");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      dir="rtl"
      className="min-h-screen bg-[#FDFBF7] font-sans text-[#1A1A1A]"
    >
      <style>{`
        body { font-family: 'Cairo', 'Segoe UI', Tahoma, sans-serif; background:#FDFBF7; }
        .inp { width:100%; background:#FDFBF7; border:1px solid rgba(197,168,128,.35); border-radius:.75rem;
               padding:.65rem 1rem; font-size:.875rem; outline:none; transition:.2s; }
        .inp:focus { border-color:#B08D4F; box-shadow:0 0 0 3px rgba(197,168,128,.2); }
        .line-clamp-2 { display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden; }
        ::-webkit-scrollbar { width:8px; height:8px; }
        ::-webkit-scrollbar-thumb { background:#C5A880; border-radius:8px; }
      `}</style>

      <Navbar page={page} setPage={setPage} query={query} setQuery={setQuery} />

      <main>
        {page === "home" && (
          <>
            <Hero goProducts={goProducts} />
            <Highlights />
            <section className="max-w-7xl mx-auto px-4 sm:px-6 py-20">
              <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
                <div>
                  <span className="text-[#B08D4F] text-sm font-bold">
                    المجموعة المميزة
                  </span>
                  <h2 className="text-3xl font-extrabold text-[#1A1A1A] mt-1">
                    غرف نوم اخترناها لك بعناية
                  </h2>
                </div>
                <button
                  onClick={goProducts}
                  className="inline-flex items-center gap-2 text-sm font-bold text-[#B08D4F] hover:text-[#1A1A1A] transition"
                >
                  عرض جميع الغرف {I.arrow}
                </button>
              </div>
              <ProductGrid items={featured} onOpen={setSelected} />
            </section>
            <Services />
          </>
        )}

        {page === "products" && (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-24 md:pt-28 pb-20 min-h-screen">
            <div className="mb-8">
              <span className="text-[#B08D4F] text-sm font-bold">
                الكتالوج الكامل
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1A1A1A] mt-1">
                جميع غرف النوم
              </h1>
            </div>
            <FilterBar
              filters={filters}
              setFilters={setFilters}
              resultCount={filtered.length}
            />
            <ProductGrid items={filtered} onOpen={setSelected} />
          </section>
        )}

        {page === "services" && (
          <div className="pt-16">
            <Services />
          </div>
        )}

        {page === "admin" && <AdminPanel />}
      </main>

      <Footer setPage={setPage} />
      {selected && (
        <ProductModal product={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  );
}

// safe accessor so App renders even outside the provider (defensive)
function useProductsSafe() {
  const ctx = useContext(ProductCtx);
  if (ctx) return ctx;
  const [products] = useState(seedProducts);
  return { products };
}

/* ----------------------- MOUNT WITH PROVIDER ------------------------------- */
// In index.js use:  root.render(<React.StrictMode><App /></React.StrictMode>)
// wrapped automatically — see Root below if you prefer a single-file mount.
export function Root() {
  return (
    <ProductsProvider>
      <App />
    </ProductsProvider>
  );
}

import React, { useState, useEffect } from 'react';
import { 
    HeartPulse, Brain, Activity, Droplets, 
    Menu, X, Mail, Phone, MapPin, Globe, 
    ChevronRight, User, LogOut, Users, 
    TrendingUp, Package, Database, CheckCircle, 
    PlusCircle, Stethoscope, TestTube, Leaf
} from 'lucide-react';

// --- THEME COLORS ---
// We will use standard Tailwind classes but mimic the custom colors:
// Pharma Blue: text-blue-900, bg-blue-900
// Pharma Green: text-emerald-600, bg-emerald-600
// Pharma Light Blue: bg-blue-50

// --- COMPONENTS ---

const TopBar = () => (
    <div className="bg-blue-900 text-white text-xs py-2 px-4 md:px-8 flex justify-between items-center">
        <div className="hidden md:flex space-x-4">
            <span className="flex items-center"><Mail className="w-3 h-3 mr-2" />dermasisremedies@gmail.com</span>
            <span className="flex items-center"><Phone className="w-3 h-3 mr-2" /> +91 9974907955</span>
        </div>
        <div className="space-x-4 ml-auto">
            <button className="hover:text-emerald-400 transition-colors">Investors</button>
            <button className="hover:text-emerald-400 transition-colors">Careers</button>
            <button className="hover:text-emerald-400 transition-colors">Media</button>
        </div>
    </div>
);

const Navbar = ({ navigate, currentPage, user, onLogout }) => {
    const [isOpen, setIsOpen] = useState(false);

    const navLinks = [
        { id: 'home', label: 'Home' },
        { id: 'about', label: 'About Us' },
        { id: 'products', label: 'Products' },
        { id: 'rd', label: 'R&D' },
    ];

    const handleNav = (id) => {
        navigate(id);
        setIsOpen(false);
    };

    return (
        <nav className="bg-white shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-20 items-center">
                    {/* Logo */}
                    <div onClick={() => handleNav('home')} className="flex-shrink-0 flex items-center cursor-pointer">
                        {/* <HeartPulse className="text-emerald-600 w-8 h-8 mr-2" /> */}
                        <img src="https://res.cloudinary.com/dpsq08nun/image/upload/v1777359495/IMG-20260407-WA0000_eyvt70.jpg" alt="@" className="w-15 h-10 mr-5 object-contain" />
                        <span className="font-bold text-2xl text-blue-900 tracking-tight">DERMASIS<br/> <span className="font-light">REMEDIES <span className="text-xs font-normal text-white bg-blue-900 px-1 rounded">Pvt. Ltd.</span></span></span>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex space-x-8 items-center">
                        {navLinks.map((link) => (
                            <button 
                                key={link.id}
                                onClick={() => handleNav(link.id)}
                                className={`font-medium pb-1 border-b-2 transition-all ${
                                    currentPage === link.id 
                                    ? 'text-emerald-600 border-emerald-600' 
                                    : 'text-gray-600 border-transparent hover:text-emerald-600 hover:border-emerald-600'
                                }`}
                            >
                                {link.label}
                            </button>
                        ))}

                        {/* Employee Portal Logic */}
                        {user ? (
                            <div className="flex items-center space-x-4 pl-4 border-l border-gray-200">
                                <button 
                                    onClick={() => handleNav('employee-dashboard')}
                                    className="flex items-center text-blue-900 font-semibold hover:text-emerald-600"
                                >
                                    <User className="w-5 h-5 mr-1" /> Portal
                                </button>
                                <button 
                                    onClick={onLogout}
                                    className="text-gray-500 hover:text-red-500"
                                    title="Logout"
                                >
                                    <LogOut className="w-5 h-5" />
                                </button>
                            </div>
                        ) : (
                            <button 
                                onClick={() => handleNav('employee-login')}
                                className="flex items-center text-blue-900 font-medium hover:text-emerald-600 pl-4 border-l border-gray-200"
                            >
                                <User className="w-4 h-4 mr-1" /> Employee Login
                            </button>
                        )}
                        
                        <button onClick={() => handleNav('contact')} className="bg-blue-900 text-white px-5 py-2 rounded-full font-medium hover:bg-blue-800 transition-colors">
                            Contact Us
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button onClick={() => setIsOpen(!isOpen)} className="text-blue-900 hover:text-emerald-600 focus:outline-none">
                            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-white border-t">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        {navLinks.map((link) => (
                            <button
                                key={link.id}
                                onClick={() => handleNav(link.id)}
                                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-emerald-600 hover:bg-gray-50"
                            >
                                {link.label}
                            </button>
                        ))}
                        <button
                            onClick={() => handleNav(user ? 'employee-dashboard' : 'employee-login')}
                            className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-blue-900 bg-blue-50 hover:bg-blue-100"
                        >
                            {user ? 'Employee Dashboard' : 'Employee Login'}
                        </button>
                    </div>
                </div>
            )}
        </nav>
    );
};

const Footer = ({ navigate }) => (
    <footer className="bg-slate-900 text-white pt-16 pb-8 border-t-[6px] border-emerald-600 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                <div>
                    <div className="flex items-center mb-6 cursor-pointer" onClick={() => navigate('home')}>
                        <img src="https://res.cloudinary.com/dpsq08nun/image/upload/v1777359495/IMG-20260407-WA0000_eyvt70.jpg" alt="@" className="w-15 h-10 mr-5 object-contain" />
                        <span className="font-bold text-2xl tracking-tigh">DERMASIS <span className="font-light">REMEDIES <span className="text-xs font-normal text-white bg-black-400 px-1 rounded">Pvt. Ltd.</span></span></span>
                    </div>
                    <p className="text-gray-400 text-sm leading-relaxed mb-6">
                        Dedicated to making a difference in patients' lives through high-quality, innovative, and accessible medicines worldwide.
                    </p>
                </div>
                <div>
                    <h4 className="text-lg font-semibold mb-6 border-b border-gray-700 pb-2">Quick Links</h4>
                    <ul className="space-y-3 text-sm text-gray-400">
                        <li><button onClick={() => navigate('about')} className="hover:text-emerald-500 flex items-center"><ChevronRight className="w-3 h-3 mr-2" /> About Us</button></li>
                        <li><button onClick={() => navigate('products')} className="hover:text-emerald-500 flex items-center"><ChevronRight className="w-3 h-3 mr-2" /> Our Products</button></li>
                        <li><button onClick={() => navigate('rd')} className="hover:text-emerald-500 flex items-center"><ChevronRight className="w-3 h-3 mr-2" /> Research & Dev</button></li>
                    </ul>
                </div>
                <div>
                    <h4 className="text-lg font-semibold mb-6 border-b border-gray-700 pb-2">Corporate Office</h4>
                    <ul className="space-y-4 text-sm text-gray-400">
                        <li className="flex items-start">
                            <MapPin className="text-emerald-500 mt-1 mr-3 w-5 h-5 flex-shrink-0" />
                            <span>218, Crystal Plaza, <br/>SRT, Gujarat - 395010, India.</span>
                        </li>
                        <li className="flex items-center">
                            <Phone className="text-emerald-500 mr-3 w-5 h-5 flex-shrink-0" />
                            <span>+91-79-1234 5678</span>
                        </li>
                    </ul>
                </div>
                <div>
                    <h4 className="text-lg font-semibold mb-6 border-b border-gray-700 pb-2">Employee Access</h4>
                    <p className="text-sm text-gray-400 mb-4">Internal portal for field forces, medical representatives, and stock managers.</p>
                    <button 
                        onClick={() => navigate('employee-login')}
                        className="inline-block bg-transparent border border-emerald-500 text-emerald-500 hover:bg-emerald-500 hover:text-white px-6 py-2 rounded font-medium transition-colors w-full text-center"
                    >
                        Access Portal
                    </button>
                </div>
            </div>
            <div className="border-t border-gray-800 pt-8 mt-8 text-center text-xs text-gray-500">
                <p>&copy; 2026 DERMASIS REMEDIES Pvt. Ltd. All Rights Reserved.<br/>Powered by Softcapphyjas Pvt. Ltd.</p>
            </div>
        </div>
    </footer>
);

// --- PAGES ---

const Home = ({ navigate }) => (
    <div className="animate-fadeIn">
        {/* Hero Section */}
        <section className="relative h-[80vh] flex items-center bg-blue-900 overflow-hidden">
            <div className="absolute inset-0 opacity-40">
                {/* https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80 */}
                {/* <img src="https://res.cloudinary.com/dpsq08nun/image/upload/v1777359495/IMG-20260407-WA0000_eyvt70.jpg" alt="Lab" className="w-full h-full object-cover" /> */}
                {/* <video src="https://res.cloudinary.com/dpsq08nun/video/upload/v1780559025/My_movie_20_gjbl1c.mp4"  className="w-full h-full object-cover" autoPlay loop muted playsInline/> */}
                <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-emerald-50 p-6 mb-12">
  <video 
    className="w-[2000px]  h-[800px] object-cover rounded-2xl shadow-xl border-4 border-white/80 m-4" 
    autoPlay 
    loop 
    muted 
    playsInline
  >
    <source 
      src="https://res.cloudinary.com/dpsq08nun/video/upload/v1780559025/My_movie_20_gjbl1c.webm" 
      type="video/webm" 
    />
    <source 
      src="https://res.cloudinary.com/dpsq08nun/video/upload/v1780559025/My_movie_20_gjbl1c.mp4" 
      type="video/mp4" 
    />
    Your browser does not support the video tag.
  </video>
</div>

            </div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
                <div className="max-w-2xl text-white">
                    <span className="uppercase tracking-widest text-sm font-semibold text-emerald-400 mb-4 block">Innovating Healthcare</span>
                    <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">Reaching People, <br/>Touching Lives.</h1>
                    <p className="text-lg md:text-xl text-gray-200 mb-8 font-light">Committed to providing affordable, high-quality medicines globally. We blend science with compassion to improve health outcomes.</p>
                    <div className="flex space-x-4">
                        <button onClick={() => navigate('products')} className="bg-emerald-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-emerald-500 transition-colors shadow-lg">Explore Therapies</button>
                        <button onClick={() => navigate('about')} className="bg-white text-blue-900 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors shadow-lg">Our Journey</button>
                    </div>
                </div>
            </div>
        </section>

        {/* Global Stats */}
        <section className="py-12 bg-white shadow-lg relative z-20 -mt-10 mx-4 md:mx-auto max-w-6xl rounded-xl border border-gray-100">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-gray-200">
                <div>
                    <h3 className="text-4xl font-bold text-blue-900 mb-2">100+</h3>
                    <p className="text-gray-500 font-medium">Countries Served</p>
                </div>
                <div>
                    <h3 className="text-4xl font-bold text-blue-900 mb-2">15,000+</h3>
                    <p className="text-gray-500 font-medium">Global Employees</p>
                </div>
                <div>
                    <h3 className="text-4xl font-bold text-blue-900 mb-2">8</h3>
                    <p className="text-gray-500 font-medium">R&D Centers</p>
                </div>
                <div>
                    <h3 className="text-4xl font-bold text-blue-900 mb-2">40+</h3>
                    <p className="text-gray-500 font-medium">Manufacturing Sites</p>
                </div>
            </div>
        </section>

        {/* Quick Intro */}
        <section className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="text-3xl font-bold text-blue-900 mb-4">Pioneering Better Health</h2>
                <div className="w-16 h-1 bg-emerald-600 mx-auto mb-6"></div>
                <p className="max-w-3xl mx-auto text-gray-600 text-lg leading-relaxed">
                    DERMASIS REMEDIES Pvt. Ltd. is a specialty pharmaceutical company engaged in the research, development, manufacturing, and marketing of high-quality medicines globally. We specialize in cardiology, neurology, gastroenterology, and diabetology.
                </p>
            </div>
        </section>
    </div>
);

const About = () => (
    <div className="py-20 bg-white animate-fadeIn min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold text-blue-900 mb-4">About DERMASIS REMEDIES Pvt. Ltd.</h1>
            <div className="w-16 h-1 bg-emerald-600 mb-12"></div>
            
            <div className="flex flex-col md:flex-row gap-12 items-center">
                <div className="md:w-1/2">
                    <img src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="About Us" className="rounded-xl shadow-xl" />
                </div>
                <div className="md:w-1/2 space-y-6">
                    <h3 className="text-2xl font-bold text-gray-800">Our Vision & Mission</h3>
                    <p className="text-gray-600 leading-relaxed">
                        To be a leading global healthcare company which uses technology and innovation to meet everyday needs of all patients. We are driven by the purpose of "Caring for Life".
                    </p>
                    <p className="text-gray-600 leading-relaxed">
                        Established in 1995, we have grown from a small manufacturing unit to a global entity, always maintaining our core values of quality, reliability, and trust.
                    </p>
                    <div className="grid grid-cols-2 gap-4 pt-6 border-t border-gray-100">
                        <div className="flex items-center text-blue-900 font-semibold">
                            <CheckCircle className="text-emerald-500 mr-2" /> FDA Approved Sites
                        </div>
                        <div className="flex items-center text-blue-900 font-semibold">
                            <CheckCircle className="text-emerald-500 mr-2" /> Global Compliance
                        </div>
                        <div className="flex items-center text-blue-900 font-semibold">
                            <CheckCircle className="text-emerald-500 mr-2" /> Sustainable Operations
                        </div>
                        <div className="flex items-center text-blue-900 font-semibold">
                            <CheckCircle className="text-emerald-500 mr-2" /> Patient First Approach
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

const Products = () => {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedSubCategory, setSelectedSubCategory] = useState(null);
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isClosing, setIsClosing] = useState(false);

    const categories = [
        { id: 'dermatologist', title: "Dermatologist", desc: "Advanced skincare and dermatology solutions.", icon: <Leaf className="w-10 h-10 text-emerald-600 mb-4" /> },
        { id: 'cardiology', title: "Cardiology", desc: "Solutions for cardiovascular health and hypertension.", icon: <Activity className="w-10 h-10 text-emerald-600 mb-4" /> },
        { id: 'neurology', title: "Neurology", desc: "Advanced therapies for central nervous system.", icon: <Brain className="w-10 h-10 text-emerald-600 mb-4" /> },
        { id: 'gastroenterology', title: "Gastroenterology", desc: "Effective treatments for digestive system.", icon: <Stethoscope className="w-10 h-10 text-emerald-600 mb-4" /> },
        { id: 'diabetology', title: "Diabetology", desc: "Innovative approaches to diabetes management.", icon: <Droplets className="w-10 h-10 text-emerald-600 mb-4" /> },
        { id: 'ent', title: "ENT", desc: "Ear, nose, and throat specialized care.", icon: <User className="w-10 h-10 text-emerald-600 mb-4" /> },
        { id: 'dental', title: "Dental", desc: "Comprehensive solutions for dental wellness.", icon: <HeartPulse className="w-10 h-10 text-emerald-600 mb-4" /> },
        { id: 'orthology', title: "Orthology", desc: "Orthopedic care and bone joint solutions.", icon: <Activity className="w-10 h-10 text-emerald-600 mb-4" /> },
        { id: 'pediatrician', title: "Pediatrician", desc: "Pediatric healthcare capabilities and formulations.", icon: <Users className="w-10 h-10 text-emerald-600 mb-4" /> },
    ];

    const dermSubCategories = [
        "Anti Fungal Range",
        "Anti Histamine Range",
        "Dermatitis Range",
        "Anti Acne Range",
        "Face Care Range",
        "Moisturizers",
        "Hair Care Range",
        "Miscellaneous Range",
        "VELRUTIN LIFE SCIENCESA"
    ];

    const fetchProducts = async (subCat) => {
        setLoading(true);
        try {
            const res = await fetch(`http://localhost:5000/api/products?category=${encodeURIComponent(subCat)}`);
            const data = await res.json();
            setProducts(data);
        } catch (err) {
            console.error("Failed to fetch products", err);
        }
        setLoading(false);
    };

    const handleSubCategoryClick = (subCat) => {
        setSelectedSubCategory(subCat);
        fetchProducts(subCat);
    };

    const openProduct = (product) => {
        setSelectedProduct(product);
        setIsClosing(false);
    };

    const closeProduct = () => {
        setIsClosing(true);
        setTimeout(() => setSelectedProduct(null), 300);
    };

    return (
        <div className="py-20 bg-gray-50 animate-fadeIn min-h-screen">
            <style>{`
                @keyframes zoomIn {
                    from { opacity: 0; transform: scale(0.9); }
                    to { opacity: 1; transform: scale(1); }
                }
                .product-modal-open {
                    animation: zoomIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
                }
            `}</style>
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Header Navigation Area */}
                <div className="text-center mb-12">
                    {selectedCategory ? (
                        <div className="mb-6 flex flex-col items-center">
                            <button 
                                onClick={() => { setSelectedCategory(null); setSelectedSubCategory(null); }}
                                className="text-emerald-600 font-semibold flex items-center mb-4 hover:text-emerald-500 transition-colors bg-white px-4 py-2 rounded-full shadow-sm border border-emerald-100"
                            >
                                <ChevronRight className="w-4 h-4 mr-1 rotate-180" /> Back to Categories
                            </button>
                            {selectedSubCategory && (
                                <button 
                                    onClick={() => setSelectedSubCategory(null)}
                                    className="text-blue-600 font-medium flex items-center hover:text-blue-500 mt-2 text-sm"
                                >
                                    <ChevronRight className="w-4 h-4 mr-1 rotate-180" /> Back to {selectedCategory.title} Subcategories
                                </button>
                            )}
                        </div>
                    ) : (
                        <>
                            <h1 className="text-4xl font-bold text-blue-900 mb-4">Therapeutic Categories</h1>
                            <div className="w-16 h-1 bg-emerald-600 mx-auto mb-6"></div>
                            <p className="text-gray-600 max-w-2xl mx-auto font-medium">Providing comprehensive solutions across major therapeutic categories to improve patient outcomes globally.</p>
                        </>
                    )}
                </div>

                {/* 1. Show Main Categories */}
                {!selectedCategory && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {categories.map((item, idx) => (
                            <div 
                                key={idx} 
                                onClick={() => setSelectedCategory(item)}
                                className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all border border-gray-100 cursor-pointer transform hover:-translate-y-2 group"
                            >
                                <div className="bg-blue-50 w-20 h-20 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-emerald-50 transition-all duration-300">
                                    {item.icon}
                                </div>
                                <h3 className="text-2xl font-bold text-blue-900 mb-3 group-hover:text-emerald-600 transition-colors">{item.title}</h3>
                                <p className="text-gray-600 leading-relaxed font-medium">{item.desc}</p>
                                <div className="mt-6 flex items-center text-sm font-bold text-blue-900 group-hover:text-emerald-600 transition-colors uppercase tracking-wider">
                                    Explore <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* 2. Show "Coming Soon" for non-Dermatologist */}
                {selectedCategory && selectedCategory.id !== 'dermatologist' && (
                    <div className="bg-white rounded-3xl shadow-xl p-16 text-center animate-fadeIn border border-gray-100 overflow-hidden relative">
                        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 to-emerald-500"></div>
                        <div className="bg-emerald-50 w-32 h-32 rounded-full flex items-center justify-center mx-auto mb-8 relative">
                            <div className="absolute inset-0 border-4 border-emerald-200 rounded-full animate-ping opacity-20"></div>
                            <Activity className="w-16 h-16 text-emerald-600" />
                        </div>
                        <h2 className="text-4xl text-blue-900 font-extrabold mb-4 tracking-tight">{selectedCategory.title}</h2>
                        <h3 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-500 mb-6 uppercase tracking-widest">Coming Soon</h3>
                        <p className="text-xl text-gray-500 max-w-2xl mx-auto font-medium">We are rigorously formulating our high-quality product portfolio for this category. Stay tuned for advanced therapeutic solutions.</p>
                    </div>
                )}

                {/* 3. Show Dermatologist Subcategories */}
                {selectedCategory && selectedCategory.id === 'dermatologist' && !selectedSubCategory && (
                    <div className="animate-fadeIn">
                       <div className="text-center mb-10">
                            <h2 className="text-4xl font-extrabold text-blue-900 mb-3">Dermatology Range</h2>
                            <p className="text-gray-500 font-medium">Select a highly specialized subcategory to view our premium formulations.</p>
                       </div>
                       <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {dermSubCategories.map((sub, idx) => (
                                <div 
                                    key={idx}
                                    onClick={() => handleSubCategoryClick(sub)}
                                    className="bg-white px-6 py-8 rounded-2xl shadow-sm hover:shadow-lg hover:shadow-emerald-500/20 border-b-4 border-transparent hover:border-emerald-500 transition-all cursor-pointer text-center group flex flex-col items-center justify-center h-48"
                                >
                                    <Leaf className="w-8 h-8 text-blue-200 group-hover:text-emerald-500 transition-colors mb-4" />
                                    <h3 className="text-lg font-bold text-gray-800 group-hover:text-blue-900 transition-colors leading-tight">{sub}</h3>
                                </div>
                            ))}
                       </div>
                    </div>
                )}

                {/* 4. Show Products Dashboard for Selected Subcategory */}
                {selectedCategory && selectedCategory.id === 'dermatologist' && selectedSubCategory && (
                    <div className="animate-fadeIn">
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-8 flex justify-between items-center bg-gradient-to-r from-blue-900 to-[#020205] text-white">
                            <div>
                                <span className="text-emerald-400 text-sm font-bold uppercase tracking-widest mb-1 block">Product Dashboard</span>
                                <h2 className="text-3xl font-extrabold">{selectedSubCategory}</h2>
                            </div>
                            {/* <div className="bg-white/10 px-4 py-2 rounded-lg backdrop-blur-sm border border-white/20 flex items-center">
                                <Database className="w-5 h-5 text-emerald-400 mr-2" />
                                <span className="font-medium text-blue-100"></span>
                            </div> */}
                        </div>

                        {loading ? (
                            <div className="flex flex-col justify-center items-center py-32 space-y-4">
                                <div className="w-16 h-16 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin"></div>
                                <p className="text-gray-500 font-semibold tracking-wider animate-pulse">Syncing Secure Database...</p>
                            </div>
                        ) : products.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                                {products.map((prod, idx) => (
                                    <div 
                                        key={idx} 
                                        onClick={() => openProduct(prod)}
                                        className="bg-white rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-300 border border-gray-100 overflow-hidden cursor-pointer group flex flex-col"
                                    >
                                        <div className="bg-gray-50 h-64 p-6 flex justify-center items-center relative overflow-hidden group-hover:bg-emerald-50/50 transition-colors">
                                            {/* Subtle shine effect */}
                                            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/50 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
                                            <img 
                                                src={prod.photo_link || 'https://via.placeholder.com/300?text=No+Image'} 
                                                alt={prod.Name_of_Product} 
                                                className="max-h-full max-w-full object-contain mix-blend-multiply drop-shadow-md group-hover:scale-110 transition-transform duration-500"
                                            />
                                        </div>
                                        <div className="p-6 flex-1 flex flex-col justify-between border-t border-gray-50 bg-white">
                                            <div>
                                                <h3 className="font-extrabold text-lg text-blue-900 group-hover:text-emerald-700 transition-colors leading-tight mb-2 line-clamp-2">{prod.Name_of_Product}</h3>
                                            </div>
                                            <div className="mt-4 flex justify-between items-end">
                                                <span className="text-sm font-semibold text-gray-500 bg-gray-100 px-3 py-1 rounded-full">{prod.Quantity}</span>
                                                <div className="w-8 h-8 rounded-full bg-blue-50 text-emerald-600 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                                                     <PlusCircle className="w-5 h-5" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-32 bg-white rounded-3xl border border-gray-100 shadow-sm">
                                <Package className="w-20 h-20 text-gray-300 mx-auto mb-6" />
                                <h3 className="text-2xl font-bold text-gray-700 mb-2">No Products Available</h3>
                                <p className="text-gray-500 font-medium">Currently, there are no products listed under this specialized range.</p>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Product Detail Popup with Blur Effect */}
            {selectedProduct && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center">
                    {/* The Blur Background */}
                    <div 
                        className={`absolute inset-0 bg-[#020205]/40 backdrop-blur-xl transition-opacity duration-300 ${isClosing ? 'opacity-0' : 'opacity-100'}`}
                        onClick={closeProduct}
                    ></div>
                    
                    {/* The Modal */}
                    <div className={`relative bg-white rounded-[2rem] shadow-2xl w-[95%] max-w-5xl max-h-[90vh] flex flex-col md:flex-row overflow-hidden ${isClosing ? 'scale-95 opacity-0 transition-all duration-300' : 'product-modal-open'}`}>
                        <button 
                            onClick={closeProduct} 
                            className="absolute top-6 right-6 bg-gray-100 text-gray-500 hover:bg-red-100 hover:text-red-500 rounded-full p-3 z-10 transition-all shadow-sm"
                        >
                            <X className="w-6 h-6" />
                        </button>
                        
                        <div className="md:w-5/12 bg-gray-50 flex items-center justify-center p-12 relative overflow-hidden">
                            <div className="absolute top-[-20%] left-[-20%] w-[140%] h-[140%] bg-gradient-to-br from-blue-100 to-emerald-50 rounded-full blur-3xl opacity-50"></div>
                            <img 
                                src={selectedProduct.photo_link || 'https://via.placeholder.com/400'} 
                                alt={selectedProduct.Name_of_Product} 
                                className="max-w-full max-h-full object-contain mix-blend-multiply drop-shadow-[0_20px_30px_rgba(0,0,0,0.1)] relative z-10 hover:scale-105 transition-transform duration-500" 
                            />
                        </div>
                        
                        <div className="md:w-7/12 p-10 md:p-14 overflow-y-auto bg-white flex flex-col space-y-8 no-scrollbar relative">
                            {/* Gradient border top */}
                            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-emerald-400 to-blue-500"></div>
                            
                            <div>
                                <div className="flex items-center space-x-3 mb-4">
                                    <span className="px-4 py-1.5 bg-emerald-100 border border-emerald-200 text-emerald-800 text-xs font-bold rounded-full tracking-wider uppercase">{selectedProduct.Category_sub}</span>
                                    <span className="px-4 py-1.5 bg-blue-50 border border-blue-100 text-blue-800 text-xs font-bold rounded-full tracking-wider uppercase shadow-sm">Qty: {selectedProduct.Quantity}</span>
                                </div>
                                <h2 className="text-4xl font-black text-blue-950 tracking-tight leading-tight mb-2">{selectedProduct.Name_of_Product}</h2>
                                <div className="h-1 w-20 bg-emerald-500 rounded-full mt-4"></div>
                            </div>
                            
                            <div className="space-y-6 text-gray-700">
                                <div className="bg-blue-50/70 p-6 rounded-2xl border border-blue-100/50 shadow-sm relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-lg group-hover:scale-150 transition-transform"></div>
                                    <h4 className="font-extrabold text-blue-950 uppercase tracking-widest text-xs mb-3 flex items-center"><TestTube className="w-4 h-4 mr-2 text-blue-500" /> Drug / Content</h4>
                                    <p className="font-semibold text-blue-900/80 leading-relaxed text-sm md:text-base">{selectedProduct.Drug_or_Content || 'N/A'}</p>
                                </div>
                                
                                <div className="bg-emerald-50/70 p-6 rounded-2xl border border-emerald-100/50 shadow-sm relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-lg group-hover:scale-150 transition-transform"></div>
                                    <h4 className="font-extrabold text-emerald-950 uppercase tracking-widest text-xs mb-3 flex items-center"><Activity className="w-4 h-4 mr-2 text-emerald-500" /> Diseases Used For</h4>
                                    <p className="font-semibold text-emerald-900/80 leading-relaxed text-sm md:text-base">{selectedProduct.Diseases_Used_For || 'N/A'}</p>
                                </div>

                                <div className="p-6 rounded-2xl border border-gray-100 bg-gray-50/50 shadow-sm hover:shadow-md transition-shadow">
                                    <h4 className="font-extrabold text-gray-900 uppercase tracking-widest text-xs mb-3 flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-gray-400" /> How to Use</h4>
                                    <p className="leading-relaxed font-medium text-gray-600 text-sm md:text-base">{selectedProduct.How_to_Use || 'Follow physician instructions.'}</p>
                                </div>
                                
                                <div className="p-6 rounded-2xl border border-gray-100 bg-gray-50/50 shadow-sm hover:shadow-md transition-shadow">
                                    <h4 className="font-extrabold text-gray-900 uppercase tracking-widest text-xs mb-3 flex items-center"><Stethoscope className="w-4 h-4 mr-2 text-gray-400" /> Special Features</h4>
                                    <p className="leading-relaxed font-medium text-gray-600 text-sm md:text-base">{selectedProduct.Special_Features || 'N/A'}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            
            {/* Utility CSS for shimmer effect on product cards */}
            <style>{`
                @keyframes shimmer {
                    100% { transform: translateX(100%); }
                }
                .no-scrollbar::-webkit-scrollbar {
                  display: none;
                }
                .no-scrollbar {
                  -ms-overflow-style: none;  /* IE and Edge */
                  scrollbar-width: none;  /* Firefox */
                }
            `}</style>
        </div>
    );
};

const Research = () => (
    <div className="py-20 bg-white animate-fadeIn min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <TestTube className="w-16 h-16 text-emerald-600 mx-auto mb-6" />
            <h1 className="text-4xl font-bold text-blue-900 mb-4">Research & Development</h1>
            <div className="w-16 h-1 bg-emerald-600 mx-auto mb-8"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
                Innovation is the lifeblood of DERMASIS REMEDIES Pvt. Ltd . Our R&D centers are equipped with state-of-the-art technology focusing on complex generics, novel drug delivery systems, and active pharmaceutical ingredients.
            </p>
            <div className="grid md:grid-cols-3 gap-8">
                <div className="p-6 bg-blue-50 rounded-lg">
                    <h3 className="text-xl font-bold text-blue-900 mb-2">Formulation R&D</h3>
                    <p className="text-gray-600">Developing complex solid orals, injectables, and topical formulations.</p>
                </div>
                <div className="p-6 bg-blue-50 rounded-lg">
                    <h3 className="text-xl font-bold text-blue-900 mb-2">API Synthesis</h3>
                    <p className="text-gray-600">Reverse engineering and developing cost-effective, non-infringing processes.</p>
                </div>
                <div className="p-6 bg-blue-50 rounded-lg">
                    <h3 className="text-xl font-bold text-blue-900 mb-2">Clinical Trials</h3>
                    <p className="text-gray-600">Conducting rigorous bioequivalence and clinical efficacy studies globally.</p>
                </div>
            </div>
        </div>
    </div>
);

// --- EMPLOYEE PORTAL ---

const EmployeeAuth = ({ setUser, navigate }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [step, setStep] = useState(1); // 1: Email/Name, 2: OTP
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [otp, setOtp] = useState('');
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    const handleSendOtp = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrorMsg('');
        try {
            const url = isLogin ? 'http://localhost:5000/api/send-login-otp' : 'http://localhost:5000/api/send-registration-otp';
            const payload = isLogin ? { email } : { name, email };
            
            const res = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            const data = await res.json();
            
            if (res.ok) {
                setStep(2);
            } else {
                setErrorMsg(data.error || "Failed to send OTP");
            }
        } catch (err) {
            setErrorMsg("Network error. Please check backend server.");
        }
        setLoading(false);
    };

    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrorMsg('');
        try {
            const url = isLogin ? 'http://localhost:5000/api/verify-login' : 'http://localhost:5000/api/verify-registration';
            const res = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, otp })
            });
            const data = await res.json();
            
            if (res.ok) {
                setUser({ 
                    name: data.user.name, 
                    email: data.user.email, 
                    role: data.user.role || 'Employee',
                    id: data.user.userId
                });
                navigate('employee-dashboard');
            } else {
                setErrorMsg(data.error || "Invalid OTP");
            }
        } catch (err) {
            setErrorMsg("Network error. Please check backend server.");
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center relative bg-[#020205] overflow-hidden animate-fadeIn">
            {/* dynamic premium background */}
            <div className="absolute inset-0 w-full h-full pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600 rounded-full blur-[120px] opacity-30 animate-pulse"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-600 rounded-full blur-[120px] opacity-30 animate-pulse" style={{ animationDelay: '1s' }}></div>
            </div>
            
            <div className="relative z-10 w-full max-w-md p-10 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-[0_0_50px_rgba(0,212,255,0.1)]">
                <div className="flex justify-center mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-emerald-400 p-[1px] rounded-full">
                        <div className="w-full h-full bg-[#020205] rounded-full flex items-center justify-center">
                            <User className="w-8 h-8 text-emerald-400" />
                        </div>
                    </div>
                </div>
                
                <h2 className="text-center text-3xl font-extrabold text-white tracking-tight mb-2">
                    {isLogin ? 'Secure Entry' : 'Employee Registration'}
                </h2>
                <p className="text-center text-sm text-blue-200 mb-8">
                    Softcapphyjas Authenticated Terminal
                </p>

                {errorMsg && (
                    <div className="bg-red-500/20 border border-red-500/50 text-red-200 px-4 py-3 rounded-lg mb-6 text-sm text-center">
                        {errorMsg}
                    </div>
                )}

                {step === 1 ? (
                    <form className="space-y-5" onSubmit={handleSendOtp}>
                        {!isLogin && (
                            <div>
                                <label className="text-sm font-medium text-blue-200 mb-1 block">Full Name</label>
                                <input type="text" required value={name} onChange={e => setName(e.target.value)} className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all" placeholder="Enter full name" />
                            </div>
                        )}
                        <div>
                            <label className="text-sm font-medium text-blue-200 mb-1 block">Corporate Email</label>
                            <input type="email" required value={email} onChange={e => setEmail(e.target.value)} className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all" placeholder="name@softcapphyjas.com" />
                        </div>
                        
                        <button type="submit" disabled={loading} className="w-full py-3.5 px-4 bg-gradient-to-r from-blue-500 to-emerald-500 hover:from-blue-400 hover:to-emerald-400 text-white font-bold rounded-xl shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] transition-all flex justify-center items-center">
                            {loading ? <span className="animate-pulse">Processing...</span> : (isLogin ? 'Send Login OTP' : 'Send Registration OTP')}
                        </button>
                    </form>
                ) : (
                    <form className="space-y-5" onSubmit={handleVerifyOtp}>
                        <div>
                            <label className="text-sm font-medium text-blue-200 mb-1 flex justify-between">
                                Enter 6-digit OTP
                                <button type="button" onClick={() => setStep(1)} className="text-emerald-400 hover:text-emerald-300 text-xs underline">Change Email</button>
                            </label>
                            <input type="text" required maxLength="6" value={otp} onChange={e => setOtp(e.target.value)} className="w-full px-4 py-4 text-center text-2xl tracking-[0.5em] font-mono bg-black/30 border border-emerald-500/50 rounded-xl text-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 shadow-[inset_0_0_15px_rgba(16,185,129,0.1)] transition-all" placeholder="------" />
                        </div>
                        
                        <button type="submit" disabled={loading} className="w-full py-3.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-[0_0_20px_rgba(16,185,129,0.4)] transition-all flex justify-center items-center">
                            {loading ? 'Verifying...' : 'Verify & Enter'}
                        </button>
                    </form>
                )}

                <div className="text-center mt-8 pt-6 border-t border-white/10">
                    <button onClick={() => { setIsLogin(!isLogin); setStep(1); setErrorMsg(''); setOtp(''); }} className="text-sm font-medium text-emerald-400/80 hover:text-emerald-300 transition-colors">
                        {isLogin ? "New Employee? Register Here" : "Already Registered? Secure Login"}
                    </button>
                </div>
            </div>
        </div>
    );
};

const EmployeeDashboard = ({ user }) => {
    const [activeTab, setActiveTab] = useState('overview');
    
    // Form States
    const [docName, setDocName] = useState('');
    const [docSpecialty, setDocSpecialty] = useState('');
    const [patientName, setPatientName] = useState('');
    const [clinicAddress, setClinicAddress] = useState('');
    const [docDate, setDocDate] = useState(new Date().toISOString().split('T')[0]);
    const [docNotes, setDocNotes] = useState('');

    const [productName, setProductName] = useState('');
    const [stockQty, setStockQty] = useState('');
    const [distributorName, setDistributorName] = useState('');
    const [batchNumber, setBatchNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [stockDate, setStockDate] = useState(new Date().toISOString().split('T')[0]);

      const handleLogVisit = async (e) => {
      e.preventDefault();
      
      if (!docName || !docSpecialty) {
          alert("Please fill in both the Doctor's Name and Specialty.");
          return;
      }

      const visitData = {
          doctorName: docName,
          specialty: docSpecialty,
          patientName,
          clinicAddress,
          notes: docNotes,
          date: docDate
      };

      try {
          const response = await fetch('http://localhost:5000/api/log-consult', {
              method: 'POST',
              headers: { 
                  'Content-Type': 'application/json' 
              },
              body: JSON.stringify(visitData)
          });

          const data = await response.json();

          if (response.ok) {
              alert("✅ " + data.message);
              setDocName(''); setDocSpecialty(''); setPatientName(''); setClinicAddress(''); setDocNotes(''); setDocDate(new Date().toISOString().split('T')[0]);
          } else {
              alert("❌ Server Error: " + (data.error || response.statusText));
          }
      } catch (error) {
          alert("📡 Connection Failed. Please ensure your backend server is running.");
      }
  };

    const handleUpdateStock = async (e) => {
        e.preventDefault();
        
        const stockData = {
            productName,
            stockQty: Number(stockQty),
            distributorName,
            batchNumber,
            expiryDate,
            date: stockDate
        };

        try {
            const response = await fetch('http://localhost:5000/api/log-stock', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(stockData)
            });

            const data = await response.json();
            if (response.ok) {
                alert("✅ " + data.message);
                setProductName(''); setStockQty(''); setDistributorName(''); setBatchNumber(''); setExpiryDate(''); setStockDate(new Date().toISOString().split('T')[0]);
            } else {
                alert("❌ Server Error: " + (data.error || response.statusText));
            }
        } catch (error) {
            alert("📡 Connection Failed. Please ensure your backend server is running.");
        }
    };

    if (!user) return <div className="p-20 text-center text-blue-900 min-h-screen flex items-center justify-center font-bold text-2xl">Restricted Access. Please securely log in.</div>;

    return (
        <div className="bg-gray-100 min-h-screen py-8 animate-fadeIn">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Header */}
                <div className="bg-gradient-to-r from-[#020205] to-blue-900 rounded-2xl p-8 mb-8 text-white flex justify-between items-center shadow-xl relative overflow-hidden border-b-4 border-emerald-500">
                    <div className="relative z-10">
                        <h1 className="text-3xl font-extrabold mb-2 tracking-tight">Welcome to Portal, <span className="text-emerald-400">{user.name}</span></h1>
                        <p className="inline-block bg-white/10 px-3 py-1 rounded-full text-sm backdrop-blur border border-white/10">{user.role} | ID: <span className="font-mono text-emerald-300">{user.id}</span></p>
                    </div>
                    {/* <div className="relative z-10 hidden sm:flex items-center bg-black/40 px-5 py-3 rounded-xl border border-white/10 shadow-inner">
                        <Database className="w-5 h-5 mr-3 text-emerald-400 animate-pulse" />
                        <span className="text-sm font-medium tracking-wider"><span className="text-emerald-400 font-bold">ONLINE</span></span>
                    </div> */}
                    {/* Decorative bg */}
                    <div className="absolute right-[-5%] bottom-[-20%] w-80 h-80 bg-blue-500/20 rounded-full blur-[80px]"></div>
                    <Activity className="absolute right-10 bottom-[-20%] w-64 h-64 text-emerald-500 opacity-10 transform -rotate-12" />
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar Nav */}
                    <div className="w-full lg:w-64 space-y-3">
                        <button onClick={() => setActiveTab('overview')} className={`w-full flex items-center p-4 rounded-xl font-medium transition-all duration-300 ${activeTab === 'overview' ? 'bg-[#020205] text-white shadow-lg translate-x-2 border-l-4 border-emerald-500' : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'}`}>
                            <TrendingUp className="w-5 h-5 mr-3" /> Dashboard Overview
                        </button>
                        <button onClick={() => setActiveTab('doctors')} className={`w-full flex items-center p-4 rounded-xl font-medium transition-all duration-300 ${activeTab === 'doctors' ? 'bg-[#020205] text-white shadow-lg translate-x-2 border-l-4 border-emerald-500' : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'}`}>
                            <Users className="w-5 h-5 mr-3" /> Doctor Consultation
                        </button>
                        <button onClick={() => setActiveTab('stock')} className={`w-full flex items-center p-4 rounded-xl font-medium transition-all duration-300 ${activeTab === 'stock' ? 'bg-[#020205] text-white shadow-lg translate-x-2 border-l-4 border-emerald-500' : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'}`}>
                            <Package className="w-5 h-5 mr-3" /> Stock & Sales Data
                        </button>
                    </div>

                    {/* Main Content Area */}
                    <div className="flex-1 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                        
                        {activeTab === 'overview' && (
                            <div className="p-8 animate-fadeIn">
                                <h2 className="text-2xl font-bold text-[#020205] mb-6 border-b pb-4">Real-Time Metrics</h2>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                                    <div className="p-6 bg-gradient-to-br from-blue-50 to-white rounded-2xl border border-blue-100 shadow-sm hover:shadow-md transition-shadow">
                                        <div className="text-blue-500 mb-3"><Users className="w-8 h-8" /></div>
                                        <div className="text-4xl font-extrabold text-[#020205]">12</div>
                                        <div className="text-sm font-medium text-gray-500 uppercase tracking-wide mt-1">Doctors Visited</div>
                                    </div>
                                    <div className="p-6 bg-gradient-to-br from-emerald-50 to-white rounded-2xl border border-emerald-100 shadow-sm hover:shadow-md transition-shadow">
                                        <div className="text-emerald-500 mb-3"><Package className="w-8 h-8" /></div>
                                        <div className="text-4xl font-extrabold text-[#020205]">450</div>
                                        <div className="text-sm font-medium text-gray-500 uppercase tracking-wide mt-1">Units Placed</div>
                                    </div>
                                    <div className="p-6 bg-gradient-to-br from-orange-50 to-white rounded-2xl border border-orange-100 shadow-sm hover:shadow-md transition-shadow">
                                        <div className="text-orange-500 mb-3"><Activity className="w-8 h-8" /></div>
                                        <div className="text-4xl font-extrabold text-[#020205]">88%</div>
                                        <div className="text-sm font-medium text-gray-500 uppercase tracking-wide mt-1">Target Reached</div>
                                    </div>
                                </div>
                                <div className="bg-slate-50 p-5 rounded-xl text-sm text-gray-600 border border-slate-200 flex items-start">
                                    <Database className="w-5 h-5 mr-3 text-blue-600 flex-shrink-0 mt-0.5" />
                                    <p><strong>System Integrator Active:</strong> The database integration module is connected to the Softcapphyjas core servers. Data inputs across all tabs are encrypted and synchronized instantly.</p>
                                </div>
                            </div>
                        )}

                        {activeTab === 'doctors' && (
                            <div className="p-8 animate-fadeIn">
                                <h2 className="text-2xl font-bold text-[#020205] mb-6 border-b pb-4">Log Doctor Consultation</h2>
                                <form onSubmit={handleLogVisit} className="space-y-6 max-w-2xl">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 mb-2">Consultation Date</label>
                                            <input type="date" required value={docDate} onChange={e=>setDocDate(e.target.value)} className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all font-medium" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 mb-2">Doctor's Full Name</label>
                                            <input type="text" required value={docName} onChange={e=>setDocName(e.target.value)} className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all" placeholder="e.g. Dr. Ramesh Kumar" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 mb-2">Specialty</label>
                                            <select required value={docSpecialty} onChange={(e)=>setDocSpecialty(e.target.value)} className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all">
                                                <option value="">Select Specialty...</option>
                                                <option value="Cardiologist">Cardiologist</option>
                                                <option value="Neurologist">Neurologist</option>
                                                <option value="General Physician">General Physician</option>
                                                <option value="Diabetologist">Diabetologist</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 mb-2">Patient Reference / Name</label>
                                            <input type="text" value={patientName} onChange={e=>setPatientName(e.target.value)} className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all" placeholder="Enter patient name (optional)" />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Clinic Address</label>
                                        <input type="text" required value={clinicAddress} onChange={e=>setClinicAddress(e.target.value)} className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all" placeholder="Full clinic address" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Consultation Notes & Outcomes</label>
                                         <textarea value={docNotes} onChange={(e) => setDocNotes(e.target.value)} placeholder="Discussed formulations, samples provided, follow-up scheduled, etc." className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all min-h-[100px]" />
                                    </div>
                                    <button type="submit" className="flex items-center justify-center w-full md:w-auto px-8 py-3.5 bg-[#020205] text-white font-bold rounded-xl shadow-lg hover:bg-gray-900 transition-all hover:shadow-[0_0_20px_rgba(2,2,5,0.4)]">
                                        <CheckCircle className="w-5 h-5 mr-2" /> Update
                                    </button>
                                </form>
                            </div>
                        )}

                        {activeTab === 'stock' && (
                            <div className="p-8 animate-fadeIn">
                                <h2 className="text-2xl font-bold text-[#020205] mb-6 border-b pb-4">Sales & Stock Update</h2>
                                <form onSubmit={handleUpdateStock} className="space-y-6 max-w-2xl">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 mb-2">Record Date</label>
                                            <input type="date" required value={stockDate} onChange={e=>setStockDate(e.target.value)} className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all font-medium" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 mb-2">Product Line</label>
                                            <select required value={productName} onChange={e=>setProductName(e.target.value)} className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all">
                                                <option value="">Select Product...</option>
                                                <option value="CardioProtect 50mg">CardioProtect 50mg</option>
                                                <option value="NeuroCalm Plus">NeuroCalm Plus</option>
                                                <option value="GastroHeal Syrup">GastroHeal Syrup</option>
                                                <option value="DiaControl 500">DiaControl 500</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 mb-2">Units Placed / Sold</label>
                                            <input type="number" required min="1" value={stockQty} onChange={e=>setStockQty(e.target.value)} className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all" placeholder="e.g. 50" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 mb-2">Batch Number</label>
                                            <input type="text" required value={batchNumber} onChange={e=>setBatchNumber(e.target.value)} className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all" placeholder="e.g. BATCH-A093" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 mb-2">Expiry Date</label>
                                            <input type="month" required value={expiryDate} onChange={e=>setExpiryDate(e.target.value)} className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 mb-2">Distributor / Pharmacy Name</label>
                                            <input type="text" required value={distributorName} onChange={e=>setDistributorName(e.target.value)} className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all" placeholder="e.g. Apollo Pharmacy" />
                                        </div>
                                    </div>
                                    <button type="submit" className="flex items-center justify-center w-full md:w-auto px-8 py-3.5 bg-emerald-600 text-white font-bold rounded-xl shadow-[0_0_15px_rgba(16,185,129,0.3)] hover:bg-emerald-500 transition-all hover:shadow-[0_0_25px_rgba(16,185,129,0.5)]">
                                        <Database className="w-5 h-5 mr-2" /> Save
                                    </button>
                                </form>
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </div>
    );
};

// --- MAIN APP COMPONENT ---

export default function App() {
    const [currentPage, setCurrentPage] = useState('home');
    const [user, setUser] = useState(null);

    const navigate = (page) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleLogout = () => {
        setUser(null);
        navigate('home');
    };

    // Global Styles for Animations
    useEffect(() => {
        const style = document.createElement('style');
        style.innerHTML = `
            @keyframes fadeIn {
                from { opacity: 0; transform: translateY(10px); }
                to { opacity: 1; transform: translateY(0); }
            }
            .animate-fadeIn {
                animation: fadeIn 0.4s ease-out forwards;
            }
        `;
        document.head.appendChild(style);
        return () => document.head.removeChild(style);
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
            <TopBar />
            <Navbar navigate={navigate} currentPage={currentPage} user={user} onLogout={handleLogout} />
            
            <main>
                {currentPage === 'home' && <Home navigate={navigate} />}
                {currentPage === 'about' && <About />}
                {currentPage === 'products' && <Products />}
                {currentPage === 'rd' && <Research />}
                {currentPage === 'employee-login' && <EmployeeAuth setUser={setUser} navigate={navigate} />}
                {currentPage === 'employee-dashboard' && <EmployeeDashboard user={user} />}
            </main>

            {/* Footer hidden on dashboard/login for cleaner UI */}
            {currentPage !== 'employee-login' && currentPage !== 'employee-dashboard' && (
                <Footer navigate={navigate} />
            )}
        </div>
    );
}
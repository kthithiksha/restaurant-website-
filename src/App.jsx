import { useState, useEffect } from 'react'
import './index.css'

const MENU_ITEMS = [
  {
    id: 1,
    name: "Truffle Cheese Pizza",
    category: "Pizza",
    description: "Hand-tossed dough topped with premium mozzarella, black truffle oil, and fresh herbs.",
    price: 18,
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: 2,
    name: "Signature Wagyu Burger",
    category: "Burgers",
    description: "Double-stacked wagyu beef, aged cheddar, caramelized onions, and truffle aioli.",
    price: 16,
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: 3,
    name: "Wild Mushroom Linguine",
    category: "Pasta",
    description: "Artisanal pasta tossed in a creamy forest mushroom sauce with pecorino romano.",
    price: 22,
    image: "https://images.unsplash.com/photo-1473093226795-af9932fe5856?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: 4,
    name: "Tonkotsu Black Ramen",
    category: "Asian",
    description: "12-hour pork bone broth, black garlic oil, bamboo shoots, and perfectly soft-boiled egg.",
    price: 19,
    image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: 5,
    name: "Dragon Sushi Platter",
    category: "Asian",
    description: "Chef's selection of fresh eel, avocado, and spicy tuna rolls with house-made soy.",
    price: 26,
    image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: 6,
    name: "Grilled Salmon Bowl",
    category: "Healthy",
    description: "Atlantic salmon with quinoa, roasted sweet potatoes, and lemon tahini dressing.",
    price: 24,
    image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: 7,
    name: "Quinoa Power Salad",
    category: "Healthy",
    description: "Fresh organic greens, pomegranate seeds, roasted almonds, and citrus vinaigrette.",
    price: 15,
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: 8,
    name: "BBQ Pulled Pork Slider",
    category: "Burgers",
    description: "Slow-roasted pork with hickory BBQ sauce and zesty apple slaw on brioche.",
    price: 14,
    image: "https://images.unsplash.com/photo-1521305916504-4a1121188589?q=80&w=1200&auto=format&fit=crop"
  }
];

const CATEGORIES = ["All", "Pizza", "Burgers", "Pasta", "Asian", "Healthy"];

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const addToCart = (item) => {
    setCartItems(prev => [...prev, { ...item, cartId: Date.now() }]);
  };

  const removeFromCart = (cartId) => {
    setCartItems(prev => prev.filter(item => item.cartId !== cartId));
  };

  const filteredItems = activeCategory === "All" 
    ? MENU_ITEMS 
    : MENU_ITEMS.filter(item => item.category === activeCategory);

  const cartTotal = cartItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="app">
      {/* Navigation */}
      <nav className={scrolled ? 'nav-scrolled' : ''}>
        <div className="nav-container">
          <a href="#" className="logo">TASTY<span>BITES</span></a>
          <div className="nav-links">
            <a href="#about">About</a>
            <a href="#menu">Menu</a>
            <a href="#contact">Contact</a>
            <button className="cart-trigger" onClick={() => setIsCartOpen(true)}>
              <span className="cart-icon">🛒</span>
              <span className="cart-count">{cartItems.length}</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Cart Sidebar */}
      <div className={`cart-sidebar ${isCartOpen ? 'open' : ''}`}>
        <div className="cart-header">
          <h2>Your Selection</h2>
          <button className="close-btn" onClick={() => setIsCartOpen(false)}>✕</button>
        </div>
        <div className="cart-items">
          {cartItems.length === 0 ? (
            <p className="empty-msg">Your cart is feeling light...</p>
          ) : (
            cartItems.map((item) => (
              <div key={item.cartId} className="cart-item">
                <div className="cart-item-info">
                  <h4>{item.name}</h4>
                  <span>${item.price}</span>
                </div>
                <button onClick={() => removeFromCart(item.cartId)}>Remove</button>
              </div>
            ))
          )}
        </div>
        {cartItems.length > 0 && (
          <div className="cart-footer">
            <div className="total">
              <span>Total:</span>
              <span>${cartTotal}</span>
            </div>
            <button className="checkout-btn">Checkout Now</button>
          </div>
        )}
      </div>
      {isCartOpen && <div className="overlay" onClick={() => setIsCartOpen(false)}></div>}

      {/* Hero Section */}
      <header id="home">
        <div className="hero-content">
          <span className="badge">New Experience</span>
          <h1>Elegance in Every Bite</h1>
          <p>Where culinary tradition meets modern innovation. Join us for a journey of exceptional flavors and atmosphere.</p>
          <div className="hero-btns">
            <a href="#menu" className="btn btn-primary">Reserve Menu</a>
            <a href="#about" className="btn btn-outline">Our Story</a>
          </div>
        </div>
      </header>

      {/* About Section */}
      <section id="about" className="about-section">
        <div className="about-grid">
          <div className="about-image">
            <img src="/kitchen.png" alt="Professional Kitchen" />
          </div>
          <div className="about-content">
            <span className="section-subtitle">Discover</span>
            <h2>Our Culinary Philosophy</h2>
            <p>
              At Tasty Bites, we believe that dining is more than just eating—it's an experience. 
              Our team of award-winning chefs sources the freshest organic ingredients from local farmers 
              to ensure every dish tells a story of quality and passion.
            </p>
            <div className="stats">
              <div className="stat-item">
                <h3>15+</h3>
                <span>Chef Specials</span>
              </div>
              <div className="stat-item">
                <h3>100%</h3>
                <span>Fresh Produce</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="menu-section">
        <div className="section-header">
          <span className="section-subtitle">Exquisite</span>
          <h2>Our Curated Menu</h2>
          <div className="category-filters">
            {CATEGORIES.map(cat => (
              <button 
                key={cat} 
                className={activeCategory === cat ? 'active' : ''}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="menu-grid">
          {filteredItems.map(item => (
            <div key={item.id} className="menu-card">
              <div className="card-image">
                <img src={item.image} alt={item.name} />
                <span className="item-category">{item.category}</span>
              </div>
              <div className="card-info">
                <div className="card-header">
                  <h3>{item.name}</h3>
                  <span className="card-price">${item.price}</span>
                </div>
                <p>{item.description}</p>
                <button className="add-button" onClick={() => addToCart(item)}>
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact-section">
        <div className="contact-card">
          <div className="contact-form">
            <h2>Reserve a Table</h2>
            <form onSubmit={(e) => e.preventDefault()}>
              <input type="text" placeholder="Your Name" />
              <input type="email" placeholder="Your Email" />
              <select>
                <option>2 Guests</option>
                <option>4 Guests</option>
                <option>6+ Guests</option>
              </select>
              <button className="btn btn-primary">Book Now</button>
            </form>
          </div>
          <div className="contact-details">
            <h3>Visit Us</h3>
            <div className="detail-item">
              <strong>Location</strong>
              <p>123 Culinary Heights, Chennai, India</p>
            </div>
            <div className="detail-item">
              <strong>Opening Hours</strong>
              <p>Mon - Sun: 11:00 AM - 11:00 PM</p>
            </div>
            <div className="detail-item">
              <strong>Email</strong>
              <p>reservations@tastybites.com</p>
            </div>
          </div>
        </div>
      </section>

      <footer>
        <div className="footer-content">
          <div className="footer-brand">
            <a href="#" className="logo">TASTY<span>BITES</span></a>
            <p>Elevating your dining experience since 2018.</p>
          </div>
          <div className="footer-links">
            <a href="#about">About</a>
            <a href="#menu">Menu</a>
            <a href="#contact">Booking</a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2026 Tasty Bites Restaurant. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default App

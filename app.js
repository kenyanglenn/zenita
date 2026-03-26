document.addEventListener('DOMContentLoaded', () => {
  // --- Sticky Navbar Effect ---
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // --- Email Discount Popup Layout generation ---
  // Create Modal UI
  const modalHTML = `
    <div id="email-modal" style="display:none; position:fixed; inset:0; background:rgba(18,53,36,0.8); backdrop-filter:blur(8px); z-index:9999; justify-content:center; align-items:center;">
      <div style="background:#fff; border-radius: 16px; padding:48px; max-width:500px; width:90%; position:relative; text-align:center; box-shadow:0 24px 48px rgba(0,0,0,0.2);">
        <button id="close-modal" style="position:absolute; top:24px; right:24px; background:none; border:none; font-size:24px; cursor:pointer; color:#4A5D44;">&times;</button>
        <h2 style="font-family:'Playfair Display', serif; color:#123524; font-size:2.5rem; margin-bottom:16px;">10% Off Your First Order</h2>
        <p style="color:#4A5D44; margin-bottom:32px; font-size:1.1rem;">Subscribe to our newsletter and receive a special discount code plus daily wellness tips.</p>
        <form id="subscribe-form" style="display:flex; flex-direction:column; gap:16px;">
          <input type="email" placeholder="Enter your email" required style="padding:16px; border:1px solid #ddd; border-radius:8px; font-family:'Outfit', sans-serif; font-size:1rem; outline:none;"/>
          <button type="submit" class="btn btn-primary" style="width:100%;">Claim 10% Off</button>
        </form>
        <p style="margin-top:16px; font-size:0.85rem; color:#888;">No spam. Unsubscribe anytime.</p>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML('beforeend', modalHTML);

  const modal = document.getElementById('email-modal');
  const closeModalBtn = document.getElementById('close-modal');
  const subForm = document.getElementById('subscribe-form');

  // Show modal quickly
  if(!sessionStorage.getItem('zenvita_popup_shown')) {
    setTimeout(() => {
      modal.style.display = 'flex';
    }, 2500);
  }

  closeModalBtn.addEventListener('click', () => {
    modal.style.display = 'none';
    sessionStorage.setItem('zenvita_popup_shown', 'true');
  });

  subForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Thank you for subscribing! Check your email for the discount code.');
    modal.style.display = 'none';
    sessionStorage.setItem('zenvita_popup_shown', 'true');
  });

  // --- Cart Floating Action ---
  const floatingCart = document.querySelector('.floating-cart');
  const cartBadge = document.querySelector('.cart-badge');
  let cartCount = 0;

  const updateCart = () => {
    cartBadge.textContent = cartCount;
    // Tiny pop animation
    cartBadge.style.transform = 'scale(1.5)';
    setTimeout(() => { cartBadge.style.transform = 'scale(1)'; }, 200);
  };

  // Attach Add to Cart simple logic to any addToCart buttons
  const atcButtons = document.querySelectorAll('.add-to-cart-btn');
  atcButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      cartCount++;
      updateCart();
      const originalText = btn.textContent;
      btn.textContent = 'Added ✓';
      btn.style.background = '#2B5336'; 
      btn.style.color = '#fff';
      setTimeout(() => {
         btn.textContent = originalText;
         // restore inline styles roughly
         btn.style.background = '';
         btn.style.color = '';
      }, 2000);
    });
  });

  floatingCart.addEventListener('click', () => {
     if(cartCount === 0) {
        alert('Your cart is empty.');
     } else {
        alert('Proceeding to checkout with ' + cartCount + ' item(s)...');
     }
  });
});

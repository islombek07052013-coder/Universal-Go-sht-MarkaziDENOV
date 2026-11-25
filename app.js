// Boshlang'ich mahsulotlar bazasi (Admin panel ulanganda avtomatik o'sha yerdan yangilanadi)
const DEFAULT_PRODUCTS = [
  {
    id: 1,
    name: "Mol lahm go'shti (suyaksiz)",
    category: "gosht",
    price: 98000,
    unit: "kg",
    inStock: true,
    img: "https://images.unsplash.com/photo-1603048297172-c92544798d5a?auto=format&fit=crop&w=700&q=80",
    desc: "Yangi so'yilgan yosh buqa go'shti, yumshoq va suyaksiz."
  },
  {
    id: 2,
    name: "Qo'y go'shti (qovurg'a va son)",
    category: "gosht",
    price: 95000,
    unit: "kg",
    inStock: true,
    img: "https://images.unsplash.com/photo-1602470520998-f4a52199a3d6?auto=format&fit=crop&w=700&q=80",
    desc: "Taom va qozonkabob uchun saralangan yangi qo'y go'shti."
  },
  {
    id: 3,
    name: "Mol qiymasi (yog'li / yog'siz)",
    category: "gosht",
    price: 88000,
    unit: "kg",
    inStock: true,
    img: "https://images.unsplash.com/photo-1588168333986-5078d3ae3976?auto=format&fit=crop&w=700&q=80",
    desc: "Manti, somsa va kotletlar uchun yangi chiqarilgan qiyma."
  },
  {
    id: 4,
    name: "Butun broyler tovuq (xom)",
    category: "tovuq",
    price: 34000,
    unit: "kg",
    inStock: true,
    img: "https://images.unsplash.com/photo-1587593810167-a84920ea0781?auto=format&fit=crop&w=700&q=80",
    desc: "Tozalangan, pishirilmagan yangi xom broyler tovuq."
  },
  {
    id: 5,
    name: "Tovuq filesi va son qismi (xom)",
    category: "tovuq",
    price: 42000,
    unit: "kg",
    inStock: true,
    img: "https://images.unsplash.com/photo-1604503468506-a8da13d82791?auto=format&fit=crop&w=700&q=80",
    desc: "Suyaksiz tovuq ko'krak filesi va son go'shti."
  },
  {
    id: 6,
    name: "Yangi Sazan balig'i",
    category: "baliq",
    price: 48000,
    unit: "kg",
    inStock: true,
    img: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=700&q=80",
    desc: "Yangi tutilgan sazan balig'i, tozalab beriladi."
  },
  {
    id: 7,
    name: "Mol oyog'i (xolodets va sho'rva uchun)",
    category: "kallapocha",
    price: 28000,
    unit: "dona",
    inStock: true,
    img: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=700&q=80",
    desc: "Tozalangan, kuydirilgan va bo'laklangan alohida mol oyog'i."
  },
  {
    id: 8,
    name: "Mol jigari (yangi, xom)",
    category: "kallapocha",
    price: 55000,
    unit: "kg",
    inStock: true,
    img: "https://images.unsplash.com/photo-1615937657715-bc7b4b7962c1?auto=format&fit=crop&w=700&q=80",
    desc: "Yangi so'yilgan molning yumshoq jigari."
  },
  {
    id: 9,
    name: "Xom Qazi (tayyor bog'langan)",
    category: "kallapocha",
    price: 135000,
    unit: "kg",
    inStock: true,
    img: "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?auto=format&fit=crop&w=700&q=80",
    desc: "Maxsus ziravorlar bilan bog'langan, pishirishga tayyor xom qazi."
  },
  {
    id: 10,
    name: "Marinadlangan Shashlik (xom)",
    category: "tayyor",
    price: 92000,
    unit: "kg",
    inStock: true,
    img: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=700&q=80",
    desc: "Ziravorlar bilan tayyorlangan, ko'mirga qo'yishga tayyor xom jaz shashlik."
  },
  {
    id: 11,
    name: "Tovuq qanotchalari marinad (xom)",
    category: "tayyor",
    price: 45000,
    unit: "kg",
    inStock: true,
    img: "https://images.unsplash.com/photo-1527477396000-e27163b481c2?auto=format&fit=crop&w=700&q=80",
    desc: "Duxovka yoki mangalda pishirish uchun marinadlangan xom qanotchalar."
  }
];

const CATEGORY_LABELS = {
  gosht: "🥩 Mol va Qo'y",
  tovuq: "🍗 Tovuq (xom)",
  baliq: "🐟 Baliq",
  kallapocha: "🦴 Kalla-pocha / Qismlar",
  tayyor: "🔥 Pishirishga tayyor"
};

let currentCategory = "all";
let cart = JSON.parse(localStorage.getItem("ugm_cart") || "[]");

function getProducts() {
  const saved = localStorage.getItem("ugm_products");
  return saved ? JSON.parse(saved) : DEFAULT_PRODUCTS;
}

function setCategory(cat, btn) {
  currentCategory = cat;
  document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
  if (btn) btn.classList.add("active");
  renderProducts();
}

function renderProducts() {
  const grid = document.getElementById("productsGrid");
  const search = (document.getElementById("searchInput")?.value || "").toLowerCase();
  const products = getProducts();

  const filtered = products.filter(p => {
    const matchCat = currentCategory === "all" || p.category === currentCategory;
    const matchText = p.name.toLowerCase().includes(search) || (p.desc && p.desc.toLowerCase().includes(search));
    return matchCat && matchText;
  });

  if (filtered.length === 0) {
    grid.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: #a8a29e; padding: 30px;">So'rovingiz bo'yicha mahsulot topilmadi.</p>`;
    return;
  }

  grid.innerHTML = filtered.map(p => {
    const qtyOptions = p.unit === "kg"
      ? `<option value="0.5">0.5 kg</option><option value="1" selected>1 kg</option><option value="1.5">1.5 kg</option><option value="2">2 kg</option><option value="3">3 kg</option><option value="5">5 kg</option>`
      : `<option value="1" selected>1 ${p.unit}</option><option value="2">2 ${p.unit}</option><option value="3">3 ${p.unit}</option><option value="4">4 ${p.unit}</option><option value="5">5 ${p.unit}</option>`;

    return `
      <div class="product-card">
        <div class="prod-img-wrap">
          <img src="${p.img}" alt="${p.name}" onerror="this.src='https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=600'">
          <span class="prod-cat-badge">${CATEGORY_LABELS[p.category] || p.category}</span>
          ${!p.inStock ? `<div class="sold-out-overlay">VAQTINCHA TUGAGAN</div>` : ""}
        </div>
        <div class="prod-body">
          <h3 class="prod-title">${p.name}</h3>
          <p class="prod-desc">${p.desc || ""}</p>
          <div class="prod-price-row">
            <span class="prod-price">${Number(p.price).toLocaleString("uz-UZ")} so'm</span>
            <span class="prod-unit">/ 1 ${p.unit}</span>
          </div>
          <div class="qty-controls">
            <select id="qty-${p.id}" class="qty-select" ${!p.inStock ? "disabled" : ""}>
              ${qtyOptions}
            </select>
            <button class="btn-add-cart" onclick="addToCart(${p.id})" ${!p.inStock ? "disabled" : ""}>
              ${p.inStock ? "+ Savatga" : "Tugagan"}
            </button>
          </div>
        </div>
      </div>
    `;
  }).join("");
}

function addToCart(id) {
  const products = getProducts();
  const prod = products.find(p => p.id === id);
  if (!prod) return;

  const qtySelect = document.getElementById(`qty-${id}`);
  const qty = parseFloat(qtySelect.value);

  const existing = cart.find(item => item.id === id);
  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({ id: prod.id, name: prod.name, price: prod.price, unit: prod.unit, qty });
  }

  saveCart();
  updateCartBadge();
}

function saveCart() {
  localStorage.setItem("ugm_cart", JSON.stringify(cart));
}

function updateCartBadge() {
  const badge = document.getElementById("cartCount");
  if (badge) badge.innerText = cart.length;
}

function openCart() {
  const modal = document.getElementById("cartModal");
  const list = document.getElementById("cartItems");
  const totalEl = document.getElementById("cartTotal");

  if (cart.length === 0) {
    list.innerHTML = `<p style="text-align:center; color:#a8a29e; padding:20px;">Savatchangiz hozircha bo'sh.</p>`;
    totalEl.innerText = "0 so'm";
  } else {
    let total = 0;
    list.innerHTML = cart.map((item, idx) => {
      const sum = item.price * item.qty;
      total += sum;
      return `
        <div class="cart-item-row">
          <div>
            <strong>${item.name}</strong>
            <div style="font-size:0.85rem; color:#a8a29e;">${item.qty} ${item.unit} × ${item.price.toLocaleString("uz-UZ")} so'm</div>
          </div>
          <div style="display:flex; align-items:center; gap:10px;">
            <strong style="color:#e5b869;">${sum.toLocaleString("uz-UZ")} so'm</strong>
            <button class="remove-item-btn" onclick="removeFromCart(${idx})">✕</button>
          </div>
        </div>
      `;
    }).join("");
    totalEl.innerText = `${total.toLocaleString("uz-UZ")} so'm`;
  }

  modal.hidden = false;
}

function closeCart() {
  document.getElementById("cartModal").hidden = true;
}

function removeFromCart(index) {
  cart.splice(index, 1);
  saveCart();
  updateCartBadge();
  openCart();
}

function submitOrder(e) {
  e.preventDefault();
  if (cart.length === 0) {
    alert("Iltimos, avval mahsulot tanlang!");
    return;
  }

  const name = document.getElementById("custName").value;
  const phone = document.getElementById("custPhone").value;
  const delivery = document.getElementById("deliveryType").value;
  const address = document.getElementById("custAddress").value;
  const note = document.getElementById("custNote").value;

  let total = 0;
  const itemsText = cart.map((i, idx) => {
    const s = i.price * i.qty;
    total += s;
    return `${idx + 1}. ${i.name} — ${i.qty} ${i.unit} (${s.toLocaleString("uz-UZ")} so'm)`;
  }).join("%0A");

  const msg = `🥩 *YANGI BUYURTMA (Universal Go'sht Markazi)*%0A%0A👤 *Mijoz:* ${name}%0A📞 *Tel:* ${phone}%0A🚚 *Usul:* ${delivery}%0A📍 *Manzil:* ${address || "Ko'rsatilmagan"}%0A📝 *Izoh:* ${note || "Yo'q"}%0A%0A🛒 *Mahsulotlar:*%0A${itemsText}%0A%0A💰 *Jami summa:* ${total.toLocaleString("uz-UZ")} so'm`;

  window.open(`https://t.me/share/url?url=&text=${msg}`, "_blank");

  cart = [];
  saveCart();
  updateCartBadge();
  closeCart();
  alert("Buyurtmangiz tayyorlandi! Tez orada operatorimiz bog'lanadi.");
}

// Jonli Aksiya Taymeri
function startPromoTimer() {
  const clock = document.getElementById("countdownClock");
  if (!clock) return;

  let secondsLeft = 4 * 3600 + 59 * 60 + 59;
  setInterval(() => {
    if (secondsLeft <= 0) secondsLeft = 5 * 3600;
    secondsLeft--;
    const h = String(Math.floor(secondsLeft / 3600)).padStart(2, "0");
    const m = String(Math.floor((secondsLeft % 3600) / 60)).padStart(2, "0");
    const s = String(secondsLeft % 60).padStart(2, "0");
    clock.innerText = `${h}:${m}:${s}`;
  }, 1000);
}

document.addEventListener("DOMContentLoaded", () => {
  renderProducts();
  updateCartBadge();
  startPromoTimer();
});

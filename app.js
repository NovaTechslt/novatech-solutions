
let products = [];
let activeCategory = 'all';

const grid = document.querySelector('#productsGrid');
const empty = document.querySelector('#emptyState');
const searchInput = document.querySelector('#searchInput');

function card(p){
  return `<article class="card">
    <div class="card-media">
      <img src="${p.image}" alt="${p.name}" loading="lazy">
      <span class="badge">${p.badge}</span>
    </div>
    <div class="card-body">
      <span class="category-label">${p.category}</span>
      <h3>${p.name}</h3>
      <p>${p.description}</p>
      <div class="price-note">Consulte o preço atualizado</div>
      <a class="btn primary" href="${p.link}" target="_blank" rel="noopener sponsored">Comprar no Mercado Livre</a>
    </div>
  </article>`;
}

function render(){
  const term = searchInput.value.toLowerCase().trim();
  const filtered = products.filter(p => {
    const categoryOk = activeCategory === 'all' || p.category === activeCategory;
    const textOk = !term || (p.name + ' ' + p.description + ' ' + p.category).toLowerCase().includes(term);
    return categoryOk && textOk;
  });
  grid.innerHTML = filtered.map(card).join('');
  empty.hidden = filtered.length > 0;
}

fetch('products.json')
  .then(r => {
    if(!r.ok) throw new Error('Falha ao carregar o catálogo');
    return r.json();
  })
  .then(data => { products = data; render(); })
  .catch(() => {
    grid.innerHTML = '<p>Não foi possível carregar o catálogo.</p>';
  });

document.querySelector('#searchForm').addEventListener('submit', e => {
  e.preventDefault(); render(); document.querySelector('#produtos').scrollIntoView({behavior:'smooth'});
});
searchInput.addEventListener('input', render);

document.querySelectorAll('[data-category]').forEach(btn => {
  btn.addEventListener('click', () => {
    activeCategory = btn.dataset.category;
    document.querySelectorAll('[data-category]').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    render();
    document.querySelector('#produtos').scrollIntoView({behavior:'smooth'});
  });
});
document.querySelector('[data-category="all"]').classList.add('active');

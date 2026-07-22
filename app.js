
const products=[
{name:"Notebook Gamer",category:"notebooks",price:"R$ 4.999,90",icon:"💻",link:"#"},
{name:"Monitor Gamer 27 polegadas",category:"monitores",price:"R$ 1.299,90",icon:"🖥️",link:"#"},
{name:"Headset Gamer",category:"headsets",price:"R$ 299,90",icon:"🎧",link:"#"},
{name:"SSD NVMe 1 TB",category:"ssd",price:"R$ 449,90",icon:"💾",link:"#"},
{name:"Teclado Mecânico RGB",category:"teclados",price:"R$ 349,90",icon:"⌨️",link:"#"},
{name:"Mouse Gamer",category:"mouses",price:"R$ 199,90",icon:"🖱️",link:"#"},
{name:"Memória RAM 16 GB",category:"memorias",price:"R$ 319,90",icon:"🧠",link:"#"},
{name:"Controle Gamer",category:"gamer",price:"R$ 249,90",icon:"🎮",link:"#"}
];

const grid=document.querySelector("#productsGrid");

function renderProducts(items){
  grid.innerHTML=items.map(p=>`
    <article class="product-card">
      <div class="product-image">${p.icon}</div>
      <div class="product-info">
        <small>${p.category.toUpperCase()}</small>
        <h3>${p.name}</h3>
        <div class="product-price">${p.price}</div>
        <a class="btn primary" href="${p.link}" target="_blank" rel="noopener sponsored">
          Comprar no Mercado Livre
        </a>
      </div>
    </article>`).join("");
}

document.querySelector("#searchForm").addEventListener("submit",e=>{
  e.preventDefault();
  const term=document.querySelector("#searchInput").value.toLowerCase().trim();
  renderProducts(products.filter(p=>
    p.name.toLowerCase().includes(term) ||
    p.category.toLowerCase().includes(term)
  ));
  document.querySelector("#destaques").scrollIntoView({behavior:"smooth"});
});

document.querySelectorAll(".category").forEach(button=>{
  button.addEventListener("click",()=>{
    renderProducts(products.filter(p=>p.category===button.dataset.category));
    document.querySelector("#destaques").scrollIntoView({behavior:"smooth"});
  });
});

renderProducts(products);

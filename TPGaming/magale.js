// ============================================
// جستجو و فیلتر مقالات
// ============================================
const searchInput = document.getElementById('searchArticle');
const categoryButtons = document.querySelectorAll('#articleCategories .cat-btn');
const articles = document.querySelectorAll('.article-card');
const noResults = document.getElementById('noResults');

let currentCat = 'all';
let currentQuery = '';

function filterArticles() {
  let visibleCount = 0;

  articles.forEach(card => {
    const cat = card.dataset.cat || '';
    const title = card.querySelector('h3').textContent.toLowerCase();
    const desc = card.querySelector('p').textContent.toLowerCase();

    const matchCat = currentCat === 'all' || cat === currentCat;
    const matchSearch = currentQuery === '' ||
      title.includes(currentQuery) || desc.includes(currentQuery);

    if (matchCat && matchSearch) {
      card.style.display = '';
      visibleCount++;
    } else {
      card.style.display = 'none';
    }
  });

  noResults.style.display = visibleCount === 0 ? 'block' : 'none';
}

// جستجو
searchInput.addEventListener('input', function (e) {
  currentQuery = e.target.value.trim().toLowerCase();
  filterArticles();
});

// دسته‌بندی
categoryButtons.forEach(btn => {
  btn.addEventListener('click', function () {
    categoryButtons.forEach(b => b.classList.remove('active'));
    this.classList.add('active');
    currentCat = this.dataset.cat;
    filterArticles();
  });
});
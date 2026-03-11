(function () {
  'use strict';

  var U = 'https://images.unsplash.com/photo-';
  var W = '?w=600&q=80';
  window.MENU_PRODUCTS = {
    'blinchiki-vishnya': { name: 'Блинчики со сметаной (вишня)', price: '260 ₽', description: 'Тонкие блинчики со сметаной и вишней.', composition: 'мука, яйца, молоко, сметана, вишня', image: U + '1567620905732-2d1ec7ab7445' + W },
    'blinchiki-klubnika': { name: 'Блинчики со сметаной (клубника)', price: '250 ₽', description: 'Тонкие блинчики со сметаной и клубникой.', composition: 'мука, яйца, молоко, сметана, клубника', image: U + '1567620905732-2d1ec7ab7445' + W },
    'kasha-ovsyanaya': { name: 'Каша овсяная с вишней и розмарином', price: '270 ₽', description: 'Овсяная каша с вишнёвым топпингом и нотой розмарина.', composition: 'овсянка, вишня, розмарин, молоко', image: U + '1512621776951-a57141f2eefd' + W },
    'syrniki-vishnya': { name: 'Сырники со сметаной и вишневым вареньем', price: '360 ₽', description: 'Нежные творожные сырники с вишнёвым вареньем и сметаной.', composition: 'творог, яйцо, мука, сметана, вишнёвое варенье', image: U + '1604329760661-e71dc83f2b26' + W },
    'syrniki-klubnika': { name: 'Сырники со сметаной и клубничным вареньем', price: '360 ₽', description: 'Творожные сырники с клубничным вареньем и сметаной.', composition: 'творог, яйцо, мука, сметана, клубничное варенье', image: U + '1604329760661-e71dc83f2b26' + W },
    'panini-buzhenina': { name: 'Панини с бужениной', price: '380 ₽', description: 'Тёплый панини с бужениной и соусами.', composition: 'хлеб для панини, буженина, соус, зелень', image: U + '1528735602780-6552c8e658cc' + W },
    'panini-losos': { name: 'Панини с лососем', price: '580 ₽', description: 'Панини со слабосолёным лососем.', composition: 'хлеб для панини, лосось, сливочный сыр, зелень', image: U + '1528735602780-6552c8e658cc' + W },
    'panini-cyplenok': { name: 'Панини с цыпленком', price: '380 ₽', description: 'Панини с нежным цыпленком.', composition: 'хлеб для панини, цыплёнок, соус, овощи', image: U + '1528735602780-6552c8e658cc' + W },
    'omlet-bekon': { name: 'Запеченный омлет с крем-сыром и беконом', price: '330 ₽', description: 'Пышный запечённый омлет с крем-сыром и беконом.', composition: 'яйца, крем-сыр, бекон', image: U + '1525351484163-7529414344d8' + W },
    'omlet-cyplenok': { name: 'Запеченный омлет с крем-сыром и цыпленком', price: '330 ₽', description: 'Запечённый омлет с крем-сыром и цыпленком.', composition: 'яйца, крем-сыр, цыплёнок', image: U + '1525351484163-7529414344d8' + W },
    'omlet-losos': { name: 'Запеченный омлет с крем-сыром и лососем', price: '330 ₽', description: 'Омлет с крем-сыром и лососем.', composition: 'яйца, крем-сыр, лосось', image: U + '1525351484163-7529414344d8' + W },
    'zapekanka': { name: 'Творожная запеканка', price: '270 ₽', description: 'Классическая творожная запеканка.', composition: 'творог, яйца, мука, изюм', image: U + '1546069901-ba9599a7e63c' + W },
    'draniki-bekon': { name: 'Драники с крем-сыром и беконом', price: '280 ₽', description: 'Драники с крем-сыром и беконом.', composition: 'картофель, крем-сыр, бекон', image: U + '1604329760661-e71dc83f2b26' + W },
    'draniki-losos': { name: 'Драники с крем-сыром и лососем', price: '360 ₽', description: 'Драники с крем-сыром и лососем.', composition: 'картофель, крем-сыр, лосось', image: U + '1604329760661-e71dc83f2b26' + W },
    'draniki-cyplenok': { name: 'Драники с крем-сыром и цыпленком', price: '310 ₽', description: 'Драники с крем-сыром и цыпленком.', composition: 'картофель, крем-сыр, цыплёнок', image: U + '1604329760661-e71dc83f2b26' + W },
    'fresh-apelsin': { name: 'Фреш апельсиновый', price: '330 ₽', description: 'Свежевыжатый апельсиновый сок.', composition: 'апельсины', image: U + '1621506283937-a1f6e89634a3' + W },
    'fresh-yabloko': { name: 'Фреш яблочный', price: '330 ₽', description: 'Свежевыжатый яблочный сок.', composition: 'яблоки', image: U + '1620870963992-32b3d3e0b8c8' + W },
    'fresh-greypfrut': { name: 'Фреш грейпфрутовый', price: '330 ₽', description: 'Свежевыжатый грейпфрутовый сок.', composition: 'грейпфруты', image: U + '1621506283937-a1f6e89634a3' + W },
    'limonad-klass': { name: 'Лимонада классический', price: '230 ₽', description: 'Классический лимонад.', composition: 'лимон, мята, сахар, вода', image: U + '1621263764928-df1444c5e859' + W },
    'limonad-aperol': { name: 'Трезвый апероль', price: '230 ₽', description: 'Безалкогольный апероль-стиль лимонад.', composition: 'апельсин, горькие травы, сода', image: U + '1621263764928-df1444c5e859' + W },
    'limonad-shhavel': { name: 'Лимонад щавелевый', price: '230 ₽', description: 'Освежающий лимонад со щавелем.', composition: 'щавель, лимон, мята', image: U + '1621263764928-df1444c5e859' + W },
    'limonad-kivi': { name: 'Киви Базилик', price: '230 ₽', description: 'Лимонад с киви и базиликом.', composition: 'киви, базилик, лайм', image: U + '1621263764928-df1444c5e859' + W },
    'espresso': { name: 'Эспрессо', price: '150 ₽', description: 'Классический двойной эспрессо из свежемолотого зерна.', composition: 'кофе молотый, вода', image: U + '1495474472287-4d71bcdd2085' + W },
    'americano': { name: 'Американо', price: '160 ₽', description: 'Эспрессо с горячей водой.', composition: 'эспрессо, вода', image: U + '1509042239860-f550ce710b93' + W },
    'lungo': { name: 'Лунго', price: '170 ₽', description: 'Длинный эспрессо, больше воды.', composition: 'кофе, вода', image: U + '1509042239860-f550ce710b93' + W },
    'filter': { name: 'Фильтр кофе', price: '160 / 180 ₽', description: 'Фильтр-кофе, заваренный вручную.', composition: 'кофе свежемолотый, вода', image: U + '1495474472287-4d71bcdd2085' + W },
    'cappuccino': { name: 'Капучино', price: '200 / 220 / 240 ₽', description: 'Эспрессо с молочной пенкой.', composition: 'эспрессо, молоко', image: U + '1572442388796-11668a67e53d' + W },
    'flat-white': { name: 'Флэт Вайт', price: '200 / 220 ₽', description: 'Двойной эспрессо и микрофонка.', composition: 'эспрессо двойной, молоко', image: U + '1561882468-9110e03e0f78' + W },
    'latte': { name: 'Латте', price: '200 / 220 ₽', description: 'Нежный кофе с молоком.', composition: 'эспрессо, молоко', image: U + '1561882468-9110e03e0f78' + W },
    'raf': { name: 'Раф', price: '240 / 260 ₽', description: 'Кофе со сливками и ванилью, взбитый в пену.', composition: 'эспрессо, сливки, ваниль', image: U + '1572442388796-11668a67e53d' + W },
    'mocha': { name: 'Мокко', price: '250 / 290 ₽', description: 'Кофе с шоколадом и молоком.', composition: 'эспрессо, молоко, шоколад', image: U + '1544785349-322f293c0c8f' + W },
    'raf-author': { name: 'Раф авторский (персиковый, сырный, халва ваниль)', price: '330 ₽', description: 'Авторские варианты рафа на выбор.', composition: 'эспрессо, сливки, сироп/топпинг по варианту', image: U + '1572442388796-11668a67e53d' + W },
    'tapioka': { name: 'Кофе Тапиока', price: '310 ₽', description: 'Кофе с шариками тапиоки.', composition: 'эспрессо, молоко, тапиока', image: U + '1561882468-9110e03e0f78' + W },
    'urbech': { name: 'Кофе с Урбечом', price: '290 ₽', description: 'Кофе с пастой урбеч.', composition: 'эспрессо, молоко, урбеч', image: U + '1561882468-9110e03e0f78' + W },
    'bumble': { name: 'Бамбл Кофе', price: '300 ₽', description: 'Холодный кофе с лимоном и имбирём.', composition: 'эспрессо, лимон, имбирь, мёд', image: U + '1461023058943-07fcbe16d735' + W },
    'ice-latte': { name: 'Айс Латте', price: '230 / 250 ₽', description: 'Латте со льдом.', composition: 'эспрессо, молоко, лёд', image: U + '1461023058943-07fcbe16d735' + W },
    'ice-matcha': { name: 'Айс Матча', price: '330 ₽', description: 'Холодный матча-латте.', composition: 'матча, молоко, лёд', image: U + '1536256264052-147987f36929' + W },
    'thai': { name: 'Кофе по-тайски', price: '280 ₽', description: 'Холодный кофе со сгущёнкой и специями.', composition: 'эспрессо, сгущёнка, лёд, специи', image: U + '1461023058943-07fcbe16d735' + W },
    'espresso-tonic': { name: 'Эспрессо Тоник', price: '240 ₽', description: 'Эспрессо на тонике со льдом.', composition: 'эспрессо, тоник, лёд', image: U + '1461023058943-07fcbe16d735' + W },
    'cocoa': { name: 'Какао с маршмеллоу', price: '270 / 300 ₽', description: 'Горячий какао с зефиром маршмеллоу.', composition: 'какао, молоко, маршмеллоу', image: U + '1542990253-0d0f5be5f0ed' + W },
    'hot-chocolate': { name: 'Горячий шоколад', price: '210 / 240 ₽', description: 'Густой горячий шоколад.', composition: 'шоколад, молоко', image: U + '1542990253-0d0f5be5f0ed' + W },
    'matcha-latte': { name: 'Матча Латте', price: '360 ₽', description: 'Тёплый матча-латте.', composition: 'матча, молоко', image: U + '1536256264052-147987f36929' + W },
    'glintvein': { name: 'Глинтвейн безалкогольный', price: '360 ₽', description: 'Тёплый безалкогольный глинтвейн со специями.', composition: 'сок, специи, фрукты', image: U + '1542990253-0d0f5be5f0ed' + W },
    'tea-kokos': { name: 'Кокос Маракуйя Манго', price: '180 / 210 ₽', description: 'Авторский чай с тропическими нотами.', composition: 'чай, кокос, маракуйя, манго', image: U + '1571934811356-5cc061b6821f' + W },
    'tea-brusnika': { name: 'Брусничный Вечер', price: '180 / 210 ₽', description: 'Чай с брусникой.', composition: 'чай, брусника', image: U + '1571934811356-5cc061b6821f' + W },
    'tea-oblepiha': { name: 'Облепиховый', price: '200 / 230 ₽', description: 'Чай с облепихой.', composition: 'чай, облепиха', image: U + '1571934811356-5cc061b6821f' + W },
    'tea-dian': { name: 'Дянь хун', price: '150 / 190 ₽', description: 'Китайский красный чай.', composition: 'чай дянь хун', image: U + '1571934811356-5cc061b6821f' + W },
    'tea-sencha': { name: 'Сенча', price: '150 / 190 ₽', description: 'Японский зелёный чай.', composition: 'сенча', image: U + '1563822249363-739270b672b4' + W },
    'tea-puer': { name: 'Пуэр Лесные Ягоды', price: '150 / 190 ₽', description: 'Пуэр с лесными ягодами.', composition: 'пуэр, ягоды', image: U + '1571934811356-5cc061b6821f' + W },
    'tea-tatar': { name: 'Татарские травы', price: '150 / 190 ₽', description: 'Травяной сбор.', composition: 'травяной сбор', image: U + '1571934811356-5cc061b6821f' + W },
    'tea-ulun': { name: 'Молочный улун', price: '150 / 190 ₽', description: 'Улун с молочной нотой.', composition: 'улун', image: U + '1563822249363-739270b672b4' + W },
    'tea-earl': { name: 'Эрл Грей Спешл', price: '150 / 190 ₽', description: 'Авторский Эрл Грей.', composition: 'чёрный чай, бергамот', image: U + '1571934811356-5cc061b6821f' + W },
    'tea-teplyi': { name: 'Теплый вечер', price: '150 / 190 ₽', description: 'Уютный вечерний чай.', composition: 'чай, травы', image: U + '1571934811356-5cc061b6821f' + W },
    'milk-klass': { name: 'Молочный коктейль классический', price: '260 ₽', description: 'Классический молочный коктейль.', composition: 'молоко, мороженое', image: U + '1572490122747-3968b75cc699' + W },
    'milk-banan': { name: 'Молочный коктейль банановый', price: '260 ₽', description: 'Молочный коктейль с бананом.', composition: 'молоко, мороженое, банан', image: U + '1572490122747-3968b75cc699' + W },
    'milk-shoko': { name: 'Молочный коктейль шоколадный', price: '260 ₽', description: 'Шоколадный молочный коктейль.', composition: 'молоко, мороженое, шоколад', image: U + '1572490122747-3968b75cc699' + W }
  };

  function init() {
    // Мобильное меню
    var navToggle = document.querySelector('.nav-toggle');
    var navList = document.querySelector('.nav-list');
    var navLinks = document.querySelectorAll('.nav-list a');

    if (navToggle && navList) {
      navToggle.addEventListener('click', function () {
        navList.classList.toggle('is-open');
        navToggle.setAttribute('aria-expanded', navList.classList.contains('is-open'));
      });
      navLinks.forEach(function (link) {
        link.addEventListener('click', function () {
          navList.classList.remove('is-open');
        });
      });
    }

    // Вкладки меню
    var tabs = document.querySelectorAll('.menu-tab');
    var panels = document.querySelectorAll('.menu-panel');
    tabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        var targetId = tab.getAttribute('data-tab');
        tabs.forEach(function (t) { t.classList.remove('active'); });
        tab.classList.add('active');
        panels.forEach(function (panel) {
          panel.classList.remove('active');
          if (panel.id === targetId) panel.classList.add('active');
        });
      });
    });

    // Карточка товара
    var productSection = document.getElementById('product-detail');
    var productTitle = document.getElementById('product-detail-title');
    var productPrice = document.getElementById('product-detail-price');
    var productDescription = document.getElementById('product-detail-description');
    var productComposition = document.getElementById('product-detail-composition');
    var productImage = document.getElementById('product-detail-img');
    var productPlaceholder = document.getElementById('product-detail-placeholder');

    function showProduct(id) {
      if (!productSection) return;
      if (!window.MENU_PRODUCTS || !window.MENU_PRODUCTS[id]) {
        productSection.classList.remove('is-visible');
        productSection.setAttribute('aria-hidden', 'true');
        return;
      }
      var p = window.MENU_PRODUCTS[id];
      if (productTitle) productTitle.textContent = p.name;
      if (productPrice) productPrice.textContent = p.price;
      if (productDescription) productDescription.textContent = p.description;
      if (productComposition) productComposition.textContent = p.composition || '—';
      if (productImage && productPlaceholder) {
        if (p.image) {
          productImage.src = p.image;
          productImage.alt = p.name;
          productImage.style.display = 'block';
          productPlaceholder.style.display = 'none';
        } else {
          productImage.style.display = 'none';
          productPlaceholder.style.display = 'flex';
        }
      }
      productSection.classList.add('is-visible');
      productSection.setAttribute('aria-hidden', 'false');
      productSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    function showProductFromHash() {
      var hash = (window.location.hash || '').replace(/^#item-/, '');
      if (hash && window.MENU_PRODUCTS && window.MENU_PRODUCTS[hash]) {
        showProduct(hash);
      } else if (productSection) {
        productSection.classList.remove('is-visible');
        productSection.setAttribute('aria-hidden', 'true');
      }
    }

    // Клик по позиции меню: делегирование на контейнер меню
    var menuSection = document.getElementById('menu');
    if (menuSection) {
      menuSection.addEventListener('click', function (e) {
        var link = e.target.closest('a.menu-item-link');
        if (!link) return;
        e.preventDefault();
        e.stopPropagation();
        var id = link.getAttribute('data-product-id');
        if (!id) return;
        window.location.hash = 'item-' + id;
        showProduct(id);
      });
    }

    if (productSection) {
      window.addEventListener('hashchange', showProductFromHash);
      showProductFromHash();
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

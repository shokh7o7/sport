window.addEventListener('load', function () {
    var pre = document.getElementById('preloader');
    if (pre) setTimeout(function () {
        pre.style.opacity = '0';
        pre.style.visibility = 'hidden';
    }, 800);
});

var burgerBtn = document.getElementById('burgerBtn');
var navMenu = document.getElementById('navMenu');
var allLinks = document.querySelectorAll('#navMenu a');

burgerBtn.addEventListener('click', function () {
    navMenu.classList.toggle('open');
});

allLinks.forEach(function (link) {
    link.addEventListener('click', function () {
        allLinks.forEach(function (x) { x.classList.remove('active'); });
        link.classList.add('active');
        navMenu.classList.remove('open');
    });
});

var searchBtn = document.getElementById('searchBtn');
var heartBtn = document.getElementById('heartBtn');
var searchModal = document.getElementById('searchModal');
var favModal = document.getElementById('favModal');
var carModal = document.getElementById('carModal');
var alertModal = document.getElementById('customAlert');

var carCards = document.querySelectorAll('.car-card');
var carHearts = document.querySelectorAll('.car-heart');
var carBtns = document.querySelectorAll('.car-btn');
var brandCards = document.querySelectorAll('.brand-card');
var serviceCards = document.querySelectorAll('.service-card');

var searchInput = document.getElementById('searchInput');
var contactForm = document.getElementById('contactForm');

var favorites = [];

searchBtn.addEventListener('click', function () {
    searchModal.classList.add('show');
    showSearch('');
});

heartBtn.addEventListener('click', function () {
    showFavorites();
    favModal.classList.add('show');
});

document.getElementById('searchClose').addEventListener('click', function () {
    searchModal.classList.remove('show');
});

document.getElementById('favClose').addEventListener('click', function () {
    favModal.classList.remove('show');
});

document.getElementById('carModalClose').addEventListener('click', function () {
    carModal.classList.remove('show');
});

document.getElementById('alertBtn').addEventListener('click', function () {
    alertModal.classList.remove('show');
});

function showAlert(title, message) {
    document.getElementById('alertTitle').textContent = title;
    document.getElementById('alertText').textContent = message;
    alertModal.classList.add('show');
}

searchInput.addEventListener('input', function () {
    showSearch(searchInput.value.toLowerCase().trim());
});

function showSearch(query) {
    var results = document.getElementById('searchResults');
    results.innerHTML = '';

    if (query === '') {
        results.innerHTML = '<div class="search-empty"><p>Start typing...</p></div>';
        return;
    }

    var found = 0;

    carCards.forEach(function (card) {
        var name = card.getAttribute('data-name');
        var brand = card.getAttribute('data-brand');
        var year = card.getAttribute('data-year');
        var price = card.getAttribute('data-price');
        var full = (name + ' ' + brand + ' ' + year).toLowerCase();

        if (full.includes(query)) {
            found++;
            var item = document.createElement('div');
            item.className = 'search-result-item';
            item.innerHTML = '<img src="' + card.querySelector('img').src + '"><div><h4>' + name + '</h4><p>' + year + ' · ' + brand + '</p></div><div class="search-result-price">$' + price + '</div>';
            item.addEventListener('click', function () {
                searchModal.classList.remove('show');
                openCar(name);
            });
            results.appendChild(item);
        }
    });

    if (found === 0) results.innerHTML = '<div class="search-empty"><p>No cars found</p></div>';
}

function showFavorites() {
    var list = document.getElementById('favList');
    list.innerHTML = '';

    if (favorites.length === 0) {
        list.innerHTML = '<div class="fav-empty"><p>No favorites yet</p></div>';
        return;
    }

    favorites.forEach(function (fav) {
        var item = document.createElement('div');
        item.className = 'fav-item';
        item.innerHTML = '<img src="' + fav.img + '"><div><h4>' + fav.name + '</h4><p>$' + fav.price + '</p></div><button class="fav-remove">×</button>';

        item.querySelector('.fav-remove').addEventListener('click', function (e) {
            e.stopPropagation();
            var i = favorites.indexOf(fav);
            if (i !== -1) favorites.splice(i, 1);
            document.querySelector('.car-heart[data-car="' + fav.name + '"]').classList.remove('liked');
            document.getElementById('favCount').textContent = favorites.length;
            showFavorites();
        });

        item.addEventListener('click', function () {
            favModal.classList.remove('show');
            openCar(fav.name);
        });

        list.appendChild(item);
    });
}

carHearts.forEach(function (heart) {
    heart.addEventListener('click', function (e) {
        e.stopPropagation();
        var name = heart.getAttribute('data-car');
        var card = heart.closest('.car-card');
        heart.classList.toggle('liked');

        if (heart.classList.contains('liked')) {
            favorites.push({ name: name, img: card.querySelector('img').src, price: card.getAttribute('data-price') });
        } else {
            favorites = favorites.filter(function (f) { return f.name !== name; });
        }
        document.getElementById('favCount').textContent = favorites.length;
    });
});

carBtns.forEach(function (btn) {
    btn.addEventListener('click', function (e) {
        e.stopPropagation();
        openCar(btn.getAttribute('data-car'));
    });
});

function openCar(name) {
    var card = document.querySelector('.car-card[data-name="' + name + '"]');
    if (!card) return;

    document.getElementById('carModalContent').innerHTML =
        '<img src="' + card.querySelector('img').src + '">' +
        '<div class="car-modal-info">' +
            '<h2>' + name + '</h2>' +
            '<div class="cm-price">$' + card.getAttribute('data-price') + '</div>' +
            '<p>Year: ' + card.getAttribute('data-year') + ' · Type: ' + card.getAttribute('data-type') + ' · Brand: ' + card.getAttribute('data-brand') + '</p>' +
            '<button class="car-modal-btn" id="buyBtn">Buy Now</button>' +
        '</div>';

    carModal.classList.add('show');

    document.getElementById('buyBtn').addEventListener('click', function () {
        carModal.classList.remove('show');
        showAlert('Purchase Started', name);
    });
}

brandCards.forEach(function (brand) {
    brand.addEventListener('click', function (e) {
        e.preventDefault();
        var b = brand.getAttribute('data-brand');
        searchModal.classList.add('show');
        searchInput.value = b;
        showSearch(b.toLowerCase());
    });
});

serviceCards.forEach(function (service) {
    service.addEventListener('click', function () {
        showAlert(service.querySelector('h3').textContent, 'Contact us for details');
    });
});

contactForm.addEventListener('submit', function (e) {
    e.preventDefault();
    var n = document.getElementById('contactName').value.trim();
    var em = document.getElementById('contactEmail').value.trim();

    if (n === '' || em === '') {
        showAlert('Error', 'Please fill in all inputs');
        return;
    }
    showAlert('Sent', 'Thank you ' + n);
    contactForm.reset();
});

window.addEventListener('scroll', function () {
    document.querySelector('header').classList.toggle('scrolled', window.scrollY > 50);
});

document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        searchModal.classList.remove('show');
        favModal.classList.remove('show');
        carModal.classList.remove('show');
        alertModal.classList.remove('show');
        navMenu.classList.remove('open');
    }
});

var obs = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
        if (e.isIntersecting) e.target.classList.add('reveal');
    });
});

document.querySelectorAll('.service-card, .why-card, .testimonial-card, .car-card, .brand-card, .contact-form').forEach(function (el) {
    obs.observe(el);
});
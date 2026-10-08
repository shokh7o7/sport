document.addEventListener('DOMContentLoaded', function () {

  var burger = document.querySelector('.burger');
  var nav = document.querySelector('.nav-links');
  var links = document.querySelectorAll('.nav-links a');

  burger.onclick = function () {
    nav.style.display = nav.style.display === 'flex' ? '' : 'flex';
  };

  links.forEach(function (link) {
    link.onclick = function () {
      links.forEach(function (x) {
        x.classList.remove('active');
      });

      link.classList.add('active');

      if (window.innerWidth <= 900) {
        nav.style.display = '';
      }
    };
  });

  window.onscroll = function () {

    document.querySelectorAll('section[id]').forEach(function (section) {
      if (scrollY >= section.offsetTop - 120) {
        links.forEach(function (link) {
          link.classList.toggle(
            'active',
            link.getAttribute('href') === '#' + section.id
          );
        });
      }
    });

    document.querySelector('.navbar').classList.toggle('scrolled', scrollY > 50);
    document.querySelector('.to-top')?.classList.toggle('show', scrollY > 500);
  };

  document.querySelectorAll('.stat-num').forEach(function (el) {
    var n = 0;
    var max = Number(el.dataset.count);

    setTimeout(function () {
      var timer = setInterval(function () {
        n += Math.ceil(max / 60);
        el.textContent = n;

        if (n >= max) {
          el.textContent = max;
          clearInterval(timer);
        }
      }, 25);
    }, 2300);
  });

  var form = document.querySelector('.contact-form');

  form.onsubmit = function (e) {
    e.preventDefault();

    var btn = form.querySelector('.btn-primary');
    btn.textContent = 'Yuborilmoqda...';
    btn.disabled = true;

    setTimeout(function () {
      btn.textContent = 'Yuborildi ✓';

      setTimeout(function () {
        btn.textContent = 'Yuborish';
        btn.disabled = false;
        form.reset();
      }, 1500);
    }, 1000);
  };

  document.querySelectorAll('.service-card, .price-card').forEach(function (card) {
    card.onmousemove = function (e) {
      var r = card.getBoundingClientRect();

      card.style.setProperty('--mx', e.clientX - r.left + 'px');
      card.style.setProperty('--my', e.clientY - r.top + 'px');
    };
  });

  var top = document.createElement('button');

  top.className = 'to-top';
  top.textContent = '↑';
  document.body.appendChild(top);

  top.onclick = function () {
    window.scrollTo(0, 0);
  };

});

var revealObserver = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      entry.target.classList.add('reveal');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15, rootMargin: '0px 0px -80px 0px' });

document.querySelectorAll('.section-head, .service-card, .price-card, .contact-form, .footer-inner, .footer-bottom').forEach(function (el) {
  revealObserver.observe(el);
});
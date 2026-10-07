/**
 * 巴洛克音響 (ANSBACH ACOUSTIC)
 * 8 品牌旗艦輪播骨架 (Brand Carousel Component)
 * 固定 8 品牌：Franco Serblin, ProAc, ATD, EAM Lab, AudioByte, Rockna, Esprit, ASI
 */

const BrandCarousel = {
  brands: [
    {
      id: 'franco-serblin',
      name: 'Franco Serblin',
      country: '義大利 (Italy)',
      image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'proac',
      name: 'ProAc',
      country: '英國 (United Kingdom)',
      image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'atd',
      name: 'ATD',
      country: '義大利 (Italy)',
      image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'eam-lab',
      name: 'EAM Lab',
      country: '義大利 (Italy)',
      image: 'https://images.unsplash.com/photo-1558403194-611308249627?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'audiobyte',
      name: 'AudioByte',
      country: '羅馬尼亞 (Romania)',
      image: 'https://images.unsplash.com/photo-1520523839898-507127054976?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'rockna',
      name: 'Rockna',
      country: '羅馬尼亞 (Romania)',
      image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'esprit',
      name: 'Esprit',
      country: '法國 (France)',
      image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'asi',
      name: 'ASI',
      country: '法國 (France)',
      image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80'
    }
  ],

  init() {
    this.render();
    this.bindEvents();
  },

  render() {
    const track = document.getElementById('brand-carousel-track');
    if (!track) return;

    track.innerHTML = this.brands.map(b => `
      <div class="brand-carousel-card">
        <div class="brand-carousel-img-box">
          <img src="${b.image}" alt="${b.name}" loading="lazy">
        </div>
        <div class="brand-carousel-info">
          <span class="brand-carousel-country">${b.country}</span>
          <h3 class="brand-carousel-name">${b.name}</h3>
        </div>
      </div>
    `).join('');
  },

  bindEvents() {
    const prevBtn = document.getElementById('brand-carousel-prev');
    const nextBtn = document.getElementById('brand-carousel-next');
    const track = document.getElementById('brand-carousel-track');

    if (prevBtn && track) {
      prevBtn.addEventListener('click', () => {
        track.scrollBy({ left: -320, behavior: 'smooth' });
      });
    }

    if (nextBtn && track) {
      nextBtn.addEventListener('click', () => {
        track.scrollBy({ left: 320, behavior: 'smooth' });
      });
    }
  }
};

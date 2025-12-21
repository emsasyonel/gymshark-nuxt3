<script setup lang="ts">
import { ref } from 'vue';
import RecentlyViewed from './RecentlyViewed.vue'

// --- MOCK DATA ---
const reviews = [
  {
    id: 1,
    author: 'Tilda',
    verified: true,
    rating: 5,
    date: '4 days ago',
    title: 'Love!',
    body: "They fit perfectly. Not see through. I sized up (M) and was worried they'd be too big but not at all.. comfortable fabric.",
    likes: 0,
    dislikes: 0,
    specs: [
      { label: 'Age', value: '25 - 34' },
      { label: 'Height', value: '5ft-5ft3 (153cm-162cm)' },
      { label: 'Body Type', value: 'Hourglass' },
      { label: 'Activity', value: 'Weight / strength training (e.g. weight training, weightlifting, bodybuilding, powerlifting)' },
      { label: 'Workout Frequency', value: '3 - 6 times a week' },
      { label: 'Usual Size', value: 'S' },
    ]
  },
  {
    id: 2,
    author: 'Helen',
    verified: true,
    rating: 1,
    date: '6 days ago',
    title: 'Disappointing fabric quality',
    body: "I was so excited about this colour, but I can't wear these shorts — they are very see-through :(",
    likes: 0,
    dislikes: 0,
    specs: [
      { label: 'Age', value: '25 - 34' },
      { label: 'Height', value: '5ft4-5ft7 (163cm-172cm)' },
      { label: 'Body Type', value: 'Hips narrower than shoulders' },
      { label: 'Activity', value: 'Weight / strength training (e.g. weight training, weightlifting, bodybuilding, powerlifting)' },
      { label: 'Workout Frequency', value: '3 - 6 times a week' },
      { label: 'Usual Size', value: 'S' },
    ]
  }
];

// --- ÖZET VERİLERİ ---
const ratingSnapshot = [
  { star: 5, count: 194, percent: 80 }, { star: 4, count: 66, percent: 30 },
  { star: 3, count: 30, percent: 15 }, { star: 2, count: 33, percent: 18 },
  { star: 1, count: 44, percent: 22 },
];
const activeCategory = ref('COMFORT');
const categories = [
  { name: 'COMFORT', value: 90, leftLabel: 'Very uncomfortable', rightLabel: 'Very comfortable' },
  { name: 'QUALITY', value: 85, leftLabel: 'Poor', rightLabel: 'Perfect' },
  { name: 'SIZING', value: 50, leftLabel: 'Runs Small', rightLabel: 'Runs Large' },
  { name: 'VALUE', value: 80, leftLabel: 'Poor', rightLabel: 'Great' },
  { name: 'LENGTH', value: 60, leftLabel: 'Short', rightLabel: 'Long' },
];
const currentCategory = () => categories.find(c => c.name === activeCategory.value);
</script>

<template>
  <section class="reviews-section">
    <div class="container">
      
      <h2 class="section-title">REVIEWS</h2>

      <div class="reviews-summary">
        <div class="summary-left">
          <div class="overall-rating">
            <span class="score">3.9</span>
            <div class="stars">
              <i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill empty"></i>
            </div>
          </div>
          <p class="review-count">Based on 367 reviews</p>
          <div class="recommendation">
            <i class="bi bi-check-circle-fill"></i> 76% who purchased would recommend this
          </div>
          <div class="rating-snapshot">
            <h4>RATING SNAPSHOT</h4>
            <div v-for="row in ratingSnapshot" :key="row.star" class="snapshot-row">
              <span class="label-group"><span class="star-num">{{ row.star }}</span> <span class="count-num">({{ row.count }})</span></span>
              <div class="bar-bg"><div class="bar-fill" :style="{ width: row.percent + '%' }"></div></div>
            </div>
          </div>
        </div>

        <div class="summary-right">
          <h4>AVERAGE RATINGS</h4>
          <div class="tabs">
            <button v-for="cat in categories" :key="cat.name" :class="['tab-btn', { active: activeCategory === cat.name }]" @click="activeCategory = cat.name">{{ cat.name }}</button>
          </div>
          <div class="slider-container" v-if="currentCategory()">
            <div class="slider-track"><div class="slider-thumb" :style="{ left: currentCategory()!.value + '%' }"></div></div>
            <div class="slider-labels"><span>{{ currentCategory()!.leftLabel }}</span><span>Ok</span><span>{{ currentCategory()!.rightLabel }}</span></div>
          </div>
        </div>
      </div>

      <div class="filter-bar">
        <div class="search-box">
          <i class="bi bi-search"></i>
          <input type="text" placeholder="Search reviews and topics" />
        </div>
        <div class="filters">
          <div class="filter-item">Sort by: Most recent <i class="bi bi-chevron-down"></i></div>
          <div class="filter-item">Rating <i class="bi bi-chevron-down"></i></div>
          <div class="filter-item">Activity <i class="bi bi-chevron-down"></i></div>
          <div class="filter-item">Age <i class="bi bi-chevron-down"></i></div>
          <div class="filter-item">Workout Frequency <i class="bi bi-chevron-down"></i></div>
          <div class="filter-item">Height <i class="bi bi-chevron-down"></i></div>
        </div>
      </div>

      <div class="reviews-list">
        <div v-for="review in reviews" :key="review.id" class="review-card">
          <div class="reviewer-column">
            <h4 class="author-name">{{ review.author }}</h4>
            <div v-if="review.verified" class="verified-badge">
              <i class="bi bi-check-circle-fill"></i> Verified buyer
            </div>
            <ul class="specs-list">
              <li v-for="(spec, index) in review.specs" :key="index" class="spec-item">
                <span class="spec-label">{{ spec.label }}: </span>
                <span class="spec-value">{{ spec.value }}</span>
              </li>
            </ul>
          </div>
          <div class="content-column">
            <div class="rating-row">
              <div class="stars">
                <i v-for="n in 5" :key="n" :class="['bi', n <= review.rating ? 'bi-star-fill' : 'bi-star', { 'filled': n <= review.rating }]"></i>
              </div>
              <span class="review-date">• {{ review.date }}</span>
            </div>
            <h3 class="review-title">{{ review.title }}</h3>
            <p class="review-body">{{ review.body }}</p>
            <div class="review-actions">
              <button class="action-btn"><i class="bi bi-hand-thumbs-up"></i> {{ review.likes }}</button>
              <button class="action-btn"><i class="bi bi-hand-thumbs-down"></i> {{ review.dislikes }}</button>
            </div>
          </div>
        </div>
      </div>

      <div class="reviews-footer">
        <p class="footer-count">1-2 of 367 reviews</p>
        <button class="load-more-btn">LOAD MORE</button>
      </div>
<RecentlyViewed />
    </div>
  </section>
</template>

<style scoped>
/* --- TEMEL AYARLAR --- */
.reviews-section { padding: 200px 0; background-color: #fff;  }
.container { max-width: 1400px; margin: 0 auto; padding: 0 40px; }
.section-title { font-size: 2.2rem; font-weight: 900; margin-bottom: 40px; text-transform: uppercase; }

/* --- ÖZET KISMI --- */
.reviews-summary { display: flex; gap: 80px; margin-bottom: 60px; }
.summary-left, .summary-right { flex: 1; }
.overall-rating { display: flex; align-items: center; gap: 15px; margin-bottom: 5px; }
.score { font-size: 3.5rem; font-weight: 900; line-height: 1; }
.stars { color: #fab005; font-size: 1.3rem; }
.stars .empty { color: #e0e0e0; }
.review-count { color: #666; font-size: 0.95rem; margin-bottom: 25px; }
.recommendation { display: flex; align-items: center; gap: 8px; font-weight: 700; font-size: 0.9rem; margin-bottom: 35px; color: #000; }
.recommendation i { font-size: 1.1rem; }
.rating-snapshot h4, .summary-right h4 { font-size: 1.2rem; font-weight: 900; margin-bottom: 20px; text-transform: uppercase; letter-spacing: 0.5px; }
.snapshot-row { display: flex; align-items: center; margin-bottom: 12px; font-size: 0.9rem; font-weight: 500; }
.label-group { width: 70px; display: flex; align-items: center; gap: 5px; color: #000; font-weight: 700; }
.count-num { color: #666; font-weight: 400; }
.bar-bg { flex: 1; height: 4px; background: #e5e5e5; border-radius: 2px; overflow: hidden; }
.bar-fill { height: 100%; background: #000; }

/* --- BUTONLAR & SLIDER --- */
.tabs { display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: 40px; }
.tab-btn { border: none; background: #f1f1f1; padding: 17px 24px; border-radius: 30px; font-size: 0.8rem; font-weight: 800; cursor: pointer; text-transform: uppercase; transition: all 0.2s; color: #333; }
.tab-btn:hover { background: #e0e0e0; }
.tab-btn.active { background: #000; color: #fff; }
.slider-track { position: relative; height: 4px; background: #e5e5e5; width: 100%; margin-bottom: 15px; border-radius: 2px; }
.slider-thumb { position: absolute; top: 50%; width: 40px; height: 5px; background: #000; transform: translate(-50%, -50%); border-radius: 4px; }
.slider-labels { display: flex; justify-content: space-between; font-size: 0.75rem; font-weight: 600; color: #666; }

/* --- FİLTRE BAR --- */
.filter-bar { display: flex; align-items: center; justify-content: flex-start; padding: 15px 25px; margin-bottom: 50px; gap: 25px; border-radius: 4px; }
.search-box { display: flex; align-items: center; gap: 10px; width: 220px; }
.search-box input { border: none; background: transparent; outline: none; font-size: 0.9rem; width: 100%; color: #333; }
.filters { display: flex; align-items: center; gap: 25px; flex-wrap: wrap; }
.filter-item { font-size: 0.85rem; font-weight: 500; cursor: pointer; display: flex; gap: 5px; align-items: center; color: #444; }

/* --- YORUM KARTLARI --- */
.reviews-list { margin-bottom: 40px; }
.review-card { display: flex; gap: 60px; padding-bottom: 40px;  margin-bottom: 40px; }
.reviewer-column { width: 280px; flex-shrink: 0; }
.author-name { font-size: 1rem; font-weight: 800; margin: 0 0 5px 0; }
.verified-badge { display: flex; align-items: center; gap: 6px; color: #198754; font-size: 0.75rem; font-weight: 700; margin-bottom: 20px; }
.verified-badge i { font-size: 0.9rem; }
.specs-list { list-style: none; padding: 0; margin: 0; }
.spec-item { font-size: 0.85rem; margin-bottom: 5px; line-height: 1.4; }
.spec-label { color: #666; } .spec-value { color: #000; font-weight: 500; }
.content-column { flex: 1; }
.rating-row { display: flex; align-items: center; gap: 8px; margin-bottom: 10px; }
.rating-row .stars { font-size: 0.9rem; color: #ccc; }
.rating-row .stars i.filled { color: #fab005; }
.review-date { font-size: 0.8rem; color: #666; margin-left: 5px; }
.review-title { font-size: 1.1rem; font-weight: 800; margin: 0 0 10px 0; color: #000; }
.review-body { font-size: 0.95rem; line-height: 1.6; color: #333; margin: 0 0 20px 0; }
.review-actions { display: flex; gap: 15px; }
.action-btn { background: none; border: none; cursor: pointer; display: flex; align-items: center; gap: 6px; color: #666; font-size: 0.9rem; padding: 0; }
.action-btn:hover { color: #000; }

/* --- FOOTER (YENİ LOAD MORE BUTONU) --- */
.reviews-footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 40px;
  gap: 20px;
}

.footer-count {
  font-size: 0.9rem;
  color: #333;
  margin: 0;
  font-weight: 500;
}

.load-more-btn {
  background-color: #000;
  color: #fff;
  border: none;
  padding: 16px 50px; /* Geniş ve dolgun */
  border-radius: 30px; /* Hap şeklinde */
  font-weight: 800; /* Kalın yazı */
  font-size: 0.9rem;
  cursor: pointer;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  transition: transform 0.2s, opacity 0.2s;
}

.load-more-btn:hover {
  opacity: 0.9;
  transform: scale(1.02);
}

/* MOBİL UYUM */
@media (max-width: 900px) {
  .review-card { flex-direction: column; gap: 20px; }
  .reviewer-column { width: 100%; }
  .reviews-summary { flex-direction: column; }
  .filter-bar { flex-direction: column; align-items: flex-start; }
}
</style>
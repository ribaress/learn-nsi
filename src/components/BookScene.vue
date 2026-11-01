<script setup>
defineProps({
  n: { type: Number, default: 13 },
  capacity: { type: Number, default: 6 },
  packed: { type: Number, default: 0 },
  hero: Boolean,
  preview: Boolean
});
const colors = ['#b3a1ee', '#8bd2c4', '#f2b399', '#eed085', '#95b9e0', '#c8a0db'];
</script>
<template>
  <svg
    v-if="hero"
    class="hero-art"
    viewBox="0 0 310 220"
    role="img"
    aria-label="Des livres et des boîtes : un grand problème découpé en petites tâches"
  >
    <ellipse cx="164" cy="193" rx="130" ry="12" fill="#dcd5f5" />
    <g stroke="#68628d" stroke-width="1.6" stroke-linejoin="round">
      <g transform="translate(126 40)">
        <path d="m0 92 58-21 64 17-58 22z" fill="#a2bce8" />
        <path d="m0 92 0 14 64 21v-17z" fill="#829bd3" />
        <path d="m64 110 58-22v14l-58 25" fill="#edf0ff" />
        <path d="m-5 72 58-20 65 16-58 23z" fill="#f3c6a5" />
        <path d="m-5 72 0 14 65 20V91z" fill="#dda381" />
        <path d="m60 91 58-23v15l-58 23" fill="#fff4e8" />
        <path d="m2 53 53-20 65 17-54 22z" fill="#b3a0e6" />
        <path d="m2 53 0 14 64 20V72z" fill="#9b88d0" />
        <path d="m66 72 54-22v14l-54 23" fill="#f5efff" />
        <path d="m3 33 49-18 64 15-49 22z" fill="#96d3bf" />
        <path d="m3 33 0 13 64 20V52z" fill="#75bba4" />
        <path d="m67 52 49-22v14L67 66" fill="#f3fffa" />
      </g>
      <g transform="translate(31 123)">
        <path d="m0 13 35-19 43 15-35 20z" fill="#d1c6f2" />
        <path d="m0 13 43 16v48L0 60z" fill="#bcace7" />
        <path d="m43 29 35-20v46L43 77z" fill="#ddd4f7" />
        <path d="m0 13 7-18 35 13-7 18m0-32 9-16 43 15-9 16" fill="#e8e1fc" />
      </g>
      <g transform="translate(112 142)">
        <path d="m0 10 30-17 42 14-31 18z" fill="#c8bdec" />
        <path d="m0 10 41 15v38L0 48z" fill="#baabe2" />
        <path d="m41 25 31-18v38L41 63z" fill="#e4dcf8" />
        <path d="m0 10 6-15 36 12-6 15m-6-29 7-13 42 14-7 13" fill="#ece6fb" />
      </g>
    </g>
    <g fill="none" stroke="#9b87dc" stroke-width="2" stroke-linecap="round">
      <path d="m69 62-5-9m23 3 2-10m-37 35-10-3m215-14 9-9m-2 28 13-2" />
      <path d="m99 99 9 3m-5-7 1 10" />
    </g>
  </svg>
  <div v-else class="book-simulation">
    <div class="books-tray" :aria-label="`${n - packed} livres restent à ranger`">
      <span
        v-for="i in n"
        :key="i"
        class="little-book"
        :class="{ packed: i <= packed }"
        :style="{ '--book-color': colors[(i - 1) % colors.length] }"
        ><span></span><span></span
      ></span>
      <span v-if="n === 0" class="muted">Aucun livre à ranger.</span>
    </div>
    <div class="box-row">
      <div
        v-for="box in preview ? 1 : Math.max(1, Math.ceil(n / capacity))"
        :key="box"
        class="box-illustration"
      >
        <div class="box-flap"></div>
        <div class="box-slots">
          <span
            v-for="slot in capacity"
            :key="slot"
            :class="{ filled: (box - 1) * capacity + slot <= packed }"
            :style="{ '--book-color': colors[(slot - 1) % colors.length] }"
          ></span>
        </div>
        <span class="box-label"
          >{{ preview ? 'Une boîte' : `Boîte ${box}` }} · {{ capacity }} places</span
        >
      </div>
    </div>
  </div>
</template>

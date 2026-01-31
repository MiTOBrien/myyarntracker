<script setup>
import { computed, ref } from 'vue'
import { useUserStore } from '@/stores/useUserStore'

const API_BASE_URL = import.meta.env.VITE_APP_API_BASE_URL
const userStore = useUserStore()
const searchQuery = ref('')
const selectedDifficultyFilter = ref('all')

const clearFilters = () => {
  searchQuery.value = ''
  selectedDifficultyFilter.value = 'all'
}

const filteredYarnStash = computed(() => {
  return yarnstash.value.filter((stash) => {
    const matchesSearch =
      !searchQuery.value ||
      stash.name?.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      stash.description?.toLowerCase().includes(searchQuery.value.toLowerCase())

    const matchesWeight =
      selectedWeightFilter.value === 'all' ||
      (selectedWeightFilter.value === 'lace' && stash.weight === 'lace') ||
      (selectedWeightFilter.value === 'superfine' && stash.weight === 'superfine') ||
      (selectedWeightFilter.value === 'fine' && stash.weight === 'fine') ||
      (selectedWeightFilter.value === 'light' && stash.weight === 'light') ||
      (selectedWeightFilter.value === 'medium' && stash.weight === 'medium') ||
      (selectedWeightFilter.value === 'bulky' && stash.weight === 'bulky') ||
      (selectedWeightFilter.value === 'superbulky' && stash.weight === 'superbulky') ||
      (selectedWeightFilter.value === 'jumbo' && stash.weight === 'jumbo')

      const matchesFiber =
      selectedFiberFilter.value === 'all' ||
      (selectedFiberFilter.value === 'alpaca' && stash.fiber === 'alpaca') ||
      (selectedFiberFilter.value === 'angora' && stash.fiber === 'angora') ||
      (selectedFiberFilter.value === 'cashmere' && stash.fiber === 'cashmere') ||
      (selectedFiberFilter.value === 'mohair' && stash.fiber === 'mohair') ||
      (selectedFiberFilter.value === 'silk' && stash.fiber === 'silk') ||
      (selectedFiberFilter.value === 'wool' && stash.fiber === 'wool') ||
      (selectedFiberFilter.value === 'bamboo' && stash.fiber === 'bamboo') ||
      (selectedFiberFilter.value === 'cotton' && stash.fiber === 'cotton') ||
      (selectedFiberFilter.value === 'linen' && stash.fiber === 'linen') ||
      (selectedFiberFilter.value === 'rayon' && stash.fiber === 'rayon') ||
      (selectedFiberFilter.value === 'acrylic' && stash.fiber === 'acrylic') ||
      (selectedFiberFilter.value === 'nylon' && stash.fiber === 'nylon') ||
      (selectedFiberFilter.value === 'polyester' && stash.fiber === 'polyester') ||
      (selectedFiberFilter.value === 'stellina' && stash.fiber === 'stellina')
      
    return matchesSearch && matchesWeight && matchesFiber
  })
})
</script>

<template>
  <h1>Yarn Stash</h1>
  <h2>Manage and organize your yarn stash here.</h2>
  <p>Add yarn to your stash</p>
  <h3>Filter Options</h3>
  <!-- Search and Filter Section -->
  <div class="search-filters">
    <div class="search-bar">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search by name or description..."
        class="search-input"
      />
    </div>

    <div class="filters">
      <div class="filter-group">
        <label for="weight-filter">Weight:</label>
        <select v-model="selectedWeightFilter" id="weight-filter" class="filter-select">
          <option value="all">All Weights</option>
          <option value="lace">0 - Lace</option>
          <option value="superfine">1 - Superfine(Fingering/Sock)</option>
          <option value="fine">2 - Fine(Sport/Baby)</option>
          <option value="light">3 - Light(DK/Double Knit)</option>
          <option value="medium">4 - Medium(Worsted/Aran/Afghan)</option>
          <option value="bulky">5 - Bulky(Chunky)</option>
          <option value="superbulky">6 - Super Bulky</option>
          <option value="jumbo">7 - Jumbo</option>
        </select>
      </div>

            <div class="filter-group">
        <label for="fiber-filter">Fiber:</label>
        <select v-model="selectedFiberFilter" id="fiber-filter" class="filter-select">
          <option value="all">All Fibers</option>
          <option value="alpaca">Alpaca</option>
          <option value="cashmere">Cashmere</option>
          <option value="mohair">Mohair</option>
          <option value="silk">Silk</option>
          <option value="wool">Wool</option>
          <option value="bamboo">Bamboo</option>
          <option value="cotton">Cotton</option>
          <option value="linen">Linen</option>
          <option value="rayon">Rayon</option>
          <option value="acrylic">Acrylic</option>
          <option value="nylon">Nylon</option>
          <option value="polyester">Polyester</option>
          <option value="stellina">Stellina</option>
        </select>
      </div>
    </div>
  </div>
</template>

<style scoped></style>

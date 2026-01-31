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

    const matchesDifficulty =
      selectedDifficultyFilter.value === 'all' ||
      (selectedDifficultyFilter.value === 'easy' && stash.difficulty === 'easy') ||
      (selectedDifficultyFilter.value === 'medium' && stash.difficulty === 'medium') ||
      (selectedDifficultyFilter.value === 'hard' && stash.difficulty === 'hard') ||
      (selectedDifficultyFilter.value === 'expert' && stash.difficulty === 'expert')

    return matchesSearch && matchesDifficulty
  })
})
</script>

<template>
  <h1>Yarn Patterns</h1>
  <h2>
    Explore and manage your knitting and crochet patterns here.
  </h2>
  <p>Add a pattern</p>
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
        <label for="difficulty-filter">Difficulty:</label>
        <select v-model="selectedDifficultyFilter" id="difficulty-filter" class="filter-select">
          <option value="all">All Levels</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
          <option value="expert">Expert</option>
        </select>
      </div>
    </div>
  </div>
</template>

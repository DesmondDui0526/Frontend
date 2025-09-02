<script setup>
import { onMounted, onUnmounted } from 'vue'
import { useFeedStore } from '../stores/feed'

const feed = useFeedStore()

// infinite scroll function
function useInfiniteScroll(callback) {
  function onScroll() {
    const bottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 100
    if (bottom) callback()
  }

  onMounted(() => window.addEventListener('scroll', onScroll))
  onUnmounted(() => window.removeEventListener('scroll', onScroll))
}

// use the function for feed
useInfiniteScroll(() => {
  if (!feed.loading) {
    feed.fetchFeed()
  }
})

onMounted(feed.fetchFeed)
</script>

<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">Popules Feed</h1>

    <!-- show feed items -->
    <div v-for="(item, i) in feed.items" :key="i" class="p-4 mb-2 rounded-lg shadow bg-white">
      <p>{{ item.title }}</p>
    </div>

    <!-- loading indicator -->
    <div v-if="feed.loading" class="text-center py-4 text-gray-500">
      Loading...
    </div>
  </div>
</template>

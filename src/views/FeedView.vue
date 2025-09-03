<template>
  <div class="w-full bg-gray-50 min-h-screen p-6">

    <!-- grid container -->
    <div class="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
      <div v-for="(item, i) in feed.items" :key="i"
        class="break-inside-avoid p-4 rounded-lg shadow bg-white mb-6 cursor-pointer" @click="toggleDescription(i)">

        <!-- title always visible -->
        <h2 class="text-black text-lg font-semibold">{{ item.title }}</h2>

        <!-- thumbnail from the API to check the images exist or not-->
        <img v-if="item.thumbnail && (!item.uploads || item.uploads.length === 0)" :src="item.thumbnail" alt="thumbnail"
          class="mt-3 rounded-lg w-full object-cover" />

        <!-- uploads grid if image exists-->
        <div v-if="item.uploads && item.uploads.length" class="mt-3 grid grid-cols-2 gap-3">
          <img v-for="(img, j) in item.uploads" :key="j" :src="img" alt="feed image"
            class="rounded-lg w-full object-cover" />
        </div>

        <!-- description hidden by default, shown on click -->
        <p v-if="activeIndex === i" class="text-gray-600 mt-3">
          {{ item.content }}
        </p>
      </div>
    </div>

    <!-- loading indicator -->
    <div v-if="feed.loading" class="text-center py-6 text-gray-500">
      Loading...
    </div>
  </div>
</template>


<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useFeedStore } from '../stores/feed'

const feed = useFeedStore()
const activeIndex = ref(null)

function toggleDescription(index) {
  activeIndex.value = activeIndex.value === index ? null : index
}

onMounted(feed.fetchFeed)

function useInfiniteScroll(callback) {
  function onScroll() {
    const bottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 100
    if (bottom) callback()
  }
  onMounted(() => window.addEventListener('scroll', onScroll))
  onUnmounted(() => window.removeEventListener('scroll', onScroll))
}

useInfiniteScroll(() => {
  if (!feed.loading) {
    feed.fetchFeed()
  }
})
</script>

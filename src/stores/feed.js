import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

export const useFeedStore = defineStore('feed', () => {
  const items = ref([])
  const offset = ref(0)
  const limit = ref(15)
  const loading = ref(false)

  async function fetchFeed() {
    if (loading.value) return
    loading.value = true

    try {
      const { data } = await axios.get('https://api.popules.com/api/feed', {
        params: { offset: offset.value, limit: limit.value },
      })
      // debugging for issue purpose
      console.log('API Response:', data)
      items.value.push(...data.data)
      offset.value += limit.value
    } catch (error) {
      console.error('Error fetching feed:', error)
    } finally {
      loading.value = false
    }
  }
  return { items, offset, limit, loading, fetchFeed }
})

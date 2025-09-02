import { reactive } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

export const useFeedStore = defineStore('feed', () => {
  const state = reactive({
    items: [],
    offset: 0,
    limit: 15,
    loading: false,
  })

  function fetchFeed() {
    if (state.loading) return
    state.loading = true

    axios
      .get('https://api.popules.com/api/feed', {
        params: { offset: state.offset, limit: state.limit },
      })
      .then((response) => {
        state.items.push(...response.data)
        state.offset += state.limit
      })
      .catch((error) => {
        console.error('Error fetching feed:', error)
      })
      .finally(() => {
        state.loading = false
      })
  }

  return { ...state, fetchFeed }
})

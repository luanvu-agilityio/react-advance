import { create } from 'zustand'
import type { ProductTag } from '@utils/tagUtils'

interface TagState {
  selectedTags: ProductTag[]
  addTag: (tag: ProductTag) => void
  removeTag: (tag: ProductTag) => void
  clearTags: () => void
  isTagSelected: (tagLabel: string) => boolean
}

export const useProductTagStore = create<TagState>()((set, get) => ({
  selectedTags: [],

  addTag: (tag) => {
    set((state) => {
      if (state.selectedTags.some((t) => t.label === tag.label)) {
        // Tag already exists
        return state
      }
      return { selectedTags: [...state.selectedTags, tag] }
    })
  },

  removeTag: (tag) => {
    set((state) => ({
      selectedTags: state.selectedTags.filter(
        (t) => !(t.label === tag.label && t.type === tag.type)
      ),
    }))
  },

  clearTags: () => set({ selectedTags: [] }),

  isTagSelected: (tagLabel) => {
    return get().selectedTags.some((tag) => tag.label === tagLabel)
  },
}))

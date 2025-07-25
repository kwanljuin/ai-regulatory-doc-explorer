import { create } from "zustand";
import { persist } from "zustand/middleware";

interface BookmarkStore {
  bookmarks: string[];
  toggleBookmark: (documentId: string) => void;
  isBookmarked: (documentId: string) => boolean;
  getBookmarks: () => string[];
  _hasHydrated: boolean;
  setHasHydrated: (state: boolean) => void;
}

export const useBookmarkStore = create<BookmarkStore>()(
  persist(
    (set, get) => ({
      bookmarks: [],
      _hasHydrated: false,
      setHasHydrated: (state: boolean) => {
        set({
          _hasHydrated: state,
        });
      },
      toggleBookmark: (documentId: string) => {
        set((state) => {
          const isCurrentlyBookmarked = state.bookmarks.includes(documentId);
          if (isCurrentlyBookmarked) {
            return {
              bookmarks: state.bookmarks.filter((id) => id !== documentId),
            };
          } else {
            return {
              bookmarks: [...state.bookmarks, documentId],
            };
          }
        });
      },
      isBookmarked: (documentId: string) =>
        get().bookmarks.includes(documentId),
      getBookmarks: () => get().bookmarks,
    }),
    {
      name: "regulatory-bookmarks",
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);

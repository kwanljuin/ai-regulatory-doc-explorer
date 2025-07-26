import { SECDocument } from "@/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface BookmarkStore {
  bookmarks: SECDocument[];
  toggleBookmark: (data: SECDocument) => void;
  isBookmarked: (documentId: string) => boolean;
  getBookmarks: () => SECDocument[];
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
      toggleBookmark: (data: SECDocument) => {
        set((state) => {
          const isCurrentlyBookmarked = state.bookmarks.some(
            (doc) => doc.accessionNumber === data.accessionNumber
          );
          if (isCurrentlyBookmarked) {
            return {
              bookmarks: state.bookmarks.filter(
                (doc) => doc.accessionNumber !== data.accessionNumber
              ),
            };
          } else {
            return {
              bookmarks: [...state.bookmarks, data],
            };
          }
        });
      },
      isBookmarked: (documentId: string) =>
        get().bookmarks.some((doc) => doc.accessionNumber === documentId),
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

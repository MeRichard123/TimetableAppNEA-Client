import create from 'zustand';
import { persist } from 'zustand/middleware';

type tokenState = {
  token: string;
  setToken: (newToken: string) => void;
};

type authState = {
  isAuthenticated: boolean;
  setAuthed: (isAuthenticated: boolean) => void;
};

type mainStore = {
  yearGroup: string;
  setYear: (yearGroup: string) => void;
}

type permissionState = {
  isAdmin: boolean;
  setIsAdmin: (isAdmin: boolean) => void;
}

type TutorialState = {
  tutorialDone: boolean;
  setTutorialDone: (tutorialDone: boolean) => void;
}

export const BASE_URL = 'http://localhost:8000/api';
// export const BASE_URL = 'https://api-kstabler.herokuapp.com/api';

export const useAuthToken = create<tokenState>(
  persist(
    (set) => ({
      token: '',
      setToken: (newToken) => set({ token: newToken }),
    }),
    {
      name: 'token',
      getStorage: () => localStorage,
    },
  ),
);

export const useAuth = create<authState>(
  persist(
    (set) => ({
      isAuthenticated: false,
      setAuthed: (isAuthenticated) => set({ isAuthenticated }),
    }),
    {
      name: 'isAuthenticated',
      getStorage: () => localStorage,
    },
  ),
);

export const usePermissions = create<permissionState>(
  persist(
    (set) => ({
      isAdmin: false,
      setIsAdmin: (isAdmin) => set({ isAdmin }),
    }), {
      name: 'isAdmin',
      getStorage: () => localStorage,
    },
  ),
);

export const useTutorialDone = create<TutorialState>(
  persist(
    (set) => ({
      tutorialDone: false,
      setTutorialDone: (tutorialDone) => set({ tutorialDone }),
    }), {
      name: 'tutorialDone',
      getStorage: () => localStorage,
    },
  ),
);

export const useStore = create<mainStore>(
  persist(
    (set) => ({
      yearGroup: 'Yr7',
      setYear: (yearGroup) => set({ yearGroup }),
    }), {
      name: 'mainStore',
      getStorage: () => localStorage,
    },
  ),
);

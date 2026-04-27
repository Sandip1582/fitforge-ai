import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { userData as defaultUser } from './data';

export const useStore = create(
  persist(
    (set) => ({
      // Authentication state
      isAuthenticated: false,
      activeUser: null, // { email, name, password }
      
      // User fitness data (seeded from data.js initially)
      profile: {
        ...defaultUser
      },
      
      // Dynamic Stats
      stats: {
        workoutsCompleted: 4,
        caloriesBurned: 2340,
        currentWeight: 78,
        proteinToday: 142,
        streak: 12,
      },

      // Actions
      login: (email, name, password) => set({ 
        isAuthenticated: true, 
        activeUser: { email, name, password },
        profile: { ...defaultUser, name: name, email: email }
      }),
      
      logout: () => set({ 
        isAuthenticated: false, 
        activeUser: null 
      }),
      
      completeWorkout: (calories) => set((state) => ({
        stats: {
          ...state.stats,
          workoutsCompleted: state.stats.workoutsCompleted + 1,
          caloriesBurned: state.stats.caloriesBurned + calories,
          streak: state.stats.streak + 1,
        }
      })),

      updateWeight: (newWeight) => set((state) => ({
        stats: { ...state.stats, currentWeight: newWeight },
        profile: { ...state.profile, weight: newWeight }
      })),
      
      updateProtein: (amount) => set((state) => ({
        stats: { ...state.stats, proteinToday: state.stats.proteinToday + amount }
      })),
    }),
    {
      name: 'fitforge-storage', // unique name for localStorage key
    }
  )
);

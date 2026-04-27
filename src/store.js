import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { userData as defaultUser } from './data';

const defaultStats = {
  workoutsCompleted: 0,
  caloriesBurned: 0,
  currentWeight: defaultUser.weight,
  proteinToday: 0,
  streak: 0,
  weightHistory: [{ week: 'W1', weight: defaultUser.weight }],
  weeklyActivity: [
    { day: 'Mon', calories: 0 },
    { day: 'Tue', calories: 0 },
    { day: 'Wed', calories: 0 },
    { day: 'Thu', calories: 0 },
    { day: 'Fri', calories: 0 },
    { day: 'Sat', calories: 0 },
    { day: 'Sun', calories: 0 },
  ],
};

export const useStore = create(
  persist(
    (set, get) => ({
      // Authentication state
      isAuthenticated: false,
      activeUser: null, // { email, name, password }
      
      // User data storage
      allUsersData: {}, // { 'email@example.com': { profile: {...}, stats: {...} } }

      // Current active user's fitness data
      profile: {
        ...defaultUser
      },
      
      // Current active user's stats
      stats: {
        ...defaultStats
      },

      // Actions
      login: (email, name, password) => set((state) => {
        // Retrieve existing user data or create new
        const existingData = state.allUsersData[email];
        
        const newProfile = existingData ? { ...defaultUser, ...existingData.profile } : { ...defaultUser, name: name, email: email };
        const newStats = existingData ? { ...defaultStats, ...existingData.stats } : { ...defaultStats };

        return {
          isAuthenticated: true, 
          activeUser: { email, name, password },
          profile: newProfile,
          stats: newStats,
          allUsersData: {
            ...state.allUsersData,
            [email]: { profile: newProfile, stats: newStats }
          }
        };
      }),
      
      logout: () => set({ 
        isAuthenticated: false, 
        activeUser: null,
        profile: { ...defaultUser },
        stats: { ...defaultStats }
      }),
      
      completeWorkout: (calories) => set((state) => {
        if (!state.activeUser) return state;
        
        // Find current day
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const currentDay = days[new Date().getDay()];
        
        const newActivity = [...state.stats.weeklyActivity];
        const dayIndex = newActivity.findIndex(a => a.day === currentDay);
        if (dayIndex !== -1) {
          newActivity[dayIndex] = { ...newActivity[dayIndex], calories: newActivity[dayIndex].calories + calories };
        }

        const newStats = {
          ...state.stats,
          workoutsCompleted: state.stats.workoutsCompleted + 1,
          caloriesBurned: state.stats.caloriesBurned + calories,
          streak: state.stats.streak + 1,
          weeklyActivity: newActivity,
        };
        return {
          stats: newStats,
          allUsersData: {
            ...state.allUsersData,
            [state.activeUser.email]: { ...state.allUsersData[state.activeUser.email], stats: newStats }
          }
        };
      }),

      updateWeight: (newWeight) => set((state) => {
        if (!state.activeUser) return state;
        
        const currentWeek = `W${state.stats.weightHistory.length + 1}`;
        let newHistory = [...state.stats.weightHistory, { week: currentWeek, weight: newWeight }];
        if (newHistory.length > 12) newHistory = newHistory.slice(newHistory.length - 12);
        
        const newStats = { ...state.stats, currentWeight: newWeight, weightHistory: newHistory };
        const newProfile = { ...state.profile, weight: newWeight };
        return {
          stats: newStats,
          profile: newProfile,
          allUsersData: {
            ...state.allUsersData,
            [state.activeUser.email]: { profile: newProfile, stats: newStats }
          }
        };
      }),
      
      updateProtein: (amount) => set((state) => {
        if (!state.activeUser) return state;
        const newStats = { ...state.stats, proteinToday: state.stats.proteinToday + amount };
        return {
          stats: newStats,
          allUsersData: {
            ...state.allUsersData,
            [state.activeUser.email]: { ...state.allUsersData[state.activeUser.email], stats: newStats }
          }
        };
      }),

      upgradePlan: (planName) => set((state) => {
        if (!state.activeUser) return state;
        const newProfile = { ...state.profile, plan: planName };
        return {
          profile: newProfile,
          allUsersData: {
            ...state.allUsersData,
            [state.activeUser.email]: { ...state.allUsersData[state.activeUser.email], profile: newProfile }
          }
        };
      }),
    }),
    {
      name: 'fitforge-storage', // unique name for localStorage key
    }
  )
);

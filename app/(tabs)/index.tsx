import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useStore } from '@/store/useStore';
import { FontAwesome } from '@expo/vector-icons';

export default function TabOneScreen() {
  const { count, increment, decrement, reset } = useStore();

  return (
    <View className="flex-1 bg-white dark:bg-neutral-900 justify-center items-center p-6">
      <View className="items-center mb-10">
        <View className="bg-indigo-100 dark:bg-indigo-900/30 p-4 rounded-full mb-6">
          <FontAwesome name="rocket" size={42} color="#4f46e5" />
        </View>
        <Text className="text-3xl font-extrabold text-neutral-900 dark:text-white text-center mb-2 tracking-tight">
          Zustand State
        </Text>
        <Text className="text-base text-neutral-500 dark:text-neutral-400 text-center px-4">
          A globally accessible counter managed completely by a single hook.
        </Text>
      </View>

      <View className="w-full bg-neutral-50 dark:bg-neutral-800/80 rounded-3xl p-8 items-center shadow-sm border border-neutral-100 dark:border-neutral-700/50">
        <Text className="text-7xl font-black text-indigo-600 dark:text-indigo-400 tabular-nums my-4">
          {count}
        </Text>

        <View className="flex-row items-center mt-8 gap-4 w-full">
          <TouchableOpacity 
            onPress={decrement}
            className="flex-1 bg-white dark:bg-neutral-700 border border-neutral-200 dark:border-neutral-600 py-4 rounded-xl items-center shadow-sm active:bg-neutral-100 dark:active:bg-neutral-600"
          >
            <FontAwesome name="minus" size={18} color="#52525b" />
          </TouchableOpacity>
          
          <TouchableOpacity 
            onPress={reset}
            className="bg-red-50 dark:bg-red-500/10 border border-red-100 dark:border-red-500/20 py-4 px-6 rounded-xl items-center active:bg-red-100 dark:active:bg-red-500/20"
          >
            <FontAwesome name="refresh" size={18} color="#ef4444" />
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={increment}
            className="flex-1 bg-indigo-600 py-4 rounded-xl items-center shadow-sm active:bg-indigo-700 border border-transparent dark:border-indigo-500/50"
          >
            <FontAwesome name="plus" size={18} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

 

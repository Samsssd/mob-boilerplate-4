import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Text } from '@/components/Text';
import { StorageHelpers } from '@/utils/storage';
import { FontAwesome } from '@expo/vector-icons';

export default function TabFourScreen() {
  // Standard Storage
  const [genericInput, setGenericInput] = useState('');
  const [savedGeneric, setSavedGeneric] = useState<string | null>(null);

  // Secure Storage
  const [secureInput, setSecureInput] = useState('');
  const [savedSecure, setSavedSecure] = useState<string | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const gen = await StorageHelpers.getItem('demo_generic');
    const sec = await StorageHelpers.getSecureItem('demo_secure');
    setSavedGeneric(gen);
    setSavedSecure(sec);
  };

  const handleSaveGeneric = async () => {
    if (!genericInput.trim()) return;
    await StorageHelpers.setItem('demo_generic', genericInput);
    setGenericInput('');
    loadData();
    Alert.alert('Saved ✨', 'Standard unencrypted data saved to AsyncStorage!');
  };

  const handleClearGeneric = async () => {
    await StorageHelpers.removeItem('demo_generic');
    loadData();
  };

  const handleSaveSecure = async () => {
    if (!secureInput.trim()) return;
    await StorageHelpers.setSecureItem('demo_secure', secureInput);
    setSecureInput('');
    loadData();
    Alert.alert('Secured 🔐', 'Sensitive credential encrypted into SecureStore!');
  };

  const handleClearSecure = async () => {
    await StorageHelpers.removeSecureItem('demo_secure');
    loadData();
  };

  return (
    <ScrollView className="flex-1 bg-neutral-50 dark:bg-neutral-900 px-6 pt-6">
      <View className="mb-8 mt-2">
         <Text className="text-3xl font-extrabold text-neutral-900 dark:text-white tracking-tight">Storage</Text>
         <Text className="text-base text-neutral-500 mt-2">
           Demonstrating both generic device storage and heavily encrypted keychain storage.
         </Text>
      </View>

      {/* AsyncStorage Section */}
      <View className="bg-white dark:bg-neutral-800 p-5 rounded-3xl shadow-sm border border-neutral-100 dark:border-neutral-700/50 mb-6">
        <View className="flex-row items-center mb-4">
          <View className="bg-blue-100 dark:bg-blue-900/30 p-2.5 rounded-xl mr-3">
             <FontAwesome name="database" size={18} color="#3b82f6" />
          </View>
          <View>
            <Text className="text-lg font-bold text-neutral-900 dark:text-white">AsyncStorage</Text>
            <Text className="text-sm text-neutral-500">Unencrypted general purpose</Text>
          </View>
        </View>

        <View className="bg-neutral-50 dark:bg-neutral-900/50 rounded-2xl p-4 mb-4 border border-zinc-100 dark:border-neutral-700/50">
           <Text className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-1">Currently Saved</Text>
           <Text className="text-base text-neutral-800 dark:text-neutral-200 font-medium h-6">
             {savedGeneric ? `"${savedGeneric}"` : <Text className="text-neutral-400 italic">Nothing saved</Text>}
           </Text>
        </View>

        <TextInput
          className="bg-neutral-50 dark:bg-neutral-900 h-14 rounded-xl px-4 text-neutral-900 dark:text-white border border-neutral-200 dark:border-neutral-700 mb-4"
          placeholder="Enter a username..."
          placeholderTextColor="#9ca3af"
          value={genericInput}
          onChangeText={setGenericInput}
        />

        <View className="flex-row gap-3">
           <TouchableOpacity 
             onPress={handleSaveGeneric}
             className="flex-1 bg-blue-600 h-12 rounded-xl justify-center items-center active:bg-blue-700"
           >
             <Text className="text-white font-bold">Save Data</Text>
           </TouchableOpacity>

           <TouchableOpacity 
             onPress={handleClearGeneric}
             className="bg-neutral-100 dark:bg-neutral-700 h-12 px-6 rounded-xl justify-center items-center active:bg-neutral-200 dark:active:bg-neutral-600"
           >
             <Text className="text-neutral-600 dark:text-neutral-300 font-bold">Clear</Text>
           </TouchableOpacity>
        </View>
      </View>

      {/* SecureStore Section */}
      <View className="bg-white dark:bg-neutral-800 p-5 rounded-3xl shadow-sm border border-neutral-100 dark:border-neutral-700/50 mb-12">
        <View className="flex-row items-center mb-4">
          <View className="bg-emerald-100 dark:bg-emerald-900/30 p-2.5 rounded-xl mr-3">
             <FontAwesome name="lock" size={20} color="#10b981" />
          </View>
          <View>
            <Text className="text-lg font-bold text-neutral-900 dark:text-white">SecureStore</Text>
            <Text className="text-sm text-emerald-600 dark:text-emerald-500">Encrypted keychain storage</Text>
          </View>
        </View>

        <View className="bg-neutral-50 dark:bg-neutral-900/50 rounded-2xl p-4 mb-4 border border-zinc-100 dark:border-neutral-700/50">
           <Text className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-1">Stored Secret</Text>
           <Text className="text-base text-neutral-800 dark:text-neutral-200 font-medium h-6">
             {savedSecure ? `•••••••••••••` : <Text className="text-neutral-400 italic">No secret stored</Text>}
           </Text>
        </View>

        <TextInput
          className="bg-neutral-50 dark:bg-neutral-900 h-14 rounded-xl px-4 text-neutral-900 dark:text-white border border-neutral-200 dark:border-neutral-700 mb-4"
          placeholder="Enter a mock JWT Key..."
          placeholderTextColor="#9ca3af"
          secureTextEntry
          value={secureInput}
          onChangeText={setSecureInput}
        />

        <View className="flex-row gap-3">
           <TouchableOpacity 
             onPress={handleSaveSecure}
             className="flex-1 bg-emerald-600 h-12 rounded-xl justify-center items-center active:bg-emerald-700"
           >
             <Text className="text-white font-bold">Secure It</Text>
           </TouchableOpacity>

           <TouchableOpacity 
             onPress={handleClearSecure}
             className="bg-neutral-100 dark:bg-neutral-700 h-12 px-6 rounded-xl justify-center items-center active:bg-neutral-200 dark:active:bg-neutral-600"
           >
             <Text className="text-neutral-600 dark:text-neutral-300 font-bold">Wipe</Text>
           </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

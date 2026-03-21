import React from 'react';
import { View, FlatList, ActivityIndicator, Image, TouchableOpacity } from 'react-native';
import { Text } from '@/components/Text';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { FontAwesome } from '@expo/vector-icons';

type User = {
  login: { uuid: string };
  name: { first: string; last: string };
  email: string;
  picture: { large: string; medium: string };
  location: { city: string; country: string };
};

const fetchUsers = async (): Promise<User[]> => {
  const { data } = await axios.get('https://randomuser.me/api/?results=15&inc=name,email,picture,login,location');
  return data.results;
};

export default function TabThreeScreen() {
  const { data, isLoading, error, refetch, isRefetching } = useQuery({
    queryKey: ['randomUsers'],
    queryFn: fetchUsers,
  });

  const renderItem = ({ item }: { item: User }) => (
    <View className="flex-row items-center bg-white dark:bg-neutral-800 p-4 mb-3 rounded-2xl shadow-sm border border-neutral-100 dark:border-neutral-700/50 mx-4 active:bg-neutral-50 dark:active:bg-neutral-700/60">
      <Image 
        source={{ uri: item.picture.medium }} 
        className="w-14 h-14 rounded-full bg-neutral-200"
      />
      <View className="flex-1 ml-4 justify-center">
        <Text className="text-lg font-bold text-neutral-900 dark:text-white" numberOfLines={1}>
          {item.name.first} {item.name.last}
        </Text>
        <Text className="text-sm text-neutral-500 dark:text-neutral-400 mt-0.5" numberOfLines={1}>
          {item.email}
        </Text>
        <View className="flex-row items-center mt-1.5 opacity-80">
          <FontAwesome name="map-marker" size={12} color="#9ca3af" />
          <Text className="text-xs text-neutral-400 dark:text-neutral-500 ml-1.5" numberOfLines={1}>
            {item.location.city}, {item.location.country}
          </Text>
        </View>
      </View>
      <TouchableOpacity className="bg-blue-50 dark:bg-blue-900/40 p-3 rounded-full ml-2 active:bg-blue-100">
        <FontAwesome name="heart-o" size={18} color="#3b82f6" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View className="flex-1 bg-neutral-50 dark:bg-neutral-900">
      <View className="px-6 pt-6 pb-2">
        <Text className="text-3xl font-extrabold text-neutral-900 dark:text-white tracking-tight">Discover</Text>
        <Text className="text-base text-neutral-500 mb-2 mt-1">Find inspiring creators worldwide</Text>
      </View>

      {isLoading ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#3b82f6" />
          <Text className="text-neutral-500 mt-4 font-medium">Fetching users...</Text>
        </View>
      ) : error ? (
        <View className="flex-1 items-center justify-center px-6">
          <FontAwesome name="exclamation-circle" size={48} color="#ef4444" />
          <Text className="text-lg font-bold text-neutral-800 dark:text-neutral-200 mt-4 text-center">Failed to load data</Text>
          <Text className="text-neutral-500 text-center mt-2 mb-6 text-base">{error.message}</Text>
          <TouchableOpacity 
            className="bg-blue-600 active:bg-blue-700 px-6 py-3 rounded-xl flex-row items-center shadow-sm"
            onPress={() => refetch()}
          >
            <FontAwesome name="refresh" size={16} color="white" />
            <Text className="text-white font-bold ml-2">Try Again</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item) => item.login.uuid}
          renderItem={renderItem}
          contentContainerClassName="pt-2 pb-10"
          showsVerticalScrollIndicator={false}
          refreshing={isRefetching}
          onRefresh={refetch}
        />
      )}
    </View>
  );
}

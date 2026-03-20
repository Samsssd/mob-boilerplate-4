import React from 'react';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, Alert } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const formSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.string().email("Please enter a valid email"),
  bio: z.string().max(160, "Bio must be under 160 characters").optional(),
});

type FormData = z.infer<typeof formSchema>;

export default function TabTwoScreen() {
  const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: { username: '', email: '', bio: '' }
  });

  const onSubmit = (data: FormData) => {
    console.log("Form submitted:", data);
    Alert.alert("Success!", "Profile updated successfully!");
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-white dark:bg-neutral-900"
    >
      <ScrollView contentContainerClassName="p-6 pb-12">
        <Text className="text-3xl font-extrabold text-neutral-900 dark:text-white mb-2">Edit Profile</Text>
        <Text className="text-base text-neutral-500 dark:text-neutral-400 mb-8 mt-1">Update your personal details here.</Text>
        
        <View className="flex flex-col gap-6">
          {/* Username */}
          <View>
            <Text className="text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-2">Username</Text>
            <Controller
              control={control}
              name="username"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  className={`w-full bg-neutral-50 dark:bg-neutral-800 border ${errors.username ? 'border-red-500' : 'border-neutral-200 dark:border-neutral-700'} rounded-xl px-4 py-3.5 text-neutral-900 dark:text-white text-base`}
                  placeholder="e.g. johndoe"
                  placeholderTextColor="#A1A1AA"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />
            {errors.username && <Text className="text-red-500 text-xs mt-1.5 font-medium">{errors.username.message}</Text>}
          </View>

          {/* Email */}
          <View>
            <Text className="text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-2">Email Address</Text>
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  className={`w-full bg-neutral-50 dark:bg-neutral-800 border ${errors.email ? 'border-red-500' : 'border-neutral-200 dark:border-neutral-700'} rounded-xl px-4 py-3.5 text-neutral-900 dark:text-white text-base`}
                  placeholder="john@example.com"
                  placeholderTextColor="#A1A1AA"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />
            {errors.email && <Text className="text-red-500 text-xs mt-1.5 font-medium">{errors.email.message}</Text>}
          </View>

          {/* Bio */}
          <View className="mb-4">
            <Text className="text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-2">Bio</Text>
            <Controller
              control={control}
              name="bio"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  className={`w-full bg-neutral-50 dark:bg-neutral-800 border ${errors.bio ? 'border-red-500' : 'border-neutral-200 dark:border-neutral-700'} rounded-xl px-4 py-3.5 text-neutral-900 dark:text-white text-base`}
                  placeholder="Tell us about yourself..."
                  placeholderTextColor="#A1A1AA"
                  multiline
                  numberOfLines={4}
                  style={{ minHeight: 120, textAlignVertical: 'top' }}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />
            {errors.bio && <Text className="text-red-500 text-xs mt-1.5 font-medium">{errors.bio.message}</Text>}
          </View>

          {/* Submit Button */}
          <TouchableOpacity 
            className="w-full bg-blue-600 active:bg-blue-700 rounded-xl py-4 items-center shadow-sm mt-2"
            onPress={handleSubmit(onSubmit)}
          >
            <Text className="text-white font-bold text-lg">Save Profile</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

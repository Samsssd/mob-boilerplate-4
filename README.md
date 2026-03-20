<div align="center">
  <h1 align="center">Excelsior Digital — React Native Boilerplate</h1>
  <p align="center">
    A modern, production-ready mobile application boilerplate built with Expo, TypeScript, and NativeWind. Designed and engineered by <b>Excelsior Digital.</b>
  </p>
</div>

---

## 🚀 Overview

This repository contains our standard mobile app architecture. It's built on a highly optimized modern stack designed for raw speed, type safety, and delightful user experiences:

- **Framework:** [Expo](https://expo.dev/) (Managed Workflow SDK 54)
- **Language:** [TypeScript](https://www.typescriptlang.org/) (Strictly-typed out of the box)
- **Styling:** [NativeWind v4](https://www.nativewind.dev/) (Tailwind CSS for React Native)
- **Navigation:** [Expo Router](https://docs.expo.dev/router/introduction/) (File-based navigation)
- **Forms & Validation:** [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)

## 🎨 Styling with NativeWind (Tailwind CSS)

Say goodbye to messy `StyleSheet.create` objects. We use **NativeWind v4**, which allows us to natively pass Tailwind CSS syntax to our components directly via the `className` prop. 

Our UI scales seamlessly between light and dark modes simply by utilizing Tailwind's default `dark:` modifier (e.g., `dark:bg-neutral-900 bg-white`). It automatically reacts to the OS system preferences or user toggles instantly.

## 🧭 File-Based Navigation (Expo Router)

We use **Expo Router** which brings the revolutionary concepts of file-system-based routing (familiar to Next.js developers) directly into React Native.

**How the navigation is structured in this app:**
- Every file inside the `app/` directory automatically acts as an accessible route URI!
- **`app/_layout.tsx`**: This is the root layout wrapper. It mounts our fonts, processes global CSS (`global.css`), and serves as the highest `<Stack>` navigation context.
- **`app/(tabs)/`**: The parentheses indicate a "Route Group". Route Groups don't impact the navigation URL conceptually, but allow us to wrap related screens completely inside of a shared Bottom Tab Bar layout (defined in `app/(tabs)/_layout.tsx`).
- **Adding new screens:** To create a new screen, just add a `.tsx` file anywhere within `app/`, and you can instantly navigate to it using the `<Link href="/filename">` component!

## ✅ State & Form Validation

Handling form state accurately and efficiently without bloating components is crucial. We avoid giant trees of controlled `useState` variables in favor of **React Hook Form (RHF)**, hooked deeply into **Zod** schema validation.

1. **Declare the Schema:** A concise `Zod` object dictates the strict requirements of your form (e.g., max lengths, valid email regexes).
2. **Setup the Resolver:** The `zodResolver` passes this strictly-typed schema seamlessly to the `useForm` hook.
3. **Controller:** We wrap interactive components like `TextInput`s perfectly with RHF's `<Controller>`.
4. **Result:** Highly performant, completely type-safe forms with reactive UI and error messages (dynamically triggering `border-red-500` classes when a field fails validation with zero rendering lag).

*Check out `app/(tabs)/two.tsx` for a live, production-grade example of an Edit Profile form mimicking these best practices.*

## 💻 Getting Started

1. **Install Dependencies:**
   ```bash
   yarn install
   ```

2. **Start the Development Server:**
   ```bash
   npx expo start -c
   ```
   *Note: Using the `-c` flag ensures the Metro bundler cache is wiped and freshly processes NativeWind styles if any config files changed.*

3. **Run on a Device:**
   Scan the generated QR code using the **Expo Go** app on your real device, or press `i` / `a` in the terminal to launch on an iOS Simulator or Android Emulator.

---
*Architected with ❤️ by Excelsior Digital*

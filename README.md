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

## ⚡ Data Fetching (React Query + Axios)

We leverage **TanStack Query (React Query)** paired with **Axios** to handle all asynchronous server-state. Why React Query? Because it provides enterprise-grade caching, robust background updates, stale-while-revalidate logic, and highly performant loading/error states without the need for manual `useEffect` boilerplate.

1. **Global Provider:** The `<QueryClientProvider>` wraps our app at the highest possible level in `app/_layout.tsx`.
2. **Fetching Logic:** Axios natively handles REST abstraction, header management, and automatic JSON formatting.
3. **Execution:** We fetch data cleanly and declaratively using hooks like `useQuery` and mutate state via `useMutation`.
4. **UX Integration:** React Query gives us instantaneous `isLoading`, `error`, and `isRefetching` booleans. We tie these directly into NativeWind layouts to gracefully render `<ActivityIndicator>` spinners, error fallbacks, and standard Pull-to-Refresh (`<FlatList refreshing={isRefetching}>`) capabilities.

*Check out `app/(tabs)/three.tsx` for a live, production-grade example of a discover feed pulling deeply-nested JSON from a public API, strictly-typed and smoothly-rendered.*

## 🐻 Global State Management (Zustand)

Instead of passing props down dozens of components (Prop Drilling) or dealing with the heavy boilerplate of Redux, we use **Zustand**. It is a small, unopinionated, and incredibly fast state-management tool that relies securely on hooks.

1. **Single Source of Truth:** `store/useStore.ts` contains the global logic and reactive state.
2. **Access Anywhere:** You can fetch state slices (`const count = useStore((state) => state.count)`) anywhere in the app hierarchy without mapping providers at the root.
3. **Action Triggers:** `useStore` cleanly provides methods like `increment`, `decrement`, and `reset` mutating the state globally while keeping components decoupled.

*Check out `app/(tabs)/index.tsx` (Tab One) for a beautiful, fully interactive NativeWind mock showing Zustand actively computing global numeric state.*

## 💾 Secure & Local Storage

This architecture supports two distinct on-device storage strategies, unified securely under the cleanly typed `utils/storage.ts` helper.

1. **Generic Storage (AsyncStorage):** Used for fast, unencrypted storage like persisting user preferences, caching API data, or remembering standard UI states. 
2. **Encrypted Storage (SecureStore):** Used explicitly for highly sensitive credentials like JWT authentication tokens, active API keys, or passwords. Data is heavily encrypted natively by the host OS (Keychain on iOS, Keystore on Android).

*Check out `app/(tabs)/four.tsx` (Tab Four) for a beautiful, live mock demonstrating and querying from both internal storage mechanisms side-by-side.*

## 🔐 Environment Variables

All runtime configuration is centralised in **`config/env.ts`**, which uses **Zod** to parse and validate every variable at startup. If a required variable is missing or malformed the app will throw immediately (fail-fast), preventing silent misconfiguration bugs.

### How it works

| File | Committed? | Purpose |
|---|---|---|
| `.env.example` | ✅ Yes | Template — lists every variable with placeholder values |
| `.env.local` | ❌ No | Your personal overrides (highest priority) |
| `.env.development` | ❌ No | Values used during `expo start` (development channel) |
| `.env.preview` | ❌ No | Values for preview / staging builds |
| `.env.production` | ❌ No | Values for production builds |

Expo automatically loads the right file based on the active channel/environment. The `EXPO_PUBLIC_` prefix is **required** — only variables with this prefix are inlined into the JS bundle (anything else stays server-side).

### Setup

```bash
# 1. Copy the example file and fill in your real values
cp .env.example .env.local
```

Edit `.env.local`:
```
EXPO_PUBLIC_API_URL=https://api.yourapp.com
EXPO_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
EXPO_PUBLIC_ENV=development
```

### Using env variables in code

Never read `process.env` directly in feature code — always import from the central config:

```ts
import { env } from '@/config/env';

const apiUrl = env.EXPO_PUBLIC_API_URL;
console.log(`Running in ${env.EXPO_PUBLIC_ENV} mode`);
```

The exported `env` object is fully typed via `z.infer<typeof envSchema>`, so you get autocomplete and type safety everywhere.

### Adding a new variable

1. Add it to `.env.example` with a placeholder value.
2. Add it to the `envSchema` in `config/env.ts`.
3. Add it to the `parsed` object in `config/env.ts`.
4. Add real values to your local `.env.*` files and to your CI/CD secrets.

---

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
*Architected with 🤍 by Excelsior Digital*

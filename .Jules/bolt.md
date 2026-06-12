## 2026-06-12 - Optimizing transitions and non-blocking feedback
**Learning:** In simple interactive web apps, user-perceived performance is often more important than actual network latency. Moving UI updates before network requests (optimistic updates) and making transitions start immediately can make the app feel significantly faster. Using 'keepalive: true' ensures these background requests succeed.
**Action:** Always prioritize instant UI feedback. For critical transitions, start the next state's rendering as soon as possible, even while the previous state is fading out.

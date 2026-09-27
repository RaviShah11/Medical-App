# MedStudy

A medical study app for your phone, built with Expo and React Native. It covers the MCAT, USMLE Step 1, Step 2 CK, Step 3, COMLEX, NCLEX, and PANCE.

## What's inside

- **Library.** 23 articles across 13 systems. Each has a summary, high yield box, tables, and links. Long press any line to highlight it. Bookmark articles to find them later.
- **Qbank.** Board style questions with 5 choices and an explanation for every wrong answer. Tutor mode or timed mode (90 seconds per question). Filter by system, discipline, difficulty, exam, and unused, incorrect, or flagged questions. Long press a choice to cross it out.
- **Clinical cases.** Work up a patient step by step. Take a history, examine, order tests, diagnose, and treat. You get a score for accuracy, thoroughness, and efficiency.
- **Imaging atlas and image challenge.** ECGs, chest films, head CTs, blood smears, skin lesions, and ultrasound. Tap "Show findings" to see numbered hotspots with explanations.
- **Flashcards.** Spaced repetition (SM 2 style). Cards come from every article, and any question you miss becomes a card automatically.
- **Lab values, drug reference, and 16 clinical calculators.**
- **Differential builder.** Pick symptoms and get a ranked list of diagnoses, with can't miss diagnoses flagged.
- **Study planner and dashboard.** Countdown to your exam, a daily task list, a weekly system schedule, streaks, and accuracy by system.
- **Global search, dark mode, and progress saved on your device.**

## Run it on your phone

1. Install **Expo Go** from the App Store or Google Play.
2. On your computer, install Node.js 20 or newer.
3. In this folder, run:

   ```bash
   npm install
   npx expo start
   ```

4. Scan the QR code with your phone camera (iPhone) or the Expo Go app (Android).

You can also run `npx expo start --web` to open it in a browser.

## Put it in the App Store

Expo builds the app in the cloud, so you don't need a Mac for Android.

```bash
npm install -g eas-cli
eas login
eas build:configure
eas build --platform ios       # needs an Apple Developer account ($99 per year)
eas build --platform android   # needs a Google Play developer account ($25 once)
eas submit --platform ios
```

The bundle identifier is set to `com.ravishah.medstudy` in `app.json`. Change it before you publish if you want a different one.

## Project layout

```
src/app/          Screens (Expo Router, one file per route)
src/components/   Shared UI and the SVG imaging renderers
src/data/         Articles, questions, cases, imaging, labs, drugs, calculators
src/lib/          Saved state, spaced repetition, stats, and theme
```

To add content, add entries to the files in `src/data/`. The app picks them up automatically.

## Checks

```bash
npm run typecheck
```

## Disclaimer

MedStudy is a study aid for exam prep. It is not medical advice. The images are schematic illustrations, not real patient images.

# RescueBridge Mobile App

RescueBridge is a mobile-first emergency shelter and resource coordination prototype created for Team **T4M26** in **COMP231**. It demonstrates how affected individuals, organizations, volunteers, coordinators, and community reporters can share emergency information through one simple application.

## Current Prototype

This project includes:

- Role selection for all five RescueBridge user roles
- Five role dashboards
- All 11 Iteration 1 Must-Have user-story screens
- Working local forms, validation, status changes, task acceptance, task progress, volunteer approval, and request coordination
- Clean Iteration 2 demonstration screens with mock information
- Expo Router navigation
- React Context local state
- Realistic TypeScript mock data
- A Supabase-ready folder and data structure, without any backend keys or connection

All data is stored in memory. It resets when the Expo app reloads.

## Tech Stack

- Expo React Native
- TypeScript
- Expo Router
- React Native `StyleSheet`
- React Context
- Local mock data
- Supabase planned later

No Firebase connection, Supabase keys, paid services, or `node_modules` are included.

## Install and Run

Requirements:

- Node.js
- npm
- Expo Go on an Android or iOS phone

From the project folder, run:

```bash
npm install
npx expo start
```

Scan the QR code with Expo Go. The project uses an Expo SDK version intended for Expo Go testing.

Optional commands:

```bash
npm run typecheck
npm run android
npm run ios
npm run web
```

## Recommended Demo Flow

1. Open **Affected Individual** and submit a help request.
2. Open **My Requests** and confirm it appears with Pending status.
3. Open **Admin / Coordinator → Manage Help Requests** and update or resolve it.
4. Open **Volunteer → Verification Status** and see that tasks are locked.
5. Open **Admin / Coordinator → Volunteer Approval** and approve **Alex Morgan**.
6. Return to **Volunteer → Available Tasks**, accept a task, and open **My Tasks**.
7. Move the task from Accepted to Active, then Completed.
8. Open **Organization Staff**, update resources, review the changes, and confirm them.

## Folder Structure

```text
rescuebridge-mobile-app/
  app/
    _layout.tsx
    index.tsx
    affected/
    organization/
    volunteer/
    admin/
    reporter/
  components/
  constants/
  context/
  data/
  types/
  app.json
  package.json
  tsconfig.json
  README.md
```

## Main Local State

`context/AppContext.tsx` manages:

- Help requests
- Resource availability and staged resource changes
- Organization status
- Volunteer verification
- Volunteer tasks
- Alerts and broadcasts
- Incident reports
- Community report draft

## Mock Data

`data/mockData.ts` includes realistic examples for:

- Help requests
- Shelter resources
- Organization status
- Volunteers
- Verification status
- Volunteer tasks
- Emergency alerts
- Incident reports
- Nearby resources

## Backend Later: Supabase

A later development stage can replace context state with:

- Supabase PostgreSQL for records
- Supabase Auth for role-based accounts
- Supabase Storage for photos and verification documents
- Supabase Realtime for request, task, resource, incident, and alert updates

Do not add Supabase keys directly to source code. Use environment variables when the backend phase begins.

## Academic Scope Notice

RescueBridge is a student prototype. It does not connect to 911, emergency dispatch, municipal systems, real shelters, or real volunteer screening services. It should not be used for an actual emergency.

# RescueBridge Mobile App

RescueBridge is a mobile-first emergency shelter and resource coordination prototype created for Team **T4M26** in **COMP231**. The application is designed to support emergency coordination by allowing affected individuals, organization staff, volunteers, and admin/coordinators to manage help requests, resource availability, volunteer verification, and task progress through one simple mobile app.

This version represents the **Iteration Planning 1 implementation**. It includes the required Must-Have user-story screens and connects the main workflows to a Supabase backend database.

## Current Prototype

This project includes:

- Role selection for four RescueBridge user roles
- Separate dashboards for each role
- All 11 Iteration 1 Must-Have user-story screens
- Expo Router navigation
- TypeScript-based React Native structure
- Reusable UI components
- Form validation and confirmation messages
- Help request submission and tracking
- Organization resource availability updates
- Organization status updates
- Volunteer verification submission
- Volunteer verification review and approval
- Volunteer task viewing, accepting, and progress updates
- Admin help request management
- Supabase backend connection
- Real database insert, read, and update operations

The main Iteration 1 workflows are connected to Supabase instead of only using local mock data.

## User Roles

The current Iteration 1 prototype includes these roles:

- Affected Individual
- Organization Staff
- Volunteer
- Admin / Coordinator

Each role has its own dashboard and related screens.

## Iteration 1 Features

### Affected Individual

Affected individuals can submit help requests and view the progress of submitted requests.

Related screens:

```text
app/affected/index.tsx
app/affected/submit-help.tsx
app/affected/my-requests.tsx
```

### Organization Staff

Organization staff can update resource availability, review changes before saving, and update the current organization status.

Related screens:

```text
app/organization/index.tsx
app/organization/update-resources.tsx
app/organization/review-save-resources.tsx
app/organization/update-status.tsx
```

### Volunteer

Volunteers can submit verification information, check verification status, view available tasks after approval, accept tasks, and update task progress.

Related screens:

```text
app/volunteer/index.tsx
app/volunteer/verification-form.tsx
app/volunteer/verification-status.tsx
app/volunteer/available-tasks.tsx
app/volunteer/my-tasks.tsx
```

### Admin / Coordinator

Admin/coordinators can manage help requests, update request status, assign volunteers, and approve or reject volunteer applications.

Related screens:

```text
app/admin/index.tsx
app/admin/manage-help-requests.tsx
app/admin/volunteer-approval.tsx
```

## Backend Status

This project uses **Supabase** as the backend service.

Supabase is used for:

- Help request records
- Resource availability records
- Organization status records
- Volunteer verification records
- Volunteer approval status
- Volunteer task records

There is no separate custom backend server repository. Supabase works as the backend and database service for this prototype.

## Supabase Tables

The main Supabase tables used in this prototype are:

```text
help_requests
resources
organization_status
volunteers
tasks
```

## Tech Stack

- Expo React Native
- TypeScript
- Expo Router
- React Native `StyleSheet`
- React Context
- Supabase
- Supabase JavaScript client
- AsyncStorage
- Expo Go
- GitHub

## Environment Variables

Each developer must create a local `.env` file in the project root.

The `.env` file must be in the same folder as `package.json`.

Example:

```env
EXPO_PUBLIC_SUPABASE_URL=your_supabase_project_url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_publishable_anon_key
```

The `.env` file is not included in GitHub and should not be committed.

Do not commit or share:

```text
.env
service_role key
database password
Supabase account password
```

Only the Supabase project URL and anon/publishable key are required for local testing.

## Install and Run

Requirements:

- Node.js
- npm
- Git
- VS Code
- Expo Go on Android or iOS

From the project folder, run:

```bash
npm install
npx expo start -c
```

Scan the QR code with Expo Go to open the app on a mobile device.

## TypeScript Check

Before pushing changes, run:

```bash
npx tsc --noEmit
```

If the command finishes without errors, the TypeScript check passed.

## Recommended Demo Flow

1. Open **Affected Individual**.
2. Select **Request Help**.
3. Submit a help request with help type, location, description, and priority.
4. Open **My Requests** and confirm the submitted request appears.
5. Open **Admin / Coordinator**.
6. Open **Manage Help Requests** and update the request status or assign a volunteer.
7. Open **Volunteer**.
8. Submit verification information from **Verification Form**.
9. Open **Admin / Coordinator → Volunteer Approval** and approve the volunteer.
10. Return to **Volunteer → Verification Status** and confirm the volunteer is verified.
11. Open **Volunteer → Available Tasks** and accept a task.
12. Open **Volunteer → My Tasks** and update the task from Accepted to Active, then Completed.
13. Open **Organization Staff**.
14. Update resource availability.
15. Review and save the resource update.
16. Update the organization status.

## Folder Structure

```text
rescuebridge-mobile-app/
  app/
    _layout.tsx
    index.tsx
    affected/
      index.tsx
      submit-help.tsx
      my-requests.tsx
    organization/
      index.tsx
      update-resources.tsx
      review-save-resources.tsx
      update-status.tsx
    volunteer/
      index.tsx
      verification-form.tsx
      verification-status.tsx
      available-tasks.tsx
      my-tasks.tsx
    admin/
      index.tsx
      manage-help-requests.tsx
      volunteer-approval.tsx
  components/
  constants/
  context/
  data/
  lib/
    supabase.ts
  types/
  app.json
  package.json
  package-lock.json
  tsconfig.json
  README.md
```

## Main App Structure

The app uses Expo Router for navigation and separates the project by role-based folders.

Main route files:

```text
app/_layout.tsx
app/index.tsx
```

Role dashboard folders:

```text
app/affected/
app/organization/
app/volunteer/
app/admin/
```

Shared project folders:

```text
components/
constants/
context/
data/
lib/
types/
```

## Supabase Connection

The Supabase client is configured in:

```text
lib/supabase.ts
```

This file reads Supabase credentials from environment variables and creates the Supabase client used by the app.

The app uses Supabase for database operations such as:

- inserting help requests
- reading submitted requests
- saving resource updates
- saving organization status
- submitting volunteer verification data
- approving or rejecting volunteers
- loading available tasks
- accepting and updating volunteer tasks

## GitHub Collaboration Rules

Team members should not push directly to `main`.

Recommended workflow:

```text
main = official working version
each teammate = own branch
pull request = review before merge
```

Before starting work:

```bash
git checkout main
git pull origin main
```

Create a personal branch:

```bash
git checkout -b your-name-your-task
```

After completing assigned work:

```bash
git status
git add assigned-files-only
git commit -m "Describe assigned work"
git push -u origin your-branch-name
```

Then create a Pull Request into `main`.

## Important Git Rules

Do not commit:

```text
.env
node_modules/
.expo/
dist/
web-build/
```

Do not push secrets such as:

```text
service_role key
database password
Supabase account password
```

Only commit source code, configuration files, documentation, and approved project files.

## Current Limitations

This is a student prototype for academic purposes.

The current version does not include:

- real emergency dispatch integration
- 911 or municipal emergency system integration
- real shelter system integration
- real identity verification
- real police-check verification
- production-level authentication
- production-level role-based access control
- real push notifications
- real map-based geolocation
- production Android or iOS store release

The Supabase policies used for this prototype are intended for classroom testing only and should be replaced with stricter security rules before any real-world deployment.

## Future Improvements

Future development can include:

- Supabase Auth for login and role-based accounts
- Secure role-based permissions
- Supabase Storage for verification documents and images
- Realtime updates for requests, resources, and tasks
- Push notifications
- Map-based resource search
- Incident reporting flow
- Emergency broadcast notices
- Production Android build using Expo EAS Build
- iOS build support
- Admin web dashboard

## Academic Scope Notice

RescueBridge is a student prototype created for academic demonstration and course project purposes. It does not connect to 911, emergency dispatch, municipal emergency systems, real shelters, or real volunteer screening services.

It should not be used for an actual emergency.
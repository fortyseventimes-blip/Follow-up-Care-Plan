# PetDoc Follow-up Care Plan — Development Notes

## Stack
- Vite + React + TypeScript (frontend-only, mock data, no backend)
- Responsive web app, role switcher toggle between vet and pet owner views

## Running
- `docker compose -f docker-compose.base44.yml up -d --build`
- App served on port 3000 by Vite dev server
- Source is bind-mounted; edits hot-reload automatically

## Architecture
- `src/context/AppContext.tsx` — global state (role, consultations, plans)
- `src/mockData.ts` — initial mock consultations and pets
- `src/types.ts` — type definitions and constants
- `src/utils/dateUtils.ts` — checkpoint date calculation (Sunday→Monday shift)
- `src/views/VetView.tsx` — vet dashboard (consultation list + closure panel)
- `src/views/OwnerView.tsx` — pet owner dashboard (care plans + rebooking)
- `src/vet/` — vet-specific components (ConsultationList, ClosurePanel)
- `src/owner/` — owner-specific components (CarePlan, CheckpointCard, RebookingScreen, NotificationBanner)

## Key Logic
- Only Chroniker and Jungtier segments are eligible for follow-up plans (Akut/Unklar excluded)
- Follow-up toggle defaults to No; term/reason/monitoring enabled only if Yes
- Checkpoint date = consultation date + term; Sundays auto-shift to Monday
- One simulated push notification per plan at 09:00 on checkpoint date (no escalation)
- Rebooking screen pre-fills full consultation context (animal ID, findings, meds, photos, owner status, doctor note)
- Original doctor proposed as primary booking option with full platform flexibility

## Demo Flow
1. Start as vet → see open consultations → click an eligible one (Chroniker/Jungtier)
2. Toggle follow-up to Yes → select term, reason → monitoring points pre-filled → close
3. Switch to pet owner → see the delivered care plan with checkpoint card
4. Tap "Keep this date" or "Not needed" (1 tap, no confirmation)
5. Tap "Simulate" to see the push notification banner
6. Tap the plan or notification → opens pre-filled rebooking screen

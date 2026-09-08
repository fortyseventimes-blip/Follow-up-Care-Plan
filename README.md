# Follow-up Care Plan

Product specification and prototype blueprint for the PetDoc Patient Experience mission, targeting retention in chronic and young animal segments.

## Overview

This repository contains the structured product specifications, data-backed analytical rationale, and prototype implementation blueprints for the **Follow-up Care Plan** feature. The design is derived from empirical analysis of `petdoc_case_data.csv` (1,413 consultations, 1,200 unique owners).

## Core Problem

Data analysis reveals that the primary operational driver of owner drop-off is context loss—specifically, when veterinarians re-ask known information during a consultation, decreasing return probability by 46% ($OR = 0.54, p = 0.004$). Operational interventions are scoped strictly to high-intent clinical segments (*Chroniker* and *Jungtier*) while consciously excluding acute cases (*Akut*) to prevent artificial demand generation.

## Scope & V1 Architecture

### 1. Doctor Closure Gate

A mandatory closing control panel implemented with a maximum of 3 taps and zero free-text writing:

* **Follow-up Recommended:** Toggle (Yes / No). Default is strictly **No** to preserve clinical neutrality.


* **Term/Date:** 7, 10, 14, 28 days or custom date picker (enabled only if "Yes").


* **Reason:** Fixed dropdown of 6 clinical categories.


* **Monitoring Points:** Up to 3 short lines, pre-filled from diagnosis/prescription.



### 2. Patient View & Plan Delivery

* **Delivery:** Sent within 60 seconds post-call via in-app view and 1 push notification.


* **Date Logic:** Consultation date + term. Automatically shifted to Monday if the target falls on Sunday (to account for lowest platform volume).


* **Interaction:** Single-tap actions ("Keep this date" or "Not needed") without secondary confirmation loops.


* **Reminders:** Exactly one push notification sent at 09:00 local time on the checkpoint date.



### 3. Rebooking Integration

* Direct handoff to a pre-filled rebooking screen carrying over animal ID, clinical findings, medication status, owner status reports, and initial notes.



## Analytical Foundation

* **Dataset:** `petdoc_case_data.csv` (1,413 rows, 1,200 owners, 183-day window).


* **Key Metrics:** Baseline owner retention at 21.2%; *Chroniker* segment odds ratio $OR = 6.99$ ($p < 0.0001$).


* **Methodology:** Multi-factor logistic regression controlling for technical video/audio failures, waiting times, and session restarts.

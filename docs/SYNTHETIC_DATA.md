# Synthetic demo data

The bundled records exported from `src/lib/mockData.ts` as `INITIAL_PATIENTS`, `INITIAL_INTERVENTIONS`, and `INITIAL_DISCREPANCIES` are synthetic fixtures. They are for development, demonstration, and automated tests only; they are not real patient records and must never be used to make care decisions.

Keep a visible development-only notice wherever these bundled initial fixtures are used. Do not add real patient data, hospital identifiers, staff identifiers, medical-record numbers, contact details, or other directly identifying values to fixtures, tests, screenshots, commits, or logs. New test data should use clearly generic labels such as `Synthetic Patient A`, `Demo Hospital`, and `demo@example.invalid`.

User-entered runtime records are a separate data category. This notice does not authorize exposing them, relaxing existing role checks, changing authentication, or treating a synthetic marker as a privacy control. Do not copy runtime records into fixtures, screenshots, tests, or documentation.

The demo label is informational only; it does not establish data provenance for arbitrary records loaded from storage or a service.

# Security Policy

## Reporting

Report suspected vulnerabilities privately to the project owner. Do not open public issues that include exploit details, secrets, personal data, or production configuration.

Include:

- Affected route, function, or dependency
- Reproduction steps
- Impact and affected data or system boundary
- Suggested mitigation, if known

## Handling

Security fixes should ship through the CI workflow in `.github/workflows/ci.yml`, including dependency audit, lint, typecheck, tests, build, and Supabase Edge Function checks.

Rotate any exposed credentials immediately and remove them from git history before sharing the repository beyond the trusted team.

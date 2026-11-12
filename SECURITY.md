# Security Policy

## Supported Versions

Only the latest release on the `main` branch receives security fixes.
Older versions are not patched; please upgrade.

## Reporting a Vulnerability

**Please do not open a public GitHub issue for security problems.**

Report privately via GitHub's
[private vulnerability reporting](../../security/advisories/new)
("Report a vulnerability" under the Security tab).

If that's unavailable, email **greg@cardoni.net**.

Helpful details to include:
- Affected component, endpoint, or file
- Steps to reproduce (or a proof of concept)
- Impact: what an attacker could do
- Any suggested fix, if you have one

## What to Expect

- **Acknowledgment:** within 72 hours
- **Initial assessment:** within 7 days, including whether the report is accepted
- **Updates:** at least every 14 days until resolved
- **Fix:** timeline depends on severity; critical issues are prioritized

If a report is declined, you'll get an explanation of why.

## Disclosure

This project follows coordinated disclosure. Please give us a reasonable
window to ship a fix before publishing details. The default is 90 days
from the report, or sooner once a fix is released. With your permission,
you'll be credited in the advisory.

## Scope

In scope:
- Code in this repository
- The production deployment at https://cardoni.net

Out of scope:
- Third-party services and dependencies (report those upstream)
- Denial-of-service or volumetric/load testing
- Social engineering or physical attacks
- Findings requiring a compromised device or browser
- Missing best-practice headers with no demonstrated impact

## Safe Harbor

Good-faith security research that follows this policy is welcome.
This project will not pursue legal action against researchers who avoid
privacy violations, data destruction, and service disruption, and who
give reasonable time to fix issues before disclosure.

## Bounty

There is no paid bug bounty program.

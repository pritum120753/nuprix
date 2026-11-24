---
name: security-check
description: security-check
disable-model-invocation: true
---
Audit the recently modified files for multi-vendor IDOR (missing vendor_id checks), missing Zod validation, XSS in URLs/templates, and exposed secrets. Fix any issues found.

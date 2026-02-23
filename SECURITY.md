# Security Policy

## Supported Versions

| Version | Supported |
|---------|-----------|
| Latest (main) | Yes |
| Older releases | No |

We support only the latest version of Animal Face Test. Please ensure you are testing against the most recent code before reporting a vulnerability.

## Reporting a Vulnerability

**Please do not report security vulnerabilities through public GitHub issues.**

If you discover a security vulnerability, please send an email to **quizlab.dev@gmail.com** with the subject line:

```
[SECURITY] Animal Face Test — <brief description>
```

Include the following information in your report:

- A description of the vulnerability and its potential impact
- Steps to reproduce the issue
- Any relevant logs, screenshots, or proof-of-concept code
- Your suggested fix or mitigation, if applicable

### Response Timeline

| Step | Timeframe |
|------|-----------|
| Acknowledgment of receipt | Within 48 hours |
| Initial assessment and triage | Within 5 business days |
| Status update | Within 14 days |
| Resolution or mitigation | Dependent on severity |

We will keep you informed throughout the process and credit you in the release notes (unless you prefer to remain anonymous).

## Privacy-First Architecture

Animal Face Test is built with a privacy-first design:

- **No images are stored.** Uploaded or captured images are processed in memory by the backend (AWS Lambda + MediaPipe) and are immediately discarded after analysis. Nothing is persisted to disk or a database.
- **No personally identifiable information is collected** as part of the facial analysis process.
- All analysis runs server-side over HTTPS.

This architecture significantly reduces the attack surface related to user data exposure, but we still take all reported vulnerabilities seriously.

## Scope

The following are in scope for responsible disclosure:

- Cross-site scripting (XSS) or injection vulnerabilities in the frontend
- Authentication or authorization bypass (if applicable)
- Server-side request forgery (SSRF) or remote code execution in the backend Lambda
- Any issue that could expose or compromise user data

The following are out of scope:

- Vulnerabilities in third-party services (AWS, MediaPipe) that we do not control
- Denial-of-service attacks without a clear data-exposure impact
- Social engineering of maintainers

Thank you for helping keep Animal Face Test and its users safe.

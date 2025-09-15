# Welcome to onlinegames12
----
To run locally, clone the repo and run 
``` bash
onlinegames12 $ npm run dev
```
and
``` bash
onlinegames12 $ npm run dev
```

## Contributing

Read CONTRIBUTING.md for more details.

## Tech Stack
This is a full-stack Expo project and you can find the exported static assets for the most recent version in the `gh-pages` branch. You can also view the commit history in that branch to get other versions of onlinegames12. The most recent, up to date code (sometimes behind or ahead of the `gh-pages` branch) is found in the `main` branch.

## Security Checklist

### Frontend Security

| | Security Measure | Description |
|---|-----------------|-------------|
| ☐ | Use HTTPS everywhere | Prevents basic eavesdropping and man-in-the-middle attacks |
| ☐ | Input validation and sanitization | Prevents XSS attacks by validating all user inputs |
| ☐ | Don't store sensitive data in the browser | No secrets in localStorage or client-side code |
| ☐ | CSRF protection | Implement anti-CSRF tokens for forms and state-changing requests |
| ☐ | Never expose API keys in frontend | API credentials should always remain server-side |

### Practical Security Habits

| | Security Measure | Description |
|---|-----------------|-------------|
| ☐ | Keep dependencies updated | Most vulnerabilities come from outdated libraries |
| ☐ | Proper error handling | Don't expose sensitive details in error messages |
| ☐ | Secure cookies | Set HttpOnly, Secure and SameSite attributes |

# Contributing

When you contribute, please create a pull request using the "Contributions" template. Fill out all required forms and ensure your update to code follows all of these standards.

## Security Checklist
Check these FIRST. If this fails, the Contribution won't be accepted.

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


Please also update the changelog, at the VERY top with the version name CONTRIBUTION.[4-digits] and put in square brackets "Contribution - [username]"
For example:

## CONTRIBUTION.3295 [ Contribution - @rilwag2612 ]
- Fix Thorns and Balloons sound issue.
- Add all of the other Thorns and Balloons icons (256px, 128px).

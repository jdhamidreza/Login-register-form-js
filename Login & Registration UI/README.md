

<img width="2305" height="1615" alt="image" src="https://github.com/user-attachments/assets/cde4209c-6d54-4fc5-ba9d-d738e2cf9383" />

<img width="2282" height="1735" alt="image" src="https://github.com/user-attachments/assets/2e3932a8-7011-46ce-93ea-4b8aef79c0ff" />

Login & Registration UI

Overview
- A single-page Login and Registration interface with animated panels.
- Live client-side validation (username, email, password strength, optional phone).
- Pure HTML/CSS/JS, no external build tools required.

Getting Started
1) Open index.html in any modern browser.
2) Click Register/Login links to toggle panels.

Features
- LTR layout with clean 1px input underline.
- Inputs show validation only after first submit attempt (per form), then update live.
- Inline feedback messages and colored underline for valid/invalid states.

Validation Rules
- Username: more than 3 characters.
- Email: must match user@domain.tld pattern.
- Password: at least 12 characters, at least 3 uppercase letters, at least 1 number, and at least 1 symbol.
- Phone (optional, if a field with name="phone" is added): 7–15 digits (spaces/dashes/+ allowed), validated by digit count.

Project Structure
- index.html — Markup for Login and Register forms.
- style.css — Layout, theming, animations, and validation styles.
- script.js — Panel toggling and live validation logic.

Customization
- Change colors in style.css (look for gradients and border colors).
- Adjust validation messages in script.js within attachValidation().
- To enable a phone field, add an input with name="phone" to the desired form; validation activates automatically.

Accessibility Notes
- Browser-native validity is used via setCustomValidity to block submit.
- First invalid field is focused on failed submit.





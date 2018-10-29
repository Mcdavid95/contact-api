[![Maintainability](https://api.codeclimate.com/v1/badges/cac4020ae769b2518194/maintainability)](https://codeclimate.com/github/Mcdavid95/contact-api/maintainability)
# contact-api

## Description
Contacts-API is a simole API to help users manage phone contacts.

## Features
- User Signup
- User Sigin
- Create Contacts
- Edit Contacts
- Read Contact
- Read all Contacts
- Star Contacts
- Reset Password
- Delete Contacts

## Endpoints
- Signup
   - `POST: /api/user/signup`
   - Body: `STRING: username`, `STRING: email`, `STRING: password`
   
- Signin
   - `POST: /api/user/signin`
   - Body: `STRING: username`, `STRING: password`
   
- Create Contacts
   - `POST: /api/contact`
   - Body: `STRING: name`, `ARRAY[STRING]: email`, `ARRAY[STRING]: phone`
   
- Read Contact
   - `GET: /api/contact/:id`
   
- Get all Contacts
   - `GET: /api/contact`
   
- Edit Contact:
   - `PATCH: /api/contact/:id`
   - Body: `STRING: name`, `STRING: email`, `STRING: phone`
   
- Delete Contact
   - `DELETE: /api/contact/:id`
   
- Forgot Password
   - `PATCH: /api/user/forgot-password`
   - Body: `STRING: email`
   
- Reset Password
   - `PATCH: /api/user/reset-password/:passwordToken`
   - Body: `STRING: newPassword`
   
## Test
- `npm run test-dev`

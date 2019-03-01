[![Maintainability](https://api.codeclimate.com/v1/badges/cac4020ae769b2518194/maintainability)](https://codeclimate.com/github/Mcdavid95/contact-api/maintainability)
# contact-api

## Description
Contacts-API is a simole API to help users manage phone contacts.

## Contributors
Anayo Oleru

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
   - Header: `x-access-token`: JWT Token
   
- Read Contact
   - `GET: /api/contact/:id`
   - Header: `x-access-token`: JWT Token
   
- Get all Contacts
   - `GET: /api/contact`
   - Header: `x-access-token`: JWT Token
   - Header: `x-access-token`: JWT Token
   - Header: `x-access-token`: JWT Token
   
- Edit Contact:
   - `PATCH: /api/contact/:id`
   - Body: `STRING: name`, `STRING: email`, `STRING: phone`
   - Header: `x-access-token`: JWT Token
   - Header: `x-access-token`: JWT Token
   
- Delete Contact
   - `DELETE: /api/contact/:id`
   - Header: `x-access-token`: JWT Token
   
- Forgot Password
   - `PATCH: /api/user/forgot-password`
   - Body: `STRING: email`
   - Header: `x-access-token`: JWT Token
   - Header: `x-access-token`: JWT Token
   
- Reset Password
   - `PATCH: /api/user/reset-password/:passwordToken`
   - Body: `STRING: newPassword`
   - Header: `x-access-token`: JWT Token
   
- Star Contact
   - `PATCH: /api/contact/contactId/star`
   - Header: `x-access-token`: JWT Token
   
- Get Starred Contact
   - `GET: /api/contact/star
   - Header: `x-access-token`: JWT Token
   
## Test
- `npm run test-dev`

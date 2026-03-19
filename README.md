# Corner Stone Website

Next.js website with:
- public marketing pages
- admin login/dashboard
- Cloudinary image uploads for portfolio posts
- Neon Postgres storage for portfolio posts

## Requirements

- Node.js 18+
- Neon Postgres database
- Cloudinary account

## Environment Variables

Create `.env` (or `.env.local`) in project root:

```bash
DATABASE_URL=postgres://...
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
ADMIN_USERNAME=Wilson
ADMIN_PASSWORD=Wilson
ADMIN_SESSION_VALUE=Wilson
GOOGLE_SCRIPT_URL=... # existing contact form integration
```

## Install and Run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Admin Access

- Login page: [http://localhost:3000/admin](http://localhost:3000/admin)
- Username: `Wilson`
- Password: `Wilson`
- Successful login redirects to: `/admin/dashboard`

## Admin Features

- Add portfolio posts (title, type, description, tags, optional one/many images)
- Upload post images to Cloudinary with signed uploads
- Store post data in Neon (`portfolio_posts` table)
- Hide/unhide posts from public portfolio view
- Delete posts from admin dashboard


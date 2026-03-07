# TeachLink — UI/UX Design (React + TypeScript)

Reference implementation of the TeachLink UI/UX design. This repository contains a React + TypeScript frontend scaffolded to match the Figma design (link below) and includes UI primitives, pages, and form validation examples.

Design: https://www.figma.com/design/rAwns7McXe0xDJNhCuj5Mc/TeachLink-UI-UX-Design

Summary

- Purpose: demo app / UI kit for TeachLink — a marketplace connecting students and teachers.
- Focus: responsive layout, design tokens, accessible components, form validation (react-hook-form + zod).

Tech stack

- React + TypeScript
- Tailwind CSS (utility classes visible in source)
- react-router (routing)
- react-hook-form + zod (form handling & validation)
- lucide-react (icons)

Quick start

1. Install
   - Open a terminal in the project root and run:

     ```bash
     npm install
     ```

2. Run development server

   ```bash
   npm run dev
   ```

   - Then open http://localhost:3000 (or the port shown in the terminal).

3. Build for production

   ```bash
   npm run build
   ```

4. Preview production build (if available)

   ```bash
   npm run preview
   ```

Notes

- The project uses design tokens in `src/styles/theme.css`. Smooth in-page scrolling and scroll-margin for anchors are configured there.
- Forms use react-hook-form + zod. If input validation seems not to run, ensure custom input components forward refs (`React.forwardRef`) so react-hook-form can attach properly.

Project layout (high level)

- `src/`
  - `app/pages/` — route pages (Landing, About, Login, Signup, ...)
  - `app/components/ui` — shared UI primitives (Button, Input, Card, Label, etc.)
  - `styles/` — global CSS / theme
  - `schema/` — zod schemas for forms

Contributing

- Fork, create a branch, and submit a PR.
- Keep UI changes consistent with existing design tokens and Tailwind classes.
- Run and test locally before opening PR.

Troubleshooting

- If forms don't validate or inputs don't update, confirm custom input components forward refs and accept standard input props.
- If Tailwind classes don't apply, ensure the Tailwind build is running (check postcss / vite config).

License

- No license file included in this repository. Add or check LICENSE before redistributing.

Contact

- For questions about this code bundle, refer to the original Figma project or open an issue in this repository.

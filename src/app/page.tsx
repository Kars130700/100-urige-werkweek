// ===============================
// app/page.tsx  (Server Component)
// ===============================
// Paste this file into your Next.js project at: app/page.tsx
// It renders the client component. You can fetch data here (SSR) and pass as props.

import EpicMemeCharityLanding from "./landingPage";

export const metadata = {
  title: "100 UUR voor het Goede Doel",
  description: "In de derde week van januari ga ik 100 uur lang beunen voor het goede doel.",
};

export default function Page() {
  // If you want to fetch charity data on the server, do it here and pass as props.
  return (<EpicMemeCharityLanding />);
}
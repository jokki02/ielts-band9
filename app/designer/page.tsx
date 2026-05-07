import dynamic from "next/dynamic";

const DesignerStudio = dynamic(() => import("./DesignerStudio"), {
  ssr: false,
  loading: () => (
    <main className="min-h-screen bg-background px-6 py-10 text-foreground">
      <div className="mx-auto max-w-6xl rounded-2xl border border-border/60 bg-card/70 p-8 shadow-card">
        <p className="text-sm text-muted-foreground">Loading 3D design studio…</p>
      </div>
    </main>
  ),
});

export const metadata = {
  title: "3D House Designer — Local AI Design Studio",
  description:
    "A local-first 2D and 3D house/flat design studio with precise room planning, furniture placement, materials, exports, and AI layout help.",
};

export default function DesignerPage() {
  return <DesignerStudio />;
}

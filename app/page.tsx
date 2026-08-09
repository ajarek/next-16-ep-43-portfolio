import { Button } from "@/components/ui/button";
export default function Home() {
  return (
    <div
      id="start"
      className="bg-background flex min-h-[calc(100svh-3.5rem)] flex-col items-center justify-start gap-4 p-8 scroll-mt-20 md:min-h-[calc(100svh-4rem)]"
    >
      <h1 className="text-5xl font-bold text-foreground">AJAREK DEV</h1>
      <Button className="h-12 px-8 text-xl">Zobacz moje projekty</Button>
    </div>
  );
}

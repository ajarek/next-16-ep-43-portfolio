import { Button } from "@/components/ui/button";
export default function Home() {
  return (
    <div className="bg-background min-h-screen flex flex-col justify-start items-center p-8 gap-4">
      <h1 className="text-5xl font-bold text-foreground">AJAREK DEV</h1>
      <Button className="h-12 px-8 text-xl">Zobacz moje projekty</Button>
    </div>
  );
}

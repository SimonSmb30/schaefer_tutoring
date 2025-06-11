import { Loader2 } from "lucide-react";

const Loading = () => {
  return (
    <div className="min-h-[600px] w-full flex justify-center items-center text-muted-foreground">
      <Loader2 className="animate-spin" />
      <p>Retriving your data...</p>
    </div>
  );
};

export default Loading;

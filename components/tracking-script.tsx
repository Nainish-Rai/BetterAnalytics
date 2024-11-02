"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { CopyIcon } from "lucide-react";

export function TrackingScript({ trackingId }: { trackingId: string }) {
  const [copied, setCopied] = useState(false);

  const script = `<script>
  !function(t,e){var n=t.createElement("script");n.async=!0,n.src="/api/track/${trackingId}",t.head.appendChild(n)}(document);
</script>`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(script);
    setCopied(true);
    toast.success("Copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Input value={script} readOnly />
        <Button
          variant="outline"
          size="icon"
          onClick={copyToClipboard}
          className="shrink-0"
        >
          <CopyIcon className="h-4 w-4" />
        </Button>
      </div>
      <p className="text-sm text-muted-foreground">
        Add this script to your website&apos;s <code>&lt;head&gt;</code> section
        to start tracking analytics.
      </p>
    </div>
  );
}
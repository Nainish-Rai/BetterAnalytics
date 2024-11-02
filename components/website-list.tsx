"use client";

import { Website } from "@prisma/client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";

export function WebsiteList({ websites }: { websites: Website[] }) {
  if (websites.length === 0) {
    return (
      <div className="text-center">
        <p className="text-muted-foreground">No websites added yet.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {websites.map((website) => (
        <Card key={website.id}>
          <CardHeader>
            <CardTitle>{website.name}</CardTitle>
            <CardDescription>{website.url}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-sm text-muted-foreground">
                Added {formatDistanceToNow(website.createdAt, { addSuffix: true })}
              </div>
              <div className="flex gap-2">
                <Button asChild>
                  <Link href={`/analytics/${website.id}`}>View Analytics</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href={`/settings/${website.id}`}>Settings</Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
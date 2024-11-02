"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDistanceToNow } from "date-fns";

interface PageViewsTableProps {
  pageViews: any[];
}

export function PageViewsTable({ pageViews }: PageViewsTableProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Page</TableHead>
            <TableHead>Browser</TableHead>
            <TableHead>Duration</TableHead>
            <TableHead>Time</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {pageViews.map((pageView) => (
            <TableRow key={pageView.id}>
              <TableCell className="font-medium">{pageView.path}</TableCell>
              <TableCell>{pageView.userAgent}</TableCell>
              <TableCell>{pageView.duration || "-"}</TableCell>
              <TableCell>
                {formatDistanceToNow(new Date(pageView.createdAt), {
                  addSuffix: true,
                })}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
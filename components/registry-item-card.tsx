"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { buttonVariants, Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useState } from "react";
import { Check, Copy } from "lucide-react";

interface RegistryItemCardProps {
  title: string;
  description?: string;
  url: string;
  previewUrl?: string;
  v0Title?: string;
  v0Prompt?: string;
}

interface v0LinkProps {
  title?: string;
  prompt?: string;
  url: string;
}

export function RegistryItemCard({
  title,
  description,
  url,
  previewUrl,
  v0Title,
  v0Prompt,
}: RegistryItemCardProps) {
  const [copied, setCopied] = useState(false);
  const npxCommand = "npx shadcn@latest add " + url;
  const encodeSearchParams = ({ title, prompt, url }: v0LinkProps): string => {
    const searchParams = new URLSearchParams();

    if (title) searchParams.set("title", title);
    if (prompt) searchParams.set("prompt", prompt);
    searchParams.set("url", url);

    return searchParams.toString();
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(npxCommand);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <section>
      <Card id="starting-kit">
        <CardHeader>
          <div className="flex items-center justify-between gap-4">
            <div>
              <CardTitle className="text-lg font-medium">{title}</CardTitle>
              <CardDescription>{description}</CardDescription>
            </div>
            <div className="flex items-center justify-between gap-1">
              <TooltipProvider>
                <Tooltip>
                  <TooltipContent>Copy npx command</TooltipContent>
                  <TooltipTrigger>
                    <div
                      onClick={copyToClipboard}
                      className="p-4"
                      aria-label="Copy code to clipboard"
                    >
                      {copied ? (
                        <Check className="h-4 w-4 text-green-700" />
                      ) : (
                        <>
                          <Copy className="h-4 w-4" />
                        </>
                      )}
                    </div>
                  </TooltipTrigger>
                </Tooltip>
              </TooltipProvider>
              <Link
                href={
                  "https://v0.dev/chat/api/open?" +
                  encodeSearchParams({
                    title: v0Title,
                    prompt: v0Prompt,
                    url,
                  })
                }
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  buttonVariants({ variant: "default" }),
                  "text-sm gap-0"
                )}
              >
                Open in
                <svg
                  data-testid="geist-icon"
                  strokeLinejoin="round"
                  viewBox="0 0 16 16"
                  className="text-primary-foreground ml-1 !w-5 !h-5"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M9.50321 5.5H13.2532C13.3123 5.5 13.3704 5.5041 13.4273 5.51203L9.51242 9.42692C9.50424 9.36912 9.5 9.31006 9.5 9.25L9.5 5.5L8 5.5L8 9.25C8 10.7688 9.23122 12 10.75 12H14.5V10.5L10.75 10.5C10.6899 10.5 10.6309 10.4958 10.5731 10.4876L14.4904 6.57028C14.4988 6.62897 14.5032 6.68897 14.5032 6.75V10.5H16.0032V6.75C16.0032 5.23122 14.772 4 13.2532 4H9.50321V5.5ZM0 5V5.00405L5.12525 11.5307C5.74119 12.3151 7.00106 11.8795 7.00106 10.8822V5H5.50106V9.58056L1.90404 5H0Z"
                    fill="currentColor"
                  ></path>
                </svg>
              </Link>
            </div>
          </div>
        </CardHeader>
        {previewUrl && (
          <CardContent>
            <div
              className={`h-[800px] w-full rounded-md border border-border overflow-hidden`}
            >
              <iframe
                src={previewUrl}
                className="w-full h-full"
                title="Template Preview"
              />
            </div>
          </CardContent>
        )}
      </Card>
    </section>
  );
}

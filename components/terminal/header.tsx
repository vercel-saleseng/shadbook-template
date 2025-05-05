"use client";

import { useState } from "react";
import { Progress } from "@/components/ui/progress";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Image from "next/image";

// File options for the combobox
export const files = [
  { value: "fluid-hive", label: "Fluid Hive" },
  { value: "dranesville", label: "Dranesville" },
  { value: "tumwater", label: "Tumwater" },
  { value: "lexington", label: "Lexington" },
  { value: "siena", label: "Siena" },
  { value: "havana", label: "Havana" },
  { value: "brasilia", label: "Brasilia" },
  { value: "cairo", label: "Cairo" },
];

interface HeaderProps {
  progress: number;
  selectedFile: (typeof files)[0];
  onFileChange: (file: (typeof files)[0]) => void;
}

export function Header({ progress, selectedFile, onFileChange }: HeaderProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-border p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-[180px] justify-between ml-2 bg-muted border-border text-muted-foreground hover:bg-muted hover:text-[hsl(var(--primary))]"
              >
                {selectedFile.label}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[180px] p-0 bg-card border-border">
              <Command className="bg-transparent">
                <CommandInput
                  placeholder="Search file..."
                  className="h-9 bg-transparent"
                />
                <CommandList>
                  <CommandEmpty>No file found.</CommandEmpty>
                  <CommandGroup>
                    {files.map((file) => (
                      <CommandItem
                        key={file.value}
                        value={file.value}
                        onSelect={(currentValue) => {
                          const selected = files.find(
                            (file) => file.value === currentValue
                          );
                          if (selected) {
                            onFileChange(selected);
                          }
                          setOpen(false);
                        }}
                        className="text-muted-foreground hover:text-[hsl(var(--primary))]"
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            selectedFile.value === file.value
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                        {file.label}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex flex-col items-end">
            <span className="text-sm text-muted-foreground">
              {progress}% Complete
            </span>
            <Progress value={progress} className="w-32 h-1.5 mt-1" />
          </div>
          <Image
            height={32}
            width={150}
            src="https://9xunyj9nbtcqjdrd.public.blob.vercel-storage.com/lumon-bnmDHU0WvLZp4fEIo7pYFRxdNkWHNi.png"
            alt="Logo"
            className="px-2 py-4"
          />
        </div>
      </div>
    </div>
  );
}

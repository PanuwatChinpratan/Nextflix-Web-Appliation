"use client";

import { Check, Globe2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useI18n } from "@/lib/i18n";

const languages: Array<{ code: "en" | "th"; label: string }> = [
  { code: "en", label: "EN" },
  { code: "th", label: "TH" },
];

export function LanguageToggle() {
  const { language, changeLanguage } = useI18n();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="text-white hover:bg-white/10"
          aria-label="Change language"
        >
          <Globe2 className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-28 bg-zinc-900 text-white">
        {languages.map((lng) => (
          <DropdownMenuItem
            key={lng.code}
            className="flex items-center justify-between"
            onClick={() => changeLanguage(lng.code)}
          >
            <span>{lng.label}</span>
            {language === lng.code && <Check className="h-4 w-4" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

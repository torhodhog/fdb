import { TextHoverEffect } from "@/components/ui/text-hover.effect";
import React from "react";

export function TextHoverEffectDemo() {
  return (
    <div className="h-[40rem] flex items-center justify-center">
      <TextHoverEffect text="FDB.343" duration={2}/>

    </div>
  );
}

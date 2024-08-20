"use client";

import { useState } from "react";

export default function ViewPort() {
  return (
    <article className="w-full h-full min-h-32 p-2 bg-cta-active rounded-xl shadow-inner">
      <JsxViewPort />
    </article>
  );
}

function JsxViewPort() {
  const [elementList, setElementList] = useState<JsxElementList[]>([]);

  return (
    <div className="w-full h-full flex flex-col items-center">
      {elementList.length === 0 && (
        <p className="text-secondary-text text-lg">add componets</p>
      )}
    </div>
  );
}

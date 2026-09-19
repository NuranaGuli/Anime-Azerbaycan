"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, GripHorizontal } from "lucide-react";
import { RegisterForm } from "@/components/auth/RegisterForm";

export function MovableRegisterSection() {
  const [offsetX, setOffsetX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  
  const dragStateRef = useRef({
    isDragging: false,
    startX: 0,
    startOffset: 0,
    minX: 0,
    maxX: 0,
  });

  const margin = 16; 
  const startDrag = (clientX: number) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
  
    const originalLeft = rect.left - offsetX;
    const originalRight = rect.right - offsetX;
    
    const minX = -originalLeft + margin;
    const maxX = window.innerWidth - originalRight - margin;

    dragStateRef.current = {
      isDragging: true,
      startX: clientX,
      startOffset: offsetX,
      minX,
      maxX,
    };
    setIsDragging(true);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    // Only drag with left mouse click
    if (e.button !== 0) return;
    startDrag(e.clientX);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length > 0) {
      startDrag(e.touches[0].clientX);
    }
  };

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!dragStateRef.current.isDragging) return;
      const { startX, startOffset, minX, maxX } = dragStateRef.current;
      const deltaX = e.clientX - startX;
      let newOffset = startOffset + deltaX;

      if (newOffset < minX) newOffset = minX;
      if (newOffset > maxX) newOffset = maxX;

      setOffsetX(newOffset);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!dragStateRef.current.isDragging || e.touches.length === 0) return;
      const { startX, startOffset, minX, maxX } = dragStateRef.current;
      const deltaX = e.touches[0].clientX - startX;
      let newOffset = startOffset + deltaX;

      if (newOffset < minX) newOffset = minX;
      if (newOffset > maxX) newOffset = maxX;

      setOffsetX(newOffset);
    };

    const handleDragEnd = () => {
      dragStateRef.current.isDragging = false;
      setIsDragging(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleDragEnd);
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchend", handleDragEnd);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleDragEnd);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleDragEnd);
    };
  }, [isDragging]);

  useEffect(() => {
    const handleResize = () => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const originalLeft = rect.left - offsetX;
      const originalRight = rect.right - offsetX;
      const minX = -originalLeft + margin;
      const maxX = window.innerWidth - originalRight - margin;

      setOffsetX((prev) => Math.max(minX, Math.min(maxX, prev)));
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [offsetX]);

  const resetOffset = () => {
    setOffsetX(0);
  };

  return (
    <section
      ref={cardRef}
      style={{
        transform: `translateX(${offsetX}px)`,
        transition: isDragging ? "none" : "transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
      className={`relative w-full max-w-md rounded-xl border border-white/10 bg-bg/72 p-6 shadow-2xl shadow-black/40 backdrop-blur-xl sm:p-8 ${
        isDragging ? "select-none" : ""
      }`}
    >
      {}
      <div
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        onDoubleClick={resetOffset}
        title="Sürüşdürmək üçün klikləyib saxlayın. Sıfırlamaq üçün iki dəfə klikləyin."
        className={`group absolute left-1/2 top-3 -translate-x-1/2 flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-medium text-text-secondary transition-all hover:bg-white/10 select-none cursor-grab active:cursor-grabbing hover:text-primary active:scale-95 ${
          isDragging ? "border-primary/30 bg-primary/5 text-primary" : ""
        }`}
      >
        <GripHorizontal className={`h-3 w-3 text-primary transition-transform group-hover:scale-110 ${isDragging ? "animate-pulse" : ""}`} />
        <span>Sürüşdür</span>
        {offsetX !== 0 && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              resetOffset();
            }}
            className="ml-1 text-[10px] font-semibold text-primary hover:underline"
            title="Əvvəlki mövqeyə qaytar"
          >
            (Sıfırla)
          </button>
        )}
      </div>

      {}
      <div className="mb-6 pt-3">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary">Yeni hesab</p>
        <h1 className="font-display text-3xl font-bold text-text-primary">Qeydiyyat</h1>
        <p className="mt-2 text-sm text-text-secondary">
          İcmanın bir hissəsi ol, reytinq ver, şərh yaz və sevdiyin anime-ləri saxla.
        </p>
      </div>

      <RegisterForm />

      <div className="mt-6 border-t border-white/10 pt-5">
        <p className="text-sm text-text-secondary">Artıq hesabın var?</p>
        <Link
          href="/auth/login"
          className="mt-3 inline-flex w-full items-center justify-between rounded-lg border border-primary/35 bg-primary/10 px-4 py-3 text-sm font-semibold text-primary transition-colors hover:bg-primary/20"
        >
          Login səhifəsinə keç
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}

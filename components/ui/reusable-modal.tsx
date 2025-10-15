"use client";

import { useEffect, useRef, ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export interface ModalTab {
  value: string;
  label: string;
}

export interface ModalConfig {
  title: string;
  headerIcon?: string;
  headerBadgeText?: string;
  showTabs?: boolean;
  activeTab: string;
  tabs: ModalTab[];
}

export interface ReusableModalProps {
  isOpen: boolean;
  config: ModalConfig;
  children: ReactNode;
  onClose: () => void;
  onTabChange?: (tabValue: string) => void;
  className?: string;
  maxHeight?: string;
}

export function ReusableModal({
  isOpen,
  config,
  children,
  onClose,
  onTabChange,
  className,
  maxHeight = "80vh",
}: ReusableModalProps) {
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // Scroll para o topo quando mudar de tab
  useEffect(() => {
    const scrollToTop = () => {
      if (scrollAreaRef.current) {
        const viewport =
          scrollAreaRef.current.querySelector(
            "[data-radix-scroll-area-viewport]"
          ) ||
          scrollAreaRef.current.querySelector(".scrollarea-viewport") ||
          scrollAreaRef.current.querySelector("[data-viewport]") ||
          scrollAreaRef.current.firstElementChild;

        if (viewport) {
          viewport.scrollTop = 0;
          try {
            (viewport as HTMLElement).scrollTo({ top: 0, behavior: "auto" });
          } catch (e) {}
        }

        try {
          scrollAreaRef.current.scrollTop = 0;
        } catch (e) {}
      }
    };

    scrollToTop();
    setTimeout(scrollToTop, 50);
    setTimeout(scrollToTop, 150);
  }, [config.activeTab]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className={`modal-arial w-[95vw] max-w-[95vw] sm:w-[90vw] sm:max-w-[520px] md:max-w-[600px] p-0 overflow-visible rounded-lg sm:rounded-xl border-0 shadow-xl flex flex-col my-auto ${
          className || ""
        }`}
        style={{ maxHeight }}
      >
        <DialogHeader className="px-3 py-3 sm:px-5 sm:py-4 bg-gradient-to-r from-slate-50 to-gray-50 border-b border-gray-200 rounded-t-lg sm:rounded-t-xl">
          <DialogTitle className="text-lg sm:text-xl font-bold text-slate-800 mb-1 sm:mb-2 text-center">
            {config.title}
          </DialogTitle>
          {(config.headerIcon || config.headerBadgeText) && (
            <div className="text-center">
              {config.headerIcon && (
                <div className="flex justify-center mb-2 sm:mb-3">
                  <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white border-2 border-gray-200 shadow-sm">
                    <span className="text-xl sm:text-2xl">
                      {config.headerIcon}
                    </span>
                  </div>
                </div>
              )}
              {config.headerBadgeText && (
                <div className="flex justify-center items-center gap-2">
                  <div className="px-3 py-1 bg-green-100 border border-green-200 rounded-full">
                    <p className="text-sm sm:text-base font-semibold text-green-800">
                      {config.headerBadgeText}
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
        </DialogHeader>

        {config.showTabs && config.tabs.length > 1 ? (
          <Tabs
            defaultValue={config.activeTab}
            value={config.activeTab}
            onValueChange={onTabChange}
            className="w-full flex-1 flex flex-col overflow-hidden"
          >
            <div className="px-1 sm:px-4 pt-2 pb-2 sm:pb-2 border-b">
              <ScrollArea className="w-full overflow-visible">
                <TabsList
                  className="grid h-10 sm:h-12 gap-0.5 sm:gap-1 w-full overflow-visible"
                  style={{
                    gridTemplateColumns: `repeat(${config.tabs.length}, 1fr)`,
                  }}
                  role="tablist"
                >
                  {config.tabs.map((tab) => (
                    <TabsTrigger
                      key={tab.value}
                      value={tab.value}
                      role="tab"
                      aria-selected={config.activeTab === tab.value}
                      className="text-xs sm:text-base py-2 sm:py-3 px-1 sm:px-3 font-medium transition-all duration-100 touch-manipulation relative text-center"
                    >
                      {tab.label}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </ScrollArea>
            </div>

            <ScrollArea
              ref={scrollAreaRef}
              className="flex-1 px-3 sm:px-4 overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"
              style={{
                WebkitOverflowScrolling: "touch",
                scrollBehavior: "smooth",
                maxHeight: `calc(${maxHeight} - 200px)`,
              }}
            >
              <TabsContent
                value={config.activeTab}
                className="mt-3 sm:mt-4 w-full max-w-full overflow-visible"
                role="tabpanel"
              >
                {children}
              </TabsContent>
            </ScrollArea>
          </Tabs>
        ) : (
          <ScrollArea
            ref={scrollAreaRef}
            className="flex-1 px-3 sm:px-4 overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"
            style={{
              WebkitOverflowScrolling: "touch",
              scrollBehavior: "smooth",
              maxHeight: `calc(${maxHeight} - 120px)`,
            }}
          >
            <div className="mt-3 sm:mt-4 w-full max-w-full overflow-visible">
              {children}
            </div>
          </ScrollArea>
        )}
      </DialogContent>
    </Dialog>
  );
}

"use client";

import { Nav } from "@/components/nav";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { TooltipProvider } from "../ui/tooltip";
import { adminNavItems } from "@/lib/configs/nav";

interface Props {
  defaultLayout: number[] | undefined;
  defaultCollapsed?: boolean;
  navCollapsedSize: number;
  children: React.ReactNode;
}

const NavContent = ({
  defaultLayout = [265, 440, 655],
  defaultCollapsed = false,
  navCollapsedSize,
  children,
}: Props) => {
  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed);

  const onCollapse = (collapsed: boolean) => {
    setIsCollapsed(collapsed);
    document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
      collapsed
    )}`;
  };

  return (
    <TooltipProvider delayDuration={0}>
      <ResizablePanelGroup
        direction="horizontal"
        className="h-full items-stretch"
      >
        <ResizablePanel
          defaultSize={defaultLayout[0]}
          collapsedSize={navCollapsedSize}
          collapsible={true}
          minSize={15}
          maxSize={20}
          onCollapse={() => {
            onCollapse(true);
          }}
          onExpand={() => {
            onCollapse(false);
          }}
          className={cn(
            isCollapsed &&
              "min-w-[50px] transition-all duration-300 ease-in-out"
          )}
        >
          <Nav isCollapsed={isCollapsed} links={adminNavItems} />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel>
          <div className="p-8">{children}</div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </TooltipProvider>
  );
};

export default NavContent;

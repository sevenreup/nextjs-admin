import { NavItem } from "@/components/nav";
import { Users, ArchiveX, Home, FormInput, Settings } from "lucide-react";

export const adminNavItems: NavItem[] = [
  {
    title: "Home",
    label: "",
    icon: Home,
    variant: "default",
    href: "/admin",
  },
  {
    title: "Users",
    label: "",
    icon: Users,
    variant: "ghost",
    href: "/admin",
  },
  {
    title: "Form",
    label: "",
    icon: FormInput,
    variant: "ghost",
    href: "/admin",
  },
  {
    title: "Settings",
    label: "",
    icon: Settings,
    variant: "ghost",
    href: "/admin",
  },
];

export enum NavLinkTarget {
    BLANK="_blank"
}

type NavLink = {
    displayText: string | any;
    href: string;
    target?: NavLinkTarget;
    altText?: string;
}

export type { NavLink }
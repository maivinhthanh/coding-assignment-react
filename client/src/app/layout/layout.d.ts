import { PropsWithChildren, ReactNode, SyntheticEvent } from 'react';

export interface LayoutProps extends PropsWithChildren {
  pageTitle: string;
  breadCrumb?: BreadcrumbItemType[];
}

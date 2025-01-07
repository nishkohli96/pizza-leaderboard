export interface LayoutProps {
  children: React.ReactNode;
}

export type SearchParams<P> = {
  searchParams: Promise<P>;
}

export type Params<P> = {
  params: Promise<P>;
}
interface Source {
  sourceLogo: string | null;
  sourceUrl: string;
  sourceName: string;
  text: string;
}

export interface Sources {
  sourceData: Source[]; // Indicates that sourceData is an array of Source objects
  controversial: boolean;
}

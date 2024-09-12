interface PostMetaData {
  title: string;
  date: string;
  fileName: string;
  tags: string[];
}

interface PostFileMeta {
  title: string;
  date: string;
  tags: string[];
}

interface JsxElementList {
  id: string;
  component: "Text" | "Image" | "Video" | "Other";
  content: string;
  props?: { [key as string]: string };
}

interface ZoneValues {
  limit: number;
  index: number;
  id: string;
}

interface SpringType {
  y: number;
  opacity: number;
  zIndex: number;
  scale: number;
  shadow: number;
}

declare module "lodash-move" {
  const fn: (list: any[], b: number, c: number) => any[];
  export default fn;
}

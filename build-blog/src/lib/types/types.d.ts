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
  component: string;
  content: string;
  props?: { [key as string]: string };
}

interface ZoneValues {
  limit: number;
  index: number;
}

interface SpringType {
  y: number;
  opacity: number;
}

declare module "lodash-move" {
  const fn: (list: any[], b: number, c: number) => any[];
  export default fn;
}

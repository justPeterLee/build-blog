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

type elementTypes = "Text" | "Image" | "Video" | "Other";

interface ImageFileOrder {
  id: string;
  file: File;
  subtitle: string;
  reference: string;
}

interface ImageFile {
  order: number;
  file: File;
  subtitle: string;
  reference: string;
}

interface ImagesFileObj {
  [id: string]: ImageFile;
}
interface ImagesFileOrderObj {
  [order: number]: ImageOrderedFile;
}
interface VideoFile {
  file?: File;
  embed?: string;
  subtitle?: string;
  reference?: string;
}

type TextContent = string | null;
type ImageContent = ImagesFileObj | null;
type VideoContent = VideoContentType | null;

type AnyContentType = TextContent | ImageContent | VideoContent;

interface VideoContentType {
  mode: InputModes;
  content: File | string | null;
  subtitle: string;
  reference: string;
}

type ValidContentValueTypes =
  | { type: "Text"; content: TextContent }
  | { type: "Image"; content: ImageContent }
  | { type: "Video"; content: VideoContent }
  | { type: "Other"; content: null };

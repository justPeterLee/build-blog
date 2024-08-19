export default function BlogVideo({
  folder,
  video,
  subTitle,
  reference,
  width,
}: {
  folder: string;
  video: string;
  subTitle?: string;
  reference?: string;
  width?: string;
}) {
  return (
    <div className="m-auto my-5">
      <div>
        <video
          width="100%"
          height="auto"
          controls
          style={{ width: width ? width : "" }}
        >
          <source src={`../../../blog/${folder}/${video}`} type={"video/mp4"} />
          Your browser does not support the video tag
        </video>
        <div className="mt-1 text-xs text-secondary-text duration-0 flex justify-between">
          <span className="text-xs text-secondary-text">{subTitle}</span>
          {reference && (
            <a href={reference} target="_blank">
              ref
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

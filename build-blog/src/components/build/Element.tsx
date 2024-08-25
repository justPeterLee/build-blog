import { animated } from "@react-spring/web";

export function TextElement({
  id,
  style,
  order,
}: {
  id: string;
  style: any;
  order: number;
}) {
  return (
    <animated.div
      style={style}
      id={id}
      className="bg-card w-full rounded-xl p-2 shadow absolute"
    >
      <p className="text-secondary-text">Text Element {order}</p>
    </animated.div>
  );
}

export function VideoElement({
  id,
  style,
  order,
}: {
  id: string;
  style: any;
  order: number;
}) {
  return (
    <animated.div
      style={style}
      id={id}
      className="bg-card w-full h-32 rounded-xl p-2 shadow absolute"
    >
      <p className="text-secondary-text">Video Element {order}</p>
    </animated.div>
  );
}

import { animated, SpringRef, useSpring } from "@react-spring/web";
import { useEffect } from "react";
import { ElementSpringType } from "./buildContext/BuildContext";

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

export function InsertHereLine({
  style,
  addSpring,
}: {
  style: any;
  addSpring: (id: string, spring: ElementSpringType) => void;
}) {
  const [spring, api] = useSpring(() => ({ y: 0, opacity: 1 }));

  useEffect(() => {
    addSpring("insert-here", api);
  });
  return (
    <animated.div
      style={spring}
      id="insert-here"
      className="w-full flex justify-between items-center gap-1 text-primary-text duration-0 absolute select-none"
    >
      <b>&lt;</b>
      <div className="bg-primary-text flex-grow h-[1px]"></div>
      <p className="text-sm italic">insert here</p>
      <div className="bg-primary-text flex-grow h-[1px]"></div>
      <b>&gt;</b>
    </animated.div>
  );
}

export function AnimationElement({
  type,
  id,
  style,
  addSpring,
}: {
  type: string;
  id: string;
  style: any;
  addSpring: (id: string, spring: ElementSpringType) => void;
}) {
  const [spring, api] = useSpring(() => ({ y: 0, opacity: 1 }));

  useEffect(() => {
    addSpring(id, api);
  });
  return (
    <animated.div
      style={spring}
      id={id}
      className="bg-card w-full rounded-xl p-2 shadow absolute"
    >
      {type}
    </animated.div>
  );
}

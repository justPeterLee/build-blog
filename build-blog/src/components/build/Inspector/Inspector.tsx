export function Inspector() {
  return (
    // right -> viewport padding + inspector width + offset (1rem)
    <div className="bg-card h-10 w-[12rem] z-30 absolute -right-[14rem] -top-[1rem] rounded-lg"></div>
  );
}

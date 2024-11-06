// Can be used at onKeyDown prop
export const ignoreTab = (event: React.KeyboardEvent) => {
  if (event.key === "Tab") {
    event.preventDefault();
  }
};

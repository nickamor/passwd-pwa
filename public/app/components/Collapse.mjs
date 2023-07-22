import htm from "htm";
import { createElement as h } from "preact";
import { useEffect, useRef, useState } from "preact/hooks";

export const html = htm.bind(h);

const useTransition = (value, timeout) => {
  const timeoutRef = useRef(null);
  const valueRef = useRef(value);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    if (valueRef.current == value) {
      return;
    }
    setAnimating(true);
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      valueRef.current = value;
      setAnimating(false);
    }, timeout);
  }, [value]);

  return [animating];
};

export const Collapse = ({ className, open, children }) => {
  const [animating] = useTransition(open, 200);

  const renderChildren = animating || open;

  return html`<div class="row ${className} ${!open ? "hide" : "show"}">
    ${renderChildren && children}
  </div>`;
};

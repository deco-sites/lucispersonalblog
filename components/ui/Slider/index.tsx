import type { ComponentChildren, JSX } from "preact";
import Script, { type Props } from "./script.tsx";

function Dot({ index, children }: {
  index: number;
  children: ComponentChildren;
}) {
  return (
    <button
      data-dot={index}
      aria-label={`go to slider item ${index}`}
      class="focus:outline-none group"
    >
      {children}
    </button>
  );
}

function Slider({
  rootId,
  scroll = "smooth",
  interval,
  infinite = false,
  ...props
}: JSX.IntrinsicElements["ul"] & Props) {
  return (
    <>
      <ul data-slider {...props} />
      <Script
        rootId={rootId}
        scroll={scroll}
        interval={interval}
        infinite={infinite}
      />
    </>
  );
}

function Item({
  index,
  ...props
}: JSX.IntrinsicElements["li"] & { index: number }) {
  return <li data-slider-item={index} {...props} />;
}

function NextButton(props: JSX.IntrinsicElements["button"]) {
  return <button data-slide="next" aria-label="Next item" {...props} />;
}

function PrevButton(props: JSX.IntrinsicElements["button"]) {
  return <button data-slide="prev" aria-label="Previous item" {...props} />;
}

Slider.Dot = Dot;
Slider.Item = Item;
Slider.NextButton = NextButton;
Slider.PrevButton = PrevButton;

export default Slider;

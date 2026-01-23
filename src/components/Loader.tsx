import { Tailspin } from "ldrs/react";
import "ldrs/react/Tailspin.css";

export default function Loader() {
  return (
    <div className="flex items-center justify-center">
      <Tailspin size="40" stroke="3" speed="1" color="oklch(70.8% 0 0)" />
    </div>
  );
}

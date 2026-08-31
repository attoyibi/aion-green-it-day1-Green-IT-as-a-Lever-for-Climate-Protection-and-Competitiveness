import type { ContextTile } from "@/data/case-shared";

type Props = { condition: ContextTile };

/** A flat, non-category pill describing a condition the initiatives sit in. */
export function ConditionTile({ condition }: Props) {
  return (
    <li
      id={condition.id}
      className="rounded-full border border-line bg-lilac px-4 py-2 text-caption text-navy"
    >
      {condition.text}
    </li>
  );
}

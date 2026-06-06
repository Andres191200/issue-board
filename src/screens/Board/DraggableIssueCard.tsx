import { useDraggable } from "@dnd-kit/core";
import type { IssueCard } from "./Board.types";
import { IssueCardView } from "./IssueCardView";

interface DraggableIssueCardProps {
  card: IssueCard;
}

/**
 * Wraps an issue card with @dnd-kit drag wiring. Movement is rendered by the
 * board's DragOverlay, so the source is only faded here (no transform applied),
 * which avoids the card appearing in two places at once.
 */
export function DraggableIssueCard({ card }: DraggableIssueCardProps) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: card.id,
  });

  return (
    <IssueCardView
      ref={setNodeRef}
      card={card}
      isDragging={isDragging}
      {...attributes}
      {...listeners}
    />
  );
}

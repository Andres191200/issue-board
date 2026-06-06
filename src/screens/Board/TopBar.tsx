import { useState } from "react";
import { Button } from "@/components/Button";
import { NewTaskForm } from "./NewTaskForm";
import styles from "./Board.module.css";

/**
 * Board top bar. Holds the screen title and primary actions. The "New Task" CTA
 * opens the creation form (rendered through a portal), mounted only while open
 * so its form state resets each time.
 */
export function TopBar() {
  const [isFormOpen, setFormOpen] = useState(false);

  return (
    <header className={styles.topbar}>
      <h1 className={styles.brand}>Issues Board</h1>
      <div className={styles.actions}>
        <Button fullWidth={false} onClick={() => setFormOpen(true)}>
          New Task
        </Button>
      </div>

      {isFormOpen ? (
        <NewTaskForm onClose={() => setFormOpen(false)} />
      ) : null}
    </header>
  );
}

import { Button } from "@/components/Button";
import styles from "./Board.module.css";

/**
 * Board top bar. Holds the screen title and primary actions. For now the only
 * action is the "New Task" CTA; more actions (filters, search) will live here.
 * Defined at module level so it is never recreated per Board render.
 */
export function TopBar() {
  return (
    <header className={styles.topbar}>
      <h1 className={styles.brand}>Issues Board</h1>
      <div className={styles.actions}>
        <Button fullWidth={false}>New Task</Button>
      </div>
    </header>
  );
}

import styles from "@/app/components/SideBar/Sidebar.module.css";


const Sidebar: React.FC = () => {
  return (
    <aside className={styles.sidebar}>
      <h3>Staff Picks</h3>
      <ul>
        <li>M. H. Rubin - A New Language for Photography</li>
        <li>Kevin Beaumont - What I learned from the ‘Microsoft global IT outage’</li>
        <li>Arbor Brookes - The First Date Nobody’s Talking About</li>
      </ul>
      <h3>Recommended topics</h3>
      <ul>
        <li>Programming</li>
        <li>Self Improvement</li>
        <li>...</li>
      </ul>
    </aside>
  );
};

export default Sidebar;
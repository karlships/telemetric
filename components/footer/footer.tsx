const Footer = () => {
  const currentYear = new Date().getFullYear();

  const styles = {
    footer: {
      width: "100%",
      backgroundColor: "var(--accent)",
      height: "60px",
      alignItems: "center",
      display: "flex",
      justifyContent: "center",
      flexDirection: "column",
    },
    container: {
      margin: "0 auto",
      padding: "10px",
    },
    row: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      alignItems: "center",
      gap: "4px",
    },
    linkGroup: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
    },
    link: {
      color: "var(--unselected)",
      fontSize: "14px",
      textDecoration: "none",
    },

    copyrightGroup: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      color: "var(--unselected)",
    },
    copyright: {
      fontSize: "14px",
    },
  } as const;

  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        <div style={styles.row}>
          {/* Left column - Links */}
          <div style={styles.linkGroup}>
            <a
              href="https://untitledapps.at"
              target="_blank"
              rel="noopener noreferrer"
              style={styles.link}
            >
              Imprint
            </a>

            <a
              href="https://untitledapps.at/telemetric"
              target="_blank"
              rel="noopener noreferrer"
              style={styles.link}
            >
              Privacy Policy
            </a>
          </div>

          {/* Right column - Copyright */}
          <div style={styles.copyrightGroup}>
            <span style={styles.copyright}>© {currentYear}</span>
            <a
              href="https://untitledapps.at"
              target="_blank"
              rel="noopener noreferrer"
              style={styles.link}
            >
              UNTITLED APPS e.U.
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

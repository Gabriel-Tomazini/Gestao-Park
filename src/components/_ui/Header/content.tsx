import React from "react";

const NavBar = () => {
  return (
    <nav style={styles.navbar}>
      <div style={styles.title}>Gestão Park</div>
      <div style={styles.profileCircle}></div>
    </nav>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  navbar: {
    position: "fixed", // Torna a NavBar fixa
    top: 0, // Fixa a NavBar no topo
    left: 0, // Alinha a NavBar à esquerda
    right: 0, // Alinha a NavBar à direita
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#007bff",
    padding: "10px 20px",
    height: "60px",
    zIndex: 1000, // Garante que a NavBar fique acima de outros elementos
  },
  title: {
    color: "#000",
    fontSize: "20px",
    fontWeight: "bold",
  },
  profileCircle: {
    width: "40px",
    height: "40px",
    backgroundColor: "#e0f0ff",
    borderRadius: "50%",
  },
};

export default NavBar;

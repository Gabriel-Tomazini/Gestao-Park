"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { AppUtils } from "@/shared";

const SideMenu = () => {
  const router = useRouter();
  const pageCadastroCarro = () => {
    router.push(AppUtils.CARROS_PATH);
  };
  const pageCadastroPessoa = () => {
    router.push(AppUtils.PESSOA_PATH);
  };
  const pageParkingReport = () => {
    router.push(AppUtils.PARKINGREPORT_PATH);
  };
  const pageListaCarro = () => {
    router.push(AppUtils.LISTACARRO_PATH);
  };
  const pageHome = () => {
    router.push(AppUtils.HOME_PATH);
  };

  return (
    <aside style={styles.menu}>
      <ul style={styles.list}>
        <li style={{ ...styles.listItem, marginTop: "20px" }}>
          <button style={styles.button} onClick={pageHome}>
            Inicial
          </button>
        </li>
        <li style={styles.listItem}>
          <button style={styles.button} onClick={pageListaCarro}>
            Listar veículo
          </button>
        </li>
        <li style={styles.listItem}>
          <button style={styles.button} onClick={pageParkingReport}>
            Entrada e saída
          </button>
        </li>
        <li style={styles.listItem}>
          <button style={styles.button} onClick={pageCadastroPessoa}>
            Cadastro pessoa
          </button>
        </li>
        <li style={styles.listItem}>
          <button style={styles.button} onClick={pageCadastroCarro}>
            Cadastrar veículo
          </button>
        </li>
      </ul>
    </aside>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  menu: {
    position: "fixed" as React.CSSProperties["position"],
    top: "60px",
    left: 0,
    width: "250px",
    backgroundColor: "#e0ebf5",
    padding: "10px",
    height: "calc(100vh - 70px)",
  },
  list: {
    listStyleType: "none" as const,
    padding: 0,
    margin: 0,
  },
  listItem: {
    marginBottom: "30px",
  },
  button: {
    width: "100%",
    padding: "10px",
    backgroundColor: "#fff",
    border: "1px solid #ccc",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
    textAlign: "left" as
      | "left"
      | "right"
      | "center"
      | "justify"
      | "initial"
      | "inherit",
  } as React.CSSProperties,
};

export default SideMenu;

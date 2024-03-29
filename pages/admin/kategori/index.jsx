// import ImageKategori from "@/components/kategori/image-kategori";
import TabelKategori from "@/components/kategori/tabel-kategori";
import styles from './index.module.css'

const Kategori = () => {
  return (
    <div className={styles.container}>
      <TabelKategori />
    </div>
  );
};

export default Kategori;

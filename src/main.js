const { createApp } = Vue;

createApp({
  methods: {
    fetchData() {
      fetch("api/getPegawai.php")
        .then((res) => res.json())
        .then((data) => {
          this.pegawaiList = data;
        });
    },
    tambahPegawai() {
      if (!this.validasiForm()) return;

      const endpoint = this.editMode ? "updatePegawai.php" : "addPegawai.php";

      fetch("api/" + endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(this.form),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            alert(
              this.editMode
                ? "Data berhasil diubah!"
                : "Data berhasil ditambahkan!"
            );
            this.resetForm();
            this.fetchData();
          } else {
            alert("Gagal menyimpan data");
          }
        });
    },
    isiForm(pegawai) {
      this.form = { ...pegawai };
      this.editMode = true;
    },
    resetForm() {
      this.form = {
        id: null,
        name: "",
        last_name: "",
        birth_date: "",
        gender: "",
        email: "",
        phone_number: "",
      };
      this.editMode = false;
    },
    hapusPegawai(id) {
      if (!confirm("Yakin ingin menghapus data ini?")) return;
      fetch("api/deletePegawai.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            this.fetchData();
          } else {
            alert("Gagal menghapus data");
          }
        });
    },
    validasiForm() {
      this.errors = {}; // Reset dulu

      if (!this.form.email.includes("@")) {
        this.errors.data = "Email tidak valid. Harus mengandung '@'";
      }

      const hanyaAngka = /^[0-9]+$/;
      if (!hanyaAngka.test(this.form.phone_number)) {
        this.errors.data =
          "Nomor HP hanya boleh angka (tanpa spasi atau huruf)";
      }

      // Kembalikan false jika ada error
      return Object.keys(this.errors).length === 0;
    },
  },
  computed: {
    filteredPegawai() {
      if (!this.keyword) return this.pegawaiList;

      const lowerKeyword = this.keyword.toLowerCase();
      return this.pegawaiList.filter(
        (p) =>
          p.name.toLowerCase().includes(lowerKeyword) ||
          p.last_name.toLowerCase().includes(lowerKeyword) ||
          p.gender.toLowerCase().includes(lowerKeyword) ||
          p.email.toLowerCase().includes(lowerKeyword) ||
          p.phone_number.toLowerCase().includes(lowerKeyword) ||
          p.birth_date.toLowerCase().includes(lowerKeyword)
      );
    },
  },
  data() {
    return {
      pegawaiList: [],
      form: {
        id: null,
        name: "",
        last_name: "",
        birth_date: "",
        gender: "",
        email: "",
        phone_number: "",
      },
      editMode: false,
      keyword: "",
      errors: {},
    };
  },
  mounted() {
    this.fetchData();
  },
}).mount("#app");

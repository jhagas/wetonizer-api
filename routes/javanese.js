var express = require("express");
var router = express.Router();

//hardcoded, hard to predict the 120y kurup cycle
// started at 24 Mar 1936, 1867
const kurupTahun = 1867;
const kurup = "Asapon (Alip jatuh pada Selasa Pon)";
const kurupName = "Selasa Pon";
const kurupId = [5, 4];
// Date when kurup (120y cycle) asapon is started
// depends on keraton yogyakarta and keraton mataram
const epoch = new Date(1936, 2, 24).getTime();

const hari = [
  { hari: "Kamis", neptu: 8 },
  { hari: "Jum'at", neptu: 6 },
  { hari: "Sabtu", neptu: 9 },
  { hari: "Minggu", neptu: 5 },
  { hari: "Senin", neptu: 4 },
  { hari: "Selasa", neptu: 3 },
  { hari: "Rabu", neptu: 7 },
];
const pasaran = [
  { pasaran: "Wage", neptu: 4 },
  { pasaran: "Kliwon", neptu: 8 },
  { pasaran: "Legi", neptu: 5 },
  { pasaran: "Pahing", neptu: 9 },
  { pasaran: "Pon", neptu: 7 },
];
const bulan = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
];

let jumlahHariTiapTahun = [354, 355, 354, 354, 355, 354, 354, 355];
// Warsa is depended on kurup
function WarsaInfo() {
  const alip = {
    nama: "Alip",
    satuSura: {
      jatuhPada: kurupName,
      idHari: kurupId[0],
      idPasaran: kurupId[1],
    },
  };
  const ehe = {
    nama: "Ehe",
    satuSura: {
      jatuhPada: `${hari[(kurupId[0] + jumlahHariTiapTahun[0]) % 7]["hari"]} ${
        pasaran[(kurupId[1] + jumlahHariTiapTahun[0]) % 5]["pasaran"]
      }`,
      idHari: (kurupId[0] + jumlahHariTiapTahun[0]) % 7,
      idPasaran: (kurupId[1] + jumlahHariTiapTahun[0]) % 5,
    },
  };
  const jimawal = {
    nama: "Jimawal",
    satuSura: {
      jatuhPada: `${
        hari[(ehe.satuSura.idHari + jumlahHariTiapTahun[1]) % 7]["hari"]
      } ${
        pasaran[(ehe.satuSura.idPasaran + jumlahHariTiapTahun[1]) % 5][
          "pasaran"
        ]
      }`,
      idHari: (ehe.satuSura.idHari + jumlahHariTiapTahun[1]) % 7,
      idPasaran: (ehe.satuSura.idPasaran + jumlahHariTiapTahun[1]) % 5,
    },
  };
  const je = {
    nama: "Jé",
    satuSura: {
      jatuhPada: `${
        hari[(jimawal.satuSura.idHari + jumlahHariTiapTahun[2]) % 7]["hari"]
      } ${
        pasaran[(jimawal.satuSura.idPasaran + jumlahHariTiapTahun[2]) % 5][
          "pasaran"
        ]
      }`,
      idHari: (jimawal.satuSura.idHari + jumlahHariTiapTahun[2]) % 7,
      idPasaran: (jimawal.satuSura.idPasaran + jumlahHariTiapTahun[2]) % 5,
    },
  };
  const dal = {
    nama: "Dal",
    satuSura: {
      jatuhPada: `${
        hari[(je.satuSura.idHari + jumlahHariTiapTahun[3]) % 7]["hari"]
      } ${
        pasaran[(je.satuSura.idPasaran + jumlahHariTiapTahun[3]) % 5]["pasaran"]
      }`,
      idHari: (je.satuSura.idHari + jumlahHariTiapTahun[3]) % 7,
      idPasaran: (je.satuSura.idPasaran + jumlahHariTiapTahun[3]) % 5,
    },
  };
  const be = {
    nama: "Bé",
    satuSura: {
      jatuhPada: `${
        hari[(dal.satuSura.idHari + jumlahHariTiapTahun[4]) % 7]["hari"]
      } ${
        pasaran[(dal.satuSura.idPasaran + jumlahHariTiapTahun[4]) % 5][
          "pasaran"
        ]
      }`,
      idHari: (dal.satuSura.idHari + jumlahHariTiapTahun[4]) % 7,
      idPasaran: (dal.satuSura.idPasaran + jumlahHariTiapTahun[4]) % 5,
    },
  };
  const wawu = {
    nama: "Wawu",
    satuSura: {
      jatuhPada: `${
        hari[(be.satuSura.idHari + jumlahHariTiapTahun[5]) % 7]["hari"]
      } ${
        pasaran[(be.satuSura.idPasaran + jumlahHariTiapTahun[5]) % 5]["pasaran"]
      }`,
      idHari: (be.satuSura.idHari + jumlahHariTiapTahun[5]) % 7,
      idPasaran: (be.satuSura.idPasaran + jumlahHariTiapTahun[5]) % 5,
    },
  };
  const jimakir = {
    nama: "jimakir",
    satuSura: {
      jatuhPada: `${
        hari[(wawu.satuSura.idHari + jumlahHariTiapTahun[6]) % 7]["hari"]
      } ${
        pasaran[(wawu.satuSura.idPasaran + jumlahHariTiapTahun[6]) % 5][
          "pasaran"
        ]
      }`,
      idHari: (wawu.satuSura.idHari + jumlahHariTiapTahun[6]) % 7,
      idPasaran: (wawu.satuSura.idPasaran + jumlahHariTiapTahun[6]) % 5,
    },
  };

  return [alip, ehe, jimawal, je, dal, be, wawu, jimakir];
}

function AwalBulan(info) {
  const sapar = [3, 1];
  const mulud = [4, 5];
  const rabiulakir = [6, 5];
  const jumadilawal = [7, 4];
  const jumadilakir = [2, 4];
  const rejeb = [3, 3];
  const ruwah = [5, 3];
  const pasa = [6, 2];
  const syawal = [1, 2];
  const dulkaidah = [2, 1];
  const dulkijah = [4, 1];

  return {
    sapar: `Sapar, ${hari[(info.satuSura.idHari + sapar[0] - 1) % 7]["hari"]} ${
      pasaran[(info.satuSura.idPasaran + sapar[1] - 1) % 5]["pasaran"]
    }`,
    mulud: `Mulud/Rabiulawal, ${
      hari[(info.satuSura.idHari + mulud[0] - 1) % 7]["hari"]
    } ${pasaran[(info.satuSura.idPasaran + mulud[1] - 1) % 5]["pasaran"]}`,
    rabiulakir: `Badamulud/Rabiulakir, ${
      hari[(info.satuSura.idHari + rabiulakir[0] - 1) % 7]["hari"]
    } ${pasaran[(info.satuSura.idPasaran + rabiulakir[1] - 1) % 5]["pasaran"]}`,
    jumadilawal: `Jumadilawal, ${
      hari[(info.satuSura.idHari + jumadilawal[0] - 1) % 7]["hari"]
    } ${
      pasaran[(info.satuSura.idPasaran + jumadilawal[1] - 1) % 5]["pasaran"]
    }`,
    jumadilakir: `Jumadilakir, ${
      hari[(info.satuSura.idHari + jumadilakir[0] - 1) % 7]["hari"]
    } ${
      pasaran[(info.satuSura.idPasaran + jumadilakir[1] - 1) % 5]["pasaran"]
    }`,
    rejeb: `Rejeb, ${hari[(info.satuSura.idHari + rejeb[0] - 1) % 7]["hari"]} ${
      pasaran[(info.satuSura.idPasaran + rejeb[1] - 1) % 5]["pasaran"]
    }`,
    ruwah: `Ruwah/Syaban, ${
      hari[(info.satuSura.idHari + ruwah[0] - 1) % 7]["hari"]
    } ${pasaran[(info.satuSura.idPasaran + ruwah[1] - 1) % 5]["pasaran"]}`,
    pasa: `Pasa, ${hari[(info.satuSura.idHari + pasa[0] - 1) % 7]["hari"]} ${
      pasaran[(info.satuSura.idPasaran + pasa[1] - 1) % 5]["pasaran"]
    }`,
    syawal: `Syawal, ${
      hari[(info.satuSura.idHari + syawal[0] - 1) % 7]["hari"]
    } ${pasaran[(info.satuSura.idPasaran + syawal[1] - 1) % 5]["pasaran"]}`,
    dulkaidah: `Séla/Dulkaidah, ${
      hari[(info.satuSura.idHari + dulkaidah[0] - 1) % 7]["hari"]
    } ${pasaran[(info.satuSura.idPasaran + dulkaidah[1] - 1) % 5]["pasaran"]}`,
    dulkijah: `Dulkijah, ${
      hari[(info.satuSura.idHari + dulkijah[0] - 1) % 7]["hari"]
    } ${pasaran[(info.satuSura.idPasaran + dulkijah[1] - 1) % 5]["pasaran"]}`,
  };
}

function Weton(unix) {
  let date = unix.getTime() / 1000 / 3600 / 24;

  let tanggal = unix.getDate();
  let tahun = unix.getFullYear();

  let hariid = date % 7;
  let bulanid = unix.getMonth();
  let wetonid = date % 5;

  return `${hari[hariid]["hari"]} ${pasaran[wetonid]["pasaran"]}, ${tanggal} ${bulan[bulanid]} ${tahun}`;
}

function Neptu(unix) {
  let date = unix.getTime() / 1000 / 3600 / 24;
  let hariid = date % 7;
  let wetonid = date % 5;

  let neptu = pasaran[wetonid]["neptu"] + hari[hariid]["neptu"];
  return neptu;
}

function Warsa(unix) {
  let date = unix.getTime();
  let Rentang = Math.floor((date - epoch) / 1000 / 3600 / 24);
  let A = Rentang % 2835;

  let I = 0;
  let x = A - jumlahHariTiapTahun[I];

  while (x > 0) {
    I += 1;
    x -= jumlahHariTiapTahun[I];
  }

  let warsaInfo = WarsaInfo();
  let info = warsaInfo[I];
  let awal = AwalBulan(info);

  let T = Math.floor(Rentang / 2835) * 8 + kurupTahun + I;

  return {
    tahun: { numerik: T, warsa: info, bulan: awal },
    bulan: "Sapar",
    tanggal: "14",
  };
}

router.get("*", function (req, res) {
  let input = req.path.slice(1);
  let unix = new Date(input);

  let weton = Weton(unix);
  let neptu = Neptu(unix);
  let jawa = Warsa(unix);

  res.json({
    pasaran: { weton: weton, neptu: neptu },
    jawa,
    kurup: kurup,
  });
});
module.exports = router;

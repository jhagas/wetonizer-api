const e = require("express");
var express = require("express");
var router = express.Router();

//hardcoded, hard to predict the 120y kurup cycle
// started at 24 Mar 1936, 1867
const kurupTahun = 1867;
const kurup = "Asapon (Alip jatuh pada Selasa Pon)";
const kurupName = "Selasa Pon";
const kurupId = [0, 0];
// Date when kurup (120y cycle) asapon is started
// depends on keraton yogyakarta and keraton mataram
const epoch = new Date(1936, 2, 24).getTime();

const hari = [
  { hari: "Selasa", neptu: 3 },
  { hari: "Rabu", neptu: 7 },
  { hari: "Kamis", neptu: 8 },
  { hari: "Jum'at", neptu: 6 },
  { hari: "Sabtu", neptu: 9 },
  { hari: "Minggu", neptu: 5 },
  { hari: "Senin", neptu: 4 },
];
const pasaran = [
  { pasaran: "Pon", neptu: 7 },
  { pasaran: "Wage", neptu: 4 },
  { pasaran: "Kliwon", neptu: 8 },
  { pasaran: "Legi", neptu: 5 },
  { pasaran: "Pahing", neptu: 9 },
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

const jumlahHariTiapTahun = [354, 355, 354, 354, 355, 354, 354, 355];
const kabisat = [30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 30];
const biasa = [30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29];
const wulan = [
  "Sura",
  "Sapar",
  "Mulud",
  "Bakda Mulud",
  "Jumadil Awal",
  "Jumadil Akir",
  "Rejeb",
  "Ruwah",
  "Pasa",
  "Sawal",
  "Séla",
  "Besar",
];
const wukuList = [
  "Sinta",
  "Landep",
  "Wukir",
  "Kurantil",
  "Tolu",
  "Gumbreg",
  "Warigalit",
  "Warigagung",
  "Julungwangi",
  "Sungsang",
  "Galungan",
  "Kuningan",
  "Langkir",
  "Mandasiya",
  "Julungpujut",
  "Pahang",
  "Kuruwelut",
  "Marakeh",
  "Tambir",
  "Medangkungan",
  "Maktal",
  "Wuye",
  "Manahil",
  "Prangbakat",
  "Bala",
  "Wugu",
  "Wayang",
  "Kulawu",
  "Dukut",
  "Watugunung",
];

const windu = ["Adi", "Kuntara", "Sengara", "Sancaya"];
const lambang = ["Kelawu", "Langkir"];

const mangsaBiasa = [32, 25, 25, 24, 23, 41, 41, 23, 24, 25, 27, 43, 10];
const mangsaKabisat = [32, 26, 25, 24, 23, 41, 41, 23, 24, 25, 27, 43, 10];
const pranataMangsa = [
  {
    nama: "Kapitu (palguna)",
    deskripsi:
      "Benih padi mulai ditanam di sawah, banyak hujan, banyak sungai yang banjir. Penampakannya/ibaratnya : wisa kentar ing ing maruta (bisa larut dengan angin, itu masanya banyak penyakit). Musim banjir, badai longsor mulai tandur.",
  },
  {
    nama: "Kawolu (wasika)",
    deskripsi:
      "Padi mulai hijau, uret mulai banyak. Penampakannya/ibaratnya : anjrah jroning kayun (merata dalam keinginan, musimnya kucing kawin). Musim padi beristirahat, banyak ulat, banyak penyakit.",
  },
  {
    nama: "Kasanga (jita)",
    deskripsi:
      "Padi mulai berkembang dan sebagian sudah berbuah, jangkrik mulai muncul, kucing mulai kawin, cenggeret mulai bersuara. Penampakannya/ibaratnya : wedaring wacara mulya ( binatang tanah dan pohon mulai bersuara). Musim padi berbunga, turaes (sebangsa serangga) ramai berbunyi.",
  },
  {
    nama: "Kasadasa (srawana)",
    deskripsi:
      "Padi mulai menguning, mulai panen, banyak hewan hamil, burung-burung kecil mulai menetas telurnya. Penampakannya/ibaratnya : gedong minep jroning kalbu (masa hewan sedang hamil). Musim padi berisi tapi masih hijau, burung-burung membuat sarang, tanam palawija di lahan kering.",
  },
  {
    nama: "Dhesta (pradawana)",
    deskripsi:
      "Seluruhnya memanen padi. Penampakannya/ibaratnya: sotya (anak burung) sinara wedi (disuapi makanan). Masih ada waktu untuk palawija, burung-burung menyuapi anaknya.",
  },
  {
    nama: "Sadha (asuji)",
    deskripsi:
      "Para petani mulai menjemur padi dan memasukkan ke lumbung. Di sawah hanya tersisa dami. Penampakannya/ibaratnya : tirta (keringat) sah saking sasana (badan) (air pergi darisumbernya, masa ini musim dingin, jarang orang berkeringat, sebab sangat dingin). Musim menumpuk jerami,tanda-tanda udara dingin pada pagi hari.",
  },
  {
    nama: "Kasa (kartika)",
    deskripsi:
      "Para petani membakar dami yang tertinggal di sawah dan di masa ini dimulai menanam palawija, sejenis belalang masuk ke tanah, daun-daunan berjatuhan. Penampakannya/ibaratnya : lir sotya (dedaunan) murca saka ngembanan (kayu-kayuan).",
  },
  {
    nama: "Karo (poso)",
    deskripsi:
      "Palawija mulai tumbuh, pohon randu dan mangga, tanah mulai retak/berlubang. Penampakannya/ibaratnya : bantala (tanah) rengka (retak). Musim kapok bertunas tanam palawija kedua.",
  },
  {
    nama: "Katelu",
    deskripsi:
      "Musimnya/waktunya lahan tidak ditanami, sebab panas sekali, yang mana Palawija mulai di panen, berbagai jenis bambu tumbuh. Penampakannya/ibaratnya : suta (anak) manut ing Bapa (lanjaran). Musim ubi-ubian bertunas panen palawija.",
  },
  {
    nama: "Kapat (sitra)",
    deskripsi:
      "Sawah tidak ada (jarang) tanaman, sebab musim kemarau, para petani mulai menggarap sawah untuk ditanami padi gaga, pohon kapuk mulai berbuah, burung-burung kecil mulai bertelur. Penampakannya/ibaratnya : waspa kumembeng jroning kalbu (sumber). Musim sumur kering, kapuk berbuah, tanam pisang. Pada masa ini kemarau berakhir.",
  },
  {
    nama: "Kalima (manggala)",
    deskripsi:
      "Mulai ada hujan, selokan sawah diperbaiki dan membuat tempat mengalir air di pinggir sawah, mulai menyebar padi gaga, pohon asem mulai tumbuh daun muda, ulat-ulat mulai keluar. Penampakannya/ibaratnya : pancuran (hujan) emas sumawur (hujannya) ing jagad. Musim turun hujan, pohon asam bertunas, pohon kunyit berdaun muda.",
  },
  {
    nama: "Kanem (naya)",
    deskripsi:
      "Para petani mulai menyebar bibit tanaman padi di pembenihan, banyak buah-buahan (durian, rambutan, manggis dan lain-lainnya), burung blibis mulai kelihatan di tempat-tempat berair. Penampakannya/ibaratnya : rasa mulya kasucian (sedang banyak-banyaknya buah-buahan). Musim buah-buahan mulai tua, mulai menggarap sawah.",
  },
  {
    nama: "Kapitu (palguna)",
    deskripsi:
      "Benih padi mulai ditanam di sawah, banyak hujan, banyak sungai yang banjir. Penampakannya/ibaratnya : wisa kentar ing ing maruta (bisa larut dengan angin, itu masanya banyak penyakit). Musim banjir, badai longsor mulai tandur.",
  },
];

// Warsa is depended on kurup
function WarsaInfo() {
  const alip = {
    warsa: "Alip",
    satuSura: {
      jatuhPada: kurupName,
      idHari: kurupId[0],
      idPasaran: kurupId[1],
    },
  };
  const ehe = {
    warsa: "Ehe",
    satuSura: {
      jatuhPada: `${hari[(kurupId[0] + jumlahHariTiapTahun[0]) % 7]["hari"]} ${
        pasaran[(kurupId[1] + jumlahHariTiapTahun[0]) % 5]["pasaran"]
      }`,
      idHari: (kurupId[0] + jumlahHariTiapTahun[0]) % 7,
      idPasaran: (kurupId[1] + jumlahHariTiapTahun[0]) % 5,
    },
  };
  const jimawal = {
    warsa: "Jimawal",
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
    warsa: "Jé",
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
    warsa: "Dal",
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
    warsa: "Bé",
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
    warsa: "Wawu",
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
    warsa: "jimakir",
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
  const sawal = [1, 2];
  const dulkaidah = [2, 1];
  const dulkijah = [4, 1];

  return {
    sura: `Sura, ${hari[info.satuSura.idHari % 7]["hari"]} ${
      pasaran[info.satuSura.idPasaran % 5]["pasaran"]
    }`,
    sapar: `Sapar, ${hari[(info.satuSura.idHari + sapar[0] - 1) % 7]["hari"]} ${
      pasaran[(info.satuSura.idPasaran + sapar[1] - 1) % 5]["pasaran"]
    }`,
    mulud: `Mulud/Rabiul awal, ${
      hari[(info.satuSura.idHari + mulud[0] - 1) % 7]["hari"]
    } ${pasaran[(info.satuSura.idPasaran + mulud[1] - 1) % 5]["pasaran"]}`,
    rabiulakir: `Bakda mulud/Rabiul akir, ${
      hari[(info.satuSura.idHari + rabiulakir[0] - 1) % 7]["hari"]
    } ${pasaran[(info.satuSura.idPasaran + rabiulakir[1] - 1) % 5]["pasaran"]}`,
    jumadilawal: `Jumadil awal, ${
      hari[(info.satuSura.idHari + jumadilawal[0] - 1) % 7]["hari"]
    } ${
      pasaran[(info.satuSura.idPasaran + jumadilawal[1] - 1) % 5]["pasaran"]
    }`,
    jumadilakir: `Jumadil akir, ${
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
      hari[(info.satuSura.idHari + sawal[0] - 1) % 7]["hari"]
    } ${pasaran[(info.satuSura.idPasaran + sawal[1] - 1) % 5]["pasaran"]}`,
    dulkaidah: `Séla/Dulkaidah, ${
      hari[(info.satuSura.idHari + dulkaidah[0] - 1) % 7]["hari"]
    } ${pasaran[(info.satuSura.idPasaran + dulkaidah[1] - 1) % 5]["pasaran"]}`,
    dulkijah: `Besar/Dulkijah, ${
      hari[(info.satuSura.idHari + dulkijah[0] - 1) % 7]["hari"]
    } ${pasaran[(info.satuSura.idPasaran + dulkijah[1] - 1) % 5]["pasaran"]}`,
  };
}

function Mangsa(unix) {
  let year = unix.getFullYear();
  let Rentang = Math.floor(
    (unix.getTime() - new Date(`${year}`).getTime()) / 1000 / 3600 / 24
  );
  let leap = (year % 4 == 0 && year % 100 != 0) || year % 400 == 0;

  let P = 0;
  let A = Rentang - 32;

  if (leap) {
    while (A > 0) {
      P += 1;
      A -= mangsaBiasa[P];
    }
  } else {
    while (A > 0) {
      P += 1;
      A -= mangsaKabisat[P];
    }
  }

  return pranataMangsa[P];
}

function Weton(unix) {
  let date = unix.getTime();
  let Rentang = Math.floor((date - epoch) / 1000 / 3600 / 24);

  let hariid = Rentang % 7;
  let wetonid = Rentang % 5;

  return `${hari[hariid]["hari"]} ${pasaran[wetonid]["pasaran"]}`;
}

function Input(unix) {
  let hari = unix.getDate();
  let namaBulan = bulan[unix.getMonth()];
  let tahun = unix.getFullYear();

  return `${hari} ${namaBulan} ${tahun}`;
}

function Neptu(unix) {
  let date = unix.getTime();
  let Rentang = Math.floor((date - epoch) / 1000 / 3600 / 24);

  let hariid = Rentang % 7;
  let wetonid = Rentang % 5;

  let neptu = pasaran[wetonid]["neptu"] + hari[hariid]["neptu"];
  return neptu;
}

function Jawa(unix) {
  let date = unix.getTime();
  let Rentang = Math.floor((date - epoch) / 1000 / 3600 / 24);
  let A = Rentang % 2835;

  let B = 0;
  let I = 0;
  let x = A - jumlahHariTiapTahun[I] + 1;

  while (x > 0) {
    I += 1;
    x -= jumlahHariTiapTahun[I];
  }
  let D = x + jumlahHariTiapTahun[I] - 30;
  let H = D + 30;

  if (jumlahHariTiapTahun[I] == 355) {
    while (D > 0) {
      H = D;
      B += 1;
      D -= kabisat[B];
    }
  }
  if (jumlahHariTiapTahun[I] == 354) {
    while (D > 0) {
      H = D;
      B += 1;
      D -= biasa[B];
    }
  }

  let warsaInfo = WarsaInfo();
  let info = warsaInfo[I];
  let awal = AwalBulan(info);
  let mangsa = Mangsa(unix);

  let T = Math.floor(Rentang / 2835) * 8 + kurupTahun + I;
  let L = Math.floor((((Rentang % 5670) + 2835) % 5670) / 2835);

  let winduNow = Math.floor((Rentang % 11340) / 2535);
  let weton = Weton(unix);
  let neptu = Neptu(unix);
  let wuku = Wuku(unix);

  return {
    weton: weton,
    neptu: neptu,
    tanggal: H,
    wuku,
    bulan: wulan[B],
    mangsa,
    tahun: T,
    warsa: info.warsa,
    awalBulan: awal,
    windu: windu[winduNow],
    lambang: lambang[L],
    kurup: kurup,
  };
}

function Wuku(unix) {
  let date = unix.getTime();
  let Rentang = Math.floor((date - epoch) / 1000 / 3600 / 24 - 1);
  let penyesuaian = 12;

  let wukuId = Math.round((Rentang / 7) % 30 + penyesuaian);

  return wukuList[wukuId];
}

router.get("*", function (req, res) {
  let input = req.path.slice(1);
  let unix = new Date(input);

  let jawa = Jawa(unix);
  let inputFormatted = Input(unix);

  res.json({
    input: inputFormatted,
    jawa,
  });
});
module.exports = router;

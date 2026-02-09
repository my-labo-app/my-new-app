document.addEventListener("DOMContentLoaded", () => {

  /* ===== 基本参照 ===== */
  const today = new Date();

  const scrollContainer = document.getElementById("calendar-scroll");
  const headerMonth = document.getElementById("header-month");
  const picker = document.getElementById("month-picker");

  const bottomSheet = document.getElementById("bottomSheet");
  const selectedDate = document.getElementById("selectedDate");

  /* ===== 定数 ===== */
  const START_YEAR = 2025;
  const END_YEAR = 2040;

  const monthNames = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December"
  ];

  const rokuyo = ["大安","赤口","先勝","友引","先負","仏滅"];

  /* ===== ヘッダー更新 ===== */
  function updateHeader(year, month) {
    headerMonth.textContent = `${year} ${monthNames[month]}`;
  }

  /* ===== month picker ===== */
  document.getElementById("open-picker").addEventListener("click", () => {
    picker.focus();
  });

  picker.addEventListener("input", () => {
    const [y, m] = picker.value.split("-");
    const target = document.querySelector(
      `.calendar-container[data-year="${y}"][data-month="${Number(m)}"]`
    );
    if (target) {
      target.scrollIntoView({ behavior: "smooth", inline: "start" });
    }
    updateHeader(Number(y), Number(m) - 1);
  });

  /* ===== カレンダー描画 ===== */
  function renderCalendar(year, month) {

    const container = document.createElement("div");
    container.className = "calendar-container";
    container.dataset.year = year;
    container.dataset.month = month + 1;

    /* 曜日 */
    const weekdays = document.createElement("div");
    weekdays.className = "weekdays";

    ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].forEach((d, i) => {
      const div = document.createElement("div");
      div.textContent = d;
      if (i === 5) div.className = "sat";
      if (i === 6) div.className = "sun";
      weekdays.appendChild(div);
    });

    container.appendChild(weekdays);

    /* カレンダー本体 */
    const cal = document.createElement("div");
    cal.className = "calendar";

    const firstDay = new Date(year, month, 1).getDay();
    const startIndex = (firstDay + 6) % 7;
    const lastDate = new Date(year, month + 1, 0).getDate();
    const prevLastDate = new Date(year, month, 0).getDate();

    /* 前月 */
    for (let i = startIndex; i > 0; i--) {
      cal.appendChild(createOtherCell(prevLastDate - i + 1));
    }

    /* 今月 */
    for (let day = 1; day <= lastDate; day++) {

      const cell = document.createElement("div");

      const isToday =
        year === today.getFullYear() &&
        month === today.getMonth() &&
        day === today.getDate();

      if (isToday) cell.classList.add("today");

      const d = document.createElement("div");
      d.className = "date";
      d.textContent = day;

      const r = document.createElement("div");
      r.className = "rokuyo";

      const startDate = new Date(year, 0, 1);
      const currentDate = new Date(year, month, day);
      const diffDays = Math.floor(
        (currentDate - startDate) / 86400000
      );

      r.textContent = rokuyo[diffDays % 6];

      cell.addEventListener("click", () => {
        selectedDate.textContent = `${month + 1}月${day}日`;
        bottomSheet.classList.add("active");
      });

      cell.appendChild(d);
      cell.appendChild(r);
      cal.appendChild(cell);
    }

    /* 翌月（42マス） */
    let nextDay = 1;

while (cal.children.length < 42) {
  cal.appendChild(createOtherCell(nextDay));
  nextDay++;
}

    container.appendChild(cal);
    scrollContainer.appendChild(container);
  }

  function createOtherCell(num) {
    const cell = document.createElement("div");
    cell.className = "other-month";

    const d = document.createElement("div");
    d.className = "date";
    d.textContent = num;

    cell.appendChild(d);
    return cell;
  }

  /* ===== 全月生成 ===== */
  for (let y = START_YEAR; y <= END_YEAR; y++) {
    for (let m = 0; m < 12; m++) {
      renderCalendar(y, m);
    }
  }

  /* ===== 初期位置（今日の月へ） ===== */
  const initialIndex =
    (today.getFullYear() - START_YEAR) * 12 + today.getMonth();

  scrollContainer.scrollLeft = window.innerWidth * initialIndex;
  updateHeader(today.getFullYear(), today.getMonth());

  /* ===== スクロール連動ヘッダー ===== */
  scrollContainer.addEventListener("scroll", () => {
    const index = Math.round(
      scrollContainer.scrollLeft / window.innerWidth
    );

    const year = START_YEAR + Math.floor(index / 12);
    const month = index % 12;

    updateHeader(year, month);
  });

/* ===== Bottom Sheet ===== */
let startY = 0;
let currentY = 0;
let isDragging = false;

/* 日付タップで開く（これは既にあるけど念のため） */
function openSheet(text) {
  selectedDate.textContent = text;
  bottomSheet.classList.add("active");
}

/* タッチ開始 */
bottomSheet.addEventListener("touchstart", (e) => {
  startY = e.touches[0].clientY;
  isDragging = true;
});

/* スワイプ中 */
bottomSheet.addEventListener("touchmove", (e) => {
  if (!isDragging) return;

  currentY = e.touches[0].clientY;
  const diff = currentY - startY;

  if (diff > 0) {
    bottomSheet.style.transform = `translateY(${diff}px)`;
  }
});

/* 指を離した */
bottomSheet.addEventListener("touchend", () => {
  isDragging = false;

  if (currentY - startY > 120) {
    bottomSheet.classList.remove("active");
  }

  bottomSheet.style.transform = "";
  startY = 0;
  currentY = 0;
});

});
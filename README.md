<html lang="ja">
  <head>
    <meta charset="UTF-8">
    <style>
      body {
        font-family:sans-serif;
        margin:20px;
      }
      .calendar {
         max-width: 360px;
         margin: 0 auto;
      }
      .month {
        text-align: center;
        font-size: 1.2em;
        margin-bottom: 10px;
      }
      .week {
        display: grid;
        grid-template-columns: repeat(7,1fr);
        text-align:center;
        font-weight: bold;
      }
      .days {
        display: grid;
        grid-template-columns:repeat(7,1fr);
        gap: 6px;
        margin-top: 6px;
      }
      .day {
        border: 1px solid #ccc;
        height: 44px;
        display: flex;
        align-items: center;
        justfy-content: center;
      }
    </style>
  </head>
  <body>
    <h1>私の新しいアプリ</h1>
    <div class="calendar">
      <div class="month">2025年12月</div>
      <div class="week">
        <div>月</div><div>火</div><div>水</div><div>木</div><div>金</div><div>土</div><div>日</div>
      </div>
      <div class="days">
        <div class="day">1</div>
        <div class="day">2</div>
        <div class="day">3</div>
        <div class="day">4</div>
        <div class="day">5</div>
  </body>
</html>

const express = require('express');
const app = express();
const port = process.env.PORT || 3003;
// const port = process.env.PORT || 3003;
const path = require('path');
const fs = require('fs')


  // <meta name="og-url" property="og:url" content="https://splay.vn" />
	// <meta name="og-type" property="og:type" content="Game" />
	// <meta name="og-title" property="og:title" content="Cổng game SPLAY - VTC Mobile" />
	// <meta name="og-description" property="og:description" content="Tổng hợp các game HOT nhất trên thị trường & đa nền tảng." />
	// <meta name="og-image" property="og:image" content="https://splay.vn/logo_demo.png" />;

app.get('/', function(request, response) {
  const filePath = path.resolve(__dirname, './build', 'index.html');
  fs.readFile(filePath, 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    }
    data = data.replace(/\$OG_URL/g, 'https://phitieu.splay.vn/');
    data = data.replace(/\$OG_TYPE/g, "Game");
    data = data.replace(/\$OG_TITLE/g, 'Tham gia PHI TIÊU - nhận quà SIÊU HOT');
    data = data.replace(/\$OG_DESCRIPTION/g, "Hàng trăm giải thưởng giá trị được phát ra hàng ngày - hàng tuần tại Minigame Phi tiêu. SK dành cho Khách hàng VIP Scoin.");
    result = data.replace(/\$OG_IMAGE/g, 'https://i.postimg.cc/y8sr3kfc/banner-fb.png');
    response.send(result);
  });
});


app.use(express.static(path.resolve(__dirname, './build')));

app.get('*', function(request, response) {
  const filePath = path.resolve(__dirname, './build', 'index.html');
  response.sendFile(filePath);
});

app.listen(port, () => console.log(`Listening on port ${port}`));
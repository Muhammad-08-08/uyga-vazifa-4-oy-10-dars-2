const output = document.getElementById("output");

const logResult = (title, result) => {
  const entry = document.createElement("div");
  entry.classList.add("entry");
  entry.innerHTML = `<strong>${title}:</strong>`;
  if (Array.isArray(result)) {
    result.forEach((item) => {
      if (item.startsWith("https://")) {
        const img = document.createElement("img");
        img.src = item;
        entry.appendChild(img);
      } else {
        const text = document.createElement("p");
        text.textContent = item;
        entry.appendChild(text);
      }
    });
  } else {
    const text = document.createElement("p");
    text.textContent = JSON.stringify(result, null, 2);
    entry.appendChild(text);
  }
  output.appendChild(entry);
};

const firstPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(Array.from({ length: 10 }, (_, i) => `Data-${i + 1}`));
  }, 1000);
});
firstPromise.then((result) => {
  logResult("Promise 1 natijasi", result);
  console.log(result);
})
const secondPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(Array.from({ length: 10 }, (_, i) => `String-${i + 1}`));
  }, 1500);
});
secondPromise.then((result) => {
  logResult("Promise 2 natijasi", result);
  console.log(result);
});

const thirdPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(
      Array.from(
        { length: 10 },
        (_, i) =>
          `https://xs.uz/upload/post/2020/12/16/e6004e7cc0db45df1124dc01ad04f15f1216.png`
      )
    );
  }, 2000);
});

const promises = [firstPromise, secondPromise, thirdPromise];

Promise.all(promises)
  .then((results) => {
    logResult("Promise.all natijasi", results.flat());
  })
  .catch((error) => {
    logResult("Promise.all xato", error);
  });

Promise.allSettled(promises).then((results) => {
  logResult(
    "Promise.allSettled natijasi",
    results.map((r) => r.value || r.reason)
  );
});
